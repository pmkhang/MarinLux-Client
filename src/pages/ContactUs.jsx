import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { InputField } from '../components';
import { apiContact } from '../services/contactService';

const ContactUs = () => {
   const {
      handleSubmit,
      formState: { errors },
      control,
      register,
      reset,
   } = useForm();

   const submit = async (data) => {
      try {
         const response = await apiContact(data);
         if (response?.data?.status) {
            reset();
            toast.success('Your contact information has been successfully submitted.');
            toast.success('We will get in touch with you as soon as possible.');
         }
      } catch (error) {
         console.log(error);
      }
   };
   return (
      <div className="w-full flex flex-col py-10 min-h-[500px] bg-[#F4F2ED]">
         <div className="max-w-[1400px] my-0 mx-auto w-full px-3">
            <div className="w-full flex tl:flex-col gap-6 mt-5">
               <div className="flex-1">
                  <h2 className="text-[32px] font-bold uppercase">Contact Us</h2>
                  <p className="text-[16px] mr-5 mt-5">
                     If you need to contact us for any reason concerning the website or a yacht we have listed,{' '}
                     <b>MarinLux</b> team are happy to help.
                  </p>
                  <ul className="mt-5 flex flex-col gap-3 text-[16px] font-bold">
                     <li>
                        <i className="fa-solid fa-phone mr-3"></i>+1-305-389-610
                     </li>
                     <li>
                        <i className="fa-regular fa-calendar mr-3"></i>Mon - Fri, 9.00am until 6.30pm
                     </li>
                     <li>
                        <i className="fa-solid fa-building mr-3"></i>Roadtown Street, The MarinaLux Building, British
                        Virgin Islands
                     </li>
                     <li>
                        <i className="fa-solid fa-envelope mr-3"></i>seafarer@marinalux.com
                     </li>
                     <li>
                        <i className="fa-solid fa-clock-rotate-left mr-3"></i>We reply within 24 hrs
                     </li>
                  </ul>
               </div>
               <form className="w-2/3 tl:w-full flex flex-col gap-3" onSubmit={handleSubmit(submit)}>
                  <h2 className="text-[32px] font-bold">GET IT TOUCH</h2>

                  <InputField
                     label="Name:"
                     name="name"
                     type="text"
                     control={control}
                     rules={{ required: 'Please enter your name' }}
                     errors={errors}
                     placeholder="Ex. John Wick"
                  />
                  <InputField
                     label="Email:"
                     name="email"
                     type="email"
                     control={control}
                     rules={{
                        required: 'Please enter your email',
                        pattern: {
                           value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                           message: 'Invalid email address',
                        },
                     }}
                     errors={errors}
                     placeholder="Ex. example@gmail.com"
                  />
                  <InputField
                     label="Phone:"
                     name="phone"
                     type="text"
                     control={control}
                     rules={{
                        required: 'Please enter your phone',
                        pattern: {
                           value: /^\d{10}$/,
                           message: 'Please enter a valid 10-digit phone number',
                        },
                     }}
                     errors={errors}
                     placeholder="Ex. 099999999"
                  />
                  <div className="w-full flex flex-col mb-2 gap-2 mt-2">
                     <label className="font-bold" htmlFor={'message'}>
                        Messager:
                     </label>
                     <textarea
                        rows={10}
                        id="messager"
                        className="p-3 border-2 border-[#B3B3B3] bg-[#F4F2ED]"
                        {...register('messager', {
                           required: 'Please enter your messager',
                        })}
                     ></textarea>
                     {errors.messager && <span className="text-red-500">{errors.messager.message}</span>}
                  </div>
                  <button className=" bg-[#BFA888] transition-all p-3 text-white font-['Inconsolata'] hover:bg-white hover:text-black mt-3">
                     Submit
                  </button>
               </form>
            </div>
         </div>
      </div>
   );
};

export default ContactUs;
