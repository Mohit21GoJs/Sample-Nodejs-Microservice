// import { get as _get, clone as _clone } from 'lodash';
// import * as baseCtrl from '../../../private/base-controller';
// import { validateDataBySchema } from '../../../private/joi-validatation-wrapper';
// import { createBusinessCustomerSchema, updateBusinessCustomerBasicInfoSchema, updateBusinessCustomerBankingDetailsSchema, updateBusinessCustomerSiteInfoSchema, updateBusinessCustomerCompanyInfoSchema, fetchDataForBusinessCustomerSchema } from './businessCustomerValidation';
// import { mapDataForResponse, mapDataForSearchResponse, mapDataForBusinessCustomerStatusUpdateResponse } from '../../service/businessCutomers/mappers/outbound';
// import { createBusinessCustomerHandler, getBusinessCustomerHandler, updateBusinessCustomerBasicInfoHandler, updateBusinessCustomerBankingDetailsHandler, updateBusinessCustomerSiteInfoHandler, updateBusinessCustomerCompanyInfoHandler, getBusinessCustomerByFieldsHandler, sendForApprovalHandler } from '../../handlers/businessCustomers/businessCustomerHandler';
// import { findConditonForUserCompanyId, findConditonForCompanyId } from '../../helpers/commonUtil';
// import { sendBusinessCustomerForApprovalEventHandler, sendBusinessCustomerForNotificationHandler } from '../../rabbit/publisher/businessCustomer-pub';

// const createBusinessCustomer = (req, res, next) => {
//     const { body, payload } = req;
//     const companyIds = findConditonForCompanyId(_get(req, 'payload.companyIds'));
//     const userCompanyId = findConditonForUserCompanyId(_get(req, 'payload.userCompanyId'));
//     baseCtrl.postAsync(res, next, async (_) => {
//         await validateDataBySchema(body, createBusinessCustomerSchema);
//         const sendDataForRegistration = await createBusinessCustomerHandler({
//             data: body,
//             companyIds,
//             userCompanyId,
//             headers: req.customHeaders,
//         });
//         const result = mapDataForResponse({ data: _get(sendDataForRegistration, 'businessCustomerData') });
//         const businessCustomerDataCloned = _clone(sendDataForRegistration);
//         const backgroundFunc = async (_) => {
//             await sendBusinessCustomerForNotificationHandler({ businessCustomerData: businessCustomerDataCloned, tokenPayload: payload, domain: _get(body, 'domainUrl') });
//         };
//         return { ...result, bgFunc: backgroundFunc };
//     });
// };

// const getBusinessCustomerData = (req, res, next) => {
//     const { body } = req;
//     const companyIds = findConditonForCompanyId(_get(req, 'payload.companyIds'));
//     baseCtrl.postAsync(res, next, async (_) => {
//         const businessCustomerData = await getBusinessCustomerHandler({
//             data: body,
//             companyIds,
//         });
//         const result = mapDataForSearchResponse({ data: businessCustomerData });
//         return result;
//     });
// };

// const updateBusinessCustomerBasicInfo = (req, res, next) => {
//     const { body } = req;
//     const companyIds = findConditonForCompanyId(_get(req, 'payload.companyIds'));
//     const userCompanyId = findConditonForUserCompanyId(_get(req, 'payload.userCompanyId'));
//     baseCtrl.postAsync(res, next, async (_) => {
//         await validateDataBySchema(body, updateBusinessCustomerBasicInfoSchema);
//         const updatedData = await updateBusinessCustomerBasicInfoHandler({
//             data: body,
//             companyIds,
//             userCompanyId,
//             headers: req.customHeaders,
//         });
//         const result = mapDataForResponse({ data: updatedData });
//         return result;
//     });
// };

// const updateBusinessCustomerBankingDetails = (req, res, next) => {
//     const { body } = req;
//     const companyIds = findConditonForCompanyId(_get(req, 'payload.companyIds'));
//     const userCompanyId = findConditonForUserCompanyId(_get(req, 'payload.userCompanyId'));
//     baseCtrl.postAsync(res, next, async (_) => {
//         await validateDataBySchema(body, updateBusinessCustomerBankingDetailsSchema);
//         const updatedData = await updateBusinessCustomerBankingDetailsHandler({
//             data: body,
//             companyIds,
//             userCompanyId,
//             headers: req.customHeaders,
//         });
//         const result = mapDataForResponse({ data: updatedData });
//         return result;
//     });
// };

// const updateBusinessCustomerSiteInfo = (req, res, next) => {
//     const { body } = req;
//     const companyIds = findConditonForCompanyId(_get(req, 'payload.companyIds'));
//     const userCompanyId = findConditonForUserCompanyId(_get(req, 'payload.userCompanyId'));
//     baseCtrl.postAsync(res, next, async (_) => {
//         await validateDataBySchema(body, updateBusinessCustomerSiteInfoSchema);
//         const updatedData = await updateBusinessCustomerSiteInfoHandler({
//             data: body,
//             companyIds,
//             userCompanyId,
//             headers: req.customHeaders,
//         });
//         const result = mapDataForResponse({ data: updatedData });
//         return result;
//     });
// };

// const updateBusinessCustomerCompanyInfo = (req, res, next) => {
//     const { body } = req;
//     const companyIds = findConditonForCompanyId(_get(req, 'payload.companyIds'));
//     const userCompanyId = findConditonForUserCompanyId(_get(req, 'payload.userCompanyId'));
//     baseCtrl.postAsync(res, next, async (_) => {
//         await validateDataBySchema(body, updateBusinessCustomerCompanyInfoSchema);
//         const updatedData = await updateBusinessCustomerCompanyInfoHandler({
//             data: body,
//             companyIds,
//             userCompanyId,
//             headers: req.customHeaders,
//         });
//         const result = mapDataForResponse({ data: updatedData });
//         return result;
//     });
// };

// const getBusinessCustomerDataByFields = (req, res, next) => {
//     const { body } = req;
//     const companyIds = findConditonForCompanyId(_get(req, 'payload.companyIds'));
//     baseCtrl.postAsync(res, next, async (_) => {
//         const customerData = await getBusinessCustomerByFieldsHandler({
//             data: body,
//             companyIds,
//         });
//         const result = mapDataForSearchResponse({ data: customerData });
//         return result;
//     });
// };

// const sendBusinessCustomerForApproval = (req, res, next) => {
//     const { body, payload } = req;
//     const companyIds = findConditonForCompanyId(_get(req, 'payload.companyIds'));
//     baseCtrl.postAsync(res, next, async (_) => {
//         await validateDataBySchema(body, fetchDataForBusinessCustomerSchema);
//         const customerData = await sendForApprovalHandler({
//             data: body,
//             companyIds,
//         });
//         const result = mapDataForBusinessCustomerStatusUpdateResponse({ data: customerData });
//         const businessCustomerDataCloned = _clone(customerData);
//         const backgroundFunc = async (_) => {
//             await sendBusinessCustomerForApprovalEventHandler({ businessCustomerData: businessCustomerDataCloned, tokenPayload: payload });
//         };
//         return { ...result, bgFunc: backgroundFunc };
//     });
// };

// export default createBusinessCustomer;
// export {
//     createBusinessCustomer,
//     getBusinessCustomerData,
//     updateBusinessCustomerBasicInfo,
//     updateBusinessCustomerBankingDetails,
//     updateBusinessCustomerSiteInfo,
//     updateBusinessCustomerCompanyInfo,
//     getBusinessCustomerDataByFields,
//     sendBusinessCustomerForApproval,
// };

