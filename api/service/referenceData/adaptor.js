import { get as httpClientGet } from '../../../private/http-client';
import { memoizedUrlGenerator } from '../../helpers/commonUtil';
import { referenceDataService } from '../../vars/appSettings';

const createMemoizedGenerator = memoizedUrlGenerator(__dirname);

const generatedUrls = {
    retrieveConfigsByCompanyId: companyId => createMemoizedGenerator(referenceDataService, `/configuration/company/${companyId}`),
};

export const getCompanyConfigs = ({ headers = [], companyId }) => httpClientGet(generatedUrls.retrieveConfigsByCompanyId(companyId), headers);


export default {
    getCompanyConfigs,
};
