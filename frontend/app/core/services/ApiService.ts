import axios, {
  AxiosRequestConfig as AxiosRequestConfigFromAxios,
} from 'axios';
//services
import UserService from './UserService';
//config
import Config from '../config';

export interface AxiosRequestConfig extends AxiosRequestConfigFromAxios {}

const Points = {
  REGISTER: 'register',
  LOGIN: 'authenticate',
  FORGOTPASSWORD: '',
  RESETPASSWORD: '',
  ACCOUNTS: 'accounts',
  ALL_ACCOUNTS: 'all_users_accounts',
  CATEGORIES: 'categories',
  TRANSACTIONS: 'transactions',
  STATS_EXPEDINTURES: 'stats/expenditures/',
  STATS_INCOMES: 'stats/incomes/',
  CHANGE_PASSWORD: 'api/users/change_password/',
  RECEIPT: 'api/receipts/',
};

const request = axios.create({
  baseURL: Config.API_BASE_URL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
});

request.interceptors.request.use(
  config => {
    const userData = UserService.getUserData();
    const { token } = userData;
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }
    if (config.url) {
      const url = config.url.split('/');
      if (url[url.length - 1] === 'token') {
        delete config.headers.Authorization;
      }
    }
    console.log('conf', config);
    return config;
  },
  error => Promise.reject(error)
);

export default {
  request,
  Points,
};
