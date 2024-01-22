import axios from 'axios';

const instance = axios.create({
   baseURL: 'https://marinlux-server.up.railway.app/api',
   headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
   },
});

// Add a request interceptor
instance.interceptors.request.use(
   (config) => {
      return config;
   },
   (error) => {
      return Promise.reject(error);
   },
);

export default instance;
