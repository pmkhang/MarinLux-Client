import axiosConfig from '../configs/axiosConfig';

export const apiGetYachts = async (query, page = 1) => {
   try {
      const response = await axiosConfig({
         method: 'post',
         url: `/v1/yachts?page=${page}`,
         data: query,
      });
      if (response?.data?.status) {
         return response;
      }
   } catch (error) {
      console.log(error);
      throw error;
   }
};

export const apiGetYacht = async (id) => {
   try {
      const response = await axiosConfig({
         method: 'get',
         url: `/v1/yachts/${id}`,
      });
      if (response?.data?.status) {
         return response;
      }
   } catch (error) {
      console.log(error);
      throw error;
   }
};

export const apiGetYachtFeedback = async (id) => {
   try {
      const response = await axiosConfig({
         method: 'get',
         url: `/v1/yachts/feedback/${id}`,
      });
      if (response?.data?.status) {
         return response;
      }
   } catch (error) {
      console.log(error);
      throw error;
   }
};
