// import mongoose from 'mongoose';
// import businessCustomerBankdetails from '../businessCustomers/bankDetailSchema';
// import siteInfoDetails from './siteInfoSchema';

// const businessCustomerSchema = mongoose.Schema({
//     companyId: { type: mongoose.Schema.ObjectId, ref: 'companies' },
//     businessCustomerStatus: { type: Number, default: 0 },
//     createdDate: { type: Date, default: Date.now },
//     lastModifiedDate: { type: Date, default: Date.now },
//     basicInfo: {
//         displayId: String,
//         firstName: String,
//         middleName: { type: String, default: '' },
//         lastName: String,
//         email: String,
//         designation: String,
//         companyName: String,
//         createdDate: Date,
//         lastModifiedDate: Date,
//     },
//     bankingDetailInfo: {
//         accountNumber: String,
//         creditLimit: String,
//         nameOnCheque: String,
//         invoiceCurrencyCode: String,
//         currencyCode: String,
//         preferredPaymentMethods: String,
//         paymentTerms: String,
//         voidCheckUrl: String,
//         bankDetails: { type: [businessCustomerBankdetails.schema], default: undefined },
//         lastModifiedDate: Date,
//     },
//     siteInfo: { type: [siteInfoDetails.schema], default: undefined },
//     companyInfo: {
//         licenseType: String,
//         licenseNumber: String,
//         category: String,
//         contactNumbers: {
//             type: [{
//                 contact: String,
//                 contactType: String,
//             }],
//             default: undefined,
//         },
//         emailAddresses: {
//             type: [{
//                 email: String,
//                 emailType: String,
//             }],
//             default: undefined,
//         },
//         companyAddressInfo: {
//             companyAddress: String,
//             city: String,
//             country: String,
//             state: String,
//             zipCode: String,
//         },
//         organizationInfo: {
//             name: String,
//             address: String,
//             city: String,
//             country: String,
//             state: String,
//             zipCode: String,
//         },
//         lastModifiedDate: Date,
//     },
// });

// const BusinessCustomerDataStorage = mongoose.model('BusinessCustomers', businessCustomerSchema, 'BusinessCustomers');

// const findBusinessCustomer = ({ qryFields }) => BusinessCustomerDataStorage.find(qryFields).sort({ lastModifiedDate: -1 });

// const updateBusinessCustomer = ({ qryFields, setFields }) => BusinessCustomerDataStorage.findOneAndUpdate(qryFields, setFields, { new: true });

// const createBusinessCustomer = ({ data }) => BusinessCustomerDataStorage.create(data);

// export {
//     findBusinessCustomer,
//     createBusinessCustomer,
//     updateBusinessCustomer,
// };
