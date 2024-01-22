import { Link } from 'react-router-dom';

const RefundPolicy = () => {
   return (
      <div className="w-full flex flex-col items-center  py-10 min-h-[500px] bg-[#F4F2ED]">
         <div className="max-w-[1400px] w-full px-5">
            <p className="mb-2">
               At Marinlux, we understand that plans may change, and we are committed to providing a fair and
               transparent refund policy for our valued customers. Please review the following guidelines carefully.
            </p>
            <hr />
            <div className="flex flex-col gap-2 mb-8">
               <h2 className="text-2xl font-bold mt-4">Cancellation Procedure:</h2>
               <p>
                  For the cancellation of your yacht booking and the initiation of a refund request, we invite you to
                  reach out to us through the following channels:
               </p>
               <ul className="ml-10">
                  <li>
                     • Email: <b>support@marinlux.com</b>
                  </li>
                  <li>
                     • Phone: <b>+1-305-389-610</b>
                  </li>
               </ul>
               <p>
                  Alternatively, a request can be formally submitted via our{' '}
                  <Link className="text-blue-500 underline" to={'/contact-us'}>
                     Contact Us
                  </Link>{' '}
                  page.
               </p>
               <p>
                  Please be advised that, for streamlined processing, we require your Booking ID, accessible within your
                  profile page post-login. Additionally, kindly prepare a concise statement detailing the reason for
                  cancellation.
               </p>
            </div>
            <hr/>
            <div className="flex flex-col gap-2 mt-5">
               <h2 className="text-2xl font-bold mt-4">Refund Determination:</h2>
               <p>Refunds will be considered based on the circumstances surrounding your booking cancellation:</p>
               <ul className="ml-10 flex flex-col gap-4">
                  <li>
                     <b>• Full Refund:</b>{' '}
                     <ul className="ml-10">
                        <li>
                           ° If the cancellation is made 7 days or more prior to the scheduled departure date and no fee
                           has been incurred in preparation for the booking.
                        </li>
                        <li>° In the event of unforeseen circumstances or yacht unavailability.</li>
                     </ul>
                  </li>
                  <li>
                     <b>• Partial Refund:</b>{' '}
                     <ul className="ml-10">
                        <li>
                           ° If the cancellation occurs within 7 days prior to the scheduled departure date has been
                           incurred in preparation for the booking.
                        </li>
                        <li>
                           ° In situations where a portion of the charter fee has already been utilized for preparations
                           and arrangements.
                        </li>
                     </ul>
                  </li>
                  <li>
                     <b>• Non-Refundable:</b>{' '}
                     <ul className="ml-10">
                        <li>
                           ° No refund will be provided for cancellations made 24 hours prior to the scheduled departure
                           date.
                        </li>
                     </ul>
                  </li>
               </ul>
               <h2 className="text-lg font-bold mt-4">Refund Processing:</h2>
               <ul className="ml-10 mb-5 flex flex-col gap-2">
                  <li>
                     • Once we receive your cancellation request, our team will assess eligibility for a refund based on
                     the provided information.
                  </li>
                  <li>
                     • You will be notified of the decision and the applicable refund amount within 3 business days.
                  </li>
                  <li>• Refunds will be processed using the original payment method used during the booking.</li>
               </ul>
            </div>
         </div>
      </div>
   );
};

export default RefundPolicy;
