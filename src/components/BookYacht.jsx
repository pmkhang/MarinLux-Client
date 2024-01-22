/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Datepicker from 'react-tailwindcss-datepicker';
import { setBooking } from '../redux/Slice/AppStateSlice';
import { apiBookingDateByYacht } from '../services/bookingService';
import FeeDetail from './FeeDetail';
import SelectGuests from './SelectGuests';

const BookYacht = ({ setShowModal, crewNumber, yachtId, price, setShowBooking, location }) => {
   const [bookingDate, setBookingDate] = useState({
      startDate: '',
      endDate: '',
   });
   const { startDate, endDate } = bookingDate;
   const [validDate, setValidDate] = useState(false);
   const [submitted, setSubmitted] = useState(false);
   const [guests, setGuests] = useState(1);
   const [quantityDate, setQuantityDate] = useState(0);
   const [charter, setCharter] = useState(0);
   const [service, setService] = useState(0);
   const [tax, setTax] = useState(0);
   const [insurance, setInsurance] = useState(0);
   const [total, setTotal] = useState(0);
   const [deposit, setDeposit] = useState(0);
   const [refundAmount, setRefundAmount] = useState(0);
   const [scheduledDate, setScheduledDate] = useState([
      {
         startDate: '',
         endDate: '',
      },
   ]);
   const { id } = useParams();
   const { userData } = useSelector((state) => state.auth);
   const { isLoggedIn } = useSelector((state) => state.auth);

   const dataBooking = {
      userId: userData?.id,
      yachtId,
      startDate,
      endDate,
      guests,
      charter,
      service,
      tax,
      insurance,
      total,
      deposit,
      refund_amount: refundAmount,
      location,
   };

   const dispatch = useDispatch();
   useEffect(() => {
      const calculatedCharter = price * quantityDate;
      const calculatedService = calculatedCharter * 0.15;
      const calculatedTax = (calculatedService + calculatedCharter) * 0.07;
      const calculatedInsurance = 50 * guests * quantityDate;
      const calculatedTotal = calculatedCharter + calculatedService + calculatedTax + calculatedInsurance;
      const calculatedDeposit = calculatedTotal * 3;
      const calculatedRefundAmount = calculatedDeposit - calculatedTotal;

      setCharter(calculatedCharter.toFixed(2));
      setService(calculatedService.toFixed(2));
      setTax(calculatedTax.toFixed(2));
      setInsurance(calculatedInsurance.toFixed(2));
      setTotal(calculatedTotal.toFixed(2));
      setDeposit(calculatedDeposit.toFixed(2));
      setRefundAmount(calculatedRefundAmount.toFixed(2));
   }, [quantityDate, guests, price]);

   useEffect(() => {
      const isValidDate = startDate !== '' && endDate !== '' && startDate !== null && endDate !== null;
      setValidDate(isValidDate);
   }, [bookingDate, endDate, startDate]);

   const handleSelectChange = (event) => {
      const value = event.target.value;
      setGuests(value);
   };

   const submit = async () => {
      setSubmitted(true);
      if (validDate) {
         setShowBooking(true);
         dispatch(setBooking(dataBooking));
      } else {
         console.log('Invalid booking date');
      }
   };

   const handleValueChange = (newValue) => {
      setBookingDate(newValue);
      if (newValue.startDate && newValue.endDate) {
         const startDateObj = new Date(newValue.startDate + 'T00:00:00Z');
         const endDateObj = new Date(newValue.endDate + 'T00:00:00Z');
         const timeDifference = endDateObj.getTime() - startDateObj.getTime();
         const daysDifference = timeDifference / (1000 * 3600 * 24);

         setQuantityDate(daysDifference + 1);
      } else {
         setQuantityDate(null);
      }
   };

   useEffect(() => {
      if (id) {
         const getDateBooking = async () => {
            try {
               const response = await apiBookingDateByYacht(id);
               if (response?.data?.status) {
                  const bookingDates = response?.data?.bookingDate;
                  if (bookingDates && bookingDates.length > 0) {
                     const updatedBookingDates = bookingDates.map((bookingDate) => {
                        const endDate = new Date(bookingDate.endDate);
                        endDate.setDate(endDate.getDate() + 2);
                        const formattedEndDate = endDate.toISOString().split('T')[0];
                        return {
                           startDate: bookingDate.startDate,
                           endDate: formattedEndDate,
                        };
                     });
                     setScheduledDate(updatedBookingDates);
                  }
               }
            } catch (error) {
               console.log(error);
            }
         };
         getDateBooking();
      }
   }, [id]);

   return (
      <div className="w-[350px] ml-[84px] mb-3 p-3 bg-[#F4F2ED] tl:w-full tl:ml-0 tl:mb-0">
         <h3 className="text-center font-['Cormorant_Upright'] font-bold text-3xl my-2">BOOK YACHT</h3>
         <div className="my-3 flex flex-col gap-3 font-['Inconsolata']">
            <div className="flex flex-col gap-2 ">
               <label className="px-2 uppercase font-medium ">Check In - Check Out:</label>
               <Datepicker
                  value={bookingDate}
                  onChange={handleValueChange}
                  displayFormat="MMM-DD-YYYY"
                  inputClassName={'bg-[#feebd7] p-2 cursor-pointer'}
                  primaryColor="amber"
                  minDate={new Date()}
                  disabledDates={scheduledDate}
                  readOnly
               />
               {submitted && !validDate && (
                  <span className="text-red-500 text-sm">You need to choose check-in and check-out dates</span>
               )}
            </div>
            <SelectGuests crewNumber={crewNumber} guests={guests} handleSelectChange={handleSelectChange} />
            <FeeDetail
               price={price}
               charter={charter}
               service={service}
               tax={tax}
               insurance={insurance}
               total={total}
               deposit={deposit}
               refundAmount={refundAmount}
            />
            {!isLoggedIn ? (
               <span
                  onClick={() => setShowModal(true)}
                  className="w-full cursor-pointer my-0 mx-auto flex items-center justify-center p-2 bg-[#BFA888] text-[#FFF]"
               >
                  Book now
               </span>
            ) : (
               <button
                  onClick={submit}
                  className="w-full my-0 mx-auto flex items-center justify-center p-2 bg-[#BFA888] text-[#FFF]"
               >
                  Book now
               </button>
            )}
         </div>
      </div>
   );
};

export default BookYacht;
