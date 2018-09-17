// import { get as _get } from 'lodash';
// import { UserLoginData } from '../entities/inbound';
// import { cleanEntityData } from '../../../helpers/commonUtil';
// import UserRegistration, { ForgetData } from '../entities/outbound';

// const mapReqDataUser = reqData => new UserLoginData({
//     email: _get(reqData, 'email'),
//     password: _get(reqData, 'password'),
//     domainUrl: _get(reqData, 'domainUrl'),
// });

// const mapDataForResponse = ({ data }) => cleanEntityData({
//     content: data,
//     message: 'Ok',
// });

// // @TODO: make this password generic.
// const mapBusinessCustomerForUser = ({ data, companyId, role }) => new UserRegistration({
//     firstName: `${_get(data, 'firstName')} ${_get(data, 'lastName')}`,
//     email: _get(data, 'email'),
//     companyId,
//     roleId: role,
// });

// const mapForgetData = ({ data }) => new ForgetData({
//     email: _get(data, 'email'),
//     domainUrl: _get(data, 'domainUrl'),
// });

// export {
//     mapReqDataUser,
//     mapDataForResponse,
//     mapBusinessCustomerForUser,
//     mapForgetData,
// };
