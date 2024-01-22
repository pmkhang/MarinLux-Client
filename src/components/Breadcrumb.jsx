/* eslint-disable react-refresh/only-export-components */
import { memo } from 'react';

/* eslint-disable react/prop-types */
const Breadcrumb = ({ title }) => {
   return (
      <div className="bg-[url('/assets/images/Post-single-title-img.jpg')] h-[280px] tl:h-[200px] flex items-center justify-center">
         <h3 className="text-[50px] font-['Cormorant_Upright'] text-center tl:text-[30px] font-bold uppercase">{title}</h3>
      </div>
   );
};

export default memo(Breadcrumb);
