import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

const RollTop = () => {
   const [isVisible, setIsVisible] = useState(false);

   const handleScroll = () => {
      if (window.scrollY > 200) {
         setIsVisible(true);
      } else {
         setIsVisible(false);
      }
   };

   const scrollToTop = () => {
      window.scrollTo({
         top: 0,
         behavior: 'smooth',
      });
   };

   useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, []);

   return (
      isVisible && (
         <span
            className="fixed flex items-center justify-center bottom-5 right-5 z-50 w-10 h-10 bg-[#021527] rounded-full cursor-pointer shadow-lg border-2 text-[#fff5ea] border-[#fff5ea]"
            onClick={scrollToTop}
         >
            <FontAwesomeIcon icon={faAngleUp} />
         </span>
      )
   );
};

export default RollTop;
