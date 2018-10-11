import { get as _get } from 'lodash';
import * as baseCtrl from '../../../private/base-controller';
import { paypalIframeHandler } from '../../handlers/payments/paymentsHandler';

// No validations just dump the successful data
const makePaymentIframe = (req, res, next) => {
    const { body } = req;
    baseCtrl.postAsync(res, next, async () => {
        const paymentData = await paypalIframeHandler({
            data: body,
        });
        const result = { content: paymentData };
        return result;
    });
};

export default makePaymentIframe;
export { makePaymentIframe };
