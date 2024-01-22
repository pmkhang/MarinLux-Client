import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import InputField from '../components/InputField';
import { setIsLoggin } from '../redux/Slice/AuthSlice';
import { apiLogin } from '../services/authService';

const Login = () => {
   const [isLoadding, setIsLoadding] = useState(false);
   const navigate = useNavigate();

   const dispatch = useDispatch();
   const {
      handleSubmit,
      control,
      formState: { errors },
   } = useForm();

   const isLogin = JSON.parse(localStorage.getItem('auth'))?.isLogin;
   const { isLoggedIn } = useSelector((state) => state.auth);

   useEffect(() => {
      if (isLogin || isLoggedIn) {
         navigate('/');
      }
   }, [isLoggedIn, isLogin, navigate]);

   const loginSubmit = async (payload) => {
      try {
         setIsLoadding(true);
         const response = await apiLogin(payload);
         if (response?.data?.status) {
            toast.success('Loggin successfuly');
            dispatch(setIsLoggin(response?.data?.status));
         }
      } catch (error) {
         console.log(error);
         toast.error(error.message);
      } finally {
         setIsLoadding(false);
      }
   };

   return (
      <div className="w-full min-h-[700px] bg-[#F4F2ED]">
         <div className="max-w-[1400px] mx-auto flex tl:flex-col justify-center  gap-20 tl:gap-0 ">
            <form className="w-1/2 tl:w-full px-6 mt-20" onSubmit={handleSubmit(loginSubmit)}>
               <div className="flex flex-col">
                  <span className="font-['Inconsolata'] font-bold uppercase text-[#BFA888]">Beloved Customer</span>
                  <h4 className="font-['Cormorant_Upright'] text-[63px] uppercase mt-[-18px]">Login</h4>
               </div>
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
                  label="Password:"
                  name="password"
                  type="password"
                  control={control}
                  rules={{ required: 'Please enter your password' }}
                  errors={errors}
               />
               <div className="mt-10 w-full flex flex-col gap-3">
                  <p className="font-['Inconsolata']">
                     Do not have account?{' '}
                     <Link to={'/sign-up'} className="uppercase underline text-lg hover:font-bold">
                        sign up now
                     </Link>
                  </p>
                  {isLoadding ? (
                     <button disabled className=" bg-[#ebe0d1] transition-all p-3 text-white font-['Inconsolata']">
                        Login
                     </button>
                  ) : (
                     <button className=" bg-[#BFA888] transition-all p-3 text-white font-['Inconsolata'] hover:bg-white hover:text-black">
                        Login
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

export default Login;
