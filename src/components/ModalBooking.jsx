/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setBookingId } from '../redux/Slice/AppStateSlice';
import { apiBooking } from '../services/bookingService';
import { apiPayment } from '../services/paymentService';

const ModalBooking = ({ setShowBooking }) => {
   const { booking, locations } = useSelector((state) => state.appState);
   const { yacht } = useSelector((state) => state.yachts);
   const [isLoading, setIsLoading] = useState(false);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const openPaymentWindow = (paymentLink) => {
      const newWindow = window.open(paymentLink, 'Popup_Window', 'width=800,height=1000');
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
         toast.error('Your browser has blocked popups, please allow popups');
         console.error('Popup blocked or not opened');
      }
   };

   const confirmAndPay = async () => {
      try {
         setIsLoading(true);
         const response = await apiBooking(booking);
         const status = response?.data?.status;
         if (status === 'error') {
            toast.error('Sorry, this date has already been booked');
         } else if (status) {
            const payment = await apiPayment({ deposit: booking?.deposit }, response?.data?.bookingId);
            if (payment?.data?.status) {
               const paymentLink = payment?.data?.linkPaypal;
               openPaymentWindow(paymentLink);
            }
            dispatch(setBookingId(response?.data?.bookingId));
            navigate(`/payment/${response.data.bookingId}`);
         }
      } catch (error) {
         console.error('Error during payment process:', error);
         toast.error('An error occurred during the payment process. Please try again later.');
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <div
         className="fixed flex items-center justify-center top-0 bottom-0 right-0 left-0 px-5 backdrop-blur bg-[#1f1f1f9e]"
         onClick={(e) => {
            e.stopPropagation();
            setShowBooking(false);
         }}
      >
         <div
            onClick={(e) => {
               e.stopPropagation();
               setShowBooking(true);
            }}
            className="max-w-[1200px] w-full h-fit bg-[#fffaf5] shadow-lg flex mb:flex-col mb:max-h-[600px] mb:mt-20 overflow-y-scroll mb-[100px]"
         >
            <div className="w-2/3 tl:w-1/2 mb:w-full p-5 flex flex-col justify-between border-r">
               <h3 className="text-3xl font-bold text-center ">Confirm Booking</h3>
               <div className="flex flex-col gap-6 mt-10 text-lg font-medium pb-[100px] px-3">
                  <div className="flex items-center justify-between border-b">
                     <span>Yacht name:</span>
                     <span>{yacht?.name}</span>
                  </div>
                  <div className="flex items-center justify-between border-b">
                     <span>Location:</span>
                     <span>{locations?.find((loca) => loca?.id == yacht?.location_id)?.name}</span>
                  </div>
                  <div className="flex items-center justify-between border-b">
                     <span>Start date:</span>
                     <span>{booking?.startDate}</span>
                  </div>
                  <div className="flex items-center justify-between border-b">
                     <span>End date:</span>
                     <span>{booking?.endDate}</span>
                  </div>
                  <div className="flex items-center justify-between border-b">
                     <span>Guests quantity:</span>
                     <span>{booking?.guests}</span>
                  </div>
               </div>
               <button
                  onClick={(e) => {
                     e.stopPropagation();
                     setShowBooking(false);
                  }}
                  className="w-[150px] flex items-center justify-center p-2 bg-black text-[#FFF] mb:w-full"
               >
                  Cancel
               </button>
            </div>
            <div className="w-1/3 tl:w-1/2 mb:w-full p-5 flex flex-col border-r">
               <h3 className="text-3xl font-bold text-center ">Fee Detail</h3>
               <div className="flex flex-col gap-3 mt-10  font-medium pb-[100px] px-3">
                  <div className="flex items-center justify-between border-b border-slate-200">
                     <span>Charter yacht fee:</span>
                     <span>${yacht?.price_per_day}/day</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-200">
                     <span>Total Charter yacht fee:</span>
                     <span>${booking?.charter}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-200">
                     <span>
                        Service fee <i className="text-sm">(*15%)</i>:
                     </span>
                     <span>${booking?.service}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-200">
                     <span>
                        Tax <i className="text-sm">(*7%)</i>:
                     </span>
                     <span>${booking?.tax}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-200">
                     <span>Insurance :</span>
                     <span>${booking?.insurance}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-200 text-xl font-bold">
                     <span>Total:</span>
                     <span>${booking?.total}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-200 text-xl font-bold">
                     <span>Deposit:</span>
                     <span>${booking?.deposit}</span>
                  </div>
                  <div>
                     <p className="text-[14px] italic">* Insurance fee: $50/guest/day</p>
                     <p className="text-[14px] italic">
                        * We will refund <b>${booking?.refund_amount}</b> when you complete the trip
                     </p>
                  </div>
               </div>
               <div className="flex flex-col items-center justify-center mb-5 gap-2">
                  <img src="/assets/images/logoPaypal.png" className="w-[120px] " alt="paypal" />
                  <div className="flex items-center gap-5">
                     <img src="/assets/images/logo-master.png" className="w-[50px] " alt="paypal" />
                     <img src="/assets/images/logo-visa.png" className="w-[50px] " alt="paypal" />
                  </div>
               </div>
               {isLoading ? (
                  <button
                     disabled
                     type="button"
                     className="w-full py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100  inline-flex items-center justify-center"
                  >
                     <svg
                        aria-hidden="true"
                        role="status"
                        className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path
                           d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                           fill="currentColor"
                        />
                        <path
                           d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                           fill="#1C64F2"
                        />
                     </svg>
                     Loading...
                  </button>
               ) : (
                  <button
                     onClick={(e) => {
                        e.stopPropagation();
                        confirmAndPay();
                     }}
                     className="w-full my-0 mx-auto flex items-center justify-center p-2 bg-[#BFA888] text-[#FFF]"
                  >
                     Confirm & Pay
                  </button>
               )}
            </div>
         </div>
      </div>
   );
};

export default ModalBooking;
