const SidebarListYacht = () => {
   return (
      <div className="flex flex-col gap-10 w-2/5 min-h-[200px] p-3 tl:w-full">
         <form className="w-full relative">
            <input
               type="text"
               placeholder="Search Yachts ...."
               className="w-full p-3 border border-[#ae7c46] outline-none"
            />
            <button type="submit" className="absolute right-3 top-3 text-xl text-[#ae7c46] hover:text-black">
               <i className="fa-solid fa-magnifying-glass"></i>
            </button>
         </form>
         <from className="flex flex-col gap-3">
            <h4 className="text-2xl font-bold">FILTER BY PRICE</h4>
            <div className="flex items-center gap-3">
               <input type="radio" id="under1" name="price"/>
               <label htmlFor="under1">$0 — $500</label>
            </div>
            <div className="flex items-center gap-3">
               <input type="radio" id="under2" name="price"/>
               <label htmlFor="under2">$501 — $1000</label>
            </div>
            <div className="flex items-center gap-3">
               <input type="radio" id="under3" name="price"/>
               <label htmlFor="under3">$1001 — $1500</label>
            </div>
            <div className="flex items-center gap-3">
               <input type="radio" id="under4" name="price"/>
               <label htmlFor="under4">$1500 — $3000</label>
            </div>
         </from>
         <div className="flex flex-col gap-3">
            <h4 className="text-2xl font-bold">CATEGORY</h4>
            <ul className="flex flex-col gap-1 text-lg">
               <li>Gulet</li>
               <li>Open</li>
               <li>Catamarans</li>
               <li>Motor</li>
               <li>Sailing</li>
               <li>Expedition</li>
            </ul>
         </div>
         <div className="tl:hidden">
            <img src="/assets/images/Shop-banner.jpg" alt="banner" />
         </div>
      </div>
   );
};

export default SidebarListYacht;
