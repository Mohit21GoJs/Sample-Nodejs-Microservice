import fs from 'fs';
import mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';
import { assign as _assign, find as _find, map as _map, last as _last, get as _get, flow as _flow } from 'lodash';
import cleanDeep from 'clean-deep';
import path from 'path';
import util from 'util';
import joinUrl from 'url-join';
import { basePathForTemplates } from '../vars/appSettings';
import CONSTANTS from '../vars/constants';

// Convert fs.readFile into Promise version of same
const promisifiedReadFile = util.promisify(fs.readFile);

const mapFilePath = ({ data }) => path.join(basePathForTemplates, data);

const safeObjectId = (stringId) => {
    const objectId = mongoose.Types.ObjectId.isValid(stringId) ? new mongoose.Types.ObjectId(stringId) : undefined;
    return objectId;
};

const createCompanyIdQuery = (companyIds) => {
    // convert every id into the objectId.
    const companyIdArr = _map(companyIds, companyId => safeObjectId(companyId));
    const query = { companyId: { $in: companyIdArr } };
    return query;
};

const cleanEntityData = (data) => {
    let cleanData = {};
    try {
        cleanData = cleanDeep(data);
    } catch (e) {
        // log error
    }
    return cleanData;
};

const makeUrl = (baseUrl, [...relativeUrl]) => {
    let relUrl;
    if (relativeUrl && relativeUrl.length) {
        relUrl = relativeUrl.join('/');
    }
    const url = baseUrl ? joinUrl(baseUrl, relUrl) : joinUrl(relUrl);
    return url;
};

const findConditonForCompanyId = companyIds => createCompanyIdQuery(companyIds);

const findConditonForUserCompanyId = (companyId) => {
    const qry = { companyId: safeObjectId(companyId) };
    return qry;
};

const checkArrAndMerge = ({ dataFromDb = [], dataFromReq }) => {
    const merged = _map(dataFromDb, item => _assign(item, _find(dataFromReq, ['_id', item._id.toString()])));
    const newArr = dataFromReq.filter(data => !data._id).map((data) => { return { ...data, ...{ _id: mongoose.Types.ObjectId() } }; });
    const latestArr = [...merged, ...newArr];
    return latestArr;
};

const outcomeStatus = ({ currentOutcome }) => {
    switch (currentOutcome) {
        case 'POSITIVE':
            return CONSTANTS.customerStatus.APPROVED;
        default:
            return CONSTANTS.customerStatus.REJECTED;
    }
};

const makeCustomHeadersComingFromOtherService = ({ authData }) => {
    const authorization = _last(authData);
    let authToken = authorization;
    [, authToken] = authorization.split(' ');
    const tokenPayload = jwt.decode(authToken);
    const headers = [
        {
            name: 'authorization',
            value: authorization,
        },
        {
            name: 'content-type',
            value: 'application/json',
        },
    ];
    const tokenData = {
        customHeaders: headers,
        payloadData: tokenPayload,
    };
    return tokenData;
};

export {
    promisifiedReadFile,
    makeUrl,
    mapFilePath,
    cleanEntityData,
    findConditonForCompanyId,
    findConditonForUserCompanyId,
    safeObjectId,
    checkArrAndMerge,
    outcomeStatus,
    makeCustomHeadersComingFromOtherService,
};
