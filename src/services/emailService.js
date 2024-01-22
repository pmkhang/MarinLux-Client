import axiosConfig from '../configs/axiosConfig';


export const apiSendEmailBooking = async (link, id) => {
   try {
      const response = await axiosConfig({
         method: 'post',
         url: `/email/booking/${id}`,
         data: { link },
      });
      if (response?.data?.status) {
         return response;
      }
   } catch (error) {
      console.log(error);
      throw error;
   }
};
