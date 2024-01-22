/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

const CountdownComponent = ({ setIsActive, color }) => {
   const [countdown, setCountdown] = useState(5); // 15 min

   useEffect(() => {
      const interval = setInterval(() => {
         setCountdown((prevCountdown) => Math.max(prevCountdown - 1, 0));
      }, 1000);
      return () => clearInterval(interval);
   }, []);

   useEffect(() => {
      if (countdown === 0) {
         setIsActive(true);
      }
   }, [countdown, setIsActive]);

   const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
   };

   return <h3 className={`text-center text-lg text-${color}-500`}>{formatTime(countdown)}</h3>;
};

export default CountdownComponent;
