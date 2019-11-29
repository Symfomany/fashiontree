/** @format */

import axios from 'axios';
import config from '../config/index';

const xhr = axios.create({
  baseURL: config.url,
});

// Add a response interceptor
xhr.interceptors.response.use(
  response =>
    // Do something with response data
    response,
  error => {
    // Do something with response error
    return Promise.reject(error);
  },
);

export default xhr;
