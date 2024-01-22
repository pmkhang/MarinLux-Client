/* eslint-disable react/no-unescaped-entities */
import { Link } from 'react-router-dom';
import { Banner, SlideYachtType } from '../components';

const Home = () => {
   return (
      <div className="w-full overflow-x-hidden flex flex-col  min-h-[300px]">
         <Banner />
         <div className="w-full flex flex-col my-20">
            <h2 className="text-[60px] font-['Cormorant_Upright'] uppercase font-bold text-[#ad7d4a] text-center mb:text-[30px]">
               The Luxury Yacht Charter Marketplace
            </h2>
            <p className="max-w-[1000px] mx-auto px-4 text-lg text-center mt-5 mb:text-md">
               Find and book your dream yacht through MarinaLux, the world's leading luxury yacht charter comparison
               site. View ALL superyachts available to rent, get expert advice from our comprehensive destination guides
               and be inspired by our bespoke superyacht itineraries. Let us connect you with a knowledgeable local
               charter broker to help you plan and book your fully-crewed private yachting vacation today.
            </p>
         </div>
         <div className="flex flex-col items-center bg-[#fff5ea] py-6 relative">
            <h3 className="absolute text-[70px] font-['Cormorant_Upright'] font-bold text-[#241c1318] top-3 mb:text-[50px]">
               DRIVERSITY
            </h3>
            <h3 className="mb-[-15px] font-semibold">HIGH TECH & READY</h3>
            <h2 className="text-[70px] font-['Cormorant_Upright'] font-bold text-center text-[#ad7d4a] mb:text-[40px] ">
               LUXURY YACHTS
            </h2>
            <div className="flex items-center gap-4 tl:flex-col px-4">
               <div className="">
                  <img src="/assets/images/home-1.jpg" alt="home1" className="h-[800px] object-cover" />
               </div>
               <div className="flex flex-col gap-4 tl:flex-col">
                  <div className="flex items-center gap-4 tl:flex-col">
                     <img src="/assets/images/home-2.jpg" alt="home1" className="h-[392px] tl:h-[800px] object-cover" />
                     <img src="/assets/images/home-3.jpg" alt="home1" className="h-[392px] tl:h-[800px] object-cover" />
                  </div>
                  <div className="flex items-center gap-4 tl:flex-col">
                     <img src="/assets/images/home-4.jpg" alt="home1" className="h-[392px] tl:h-[800px] object-cover" />
                     <img src="/assets/images/home-5.jpg" alt="home1" className="h-[392px] tl:h-[800px] object-cover" />
                  </div>
               </div>
            </div>
            <div className="py-8 flex items-center justify-center">
               <Link
                  to={'/yachts-gallery'}
                  className="text-lg mt-4 py-2 px-4 border-2 border-[#8b6031] transition-all hover:bg-[#8b6031] hover:text-white"
               >
                  View more in Gallery
               </Link>
            </div>
         </div>
         <div className="w-full flex flex-col items-center min-h-[300px] bg-[url('/assets/images/Main-Section.jpg')] py-10">
            <span className="uppercase font-['Inconsolata'] text-[#BFA888]">testimonials</span>
            <h3 className="uppercase font-['Cormorant_Upright'] text-[#fff] text-[52px] mb:text-[30px] text-center">
               People about us
            </h3>
            <p className="max-w-[800px] text-[17px] text-center text-[#fff] my-10 mb:text-[14px] tl:px-2">
               Cum sociis Theme natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus auguevelit
               cursus augu evelit cursus et ante tincidunt llam quis ante. Lorem ipsum dolor sit amet, consectetuer
               adipiscing elit, aenean commodo ligula
            </p>
            <span className="uppercase font-['Cormorant_Upright'] text-[#fff] text-[19px]">Customer Name</span>
         </div>
         <div className="max-w-[1300px] mx-auto flex items-center gap-20 mt-20 tl:flex-col tl:gap-10 mb-20">
            <div className="flex flex-col gap-4">
               <h2 className="font-['Cormorant_Upright'] uppercase font-bold text-[#ad7d4a] text-[24px]">
                  1523 yachts
               </h2>
               <p className="text-[15px] w-[300px]">
                  Cruise open waters on one of our 1523 well-maintained yachts, tailored to your preferences and group
                  size.
               </p>
               <Link className="font-['Inconsolata'] font-bold" to={'/yachts-gallery'}>
                  VIEW MORE <i className="fa-solid fa-arrow-right-long text-xs"></i>
               </Link>
            </div>
            <div className="flex flex-col gap-4">
               <h2 className="font-['Cormorant_Upright'] uppercase font-bold text-[#ad7d4a] text-[24px]">
                  LUXURY CABINS
               </h2>
               <p className="text-[15px] w-[300px]">
                  Retreat to sumptuous comfort in our cabins, designed for relaxation and elegance, providing an
                  unforgettable journey.
               </p>
               <Link className="font-['Inconsolata'] font-bold" to={'/yachts-gallery'}>
                  VIEW MORE <i className="fa-solid fa-arrow-right-long text-xs"></i>
               </Link>
            </div>
            <div className="flex flex-col gap-4">
               <h2 className="font-['Cormorant_Upright'] uppercase font-bold text-[#ad7d4a] text-[24px]">
                  Secure Voyages
               </h2>
               <p className="text-[15px] w-[300px]">
                  Our world-class crew, especially our certified skippers, prioritize your safety for a worry-free yacht
                  charter.
               </p>
               <Link className="font-['Inconsolata'] font-bold" to={'/yachts-gallery'}>
                  VIEW MORE <i className="fa-solid fa-arrow-right-long text-xs"></i>
               </Link>
            </div>
         </div>
         {/* <div className="flex flex-col my-10">
            <h2 className="text-[50px] font-['Cormorant_Upright'] uppercase font-bold text-[#021527] text-center mb:text-[30px]">
               By Yacht Type
            </h2>
            <div className=" py-10 my-0 mx-auto flex items-center justify-center">
               <SlideYachtType />
            </div>
         </div> */}
         <div className="w-full flex flex-col"></div>
      </div>
   );
};

export default Home;
