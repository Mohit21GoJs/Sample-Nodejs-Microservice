// import { get as _get } from 'lodash';
// import CONSTANTS from '../../../../vars/constants';
// import { TaskApprovalBusinessCustomer, EmailForBusinessCustomer, RegistrationStatusEmailForBusinessCustomer } from '../entities/outbound';

// const mapDataForBusinessCustomerApproval = ({ reqData, roleData }) => new TaskApprovalBusinessCustomer({
//     type: CONSTANTS.BusinessCustomerTaskApprovalEvent,
//     taskDescription: `Business Customer Approval For ${_get(reqData, 'basicInfo.firstName')} ${_get(reqData, 'basicInfo.lastName')}`,
//     id: _get(reqData, '_id').toString(),
//     roleId: _get(roleData, '_id'),
//     companyId: _get(reqData, 'companyId').toString(),
//     assignedTo: '',
// });

// const mapDataForBusinessCustomerEmailing = ({ reqData, confirmationUrl }) => new EmailForBusinessCustomer({
//     type: CONSTANTS.businessCustomerRegistrationEvent,
//     middleName: _get(reqData, 'businessCustomerData.basicInfo.middleName'),
//     firstName: _get(reqData, 'businessCustomerData.basicInfo.firstName'),
//     lastName: _get(reqData, 'businessCustomerData.basicInfo.lastName'),
//     designation: _get(reqData, 'businessCustomerData.basicInfo.designation'),
//     companyName: _get(reqData, 'businessCustomerData.basicInfo.companyName'),
//     email: _get(reqData, 'businessCustomerData.basicInfo.email'),
//     confirmationUrl,
//     password: _get(reqData, 'mapDataForCreatingUser.password'),
//     companyId: _get(reqData, 'mapDataForCreatingUser.companyId').toString(),
// });

// const mapBusinessCustomerRegistrationStatusEvent = (reqData, outcome) => new RegistrationStatusEmailForBusinessCustomer({
//     type: CONSTANTS.businessCustomerRegistrationStatusEvent,
//     registrationStatus: outcome,
//     firstName: _get(reqData, 'basicInfo.firstName'),
//     middleName: _get(reqData, 'basicInfo.middleName'),
//     lastName: _get(reqData, 'basicInfo.lastName'),
//     designation: _get(reqData, 'basicInfo.designation'),
//     companyName: _get(reqData, 'basicInfo.companyName'),
//     email: _get(reqData, 'basicInfo.email'),
//     companyId: _get(reqData, 'companyId').toString(),
//     userName: _get(reqData, 'basicInfo.email'),
// });

// export default mapDataForBusinessCustomerApproval;
// export {
//     mapDataForBusinessCustomerApproval,
//     mapDataForBusinessCustomerEmailing,
//     mapBusinessCustomerRegistrationStatusEvent,
// };
