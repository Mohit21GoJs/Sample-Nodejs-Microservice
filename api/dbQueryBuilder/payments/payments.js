import { get } from 'lodash';
import uniqId from 'uniqid';
import { createPayment, updatePayment } from '../../models/payments/paymentsSchema';

export async function createNewPayment({ data, vendor }) {
    try {
        const paymentData = {
            paymentTerms: get(data, 'paymentTerms'),
            paymentMethod: get(data, 'paymentMethod'),
            paymentStatus: 'INITIATED',
            vendor,
            createdOn: Date.now(),
            transactionId: uniqId(),
            receivedBy: get(data, 'paymentReceiver'),
            payer: get(data, 'payer'),
            amountPaid: get(data, 'amount'),
            currency: get(data, 'currency'),
        };
        return await createPayment(paymentData);
    } catch (err) {
        return Promise.reject(err);
    }
}

export async function updatedFailedPayment({ data, paymentId }) {
    try {
        const paymentQuery = {
            _id: paymentId,
        };
        const paymentUpdateData = {
            vendorResponse: {
                errors: get(data, 'errors'),
            },
            paymentStatus: 'FAILED',
        };
        return await updatePayment(paymentQuery, paymentUpdateData);
    } catch (err) {
        return Promise.reject(err);
    }
}

export async function updateSuccessPayment({ data, paymentId }) {
    try {
        const paymentQuery = {
            _id: paymentId,
        };
        const paymentUpdateData = {
            vendorResponse: {
                success: get(data, 'data'),
            },
            paymentStatus: 'SUCCESS',
        };
        return await updatePayment(paymentQuery, paymentUpdateData);
    } catch (err) {
        return Promise.reject(err);
    }
}

export async function saveNewPayment({ data, vendor }) {
    try {
        const paymentData = {
            vendorResponse: {
                success: get(data, 'paypalData'),
            },
            paymentTerms: get(data, 'paymentTerms'),
            paymentMethod: get(data, 'paymentMethod'),
            paymentStatus: 'SAVED',
            vendor,
            createdOn: Date.now(),
            transactionId: uniqId(),
            receivedBy: get(data, 'paymentReceiver'),
            payer: get(data, 'payer'),
            amountPaid: get(data, 'amount'),
            currency: get(data, 'currency'),
        };
        return await createPayment(paymentData);
    } catch (err) {
        return Promise.reject(err);
    }
}

export default {
    createNewPayment,
};
