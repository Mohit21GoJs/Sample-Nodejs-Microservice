// import { get as _get, isEmpty as _isEmpty } from 'lodash';
// import { findBusinessCustomer, createBusinessCustomer, updateBusinessCustomer } from '../../models/businessCustomers/businessCustomerSchema';
// import { mapDataForBusinessCust } from '../../service/businessCutomers/mappers/inbound';

// async function findDataForBusinessCustomer({ reqData, userCompanyId }) {
//     try {
//         const qryFields = { 'basicInfo.email': reqData, ...userCompanyId };
//         const matchedData = await findBusinessCustomer({ qryFields });
//         return matchedData;
//     } catch (err) {
//         return err;
//     }
// }

// async function registerBusinessCustomer({ data, userCompanyId }) {
//     try {
//         const mapDataForRegistringBusinessCustomer = mapDataForBusinessCust({ data, userCompanyId });
//         const createdData = await createBusinessCustomer({ data: mapDataForRegistringBusinessCustomer });
//         return createdData;
//     } catch (err) {
//         return err;
//     }
// }

// async function getBusinessCustomer({ data, companyIds }) {
//     try {
//         const qry = _isEmpty(_get(data, 'ids')) ? companyIds : { _id: { $in: _get(data, 'ids') }, ...companyIds };
//         const businessCustData = await findBusinessCustomer({ qryFields: qry });
//         return businessCustData;
//     } catch (err) {
//         return err;
//     }
// }

// async function getBusinessCustomerById({ data, companyIds }) {
//     try {
//         const qry = { _id: _get(data, '_id'), ...companyIds };
//         const businessCustData = await findBusinessCustomer({ qryFields: qry });
//         return businessCustData;
//     } catch (err) {
//         return err;
//     }
// }

// async function updateBusinessCustomerData({ data, setDataFields, companyIds }) {
//     try {
//         const qry = { _id: _get(data, '_id'), ...companyIds };
//         const setFields = { $set: setDataFields };
//         const updatedData = await updateBusinessCustomer({ qryFields: qry, setFields });
//         return updatedData;
//     } catch (err) {
//         return err;
//     }
// }

// async function getBusinessCustomerByFields({ data, companyIds }) {
//     try {
//         const qry = { ...data, ...companyIds };
//         const customerData = await findBusinessCustomer({ qryFields: qry });
//         return customerData;
//     } catch (err) {
//         return err;
//     }
// }

// export {
//     registerBusinessCustomer,
//     findDataForBusinessCustomer,
//     getBusinessCustomer,
//     getBusinessCustomerById,
//     updateBusinessCustomerData,
//     getBusinessCustomerByFields,
// };
