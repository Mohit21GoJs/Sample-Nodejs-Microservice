import {
    find,
    get,
    isEmpty,
} from 'lodash';
import { baseHandlerWithOptions  } from '../../../private/base-handler';
import CustomError from '../../../private/custom-error';
import { getCompanyConfigs  } from '../../service/referenceData/adaptor';
import {
    authorizeNetProvider,
    isAuthorizeActiveFlagText,
    paypalProvider,
} from '../../vars/appSettings';
import { createNewPayment, updatedFailedPayment, updateSuccessPayment, saveNewPayment } from '../../dbQueryBuilder/payments/payments';
import { createTransactionWithAccept } from '../../service/authorizenet/adaptor';


const mapAuthNetConfig = data => ({
    apiLoginKey: get(data, 'properties.apiLoginKey'),
    transactionKey: get(data, 'properties.transactionKey'),
});

const responseMapper = success => (paymentId, amount, createdOn) => ({
    status: success ? 'PAYMENT_SUCCESS' : 'PAYMENT_FAILED',
    paymentId,
    amount,
    createdOn
});

const successRespMapper = responseMapper(true);

const failedRespMapper = responseMapper(false);

async function authorizeNetHelper(options) {
    const configData = await getCompanyConfigs({
        headers: options.headers,
        companyId: options.companyId,
    });
    const derivedConfigData = get(configData, 'data');
    const authNetConfig = find(derivedConfigData, (data) => {
        const isAuthNetProvider = get(data, 'properties.vendor') === authorizeNetProvider;
        const isProviderActive = get(data, 'properties.status') === isAuthorizeActiveFlagText; // @TODO: move to config or common
        return isAuthNetProvider && isProviderActive;
    });
    if (isEmpty(authNetConfig)) {
        throw new CustomError(400, 'The vendor is not active on Authorize.net');
    }
    const payment = await createNewPayment({ data: options.data, vendor: authorizeNetProvider });
    const authorizeNetRes = await createTransactionWithAccept({
        reqBody: options.data,
        paymentInfo: payment,
        config: mapAuthNetConfig(authNetConfig),
    });
    // @TODO: move to mappers
    const paymentId = get(payment, '_id');
    const requestedAmount = get(payment, 'amountPaid');
    const createdOn = get(payment, 'createdOn');
    if (authorizeNetRes.errors) {
        await updatedFailedPayment({ data: authorizeNetRes, paymentId });
        return failedRespMapper(paymentId, requestedAmount, createdOn);
    }
    await updateSuccessPayment({ data: authorizeNetRes, paymentId });
    return successRespMapper(paymentId, requestedAmount, createdOn);
}

async function paypalHelper(options) {
    const payment = await saveNewPayment({ data: options.data, vendor: paypalProvider });
    // @TODO: move to mappers
    const paymentId = get(payment, '_id');
    const requestedAmount = get(payment, 'amountPaid');
    const createdOn = get(payment, 'createdOn');
    return successRespMapper(paymentId, requestedAmount, createdOn);
}


export async function authorizeNetHelperWithoutCompanyId(options) {
   const authNetConfig = options.data;
    const payment = await createNewPayment({ data: options.data, vendor: authorizeNetProvider });
    const authorizeNetRes = await createTransactionWithAccept({
        reqBody: options.data,
        paymentInfo: payment,
        config: mapAuthNetConfig(authNetConfig),
    });
    const paymentId = get(payment, '_id');
    const transactionId = get(payment, 'transactionId');
    if (authorizeNetRes.errors) {
        await updatedFailedPayment({ data: authorizeNetRes, paymentId });
        return failedRespMapper(paymentId);
    }
    await updateSuccessPayment({ data: authorizeNetRes, paymentId });
    return successRespMapper(transactionId);
}

const authorizeNetBase = baseHandlerWithOptions(authorizeNetHelper);

export async function authorizeNetHandler(options) {
    return authorizeNetBase(options);
}

const paypalIframeBase = baseHandlerWithOptions(paypalHelper);

export async function paypalIframeHandler(options) {
    return paypalIframeBase(options);
}

export default { authorizeNetHelperWithoutCompanyId, authorizeNetHandler };
