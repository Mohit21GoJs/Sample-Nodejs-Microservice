import Joi from 'joi';
import CustomError from '../../../private/custom-error';
import MESSAGES from '../../vars/messages';


export const makePaymentFromAcceptMethodSchema = Joi.object().keys({
    amount: Joi.number().strict(true).positive().required()
        .error(new CustomError(400, 'Amount must be positive number')),
    currency: Joi.string().required().error(new CustomError(400,'Currency is required')),
    paymentTerms: Joi.string().required()
        .error(new CustomError(400, 'Payment terms must be provided')),
    paymentMethod: Joi.string().required()
        .error(new CustomError(400, 'Payment terms must be provided')),
    paymentReceiver: Joi.object().keys({
        id: Joi.string().required().error(new CustomError(400, 'Payment receiver id not provided')),
        name: Joi.string().required().error(new CustomError(400, 'Payment receiver name not provided')),
    }).error(new CustomError(400,'Invalid Payment Receiver Object')),
    payer: Joi.object().keys({
        id: Joi.string().required().error(new CustomError(400, 'Payer id not provided')),
        name: Joi.string().required().error(new CustomError(400, 'Payer name not provided')),
    }).error(new CustomError(400, 'Invalid Payer Object')),
    opaqueData: Joi.object().keys({
        dataDescriptor: Joi.string().required().error(new CustomError(400, 'Data Descriptor must be provided')),
        dataValue: Joi.string().required().error(new CustomError(400, 'Data Value must be provided')),
    }).error(new CustomError(400, 'Invalid Opaque Data Object')),
}).required();

export default {
    makePaymentFromAcceptMethodSchema,
};
