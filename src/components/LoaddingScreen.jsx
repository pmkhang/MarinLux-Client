const LoaddingScreen = () => {
   return (
      <div className="flex items-center justify-center w-full h-[950px]">
         <div className="flex justify-center items-center space-x-1 text-lg text-gray-700">
            <div className="rounded-full h-20 w-20 bg-[#cdb9a0] animate-ping" />
            <div className="rounded-full h-20 w-20 bg-[#cdb9a0] animate-ping" />
            <div className="rounded-full h-20 w-20 bg-[#cdb9a0] animate-ping" />
         </div>
      </div>
   );
};

export default LoaddingScreen;
