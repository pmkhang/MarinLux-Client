import axiosConfig from '../configs/axiosConfig';
import axios from 'axios';

export const apiBooking = async (data) => {
   const token = JSON.parse(localStorage.getItem('auth'))?.token;
   try {
      if (token) {
         const response = await axiosConfig({
            method: 'post',
            url: '/v1/bookings',
            headers: {
               Authorization: `Bearer ${token}`,
            },
            data,
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

export const apiBookingDateByYacht = async (id) => {
   try {
      const response = await axiosConfig({
         method: 'get',
         url: '/v1/bookings/date/' + id,
      });
      if (response?.data?.status) {
         return response;
      }
   } catch (error) {
      console.log(error);
      throw error;
   }
};

export const apiPaymentStatus = async (id) => {
   const token = JSON.parse(localStorage.getItem('auth'))?.token;

   try {
      const response = await axiosConfig({
         method: 'get',
         url: '/v1/bookings/payment-status/' + id,
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      if (response?.data?.status) {
         return response;
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

export const apiBookingsByUser = async () => {
   const token = JSON.parse(localStorage.getItem('auth'))?.token;

   try {
      const response = await axiosConfig({
         method: 'get',
         url: '/v1/bookings/',
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });

      if (response?.data?.status) {
         return response;
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

export const apiGetBookingById = async (id) => {
   const token = JSON.parse(localStorage.getItem('auth'))?.token;

   try {
      const response = await axiosConfig({
         method: 'get',
         url: '/v1/bookings/' + id,
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      if (response?.data?.status) {
         return response;
      }
   } catch (error) {
      console.log(error);
      throw error;
   }
};

export const apiFeedback = async (data, id) => {
   const token = JSON.parse(localStorage.getItem('auth'))?.token;

   try {
      const response = await axiosConfig({
         method: 'post',
         url: '/v1/bookings/feedback/' + id,
         headers: {
            Authorization: `Bearer ${token}`,
         },
         data,
      });
      if (response?.data?.status) {
         return response;
      }
   } catch (error) {
      console.log(error);
      throw error;
   }
};

export const apiGetFeedback = async (id) => {
   try {
      const response = await axiosConfig({
         method: 'get',
         url: '/v1/bookings/feedback/' + id,
      });
      if (response?.data?.status) {
         return response;
      }
   } catch (error) {
      console.log(error);
      throw error;
   }
};
