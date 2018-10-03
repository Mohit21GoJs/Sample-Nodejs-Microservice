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
} from '../../vars/appSettings';
import { createNewPayment, updatedFailedPayment, updateSuccessPayment } from '../../dbQueryBuilder/payments/payments';
import { createTransactionWithAccept } from '../../service/authorizenet/adaptor';


const mapAuthNetConfig = data => ({
    apiLoginKey: get(data, 'properties.apiLoginKey'),
    transactionKey: get(data, 'properties.transactionKey'),
});

const responseMapper = success => paymentId => ({
    status: success ? 'PAYMENT_SUCCESS' : 'PAYMENT_FAILED',
    paymentId,
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
    const paymentId = get(payment, '_id');
    if (authorizeNetRes.errors) {
        await updatedFailedPayment({ data: authorizeNetRes, paymentId });
        return failedRespMapper(paymentId);
    }
    await updateSuccessPayment({ data: authorizeNetRes, paymentId });
    return successRespMapper(paymentId);
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
    if (authorizeNetRes.errors) {
        await updatedFailedPayment({ data: authorizeNetRes, paymentId });
        return failedRespMapper(paymentId);
    }
    await updateSuccessPayment({ data: authorizeNetRes, paymentId });
    return successRespMapper(paymentId);
}


const authorizeNetBase = baseHandlerWithOptions(authorizeNetHelper);

export async function authorizeNetHandler(options) {
    return authorizeNetBase(options);
}

export default { authorizeNetHelperWithoutCompanyId, authorizeNetHandler };
