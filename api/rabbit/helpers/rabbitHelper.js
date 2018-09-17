import { find as _find } from 'lodash';
import { logInfo } from 'aob-logger-wrapper';
import { eventPublisherList } from '../../vars/appSettings';
import { publishingEvents } from '../rabbit-pub-sub';
import MESSAGE_CODES from '../../../private/log-message-codes';

const eventMappingForPublishingEvent = ((event, key) => {
    const eventDetails = _find(eventPublisherList, { exchangeName: key });
    logInfo({
        code: MESSAGE_CODES.appResponseCode,
        message: `Sending event to publishEvents with eventDetails: ${JSON.stringify(eventDetails)} and Event: ${JSON.stringify(event)}`,
    });
    publishingEvents({ rabbitEventInfo: eventDetails, rabbitEvent: event });
});

export default eventMappingForPublishingEvent;
export { eventMappingForPublishingEvent };

