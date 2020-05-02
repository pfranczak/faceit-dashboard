import * as axios from 'axios';

const API_URL = 'https://open.faceit.com/data/v4/';
const SERVER_URL = process.env.VUE_APP_server;

const DEFAULT_HEADERS = {
    Authorization: `Bearer ${process.env.VUE_APP_FACEIT_KEY}`
};

const DEFAULT_PARAMS = {
    offset: 0,
    limit: 20
};

export const getDataFromEndpoint = (endpoint, params) => {
    return axios.get(API_URL + endpoint,
        {
            headers: DEFAULT_HEADERS,
            params: {...DEFAULT_PARAMS, ...params}
        });
};

export const getDataFromEndpointWithoutParams = (endpoint) => {
    return axios.get(API_URL + endpoint,
        {
            headers: DEFAULT_HEADERS
        });
};


export const getDataFromServer = (endpoint) => {
    return axios.get(SERVER_URL + endpoint, { withCredentials: true });
};

export const postDataToServer = (endpoint) => {
    return axios.post(SERVER_URL + endpoint, { withCredentials: true });
};
