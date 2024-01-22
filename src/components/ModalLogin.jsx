/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setIsLoggin } from '../redux/Slice/AuthSlice';
import { apiLogin, apiRegister } from '../services/authService';
import InputField from './InputField';

const ModalLogin = ({ setShowModal }) => {
   const [login, setLogin] = useState(true);
   const [isLoadding, setIsLoadding] = useState(false);
   const dispatch = useDispatch();

   const {
      handleSubmit,
      control,
      formState: { errors },
      reset,
      watch,
   } = useForm();

   const submitLogin = async (data) => {
      try {
         setIsLoadding(true);
         const response = await apiLogin(data);
         if (response?.data?.status) {
            toast.success('Loggin successfuly, you can book yacht now');
            dispatch(setIsLoggin(response?.data?.status));
            setShowModal(false);
         }
      } catch (error) {
         console.log(error);
         toast.error(error.message);
      } finally {
         setIsLoadding(false);
      }
   };

   const submitregister = async (data) => {
      try {
         setIsLoadding(true);
         const response = await apiRegister(data);
         if (response.data.status) {
            toast.success('Registered successfully');
            setLogin(true);
            reset();
         }
      } catch (error) {
         const emailError = error.errors.email ? error.errors.email[0] : null;
         const phoneError = error.errors.phone ? error.errors.phone[0] : null;
         if (emailError) toast.error(emailError);
         if (phoneError) toast.error(phoneError);
      } finally {
         setIsLoadding(false);
      }
   };

   return (
      <div
         className="fixed flex items-center justify-center top-0 bottom-0 right-0 left-0 backdrop-blur bg-[#1f1f1f9e]"
         onClick={(e) => {
            e.stopPropagation();
            setShowModal(false);
         }}
      >
         <div
            className="w-[700px] h-fit bg-white shadow-lg pb-4 mb-5"
            onClick={(e) => {
               e.stopPropagation();
               setShowModal(true);
            }}
         >
            <form
               className="p-4 flex flex-col justify-center items-center relative"
               onSubmit={handleSubmit(login ? submitLogin : submitregister)}
            >
               <i
                  className="fa-solid fa-x text-2xl absolute top-3 right-4 cursor-pointer"
                  onClick={(e) => {
                     e.stopPropagation();
                     setShowModal(false);
                     reset();
                  }}
               ></i>
               <h3 className="font-['Cormorant_Upright'] font-bold text-[40px] uppercase">
                  {login ? 'Login to booking' : 'Sign up'}
               </h3>
               <div className="w-full px-10 flex flex-col">
                  {!login && (
                     <InputField
                        label="Name:"
                        name="name"
                        type="text"
                        control={control}
                        rules={{ required: 'Please enter your name' }}
                        errors={errors}
                        placeholder="Ex. John Wick"
                     />
                  )}
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
                  {!login && (
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
                  )}
                  <InputField
                     label="Password:"
                     name="password"
                     type="password"
                     control={control}
                     rules={{ required: 'Please enter your password' }}
                     errors={errors}
                  />
                  {!login && (
                     <InputField
                        label="Password confirm:"
                        name="password_confirmation"
                        type="password"
                        control={control}
                        rules={{
                           validate: (val) => {
                              if (watch('password') !== val) {
                                 return 'Your password confirmation do no match';
                              }
                           },
                        }}
                        errors={errors}
                     />
                  )}
                  <div className="mt-10 w-full flex flex-col gap-3">
                     {login ? (
                        <p className="font-['Inconsolata']">
                           Do not have account?{' '}
                           <span
                              className="cursor-pointer uppercase underline text-lg hover:font-bold"
                              onClick={(e) => {
                                 e.stopPropagation();
                                 setLogin(false);
                                 reset();
                              }}
                           >
                              sign up now
                           </span>
                        </p>
                     ) : (
                        <p className="font-['Inconsolata']">
                           Do you already have an account{' '}
                           <span
                              className="cursor-pointer uppercase underline text-lg hover:font-bold"
                              onClick={(e) => {
                                 e.stopPropagation();
                                 setLogin(true);
                                 reset();
                              }}
                           >
                              Login now
                           </span>
                        </p>
                     )}
                     {isLoadding ? (
                        <button disabled className=" bg-[#ebe0d1] transition-all p-3 text-white font-['Inconsolata']">
                           {login ? 'Login' : 'Sign up'}
                        </button>
                     ) : (
                        <button className=" bg-[#BFA888] transition-all p-3 text-white font-['Inconsolata'] hover:bg-white hover:text-black">
                           {login ? 'Login' : 'Sign up'}
                        </button>
                     )}
                  </div>
               </div>
            </form>
         </div>
      </div>
   );
};

export default ModalLogin;
