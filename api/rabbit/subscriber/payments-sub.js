// import { get as _get } from 'lodash';
// import { logInfo } from 'aob-logger-wrapper';
// import MESSAGE_CODES from '../../../private/log-message-codes';
// import { findConditonForCompanyId, outcomeStatus, makeCustomHeadersComingFromOtherService } from '../../helpers/commonUtil';
// import { getRoleDataAdaptor } from '../../service/iam/iamAdaptor';
// import baseHandler from '../../../private/base-handler';
// import CONSTANTS from '../../vars/constants';
// import { updateCustomerData } from '../../dbQueryBuilder/customers/customers';
// import { updateBusinessCustomerData } from '../../dbQueryBuilder/businessCustomers/businessCustomers';
// import { sendCustomerRegistrationStatusEventHandler } from '../publisher/customer-pub';
// import { sendBusinessCustomerRegistrationStatusEventHandler } from '../publisher/businessCustomer-pub';

// // -------------------------------------- Update Customer Status For Customer ------------------------------------------//

// async function updateProfileStatusForCustomerHelper({ reqData, tokenPayload }) {
//     const companyIds = findConditonForCompanyId(_get(tokenPayload, 'companyIds'));
//     const outcome = outcomeStatus({ currentOutcome: _get(reqData, 'outcome') });
//     const data = { _id: _get(reqData, 'entityId') };
//     const setDataFields = { customerStatus: outcome };
//     const updatedStatus = await updateCustomerData({ data, setDataFields, companyIds });
//     logInfo({
//         code: MESSAGE_CODES.appResponseCode,
//         message: `Customer Updated Successfully with status ${outcome}`,
//     });
//     sendCustomerRegistrationStatusEventHandler({ customerData: updatedStatus, registrationStatus: outcome  });
//     return updatedStatus;
// }

// async function updateProfileStatusForCustomerHandler(options) {
//     return baseHandler(updateProfileStatusForCustomerHelper, options);
// }

// // --------------------------- Update Business Customer Status For Customer -------------------------------------//

// async function updateProfileStatusForBusinessCustomerHelper({ reqData, tokenPayload }) {
//     const companyIds = findConditonForCompanyId(_get(tokenPayload, 'companyIds'));
//     const outcome = outcomeStatus({ currentOutcome: _get(reqData, 'outcome') });
//     const data = { _id: _get(reqData, 'entityId') };
//     const setDataFields = { businessCustomerStatus: outcome };
//     const updatedStatus = await updateBusinessCustomerData({ data, setDataFields, companyIds });
//     logInfo({
//         code: MESSAGE_CODES.appResponseCode,
//         message: `Business Customer Updated Successfully with status ${outcome}`,
//     });
//     sendBusinessCustomerRegistrationStatusEventHandler({ customerData: updatedStatus, registrationStatus: outcome  });
//     return updatedStatus;
// }

// async function updateProfileStatusForBusinessCustomerHandler(options) {
//     return baseHandler(updateProfileStatusForBusinessCustomerHelper, options);
// }

// // ---------------------------- Check Role & On The Basis of Role Update Status ---------------------------------//

// async function updateProfileStatusHelper(reqData) {
//     const headersData = makeCustomHeadersComingFromOtherService({ authData: _get(reqData,  'metadata.authorization') });
//     const getRoleDataFromId = await getRoleDataAdaptor({ body: { id: _get(reqData, 'roleId') }, headers: _get(headersData, 'customHeaders') });
//     const roleData = _get(getRoleDataFromId, 'data.[0].name');
//     if (roleData === CONSTANTS.businessCustomerRole) {
//         await updateProfileStatusForBusinessCustomerHandler({ reqData, tokenPayload: _get(headersData, 'payloadData') });
//     } else if (roleData === CONSTANTS.customerRole) {
//         await updateProfileStatusForCustomerHandler({ reqData, tokenPayload: _get(headersData, 'payloadData') });
//     }
// }

// async function updateProfileStatusHandler(options) {
//     return baseHandler(updateProfileStatusHelper, options);
// }

// export default updateProfileStatusHandler;
// export { updateProfileStatusHandler };
