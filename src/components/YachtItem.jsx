/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

const YachtItem = ({ img, price, category, name, desc, id }) => {
   return (
      <Link to={`/detail-yatch/${id}`} className="min-h-[500px] flex flex-col transition-all hover:translate-y-[-5px]">
         <div className="border border-[#ae7c46] transition-all hover:rounded p-2 flex items-center justify-center">
            <img src={img} alt={id} className="h-[380px] w-[284px] tl:w-full object-cover" />
         </div>
         <div className="flex items-center justify-between">
            <span className="text-md text-[#533b21] font-[Inconsolata] mt-1 font-bold">${price}/day</span>
            <span className="text-[15px] mt-2 font-[Inconsolata] text-[#96632c]">{category}</span>
         </div>
         <h4 className="text-3xl my-1 font-['Cormorant_Upright'] font-bold text-[#ae7c46] hover:text-black">{name}</h4>
         <p className="text-[15px] text-slate-500 font-[Inconsolata]">{desc}</p>
      </Link>
   );
};

export default YachtItem;
