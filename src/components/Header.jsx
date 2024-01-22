/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Header = ({ setShowNav, showNav, browserWidth }) => {
   

   return (
      <header className="max-w-[1400px] h-[90px] my-0 mx-auto tl:px-10 mb:px-4 mb:py-2 mb:h-[70px]">
         <div className="w-full h-full flex items-center justify-between px-6 tl:px-1">
            <Link to={''} className="inline-block w-[200px] mb:w-[150px]">
               <img src="/assets/images/logo2.png" alt="logo" />
            </Link>
            <Navbar />
            {browserWidth <= 1024 && (
               <button onClick={() => setShowNav(!showNav)} className="text-3xl ">
                  <i className="fa-solid fa-bars"></i>
               </button>
            )}
         </div>
      </header>
   );
};

export default Header;
