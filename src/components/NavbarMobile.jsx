import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setIsLoggin, setUserData } from '../redux/Slice/AuthSlice';
import { apiLogout } from '../services/authService';

/* eslint-disable react/prop-types */
const NavbarMobile = ({ setShowNav }) => {
   const { isLoggedIn } = useSelector((state) => state.auth);
   const { userData } = useSelector((state) => state.auth);
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const handleLogout = async () => {
      try {
         const response = await apiLogout();
         if (response?.data?.status) {
            dispatch(setUserData([]));
            dispatch(setIsLoggin(false));
            toast.success('Your account has been logged out');
            navigate('/');
            setShowNav(false);
         }
      } catch (error) {
         if (error.response.status === 401) {
            dispatch(setUserData([]));
            dispatch(setIsLoggin(false));
         }
         console.log(error);
      }
   };

   return (
      <div className="flex transition-all">
         <div
            onClick={() => setShowNav(false)}
            className="absolute top-0 bottom-0 right-0 left-0 backdrop-blur-sm z-20"
         ></div>
         <div className="fixed max-w-[500px] w-full top-0 bottom-0 right-0 bg-white shadow-lg z-20 py-4 px-5 ">
            <div className="flex items-center justify-between">
               <Link to={''} className="inline-block w-[200px] mb:w-[150px]">
                  <img src="/assets/images/logo2.png" alt="logo" />
               </Link>
               <button onClick={() => setShowNav(false)} className="text-2xl">
                  <i className="fa-solid fa-x"></i>
               </button>
            </div>
            <nav className="mt-10">
               <ul className="flex flex-col items-end gap-6">
                  <li onClick={() => setShowNav(false)}>
                     <Link to={'/'} className=" text-xl hover:text-[#a56f36] uppercase transition-all">
                        Home
                     </Link>
                  </li>
                  <li onClick={() => setShowNav(false)}>
                     <Link to={'/yachts-gallery'} className=" text-xl hover:text-[#a56f36] uppercase transition-all">
                        Yachts
                     </Link>
                  </li>
                  <li onClick={() => setShowNav(false)}>
                     <Link to={'/about-us'} className=" text-xl hover:text-[#a56f36] uppercase transition-all">
                        About Us
                     </Link>
                  </li>
                  <li onClick={() => setShowNav(false)}>
                     <Link to={'/refund-policy'} className=" text-xl hover:text-[#a56f36] uppercase transition-all">
                        Refund policy
                     </Link>
                  </li>
                  <li onClick={() => setShowNav(false)}>
                     <Link to={'/contact-us'} className=" text-xl hover:text-[#a56f36] uppercase transition-all">
                        COntact Us
                     </Link>
                  </li>
                  <li className="mt-5 w-full border-t">
                     {isLoggedIn ? (
                        <ul className="min-w-[220px] text-right flex flex-col mt-2">
                           <li className=" px-4">
                              <ul>
                                 <li className="font-bold">{userData?.name}</li>
                                 <li className="mt-[-4px] mb-2">{userData?.email}</li>
                              </ul>
                           </li>
                           <li className="my-2" onClick={() => setShowNav(false)}>
                              <ul>
                                 <li>
                                    <Link to={'/profile'} className="w-full block py-1 px-4  font-bold">
                                       Profile
                                    </Link>
                                 </li>
                                 <li>
                                    <Link to={'/my-booking'} className="w-full block py-1 px-4 mb-2  font-bold">
                                       My booking
                                    </Link>
                                 </li>
                              </ul>
                           </li>
                           <li onClick={handleLogout} className=" py-1 px-4 font-bold cursor-pointer">
                              Sign out
                           </li>
                        </ul>
                     ) : (
                        <div className="flex items-center gap-3" onClick={() => setShowNav(false)}>
                           <Link
                              to={'/login'}
                              className="flex-1 flex items-center justify-center hover:text-[#fbce9f] transition-all bg-[#021527] uppercase text-white py-2 px-8"
                           >
                              Login
                           </Link>
                           <Link
                              to={'/sign-up'}
                              className="flex-1 flex items-center justify-center hover:text-[#fbce9f] transition-all bg-[#021527] uppercase text-white py-2 px-8"
                           >
                              Sign up
                           </Link>
                        </div>
                     )}
                  </li>
               </ul>
            </nav>
         </div>
      </div>
   );
};

export default NavbarMobile;
