import axiosConfig from '../configs/axiosConfig';

export const apiPayment = async (data, id) => {
   try {
      const response = await axiosConfig({
         method: 'post',
         url: `/paypal/${id}`,
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
