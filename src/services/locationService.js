import axiosConfig from '../configs/axiosConfig';

export const apiGetLocations = async () => {
   try {
      const response = await axiosConfig({
         method: 'get',
         url: '/v1/locations',
      });
      if (response?.data?.status) {
         return response;
      }
   } catch (error) {
      console.log(error);
      throw error;
   }
};
