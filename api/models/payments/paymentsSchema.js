import mongoose, { Schema  } from 'mongoose';

const paymentSchema = new Schema({
    vendorResponse: {
        errors: Schema.Types.Mixed,
        success: Schema.Types.Mixed,
    },
    paymentTerms: Schema.Types.String,
    vendor: Schema.Types.String,
    paymentMethod: Schema.Types.String,
    paymentStatus: Schema.Types.String,
    amountPaid: Schema.Types.Number,
    currency: Schema.Types.String,
    transactionId: Schema.Types.String,
    paymentTimeStamp: {
        type: Date,
    },
    modifiedOn: {
        type: Date,
        default: Date.now,
    },
    createdOn: {
        type: Date,
    },
    receivedBy: {
        id: String,
        name: String,
    },
    payer: {
        id: String,
        name: String,
    },
    cardInfo: {
        cardNumber: String,
        expiry: String,
    },
});
const Payment = mongoose.model('Payment', paymentSchema, 'Payments');

export const createPayment = data => Payment.create(data);

export const updatePayment = (query, data) => Payment.updateOne(query, data);

export default {
    createPayment,
    updatePayment,
};
