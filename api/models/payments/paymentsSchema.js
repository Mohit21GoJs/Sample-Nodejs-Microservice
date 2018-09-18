import { Schema, model } from 'mongoose';

const paymentSchema = new Schema({
    vendorSuccessData: Schema.Types.Mixed,
    vendorErrorData: Schema.Types.Mixed,
    paymentType: Schema.Types.String,
    paymentProvider: Schema.Types.String,
    status: Schema.Types.String,
    paymentInfo: {
        mode: Schema.Types.String,
        amount: Schema.Types.Number,
        currency: Schema.Types.String
    },
    transactionId: Schema.Types.String,
    modifiedAt: { type: Date, default: Date.now },
    createdAt: { type: Date },
});

const payment = model('Payment', paymentSchema, 'payments');

const createPayment = data => data;

// create state machine for changing payment status


export const exportedObj = {
    createPayment
};

export default exportedObj;
