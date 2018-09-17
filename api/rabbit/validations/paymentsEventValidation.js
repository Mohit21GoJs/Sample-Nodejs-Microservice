// import Joi from 'joi';
// import CustomError from '../../../private/custom-error';
// import MESSAGES from '../../vars/messages';

// // @TODO: Change asssignedTo validation after implementing all flows.
// const businessCustomerApprovalEventData = Joi.object().keys({
//     type: Joi.number().positive().integer().required()
//         .error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} type.`)),
//     taskDescription: Joi.string().required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} Task Description.`)),
//     entityId: Joi.string().required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} Entity Id.`)),
//     role: Joi.string().required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} Role.`)),
//     company: Joi.string().required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} Assigne To.`)),
//     assignedTo: Joi.string().allow('').optional(),
// });

// const businessCustomerEmailEventData = Joi.object().keys({
//     type: Joi.string().required()
//         .error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} type.`)),
//     firstName: Joi.string().required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} FirstName.`)),
//     middleName: Joi.string().allow('').optional(),
//     lastName: Joi.string().required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} LastName.`)),
//     designation: Joi.string().required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} Designation.`)),
//     companyName: Joi.string().required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} Company Name.`)),
//     email: Joi.string().email().required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} Email.`)),
//     confirmationUrl: Joi.string().required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} ConfirmationUrl.`)),
//     company: Joi.string().required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} Company.`)),
// });

// const businessCustomerRegistrationStatusEventData = Joi.object().keys({
//     type: Joi.string().required()
//         .error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} type.`)),
//     firstName: Joi.string().required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} FirstName.`)),
//     registrationStatus: Joi.number().integer().required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} registrationStatus.`)),
//     middleName: Joi.string().allow('').optional(),
//     lastName: Joi.string().required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} LastName.`)),
//     designation: Joi.string().required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} Designation.`)),
//     companyName: Joi.string().required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} Company Name.`)),
//     email: Joi.string().email().required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} Email.`)),
//     companyId: Joi.string().required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} Company.`)),
//     userName: Joi.string().required().error(new CustomError(400, `${MESSAGES.JOI_VALIDATION_MESSAGE} userName.`)),
// });

// export default businessCustomerApprovalEventData;
// export {
//     businessCustomerApprovalEventData,
//     businessCustomerEmailEventData,
//     businessCustomerRegistrationStatusEventData,
// };
