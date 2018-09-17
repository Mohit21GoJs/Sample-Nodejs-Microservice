// import { isEmpty as _isEmpty, get as _get, merge as _merge } from 'lodash';
// import baseHandler from '../../../private/base-handler';
// import { findDataForBusinessCustomer, registerBusinessCustomer, getBusinessCustomer, getBusinessCustomerById, updateBusinessCustomerData, getBusinessCustomerByFields } from '../../dbQueryBuilder/businessCustomers/businessCustomers';
// import CustomError from '../../../private/custom-error';
// import { searchUser, createUser, getRoleDataAdaptor } from '../../service/iam/iamAdaptor';
// import { roles } from '../../vars/appSettings';
// import { mapBusinessCustomerForUser } from '../../service/iam/mappers/outbound';
// import { mapBasicInfoDataForBusinessCustomer, mapBankingDetailsDataForUpdatingBusinessCustomer, mapCompanyInfoDataForUpdatingBusinessCustomer, mapSiteInfoDataForUpdatingBusinessCustomer, mapBusinessCustomerSearch } from '../../service/businessCutomers/mappers/inbound';
// import { checkArrAndMerge } from '../../helpers/commonUtil';

// // ============================ Create business customer basic info and iam user. ==============================//

// async function createBusinessCustomerHelper({ data, userCompanyId, headers }) {
//     const emailId = _get(data, 'basicInfo.email');
//     // find iam & customer user with same email exists or not
//     const [searchUserData, findEmailForCustomerIsUnique] = await Promise.all([
//         searchUser({ body: { email: emailId, companyId: _get(userCompanyId, 'companyId') }, headers }),
//         findDataForBusinessCustomer({ reqData: emailId, userCompanyId }),
//     ]);
//     if (!_isEmpty(_get(searchUserData, 'data')) || !_isEmpty(findEmailForCustomerIsUnique)) {
//         const err = new CustomError(409, `Email: ${emailId} Already Exists `);
//         throw err;
//     }

//     // get the role data for business customer user.
//     const getRoleForBusinessCustomer = await getRoleDataAdaptor({ body: { name: roles.businessCustomer }, headers });
//     if (_isEmpty(getRoleForBusinessCustomer)) {
//         const err = new CustomError(409, 'Role Does Not Exists');
//         throw err;
//     }

//     // map data for iam user & create through iam adaptor
//     const mapDataForCreatingUser = await mapBusinessCustomerForUser({
//         role: _get(getRoleForBusinessCustomer, 'data.[0]._id'),
//         companyId: _get(userCompanyId, 'companyId'),
//         data: _get(data, 'basicInfo'),
//     });
//     const userDetail = await createUser({ body: mapDataForCreatingUser, headers });

//     // register business customer.
//     const businessCustomerData = await registerBusinessCustomer({ data, userCompanyId });
//     return { businessCustomerData, mapDataForCreatingUser, userDetail };
// }

// async function createBusinessCustomerHandler(options) {
//     return baseHandler(createBusinessCustomerHelper, options);
// }

// // =================================== Get business customer Data. ============================================//

// async function getBusinessCustomerHelper({ data, companyIds }) {
//     const getBusinessCustData = await getBusinessCustomer({ data, companyIds });
//     return getBusinessCustData;
// }

// async function getBusinessCustomerHandler(options) {
//     return baseHandler(getBusinessCustomerHelper, options);
// }

// // ============================ Get customer Data On The Basis Of Fields =================================//

// async function getBusinessCustomerByFieldsHelper({ data, companyIds }) {
//     const mapDataForCustomerSearch = mapBusinessCustomerSearch({ data });
//     const getCustomerData = await getBusinessCustomerByFields({ data: mapDataForCustomerSearch, companyIds });
//     return getCustomerData;
// }

// async function getBusinessCustomerByFieldsHandler(options) {
//     return baseHandler(getBusinessCustomerByFieldsHelper, options);
// }

// // ============================== Update business customer basic info details. ================================//

// async function updateBusinessCustomerBasicInfoHelper({ data, companyIds }) {
//     const getBusinessCustData = await getBusinessCustomerById({ data, companyIds });
//     if (_isEmpty(getBusinessCustData)) {
//         const err = new CustomError(400, 'Business Customer Does Not Exists');
//         throw err;
//     }
//     const basicInfoDetails = mapBasicInfoDataForBusinessCustomer({ reqData: data });
//     const mergeBasicInfoData = _merge(getBusinessCustData[0], basicInfoDetails);
//     const updatedBasicInfoDetails = await updateBusinessCustomerData({ data, setDataFields: mergeBasicInfoData, companyIds });
//     return updatedBasicInfoDetails;
// }

// async function updateBusinessCustomerBasicInfoHandler(options) {
//     return baseHandler(updateBusinessCustomerBasicInfoHelper, options);
// }

// // =============================== Update business customer banking details ===========================================//

// async function updateBusinessCustomerBankingDetailsHelper({ data, companyIds }) {
//     const getBusinessCustomerData = await getBusinessCustomerById({ data, companyIds });
//     if (_isEmpty(getBusinessCustomerData)) {
//         const err = new CustomError(400, 'Business Customer Does Not Exists');
//         throw err;
//     }
//     // check array data from database and reqData before merging
//     const mergedBankingDetailsFromReqAndRes = checkArrAndMerge({
//         dataFromDb: _get(getBusinessCustomerData, '[0].bankingDetailInfo.bankDetails'),
//         dataFromReq: _get(data, 'bankingDetailInfo.bankDetails'),
//     });
//     // map bank details array with req object remaining details
//     const updatedReqDataForMerging = mapBankingDetailsDataForUpdatingBusinessCustomer({
//         reqData: data,
//         mergedData: mergedBankingDetailsFromReqAndRes,
//     });
//     // merge data coming from database and request object.
//     const mergeBasicInfoData = _merge(getBusinessCustomerData[0], updatedReqDataForMerging);
//     const updatedBasicInfoDetails = await updateBusinessCustomerData({ data, setDataFields: mergeBasicInfoData, companyIds });
//     return updatedBasicInfoDetails;
// }

// async function updateBusinessCustomerBankingDetailsHandler(options) {
//     return baseHandler(updateBusinessCustomerBankingDetailsHelper, options);
// }

// // ================================== Update or Create Site Info ========================================//

// async function updateBusinessCustomerSiteInfoHelper({ data, companyIds }) {
//     const getBusinessCustomerData = await getBusinessCustomerById({ data, companyIds });
//     if (_isEmpty(getBusinessCustomerData)) {
//         const err = new CustomError(400, 'Business Customer Does Not Exists');
//         throw err;
//     }
//     // check array data from database and reqData before merging
//     const mergedSiteInfoFromReqAndRes = checkArrAndMerge({
//         dataFromDb: _get(getBusinessCustomerData, '[0].siteInfo'),
//         dataFromReq: _get(data, 'siteInfo'),
//     });

//     // map bank details array with req object remaining details
//     const updatedReqDataForMerging = mapSiteInfoDataForUpdatingBusinessCustomer({
//         reqData: data,
//         mergedSiteData: mergedSiteInfoFromReqAndRes,
//     });
//     // merge data coming from database and request object.
//     const mergeBasicInfoData = _merge(getBusinessCustomerData[0], updatedReqDataForMerging);
//     const updatedBasicInfoDetails = await updateBusinessCustomerData({ data, setDataFields: mergeBasicInfoData, companyIds });
//     return updatedBasicInfoDetails;
// }

// async function updateBusinessCustomerSiteInfoHandler(options) {
//     return baseHandler(updateBusinessCustomerSiteInfoHelper, options);
// }

// // ================================== Update or Create Company Info ========================================//

// async function updateBusinessCustomerCompanyInfoHelper({ data, companyIds }) {
//     const getBusinessCustomerData = await getBusinessCustomerById({ data, companyIds });
//     if (_isEmpty(getBusinessCustomerData)) {
//         const err = new CustomError(400, 'Business Customer Does Not Exists');
//         throw err;
//     }
//     // check contact array data from database and reqData before merging
//     const mergedContactDetailsFromReqAndRes = checkArrAndMerge({
//         dataFromDb: _get(getBusinessCustomerData, '[0].companyInfo.contactNumbers'),
//         dataFromReq: _get(data, 'companyInfo.contactNumbers'),
//     });
//     // check emial array data from database and reqData before merging
//     const mergedEmailDetailsFromReqAndRes = checkArrAndMerge({
//         dataFromDb: _get(getBusinessCustomerData, '[0].companyInfo.emailAddresses'),
//         dataFromReq: _get(data, 'companyInfo.emailAddresses'),
//     });
//     // map company info array with req object remaining details
//     const updatedReqDataForMerging = mapCompanyInfoDataForUpdatingBusinessCustomer({
//         reqData: data,
//         mergedContactData: mergedContactDetailsFromReqAndRes,
//         mergedEmailData: mergedEmailDetailsFromReqAndRes,
//     });
//     // merge data coming from database and request object.
//     const mergeBasicInfoData = _merge(getBusinessCustomerData[0], updatedReqDataForMerging);
//     const updatedCompanyInfoDetails = await updateBusinessCustomerData({ data, setDataFields: mergeBasicInfoData, companyIds });
//     return updatedCompanyInfoDetails;
// }

// async function updateBusinessCustomerCompanyInfoHandler(options) {
//     return baseHandler(updateBusinessCustomerCompanyInfoHelper, options);
// }

// // ============================ Update Status to In Approval =================================//

// async function sendForApprovalHelper({ data, companyIds }) {
//     const updatedStatusData = await updateBusinessCustomerData({ data, setDataFields: { businessCustomerStatus: 1 }, companyIds });
//     return updatedStatusData;
// }

// async function sendForApprovalHandler(options) {
//     return baseHandler(sendForApprovalHelper, options);
// }

// export default createBusinessCustomerHandler;
// export {
//     createBusinessCustomerHandler,
//     getBusinessCustomerHandler,
//     updateBusinessCustomerBasicInfoHandler,
//     updateBusinessCustomerBankingDetailsHandler,
//     updateBusinessCustomerSiteInfoHandler,
//     updateBusinessCustomerCompanyInfoHandler,
//     getBusinessCustomerByFieldsHandler,
//     sendForApprovalHandler,
// };
