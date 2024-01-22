/* eslint-disable react/prop-types */
import { Controller } from 'react-hook-form';

const InputField = ({ label, name, type, control, rules, errors, ...props }) => {
   return (
      <div className="w-full flex flex-col mb-2 gap-2 mt-2">
         {label && <label className='font-bold' htmlFor={name}>{label}</label>}
         <Controller
            name={name}
            control={control}
            defaultValue=""
            rules={rules}
            render={({ field }) => (
               <input
                  id={name}
                  type={type}
                  className="p-3 border-2 border-[#B3B3B3] bg-[#F4F2ED]"
                  {...field}
                  {...props}
               />
            )}
         />
         {errors[name] && <span className="text-red-500">{errors[name].message}</span>}
      </div>
   );
};

export default InputField;
