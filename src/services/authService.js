import axiosConfig from '../configs/axiosConfig';
import axios from 'axios';

export const apiRegister = async (payload) => {
   try {
      const response = await axiosConfig({
         method: 'post',
         url: '/auth/register',
         data: payload,
      });
      if (response.data.status) {
         return response;
      }
   } catch (error) {
      throw error?.response?.data;
   }
};

export const apiLogin = async (payload) => {
   try {
      const response = await axiosConfig({
         method: 'post',
         url: '/auth/login',
         data: payload,
      });
      if (response?.data?.status) {
         const authData = {
            isLogin: true,
            token: response.data.token,
         };
         localStorage.setItem('auth', JSON.stringify(authData));
         axios.defaults.headers.common['Authorization'] = `Bearer ${authData.token}`;
         return response;
      }
   } catch (error) {
      throw error?.response?.data;
   }
};

export const apiLogout = async () => {
   const token = JSON.parse(localStorage.getItem('auth'))?.token;
   try {
      const response = await axiosConfig({
         method: 'get',
         url: '/auth/logout',
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      if (response?.data?.status) {
         const authData = {
            isLogin: false,
            token: '',
         };
         localStorage.setItem('auth', JSON.stringify(authData));
         axios.defaults.headers.common['Authorization'] = '';
         return response;
      }
   } catch (error) {
      if (error.response.status === 401) {
         const authData = {
            isLogin: false,
            token: '',
         };
         localStorage.setItem('auth', JSON.stringify(authData));
         axios.defaults.headers.common['Authorization'] = '';
      }
      throw error;
   }
};

export const apiGetProfile = async () => {
   const token = JSON.parse(localStorage.getItem('auth'))?.token;
   try {
      if (token) {
         const response = await axiosConfig({
            method: 'get',
            url: '/auth/profile',
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });
         if (response?.data?.status) {
            return response;
         }
      }
   } catch (error) {
      if (error?.response?.status === 401) {
         const authData = {
            isLogin: false,
            token: '',
         };
         localStorage.setItem('auth', JSON.stringify(authData));
         axios.defaults.headers.common['Authorization'] = '';
      }
      throw error;
   }
};

export const apiChangePassword = async (data) => {
   const token = JSON.parse(localStorage.getItem('auth'))?.token;
   try {
      if (token) {
         const response = await axiosConfig({
            method: 'put',
            url: '/auth/change-password',
            headers: {
               Authorization: `Bearer ${token}`,
            },
            data,
         });
         console.log(response);
         if (response?.data?.status) {
            return response;
         }
      }
   } catch (error) {
      if (error?.response?.status === 401) {
         const authData = {
            isLogin: false,
            token: '',
         };
         localStorage.setItem('auth', JSON.stringify(authData));
         axios.defaults.headers.common['Authorization'] = '';
      }
      throw error;
   }
};
