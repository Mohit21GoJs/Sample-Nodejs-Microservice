import 'babel-polyfill';
import { get as _get, map as _map } from 'lodash';
import * as baseServer from './private/base-server';
import * as mongoConnect from './private/mongoose-connect';
import mapApplicationSettings from './api/helpers/appSettingsMapper';
import * as config from './config/config';
import * as appSettings from './api/vars/appSettings';
import * as packageFile from './package.json';
import { subscribingQueue } from './api/rabbit/rabbit-pub-sub';
// import { dateOffset } from './api/helpers/dateUtil';

try {
  const options = {
    port: config.port,
    appRoot: __dirname,
    // authExemptedRoutes: ['/deposit', '/callback', '/subscribetonewsletter'],
    appName: config.appName,
    applicationSettingsPath: config.globalAppSettings,
    serviceSettingsPath: config.serviceSettings,
    configSettingMapper: mapApplicationSettings,
    packageFile,
    logFilePath: config.logFilePath,
    // uiLogFilePath: config.uiLogFilePath,
  };

  const rabbitOptions = () => ({
    host: appSettings.messageHost,
    port: appSettings.messagePort,
    login: appSettings.messageLogin,
    password: appSettings.messagePassword,
    connectionTimeout: appSettings.connectionTimeout,
    authMechanism: 'AMQPLAIN',
    vhost: '/',
    noDelay: true,
    ssl: { enabled: false },
  });

  const implOpts = {
      reconnect: { strategy: 'constant', initial: 1000 },
      reconnectBackoffStrategy: 'exponential',
      reconnectBackoffTime: 500,
  };

  const startupProcess = () => new Promise((resolve) => {
    resolve();
  });

  // set all the subscriber list in the subscriberNotationMap map data structure.
  const setSubscriberKeyForReceivingMessages = (eventSubscriberList, optionCpy) => {
    const subscriberNotationMap = new Map();
    _map(eventSubscriberList, (subscriberDetail) => {
      const queueRoutingConcat = `${_get(subscriberDetail, 'queueName')}, ${_get(subscriberDetail, 'routingKey')}`;
      subscriberNotationMap.set(queueRoutingConcat, subscribingQueue);
    });
    optionCpy.subscriberNotationMap = subscriberNotationMap;
  };

  baseServer.loadConfigSettings(options).then(() => {
    options.enableLogSrc = appSettings.enableLogSrcFlag;
    options.logSeverity = appSettings.logSeverity;
    options.passOnRequestHeaders = appSettings.passOnRequestHeaders;
    options.allExemptedRoutes = _get(appSettings, 'exemptedRoutes');
    options.publicKey = _get(appSettings, 'publicKey');
    options.createRabbit = true;
    options.rabbitOpts = rabbitOptions();
    options.rabbitImplOpts = implOpts;
    options.eventPublisherList = appSettings.eventPublisherList;
    options.eventSubscriberList = appSettings.eventSubscriberList;
    setSubscriberKeyForReceivingMessages(options.eventSubscriberList, options); // set keys with queue and routing name
    const dbProtocol = _get(appSettings, 'dbProtocol');
    const dbHost = _get(appSettings, 'dbHost');
    const dbPort = _get(appSettings, 'dbPort');
    const dbName = _get(appSettings, 'dbName');


    mongoConnect.connectMongo({
      mongoUrl: `${dbProtocol}://${dbHost}:${dbPort}/${dbName}`, newUrlParser: { useNewUrlParser: true },
    }).then(() => {
      console.log('Mongoose connected to ', `${dbProtocol}://${dbHost}:${dbPort}/${dbName}`);
      // now start server
      baseServer.createServer(options, startupProcess);
    })
      .catch((err) => {
        console.error('mongo not connected', err);
        process.exit(1);
      });
  }).catch((err) => {
    console.log('error', err);
    throw err;
  });
} catch (err) {
  console.log('error', err);
  throw err;
}

