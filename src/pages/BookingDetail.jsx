import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { LoaddingScreen } from '../components';
import { apiGetBookingById, apiGetFeedback } from '../services/bookingService';
import { apiGetLocations } from '../services/locationService';
import { apiGetYacht } from '../services/yachtService';
import formatDateAndTime from '../utils/dateFormat';

const BookingDetail = () => {
   const [booking, setBooking] = useState([]);
   const [feedback, setFeedback] = useState([]);
   const [isFeedback, setIsFeedback] = useState(false);
   const [loadding, setLoadding] = useState(false);
   const [yacht, setYacht] = useState([]);
   const [locations, setLocations] = useState([]);
   const { id } = useParams();
   const isLogin = JSON.parse(localStorage.getItem('auth'))?.isLogin;
   const navigate = useNavigate();

   useEffect(() => {
      const getLocations = async () => {
         try {
            const response = await apiGetLocations();
            if (response?.data?.status) setLocations(response?.data?.locations);
         } catch (error) {
            console.log(error);
         }
      };
      getLocations();
   }, []);

   useEffect(() => {
      if (booking?.yacht_id) {
         const getYachtdata = async () => {
            try {
               setLoadding(true);
               const response = await apiGetYacht(booking?.yacht_id);
               if (response?.data?.status) setYacht(response?.data?.yacht);
            } catch (error) {
               console.log(error);
            } finally {
               setLoadding(false);
            }
         };
         getYachtdata();
      }
   }, [booking?.yacht_id]);

   useEffect(() => {
      if (!isLogin) {
         navigate('/login');
      }
   }, [isLogin, navigate]);

   useEffect(() => {
      const getBookingDetails = async () => {
         try {
            setLoadding(true);
            const response = await apiGetBookingById(id);
            if (response?.data?.status) {
               setBooking(response?.data?.booking);
            }
            const feedback = await apiGetFeedback(id);
            if (feedback?.data?.status) {
               setFeedback(feedback?.data?.feedbacks);
            }
         } catch (error) {
            if (error?.response?.status === 404) {
               navigate('/not-found-404');
            }
         } finally {
            setLoadding(false);
         }
      };
      if (isLogin) getBookingDetails();
   }, [id, isLogin, navigate]);

   useEffect(() => {
      const currentDate = new Date();
      const endDateTime = new Date(booking?.endDate);
      if (currentDate > endDateTime) {
         setIsFeedback(true);
      }
   }, [booking?.endDate]);

   return (
      <>
         {loadding && <LoaddingScreen />}
         {!loadding && (
            <div className="w-full flex flex-col items-center  py-10 min-h-[500px] bg-[#F4F2ED]">
               <div className="max-w-[1400px] w-full px-3">
                  <h3 className=" font-bold">
                     Booking status:
                     <i className="ml-10 text-lg">
                        {booking?.admin_approval_status === 1
                           ? 'Processing'
                           : booking?.admin_approval_status === 2
                           ? 'Processed'
                           : 'Canceled'}
                     </i>
                  </h3>
                  <h3 className=" font-bold">
                     Booking create date:
                     <i className="ml-10 text-lg">{formatDateAndTime(booking?.created_at)}</i>
                  </h3>
                  <div className="mt-5 flex pb-10">
                     <table className="w-full flex tl:flex-col justify-between gap-10">
                        <tbody className="flex-1 flex flex-col gap-4">
                           <tr className="flex items-center justify-between border-b border-[#CCC]">
                              <td className="font-bold">Booking code: </td>
                              <td>{booking?.id}</td>
                           </tr>
                           <tr className="flex items-center justify-between border-b border-[#CCC]">
                              <td className="font-bold">Yacht: </td>
                              <td>
                                 <Link className="font-bold hover:text-[#9a6a37]" to={'/detail-yatch/' + yacht?.id}>
                                    {yacht?.name}
                                 </Link>
                              </td>
                           </tr>
                           <tr className="flex items-center justify-between border-b border-[#CCC]">
                              <td className="font-bold">Location: </td>
                              <td>{locations?.find((i) => i?.id === booking?.location)?.name}</td>
                           </tr>
                           <tr className="flex items-center justify-between border-b border-[#CCC]">
                              <td className="font-bold">Start Date: </td>
                              <td className="font-bold">{booking?.startDate}</td>
                           </tr>
                           <tr className="flex items-center justify-between border-b border-[#CCC]">
                              <td className="font-bold">End Date: </td>
                              <td className="font-bold">{booking?.endDate}</td>
                           </tr>
                           <tr className="flex items-center justify-between border-b border-[#CCC]">
                              <td className="font-bold">Guests: </td>
                              <td>{booking?.guests}</td>
                           </tr>
                           <tr className="flex items-center justify-between border-b border-[#CCC]">
                              <td className="font-bold">Payment status: </td>
                              <td>
                                 {booking?.payment_status === 2
                                    ? 'Processed'
                                    : booking?.payment_status === 1
                                    ? 'Processing'
                                    : 'Canceled'}
                              </td>
                           </tr>
                           <tr className="flex items-center justify-between border-b border-[#CCC]">
                              <td className="font-bold">Refund status: </td>
                              <td>
                                 {booking?.refund_status === 1
                                    ? 'No process'
                                    : booking?.refund_status === 2
                                    ? 'Processing'
                                    : 'Processed'}
                              </td>
                           </tr>
                        </tbody>
                        <tbody className="flex-1 flex flex-col gap-4">
                           <tr className="flex items-center justify-between border-b border-[#CCC]">
                              <td className="font-bold">Charter total: </td>
                              <td>${booking?.booking_fee?.charter}</td>
                           </tr>
                           <tr className="flex items-center justify-between border-b border-[#CCC]">
                              <td className="font-bold">Service fee: </td>
                              <td>${booking?.booking_fee?.service}</td>
                           </tr>
                           <tr className="flex items-center justify-between border-b border-[#CCC]">
                              <td className="font-bold">Tax fee: </td>
                              <td>${booking?.booking_fee?.tax}</td>
                           </tr>
                           <tr className="flex items-center justify-between border-b border-[#CCC]">
                              <td className="font-bold">Insurance fee: </td>
                              <td>${booking?.booking_fee?.insurance}</td>
                           </tr>
                           <tr className="flex items-center justify-between border-b border-[#CCC]">
                              <td className="font-bold">Total: </td>
                              <td className="font-bold">${booking?.booking_fee?.total}</td>
                           </tr>
                           <tr className="flex items-center justify-between border-b border-[#CCC]">
                              <td className="font-bold">Deposit: </td>
                              <td className="font-bold">
                                 {booking?.payment_status === 3 ? '$0' : '$' + booking?.booking_fee?.deposit}
                              </td>
                           </tr>
                           <tr className="flex items-center justify-between border-b border-[#CCC]">
                              <td className="font-bold">Refund amount:</td>
                              <td className="font-bold">
                                 {booking?.payment_status === 3 ? '$0' : '$' + booking?.booking_fee?.refund_amount}
                              </td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
                  {feedback.length > 0 &&
                     feedback.map((i) => (
                        <div key={i?.id}>
                           <h3 className="font-['Cormorant_Upright'] uppercase text-[40px] font-bold">My feedback</h3>
                           <div className="flex flex-col w-full">
                              <p className="font-medium">
                                 <i className="ml-1 text-lg uppercase">Title: {i?.title}</i> -
                                 <i className="ml-1">{formatDateAndTime(i?.created_at)}</i>
                              </p>
                              <span>Feedback: {i?.feedback}</span>
                           </div>
                        </div>
                     ))}
                  {isFeedback && feedback.length <= 0 && (
                     <button
                        className="w-1/3 mt-3 bg-[#BFA888] transition-all p-3 text-white font-['Inconsolata'] hover:bg-white hover:text-black"
                        onClick={() => {
                           navigate('/feedback/' + booking?.id);
                        }}
                     >
                        Feedback here
                     </button>
                  )}
                  <div className="mt-10 border-2 border-[#a6a4a0] p-3">
                     <h2 className="font-bold py-2">Important Notice Regarding Booking Cancellation</h2>
                     <p className="italic">
                        We appreciate your recent booking with us and value your choice to stay with US. We understand
                        that plans may change, and we strive to provide you with the best possible service.
                     </p>
                     <h2 className="font-bold py-2">1. Cancellation Timeframe:</h2>
                     <p className="italic">
                        If you cancel your booking more than 3 days before the scheduled start date, a full refund of
                        100% will be processed.
                     </p>
                     <p className="italic">
                        If you cancel your booking within 3 days of the scheduled start date, a cancellation fee of 33%
                        of the total booking amount will be applied.
                     </p>

                     <h2 className="font-bold py-2">2. Refund Process:</h2>
                     <p className="italic">
                        Refunds for cancellations made at least 3 days before the start date will be processed in full.
                     </p>
                     <p className="italic">
                        For cancellations made within 3 days of the start date, a refund of 67% of the total booking
                        amount will be processed.
                     </p>

                     <h2 className="font-bold py-2">3. Cancellation Procedure:</h2>
                     <p className="italic">
                        To cancel your booking, please log in to your account on our website or contact our customer
                        service team at <strong>Support@marinlux.com</strong>.
                     </p>

                     <h2 className="font-bold py-2">Important Note:</h2>
                     <p className="italic">
                        Any changes to your booking must be made before the scheduled start date to avoid cancellation
                        fees.
                     </p>
                     <p className="italic mt-2">
                        We understand that unforeseen circumstances may arise, and we appreciate your understanding of
                        our cancellation policy. If you have any questions or need further assistance, feel free to
                        reach out to our customer service team.
                     </p>
                  </div>
               </div>
            </div>
         )}
      </>
   );
};

export default BookingDetail;
