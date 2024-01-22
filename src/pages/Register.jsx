import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import InputField from '../components/InputField';
import { apiRegister } from '../services/authService';

const Register = () => {
   const [isLoadding, setIsLoadding] = useState(false);
   const isLogin = JSON.parse(localStorage.getItem('auth'))?.isLogin;
   const { isLoggedIn } = useSelector((state) => state.auth);
   const navigate = useNavigate();

   useEffect(() => {
      if (isLogin || isLoggedIn) {
         navigate('/');
      }
   }, [isLoggedIn, isLogin, navigate]);

   const {
      handleSubmit,
      formState: { errors },
      watch,
      control,
   } = useForm();

   const handleRegister = async (data) => {
      try {
         setIsLoadding(true);
         const response = await apiRegister(data);
         if (response?.data?.status) {
            toast.success('Registered successfully');
            navigate('/login');
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
      <div className="w-full min-h-[700px] bg-[#F4F2ED] pb-20">
         <div className="max-w-[1400px] mx-auto flex tl:flex-col justify-center gap-20 tl:gap-0 ">
            <form className="w-1/2 tl:w-full px-6 mt-20" onSubmit={handleSubmit(handleRegister)}>
               <div className="flex flex-col">
                  <span className="font-['Inconsolata'] font-bold uppercase text-[#BFA888]">Beloved Customer</span>
                  <h4 className="font-['Cormorant_Upright'] text-[63px] uppercase mt-[-18px]">Sign up</h4>
               </div>
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
               <InputField
                  label="Password:"
                  name="password"
                  type="password"
                  control={control}
                  rules={{
                     required: 'Please enter password',
                     pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message:
                           'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long. [a-z, A-Z, 0-9, !@#$%^&*()_+]',
                     },
                  }}
                  errors={errors}
               />
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
               <div className="mt-10 w-full flex flex-col gap-3">
                  <p className="font-['Inconsolata']">
                     Do you already have an account{' '}
                     <Link to={'/login'} className="cursor-pointer uppercase underline text-lg hover:font-bold">
                        Login now
                     </Link>
                  </p>
                  {isLoadding ? (
                     <button disabled className=" bg-[#ebe0d1] transition-all p-3 text-white font-['Inconsolata']">
                        Sign up
                     </button>
                  ) : (
                     <button className=" bg-[#BFA888] transition-all p-3 text-white font-['Inconsolata'] hover:bg-white hover:text-black">
                        Sign up
                     </button>
                  )}
               </div>
            </form>
            <div className="1/2 tl:w-full px-6 mt-20 tl:mb-20">
               <img src="/assets/images/Contact-img-1.jpg" alt="" />
            </div>
         </div>
      </div>
   );
};

export default Register;
