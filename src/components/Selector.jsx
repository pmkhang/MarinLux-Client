/* eslint-disable react/prop-types */
import { Controller } from 'react-hook-form';

const Selector = ({ name, control, rules, errors, options, optionPlaceHolder, ...props }) => {
   return (
      <div className="w-full flex flex-col mb-2 gap-2 mt-2">
         <Controller
            name={name}
            control={control}
            defaultValue=""
            rules={rules}
            render={({ field }) => (
               <select className="p-3 w-full border-2 border-[#B3B3B3] bg-[#F4F2ED]" {...field} {...props}>
                  <option value="">-{optionPlaceHolder}-</option>
                  {options?.map((i) => (
                     <option key={i?.id} value={i?.id}>
                        {i?.name}
                     </option>
                  ))}
               </select>
            )}
         />
         {errors && errors[name] && <span className="text-red-500">{errors[name]?.message}</span>}
      </div>
   );
};

export default Selector;
