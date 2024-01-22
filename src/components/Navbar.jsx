import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setShowMenuUser } from '../redux/Slice/AppStateSlice';
import MenuUser from './MenuUser';

const Navbar = () => {
   const { isLoggedIn } = useSelector((state) => state.auth);
   const dispatch = useDispatch();
   return (
      <nav className="font-['Cormorant_Upright'] tl:hidden">
         <ul className="flex items-center gap-6 mt-2 ">
            <li onClick={() => dispatch(setShowMenuUser(false))}>
               <Link to={'/'} className="font-bold text-xl hover:text-[#a56f36] uppercase transition-all">
                  Home
               </Link>
            </li>
            <li onClick={() => dispatch(setShowMenuUser(false))}>
               <Link to={'/yachts-gallery'} className="font-bold text-xl hover:text-[#a56f36] uppercase transition-all">
                  Yachts
               </Link>
            </li>
            <li onClick={() => dispatch(setShowMenuUser(false))}>
               <Link to={'/about-us'} className="font-bold text-xl hover:text-[#a56f36] uppercase transition-all">
                  About Us
               </Link>
            </li>
            <li onClick={() => dispatch(setShowMenuUser(false))}>
               <Link to={'/refund-policy'} className="font-bold text-xl hover:text-[#a56f36] uppercase transition-all">
                  Refund policy
               </Link>
            </li>
            <li onClick={() => dispatch(setShowMenuUser(false))}>
               <Link to={'/contact-us'} className="font-bold text-xl hover:text-[#a56f36] uppercase transition-all">
                  COntact Us
               </Link>
            </li>
            <li>
               {isLoggedIn ? (
                  <MenuUser />
               ) : (
                  <div className="flex items-center gap-3">
                     <Link
                        to={'/login'}
                        className="font-bold hover:text-[#fbce9f] transition-all bg-[#021527] uppercase text-white py-2 px-8"
                     >
                        Login
                     </Link>
                     <Link
                        to={'/sign-up'}
                        className="font-bold hover:text-[#fbce9f] transition-all bg-[#021527] uppercase text-white py-2 px-8"
                     >
                        Sign up
                     </Link>
                  </div>
               )}
            </li>
         </ul>
      </nav>
   );
};

export default Navbar;
