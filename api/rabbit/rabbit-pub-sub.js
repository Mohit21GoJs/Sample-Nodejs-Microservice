// import { get as _get } from 'lodash';
// import { publishConnectionMap } from 'aob-rabbit-wrapper';
// import { logInfo } from 'aob-logger-wrapper';
// import MESSAGE_CODES from '../../private/log-message-codes';
// import CONSTANTS from '../vars/constants';
// import { updateProfileStatusHandler } from './subscriber/customers-sub';

// const getRabbitExchangeToPublish = exchangeName => publishConnectionMap.get(exchangeName);

// // publish events to rabbit.
// const publishingEvents = (({ rabbitEventInfo, rabbitEvent }) => {
//     const ex = getRabbitExchangeToPublish(_get(rabbitEventInfo, 'exchangeName'));
//     ex.publish(_get(rabbitEventInfo, 'routingKey'), rabbitEvent, {}, (data) => {
//         logInfo({
//             code: MESSAGE_CODES.appResponseCode,
//             message: `Event Published To Exchange: ${_get(rabbitEventInfo, 'exchangeName')} RoutingKey: ${_get(rabbitEventInfo, 'routingKey')} `,
//             data,
//         });
//     });
// });

// const subscribingQueue = (msg) => {
//     console.log('<<<------Message From Subscribing Queue------>>>', JSON.stringify(msg));
//     // type CUSTOMER_APPROVAL is for Customer or Business Customer Approval Status.
//     if (_get(msg, 'type') === _get(CONSTANTS, 'customerAndBusinessCustomerTaskApprovalEvent')) {
//         logInfo({
//             code: MESSAGE_CODES.appResponseCode,
//             message: `Message Received For Type: ${_get(msg, 'type')} `,
//             msg,
//         });
//         (async () => {
//             await updateProfileStatusHandler(msg);
//         })();
//     }
// };

// export {
//     publishingEvents,
//     subscribingQueue,
// };
