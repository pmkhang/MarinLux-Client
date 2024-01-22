import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ModalChangePassword from '../components/ModalChangePassword';

const UserProfile = () => {
   const { userData } = useSelector((state) => state.auth);
   const [showModal, setShowModal] = useState(false);

   const navigate = useNavigate();
   const isLogin = JSON.parse(localStorage.getItem('auth'))?.isLogin;

   useEffect(() => {
      if (!isLogin) {
         navigate('/');
      }
   }, [isLogin, navigate]);
   return (
      <div className="w-full flex flex-col items-center  py-10 min-h-[500px] bg-[#F4F2ED]">
         <div className="max-w-[1400px] w-full px-3">
            <div className="flex flex-col relative ">
               <span className="font-['Inconsolata'] text-[13px] tl:text-center uppercase text-[#BFA888]">
                  Beloved Customer
               </span>
               <h2 className="font-['Cormorant_Upright'] text-[63px] tl:text-center font-bold uppercase text-[#000]">
                  My profile
               </h2>
               <span className="absolute font-['Cormorant_Upright']  text-[115px] font-bold uppercase text-[#BFA888] opacity-[0.13] top-[-30px] left-[-20px] tl:hidden">
                  Explore
               </span>
            </div>
         </div>
         <div className="max-w-[1400px] w-full px-3">
            <ul className="flex flex-col gap-6 mt-10">
               <li className="font-bold text-lg">
                  Name: <i className="ml-5">{userData?.name}</i>
               </li>
               <li className="font-bold text-lg">
                  email: <i className="ml-5">{userData?.email}</i>
               </li>
               <li className="font-bold text-lg">
                  phone: <i className="ml-5">{userData?.phone}</i>
               </li>
            </ul>
         </div>
         <div className="max-w-[1400px] w-full px-3 mt-10">
            <button onClick={() => setShowModal(true)} className="p-2 bg-[#BFA888] text-white">
               Change password
            </button>
         </div>
         {showModal && <ModalChangePassword setShowModal={setShowModal} />}
      </div>
   );
};

export default UserProfile;
