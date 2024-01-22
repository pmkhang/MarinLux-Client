import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setBookingByUser } from '../redux/Slice/AppStateSlice';
import { apiBookingsByUser } from '../services/bookingService';

const UserBooking = () => {
   const { isLoggedIn } = useSelector((state) => state.auth);
   const { bookingsByUser } = useSelector((state) => state.appState);
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const isLogin = JSON.parse(localStorage.getItem('auth'))?.isLogin;

   useEffect(() => {
      if (!isLogin) {
         navigate('/');
      }
   }, [isLoggedIn, isLogin, navigate]);

   useEffect(() => {
      const getBooking = async () => {
         try {
            const response = await apiBookingsByUser();
            if (response?.data.status) {
               dispatch(setBookingByUser(response?.data?.bookings));
            }
         } catch (error) {
            console.log(error);
         }
      };
      isLoggedIn ? getBooking() : '';
   }, [dispatch, isLoggedIn, navigate]);

   return (
      <div className="w-full flex flex-col items-center  py-10 min-h-[500px] bg-[#F4F2ED]">
         <div className="max-w-[1400px] w-full">
            <div className="flex flex-col relative px-3">
               <span className="font-['Inconsolata'] text-[13px] tl:text-center uppercase text-[#BFA888]">
                  Beloved Customer
               </span>
               <h2 className="font-['Cormorant_Upright'] text-[63px] tl:text-center font-bold uppercase text-[#000]">
                  All Bookings
               </h2>
               <span className="absolute font-['Cormorant_Upright']  text-[115px] font-bold uppercase text-[#BFA888] opacity-[0.13] top-[-30px] left-[-20px] tl:hidden">
                  Explore
               </span>
            </div>
         </div>
         {bookingsByUser.length > 0 && (
            <div className="max-w-[1400px] w-full mt-10 px-3">
               <table className="w-full border-collapse">
                  <tbody className="flex flex-col gap-3">
                     {bookingsByUser.map((i) => (
                        <tr
                           key={i?.id}
                           className="flex items-center justify-between py-[18px] px-[20px] shadow bg-[#d8ceb3]"
                        >
                           <td className="flex-1 mr-10">
                              <b className="mr-2">Booking code:</b> {i?.id}
                           </td>
                           <td className="flex-1">
                              <b className="mr-2">Start Date:</b> {i?.startDate}
                           </td>
                           <td className="flex-1">
                              <b className="mr-2">End Date:</b> {i?.endDate}
                           </td>
                           <td className="flex-1">
                              <b className="mr-2">Status:</b>
                              <i>
                                 {i?.admin_approval_status === 1
                                    ? 'Processing'
                                    : i?.admin_approval_status === 2
                                    ? 'Processed'
                                    : 'Canceled'}
                              </i>
                           </td>
                           <td>
                              <Link to={'/my-booking/' + i?.id} className="p-2 bg-[#595448] text-white">
                                 View detail
                              </Link>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         )}
      </div>
   );
};

export default UserBooking;
