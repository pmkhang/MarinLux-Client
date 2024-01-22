import axiosConfig from '../configs/axiosConfig';

export const apiGetCategories = async () => {
   try {
      const response = await axiosConfig({
         method: 'get',
         url: '/v1/categories',
      });
      if (response?.data?.status) {
         return response;
      }
   } catch (error) {
      console.log(error);
      throw error;
   }
};
