
import { get as httpClientGet, post as httpClientPost, patch as httpClientPatch } from '../../../private/http-client';
import { makeUrl } from '../../helpers/commonUtil';
import { securityService } from '../../vars/appSettings';

// @TODO: move to util helper by making dynamic value
/*
A memoized function for concatenating the urls to avoid the concatenation during every request
*/
const urlGenerator = () => {
    const cache = {};
    return (relativeUrl) => {
        if (cache[relativeUrl]) {
            return cache[relativeUrl];
        }
        const value = makeUrl(securityService, [relativeUrl]);
        cache[relativeUrl] = value;
        return value;
    };
};

const memoizedUrlGenerator = urlGenerator();

const generatedUrls = {
    postUserLogin: () => memoizedUrlGenerator('/user/login'),
    findUser: () => memoizedUrlGenerator('/user/search'),
    findUsers: () => memoizedUrlGenerator('/user/search/batch'),
    searchUser: () => memoizedUrlGenerator('/user/search'),
    getRoleData: () => memoizedUrlGenerator('/roles/search'),
    postUserData: () => memoizedUrlGenerator('/user/create'),
    forgetToken: () => memoizedUrlGenerator('/forget/token'),
};

const postUserLoginDataAdaptor = ({ headers = [], body }) => httpClientPost(generatedUrls.postUserLogin(), body, headers);

const findUserDataAdaptor = ({ headers = [], body }) => httpClientPost(generatedUrls.findUser(), body, headers);

const getUsersListAdaptor = ({ headers = [], body }) => httpClientPost(generatedUrls.findUsers(), body, headers);

const searchUser = ({ headers = [], body }) => httpClientPost(generatedUrls.searchUser(), body, headers);

const getRoleDataAdaptor = ({ headers = [], body }) => httpClientPost(generatedUrls.getRoleData(), body, headers);

const createUser = ({ headers = [], body }) => httpClientPost(generatedUrls.postUserData(), body, headers);

const getForgetTokenAdaptor = ({ headers = [], body }) => httpClientPost(generatedUrls.forgetToken(), body, headers);

export {
    postUserLoginDataAdaptor,
    findUserDataAdaptor,
    getUsersListAdaptor,
    searchUser,
    getRoleDataAdaptor,
    createUser,
    getForgetTokenAdaptor,
};
