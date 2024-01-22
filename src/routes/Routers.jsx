import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import router from '../utils/router';

const NotFound = () => {
   return (
      <div className="w-full min-h-[550px] flex items-center justify-center bg-[#F4F2ED]">
         <h2 className="text-3xl font-bold">404 Not Found</h2>
      </div>
   );
};

const Routers = () => {
   useEffect(() => {
      const handleRouteChange = () => {
         window.scrollTo(0, 0);
      };
      window.addEventListener('popstate', handleRouteChange);
      return () => {
         window.removeEventListener('popstate', handleRouteChange);
      };
   }, []);

   return (
      <Routes>
         {router.map((i, index) => (
            <Route key={index} path={i.path} element={i.element} />
         ))}
         <Route path="*" element={<Navigate to="/not-found-404" />} />
         <Route path="/not-found-404" element={<NotFound />} />
      </Routes>
   );
};

export default Routers;
