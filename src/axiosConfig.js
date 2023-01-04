import axios from 'axios';
import {baseURL} from './config';

const instance = axios.create({
  // .. where we make our configurations
  baseURL: baseURL,
});

// instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';
// axios.defaults.headers.post['Content-Type'] = 'application/json';

instance.interceptors.request.use(
  request => {
    // Edit request config
    return request;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  response => {
    // Edit response config
    return response;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  },
);

export default instance;
