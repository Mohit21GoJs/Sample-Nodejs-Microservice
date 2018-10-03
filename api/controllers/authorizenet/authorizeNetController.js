import { get as _get } from 'lodash';
import * as baseCtrl from '../../../private/base-controller';
import { validateDataBySchema } from '../../../private/joi-validatation-wrapper';
import { makePaymentFromAcceptMethodSchema } from './authorizeNetControllerSchema';
import { authorizeNetHandler, authorizeNetHelperWithoutCompanyId } from '../../handlers/payments/paymentsHandler';

const makePaymentFromAcceptMethod = (req, res, next) => {
    const { body, payload } = req;
    const userCompanyId = _get(payload, 'userCompanyId');
    baseCtrl.postAsync(res, next, async () => {
        await validateDataBySchema(body, makePaymentFromAcceptMethodSchema);
        const paymentData = await authorizeNetHandler({
            data: body,
            companyId: userCompanyId,
            headers: req.customHeaders,
        });
        const result = { content: paymentData };
        return result;
    });
};

const makePaymentFromAcceptMethodWithoutCompanyId = (req, res, next) => {
    const { body } = req;
    baseCtrl.postAsync(res, next, async () => {
        await validateDataBySchema(body, makePaymentFromAcceptMethodSchema);
        const paymentData = await authorizeNetHelperWithoutCompanyId({
            data: body,
            headers: req.customHeaders,
        });
        const result = { content: paymentData };
        return result;
    });
};

export default makePaymentFromAcceptMethod;
export { makePaymentFromAcceptMethod, makePaymentFromAcceptMethodWithoutCompanyId };
