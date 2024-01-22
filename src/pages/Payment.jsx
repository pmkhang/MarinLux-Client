import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import CountdownComponent from '../components/CountdownComponent';
import { apiPaymentStatus } from '../services/bookingService';
import { apiSendEmailBooking } from '../services/emailService';

const Payment = () => {
   const [isSuccess, setIsSuccess] = useState(false);
   const [isCancel, setIsCancel] = useState(false);
   const [isPending, setIsPending] = useState(true);
   const [isActive, setIsActive] = useState(false);
   const { booking_id } = useSelector((state) => state.appState);
   const navigate = useNavigate();
   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);

   useEffect(() => {
      const intervalId = setInterval(() => {
         const getPaymentStatus = async () => {
            try {
               const response = await apiPaymentStatus(booking_id);
               const paymentStatus = response?.data?.paymentStatus;
               setIsPending(paymentStatus === 1);
               setIsSuccess(paymentStatus === 2);
               setIsCancel(paymentStatus === 3);
            } catch (error) {
               console.error(error);
            }
         };
         getPaymentStatus();
      }, 5000);
      return () => clearInterval(intervalId);
   }, [booking_id]);

   useEffect(() => {
      const sendEmailBooking = async () => {
         try {
            const link = `https://marinlux.up.railway.app/my-booking/${booking_id}`;
            await apiSendEmailBooking(link, booking_id);
         } catch (error) {
            console.log(error);
         }
      };
      if (isSuccess) {
         sendEmailBooking();
      }
   }, [booking_id, isSuccess]);

   useEffect(() => {
      if (isActive && isSuccess) {
         navigate(`/my-booking/${booking_id}`);
      }
      if (isActive && isCancel) {
         navigate(`/my-booking`);
      }
   }, [booking_id, isActive, isCancel, isSuccess, navigate]);

   return (
      <>
         {booking_id ? (
            <div className="w-full min-h-[800px] flex flex-col items-center bg-[#fffaf5] p-10 mb:p-3">
               <h3 className="font-['Cormorant_Upright'] font-bold text-[50px] mb:text-[30px] text-center  uppercase">
                  Payment for yacht booking
               </h3>
               {isPending && (
                  <div className="flex flex-col justify-center items-center mt-20 gap-12">
                     <div className="rounded-full h-20 w-20 bg-[#cdb9a0] animate-ping" />
                     <h3 className="mt-5 font-['Cormorant_Upright'] uppercase text-[30px] ">
                        Payment is being processed
                     </h3>
                  </div>
               )}
               {isSuccess && (
                  <div className="flex flex-col justify-center items-center mt-20 gap-12">
                     <img src="/assets/images/check.png" alt="check" className="h-20 w-20 animate-ping" />
                     <h3 className="mt-5 font-['Cormorant_Upright'] uppercase text-[30px] ">
                        Payment processing successful
                     </h3>
                     <CountdownComponent setIsActive={setIsActive} color={'green'} />
                  </div>
               )}
               {isCancel && (
                  <div className="flex flex-col justify-center items-center mt-20 gap-12">
                     <img src="/assets/images/cross.png" alt="cross" className="h-20 w-20 animate-ping" />
                     <h3 className="mt-5 font-['Cormorant_Upright'] uppercase text-[30px] ">
                        Payment processing failed
                     </h3>
                     <CountdownComponent setIsActive={setIsActive} color={'red'} />
                  </div>
               )}
            </div>
         ) : (
            <Navigate to="/not-found-404" />
         )}
      </>
   );
};

export default Payment;
