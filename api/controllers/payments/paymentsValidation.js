// import Joi from 'joi';
// import CustomError from '../../../private/custom-error';
// import MESSAGES from '../../vars/messages';
// import { joiMultipleErrorHandler } from '../../../private/joi-validatation-wrapper';

// const createBusinessCustomerSchema = Joi.object().keys({
//     basicInfo: Joi.object().keys({
//         firstName: Joi.string().min(3).max(30).required()
//             .error(new CustomError(400, 'Something Went Wrong With Name.')),
//         middleName: Joi.string().min(3).max(30).allow('')
//             .optional(),
//         lastName: Joi.string().min(3).max(30).required()
//             .error(new CustomError(400, 'Something Went Wrong With Name.')),
//         email: Joi.string().email().error(new CustomError(400, 'Something Went Wrong With Email.')),
//         designation: Joi.string().required().error(new CustomError(400, 'Something Went Wrong With Designation.')),
//         companyName: Joi.string().required().error(new CustomError(400, 'Something Went Wrong With Comapny.')),
//     }).required(),
// });

// const updateBusinessCustomerBasicInfoSchema = Joi.object().keys({
//     _id: Joi.string().required().error(new CustomError(400, 'Business Customer Id is missing.')),
//     basicInfo: Joi.object().keys({
//         firstName: Joi.string().min(3).max(30).required()
//             .error(new CustomError(400, 'Something Went Wrong With Name.')),
//         middleName: Joi.string().min(3).max(30).allow('')
//             .optional(),
//         lastName: Joi.string().min(3).max(30).required()
//             .error(new CustomError(400, 'Something Went Wrong With Name.')),
//         designation: Joi.string().required().error(new CustomError(400, 'Something Went Wrong With Designation.')),
//         companyName: Joi.string().required().error(new CustomError(400, 'Something Went Wrong With Comapny.')),
//     }).required(),
// });

// const updateBusinessCustomerBankingDetailsSchema = Joi.object().keys({
//     _id: Joi.string().required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} Business Customer Id.`)),
//     bankingDetailInfo: Joi.object().keys({
//         accountNumber: Joi.string().required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} Account Number.`)),
//         creditLimit: Joi.string().allow('').optional(),
//         nameOnCheque: Joi.string().required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} Name On Check.`)),
//         invoiceCurrencyCode: Joi.string().required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} Invoice Currency Code.`)),
//         currencyCode: Joi.string().required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} Currency Code.`)),
//         preferredPaymentMethods: Joi.string().required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} Payment Methods.`)),
//         voidCheckUrl: Joi.string().allow('').optional().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} Check Url.`)),
//         paymentTerms: Joi.string().required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} Payment Terms.`)),
//         bankDetails: Joi.array().items(Joi.object().keys({
//             bankName: Joi.string().required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} Bank Name.`)),
//             branchName: Joi.string().required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} Branch Name.`)),
//             bankRoutingNumber: Joi.string().required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} Bank Routing Number.`)),
//             bankAccountNumber: Joi.string().required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} Bank Account Number.`)),
//             bankNumber: Joi.string().required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} Bank Number.`)),
//             accountStatus: Joi.string().required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} Account Status.`)),
//             accountName: Joi.string().required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} Account Name.`)),
//             effectiveDate: Joi.string().allow('').optional(),
//         })).required().error(joiMultipleErrorHandler),
//     }).required(),
// });

// const updateBusinessCustomerSiteInfoSchema = Joi.object().keys({
//     _id: Joi.string().required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} Business Customer Id.`)),
//     siteInfo: Joi.array().items(Joi.object().keys({
//         siteName: Joi.string().required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} Site Name.`)),
//         licenseType: Joi.string().required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} Site License Type.`)),
//         siteLicense: Joi.array().items(Joi.object().keys({
//             licenseNumber: Joi.string().required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} Site License Number.`)),
//         })).required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} Site License Info.`)),
//         addressInfo: Joi.array().items(Joi.object().keys({
//             siteAddress: Joi.string().required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} Site Address.`)),
//             contactNumber: Joi.string().regex(/[2-9]{2}\d{8}/).required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} Contact Number.`)),
//             email: Joi.string().email().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} Email.`)),
//             city: Joi.string().required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} City.`)),
//             country: Joi.string().required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} Country.`)),
//             state: Joi.string().required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} State.`)),
//             zipCode: Joi.string().required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} Zipcode.`)),
//             addressType: Joi.boolean(),
//         })).required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} Site Info.`)),
//     })),
// });

// const updateBusinessCustomerCompanyInfoSchema = Joi.object().keys({
//     _id: Joi.string().required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} Business Customer Id.`)),
//     companyInfo: Joi.object().keys({
//         licenseType: Joi.string().required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} Company License Type.`)),
//         licenseNumber: Joi.string().required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} Company License Number.`)),
//         category: Joi.string().required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} Company Category.`)),
//         contactNumbers: Joi.array().items(Joi.object().keys({
//             contact: Joi.string().regex(/[2-9]{2}\d{8}/).required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} Contact Number.`)),
//             contactType: Joi.boolean(),
//         })).required(),
//         emailAddresses: Joi.array().items(Joi.object().keys({
//             email: Joi.string().email().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} Email.`)),
//             emailType: Joi.boolean(),
//         })).required(),
//         companyAddressInfo: Joi.object().keys({
//             companyAddress: Joi.string().required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} Company Address.`)),
//             city: Joi.string().required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE}  Company City.`)),
//             country: Joi.string().required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} Company Country.`)),
//             state: Joi.string().required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} Company State.`)),
//             zipCode: Joi.string().required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} Company Zipcode.`)),
//         }).required(),
//         organizationInfo: Joi.object().keys({
//             name: Joi.string().min(3).max(30).required()
//             .error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} Organization Name.`)),
//             address: Joi.string().required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} Organization Address.`)),
//             city: Joi.string().required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} Organization City.`)),
//             country: Joi.string().required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} Organization Country.`)),
//             state: Joi.string().required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} Organization State.`)),
//             zipCode: Joi.string().required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} Organization Zipcode.`)),
//         }).optional(),
//     }).required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} Company Info.`)),
// });

// const fetchDataForBusinessCustomerSchema = Joi.object().keys({
//     _id: Joi.string().required().error(new CustomError(400, 'Id is missing.')),
// });

// export default createBusinessCustomerSchema;
// export {
//     createBusinessCustomerSchema,
//     updateBusinessCustomerBasicInfoSchema,
//     updateBusinessCustomerBankingDetailsSchema,
//     updateBusinessCustomerSiteInfoSchema,
//     updateBusinessCustomerCompanyInfoSchema,
//     fetchDataForBusinessCustomerSchema,
// };
