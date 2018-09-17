// import { find as _find, get as _get } from 'lodash';
// import { logInfo } from 'aob-logger-wrapper';
// import CONSTANTS from '../../vars/constants';
// import { eventMappingForPublishingEvent } from '../helpers/rabbitHelper';
// import MESSAGE_CODES from '../../../private/log-message-codes';
// import { mapDataForBusinessCustomerApproval, mapDataForBusinessCustomerEmailing, mapBusinessCustomerRegistrationStatusEvent } from '../service/businessCustomers/mappers/outbound';
// import { validateDataBySchema } from '../../../private/joi-validatation-wrapper';
// import baseHandler from '../../../private/base-handler';
// import { businessCustomerApprovalEventData, businessCustomerEmailEventData, businessCustomerRegistrationStatusEventData } from '../validations/businessCustEventValidation';

// // ----------------------- Send Approval Event For Business Customer -----------------------------------------//

// async function sendBusinessCustomerForApprovalEventHelper({ businessCustomerData, tokenPayload }) {
//     const businessCustomerRole = _find(_get(tokenPayload, 'roleId'), ['name', CONSTANTS.businessCustomerRole]);
//     const eventData = mapDataForBusinessCustomerApproval({ reqData: businessCustomerData, roleData: businessCustomerRole });
//     await validateDataBySchema(eventData, businessCustomerApprovalEventData);
//     logInfo({
//         code: MESSAGE_CODES.appResponseCode,
//         message: `Sending event For Business Customer Approval with Event: ${JSON.stringify(eventData)}`,
//     });
//     eventMappingForPublishingEvent(eventData, CONSTANTS.customerExchange);
// }

// async function sendBusinessCustomerForApprovalEventHandler(options) {
//     return baseHandler(sendBusinessCustomerForApprovalEventHelper, options);
// }

// // ----------------------- Send Event To Notification Service For Emailing -----------------------------------------//

// async function sendBusinessCustomerForNotificationHelper({ businessCustomerData, tokenPayload, domain }) {
//     const confirmationUrl = `${domain}/customer/#/confirmation/?token=${_get(businessCustomerData, 'userDetail.data.registerToken')}`;
//     const eventData = mapDataForBusinessCustomerEmailing({ reqData: businessCustomerData, confirmationUrl });
//     await validateDataBySchema(eventData, businessCustomerEmailEventData);
//     logInfo({
//         code: MESSAGE_CODES.appResponseCode,
//         message: `Sending event For Business Customer Emails with Event: ${JSON.stringify(eventData)}`,
//     });
//     eventMappingForPublishingEvent(eventData, CONSTANTS.customerCreateEmailExchange);
// }

// async function sendBusinessCustomerForNotificationHandler(options) {
//     return baseHandler(sendBusinessCustomerForNotificationHelper, options);
// }

// // ---------------------- Send Event For Registration Status ------------

// async function sendBusinessCustomerRegistrationStatusEventHelper({ customerData, registrationStatus }) {
//     const eventData = mapBusinessCustomerRegistrationStatusEvent(customerData, registrationStatus);
//     await validateDataBySchema(eventData, businessCustomerRegistrationStatusEventData);
//     logInfo({
//         code: MESSAGE_CODES.appResponseCode,
//         message: `Sending event of Business Customer Registration Status: ${JSON.stringify(eventData)}`,
//     });
//     eventMappingForPublishingEvent(eventData, CONSTANTS.customerCreateEmailExchange);
// }

// async function sendBusinessCustomerRegistrationStatusEventHandler(options) {
//     return baseHandler(sendBusinessCustomerRegistrationStatusEventHelper, options);
// }

// export default sendBusinessCustomerForApprovalEventHandler;
// export {
//     sendBusinessCustomerForApprovalEventHandler,
//     sendBusinessCustomerForNotificationHandler,
//     sendBusinessCustomerRegistrationStatusEventHandler,
// };

