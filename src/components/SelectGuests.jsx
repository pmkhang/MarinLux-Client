/* eslint-disable react/prop-types */
const SelectGuests = ({ crewNumber, guests, handleSelectChange }) => {
   return (
      <div className="flex flex-col gap-2">
         <label className="px-2 uppercase font-medium">GUESTS:</label>
         <select id="countries" className="text-sm block w-full p-2 cursor-pointer" value={guests} onChange={handleSelectChange}>
            {Array.from({ length: crewNumber }, (_, index) => (
               <option key={index + 1} value={index + 1}>
                  {index + 1}
               </option>
            ))}
         </select>
      </div>
   );
};

export default SelectGuests;
