/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Footer, Header, NavbarMobile } from '../components';

const DefaultLayout = ({ children }) => {
   const [showNav, setShowNav] = useState(false);
   const [browserWidth, setBrowserWidth] = useState(window.innerWidth);

   useEffect(() => {
      const handleResize = () => {
         setBrowserWidth(window.innerWidth);
      };
      window.addEventListener('resize', handleResize);
      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, []);

   useEffect(() => {
      if (browserWidth > 1024) {
         setShowNav(false);
      }
   }, [browserWidth]);

   return (
      <div className="relative">
         <Header setShowNav={setShowNav} showNav={showNav} browserWidth={browserWidth} />
         {showNav && <NavbarMobile setShowNav={setShowNav} />}
         <main className="w-full">{children}</main>
         <Footer />
      </div>
   );
};

export default DefaultLayout;
