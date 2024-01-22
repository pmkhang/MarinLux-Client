const StatusYacht = () => {
   return (
      <div className="w-[260px] p-3 bg-[#F4F2ED] tl:w-full ">
         <h3 className="text-center font-['Cormorant_Upright'] font-bold text-2xl my-2">STATUS YACHT</h3>
         <h4 className="font-['Inconsolata'] text-xl text-center mt-[-12px] mb-3 font-bold">BAWERA CRUISER</h4>
         <div className="w-full flex flex-col font-['Inconsolata']">
            <span className="text-center text-lg">Scheduled time:</span>
            <ul className="flex flex-col gap-1 items-center mt-2">
               <li>12/12/2023 - 23/12/2023</li>
               <li>25/12/2023 - 02/01/2024</li>
               <li>05/01/2023 - 01/01/2024</li>
            </ul>
         </div>
      </div>
   );
};

export default StatusYacht;
