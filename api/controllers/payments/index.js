import * as baseCtrl from '../../../private/base-controller';
import { getPayment } from '../../models/payments/paymentsSchema';

/* eslint no-param-reassign: ["error", { "props": false }] */
const getPayments = (req, res, next) => {
        const { transactionIds } = req.body;
        baseCtrl.postAsync(res, next, async () => {
            const paymentData = await  getPayment({ transactionId: { $in: transactionIds } });
            const result = { content: paymentData };
            return result;
        });
};

export default getPayments;
export { getPayments };

