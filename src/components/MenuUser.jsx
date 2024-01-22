import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setShowMenuUser } from '../redux/Slice/AppStateSlice';
import { setIsLoggin, setUserData } from '../redux/Slice/AuthSlice';
import { apiLogout } from '../services/authService';

const MenuUser = () => {
   const { userData } = useSelector((state) => state.auth);
   const { showMenuUser } = useSelector((state) => state.appState);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   useEffect(() => {
      const handleScroll = () => {
         if (window.scrollY > 200) {
            dispatch(setShowMenuUser(false));
         }
      };
      window.addEventListener('scroll', handleScroll);
      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, [dispatch]);

   const handleLogout = async () => {
      try {
         const response = await apiLogout();
         if (response?.data?.status) {
            dispatch(setUserData([]));
            dispatch(setIsLoggin(false));
            toast.success('Your account has been logged out');
            navigate('/');
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
      <div className=" relative font-['Arial']">
         <i
            onClick={() => dispatch(setShowMenuUser(!showMenuUser))}
            className={`fa-solid fa-user-tie text-2xl cursor-pointer hover:text-[#a56f36] ${
               showMenuUser ? 'text-[#a56f36]' : ''
            }`}
         ></i>
         {showMenuUser && (
            <ul className="absolute min-w-[220px] flex flex-col bg-[#fff0e0] rounded-md shadow-md top-[50px] left-[-150px] py-2 z-10">
               <li className="border-b border-[#dec5ab] px-4">
                  <ul>
                     <li className="font-bold">{userData?.name}</li>
                     <li className="mt-[-8px] mb-2">{userData?.email}</li>
                  </ul>
               </li>
               <li className="my-2 border-b border-[#dec5ab]">
                  <ul onClick={() => dispatch(setShowMenuUser(!showMenuUser))}>
                     <li>
                        <Link to={'/profile'} className="w-full block py-1 px-4  font-bold hover:bg-[#f0d0ad]">
                           Profile
                        </Link>
                     </li>
                     <li>
                        <Link to={'/my-booking'} className="w-full block py-1 px-4 mb-2  font-bold hover:bg-[#f0d0ad]">
                           My booking
                        </Link>
                     </li>
                  </ul>
               </li>
               <li onClick={handleLogout} className=" py-1 px-4 hover:bg-[#f0d0ad] font-bold cursor-pointer">
                  Sign out
               </li>
            </ul>
         )}
      </div>
   );
};

export default MenuUser;
