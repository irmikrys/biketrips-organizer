import axios from 'axios';

const setupAxiosInterceptors = onUnauthenticated => {
  const onRequestSuccess = config => {
    const token = localStorage.getItem('authentication-token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    config.timeout = 10000;
    return config;
  };
  const onResponseSuccess = (response) => response;
  const onResponseError = error => {
    if (error.status === 403) {
      localStorage.removeItem('authentication-token');
      onUnauthenticated();
    }
    return Promise.reject(error);
  };
  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export {
  setupAxiosInterceptors
};
