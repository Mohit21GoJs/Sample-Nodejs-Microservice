import {
    APIContracts,
    APIControllers,
    Constants,
} from 'authorizenet';
import {
    get,
} from 'lodash';
import {
    authorizeNetEnv,
} from '../../vars/appSettings';

const makeMerchantAuthenticationType = ({
    apiLoginKey,
    transactionKey,
}) => {
    const merchantAuthenticationType = new APIContracts.MerchantAuthenticationType();
    merchantAuthenticationType.setName(apiLoginKey);
    merchantAuthenticationType.setTransactionKey(transactionKey);
    return merchantAuthenticationType;
};

const makeOpaqueData = ({
    descriptor,
    dataValue,
}) => {
    const opaqueData = new APIContracts.OpaqueDataType();
    opaqueData.setDataDescriptor(descriptor);
    opaqueData.setDataValue(dataValue);
    return opaqueData;
};

const makePaymentWithOpaquedata = (opaqueData) => {
    const paymentType = new APIContracts.PaymentType();
    paymentType.setOpaqueData(opaqueData);
    return paymentType;
};

const makeAuthCaptureTx = () => {
    const transactionRequestType = new APIContracts.TransactionRequestType();
    transactionRequestType.setTransactionType(APIContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION);
    return transactionRequestType;
};

const setPayment = (tx, payment) => {
    tx.setPayment(payment);
    return tx;
};

const setAmount = (tx, amount) => {
    tx.setAmount(amount);
    return tx;
};

const createTxReq = (merchantAuthenticationType, txRequestType, paymentId) => {
    const createRequest = new APIContracts.CreateTransactionRequest();
    createRequest.setMerchantAuthentication(merchantAuthenticationType);
    createRequest.setTransactionRequest(txRequestType);
    createRequest.setRefId(paymentId);
    return createRequest;
};

const makeTxReqCtrl = (txReq) => {
    const ctrl = new APIControllers.CreateTransactionController(txReq.getJSON());
    if (authorizeNetEnv === 'production') {
        ctrl.setEnvironment(Constants.endpoint.production);
    }
    return ctrl;
};

// incoming body is a function which contains json which populates method name from here
export const createTransactionWithAccept = ({
    reqBody,
    paymentInfo,
    config,
}) => {
    const merchantAuthenticationType = makeMerchantAuthenticationType(config);
    const opaqueData = makeOpaqueData({
        descriptor: get(reqBody, 'opaqueData.dataDescriptor'),
        dataValue: get(reqBody, 'opaqueData.dataValue'),
    });
    const payment = makePaymentWithOpaquedata(opaqueData);
    const captureTx = makeAuthCaptureTx();
    const amount = get(reqBody, 'amount');
    setPayment(captureTx, payment);
    setAmount(captureTx, amount);
    const paymentRefId = get(paymentInfo, 'transactionId');
    const captureTxRequest = createTxReq(merchantAuthenticationType, captureTx, paymentRefId);
    const captureTxCtrl = makeTxReqCtrl(captureTxRequest);
    debugger;
    return new Promise((resolve) => {
        captureTxCtrl.execute(() => {
            const apiResponse = captureTxCtrl.getResponse();
            const response = new APIContracts.CreateTransactionResponse(apiResponse);
            debugger;
            // LOG response
            if (response != null) {
                if (response.getMessages().getResultCode() == APIContracts.MessageTypeEnum.OK) {
                    if (response.getTransactionResponse().getMessages() != null) {
                        resolve({ data: response.getTransactionResponse() });
                        // console.log('Successfully created transaction with Transaction ID: ' + response.getTransactionResponse().getTransId());
                        // console.log('Response Code: ' + response.getTransactionResponse().getResponseCode());
                        // console.log('Message Code: ' + response.getTransactionResponse().getMessages().getMessage()[0].getCode());
                        // console.log('Description: ' + response.getTransactionResponse().getMessages().getMessage()[0].getDescription());
                    } else {
                        console.log('Failed Transaction.');
                        if (response.getTransactionResponse().getErrors() != null) {
                            resolve({ errors: response.getTransactionResponse().getErrors()});
                            // console.log('Error Code: ' + response.getTransactionResponse().getErrors().getError()[0].getErrorCode());
                            // console.log('Error message: ' + response.getTransactionResponse().getErrors().getError()[0].getErrorText());
                        }
                    }
                } else {
                    console.log('Failed Transaction. ');
                    if (response.getTransactionResponse() != null && response.getTransactionResponse().getErrors() != null) {
                        resolve({ errors: response.getTransactionResponse().getErrors()});
                        // console.log('Error Code: ' + response.getTransactionResponse().getErrors().getError()[0].getErrorCode());
                        // console.log('Error message: ' + response.getTransactionResponse().getErrors().getError()[0].getErrorText());
                    } else {
                        resolve({ errors: response.getMessages() });
                        // console.log('Error Code: ' + response.getMessages().getMessage()[0].getCode());
                        // console.log('Error message: ' + response.getMessages().getMessage()[0].getText());
                    }
                }
            } else {
                console.log('Null Response.');
            }

        });
    });
};


export default {
    createTransactionWithAccept,
};
