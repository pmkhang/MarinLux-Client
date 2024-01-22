import axiosConfig from '../configs/axiosConfig';

export const apiContact = async (data) => {
   try {
      const response = await axiosConfig({
         method: 'post',
         url: `/v1/contact`,
         data,
      });
      console.log(response);
      if (response?.data?.status) {
         return response;
      }
   } catch (error) {
      console.log(error);
      throw error;
   }
};
