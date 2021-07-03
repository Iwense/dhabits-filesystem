import axios from 'axios'
import cookie from './cookieService';

const defaultOptions = {
    baseURL:'http://localhost:5000/',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  };


export const api = axios.create(defaultOptions)

api.interceptors.request.use(function (config) {
    const token = cookie.get('token');
    config.headers.Authorization =  token ? `Bearer ${token?.access}` : '';
    return config;
});


export default api