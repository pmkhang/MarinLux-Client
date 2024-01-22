import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { apiContact } from '../services/contactService';

/* eslint-disable react/no-unescaped-entities */
const Footer = () => {
   const {
      handleSubmit,
      formState: { errors },
      reset,
      register,
   } = useForm();

   const submit = async (data) => {
      try {
         const response = await apiContact({
            name: `User ${data.email}`,
            email: data.email,
            phone: '0123456789',
            messager: 'Subscribe to our newsletter for regular updates on our seasonal promotions, offers & lots more.',
         });
         if (response?.data?.status) {
            reset();
            toast.success('Subscribed successfully');
         }
      } catch (error) {
         console.log(error);
      }
   };
   return (
      <footer className="w-full min-h-[300px] bg-[#021527] py-10">
         <div className="flex tl:flex-col tl:items-center gap-10 max-w-[1400px] px-3  my-0 mx-auto text-[#f8d8b6] ">
            <div className="w-1/4 min-h-[300px] flex flex-col tl:items-center gap-8 tl:w-full px-4">
               <img src="/assets/images/logo1.png" alt="logo" className="w-[300px]" />
               <p className="tl:text-center">
                  MarinaLux makes it easy to find the yacht charter vacation that is right for you. We combine thousands
                  of yacht listings with local destination information, sample itineraries and experiences to deliver
                  the world's most comprehensive yacht charter website.
               </p>
               <div>
                  <ul className="flex items-center gap-10 text-xl">
                     <li>
                        <i className="fa-brands fa-facebook"></i>
                     </li>
                     <li>
                        <i className="fa-brands fa-instagram"></i>
                     </li>
                     <li>
                        <i className="fa-brands fa-twitter"></i>
                     </li>
                     <li>
                        <i className="fa-brands fa-telegram"></i>
                     </li>
                  </ul>
               </div>
            </div>
            <div className="w-1/4 min-h-[300px] flex flex-col mt-6 gap-10 tl:w-full px-4">
               <h2 className="text-2xl text-center uppercase font-['Cormorant_Upright'] font-bold">OUR COMPANY</h2>
               <ul className="flex flex-col justify-center items-center gap-4 text-white">
                  <li className="uppercase">
                     <Link to={''}>Home</Link>
                  </li>
                  <li className="uppercase">
                     <Link to={'/yachts-gallery'}>Yachts</Link>
                  </li>
                  <li className="uppercase">
                     <Link to={'/about-us'}>About Us</Link>
                  </li>
                  <li className="uppercase">
                     <Link to={'/refund-policy'}>Refund Policy</Link>
                  </li>
                  <li className="uppercase">
                     <Link to={'/contact-us'}>Contact Us</Link>
                  </li>
               </ul>
            </div>
            <div className="w-1/4 min-h-[300px] flex flex-col mt-6 gap-10 tl:w-full px-4">
               <h2 className="text-2xl text-center uppercase font-['Cormorant_Upright'] font-bold">Contact details</h2>
               <ul className="flex flex-col justify-center items-center gap-4 text-white">
                  <li>+1-305-389-610</li>
                  <li>Mon - Fri, 9.00am until 6.30pm</li>
                  <li className="text-center">Roadtown Street, The MarinaLux Building, British Virgin Islands</li>
                  <li>seafarer@marinalux.com</li>
                  <li>We reply within 24 hrs</li>
               </ul>
            </div>
            <div className="w-1/4 min-h-[300px] flex flex-col mt-6 gap-10 tl:w-full px-4">
               <h2 className="text-2xl text-center uppercase font-['Cormorant_Upright'] font-bold">SUBSRIBE</h2>
               <p className="text-center text-white">
                  Subscribe to our newsletter for regular updates on our seasonal promotions, offers & lots more.
               </p>
               <form className="w-full flex items-center gap-2" onSubmit={handleSubmit(submit)}>
                  <div className="relative flex flex-col flex-1">
                     <input
                        type="text"
                        className="inline-block w-full p-4 border-4 border-[#f8d8b6] bg-[#021527] outline-none"
                        placeholder="Your email..."
                        {...register('email', {
                           required: 'Please enter your email',
                           pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Invalid email address',
                           },
                        })}
                     />
                     {errors.email && (
                        <span className="text-red-500 absolute bottom-[-30px]">{errors.email.message}</span>
                     )}
                  </div>
                  <button className="py-4 px-5 border-4 border-[#f8d8b6]">
                     <i className="fa-solid fa-paper-plane"></i>
                  </button>
               </form>
            </div>
         </div>
      </footer>
   );
};

export default Footer;
