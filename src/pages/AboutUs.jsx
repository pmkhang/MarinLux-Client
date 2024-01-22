import { Link } from 'react-router-dom';

const AboutUs = () => {
   return (
      <div className="w-full flex flex-col items-center">
         <div className="w-full h-[680px] tl:h-[400px] bg-[#F4F2ED]">
            <div className="flex items-center justify-center">
               <img src="/assets/images/anchor.png" alt="anchor" className="mt-20 tl:mt-10 mb:h-[70px]" />
            </div>
            <h3 className="text-center uppercase mt-10 text-[16px] text-[#BFA888]">YACHTING COMPANY</h3>
            <h3 className="text-center uppercase text-[63px] tl:text-[40px] mb:text-[30px] font-['Cormorant_Upright']">
               SuperYacht Since 1971.
            </h3>
            <div className="bg-[url('/assets/images/yacht-about-us.png')] h-[520px] tl:h-[180px] tl:bg-contain mb:min-h-[120px] bg-no-repeat bg-center mt-[-120px] tl:mt-[-30px] mb:mt-[10px]"></div>
         </div>
         <div className="mt-32 max-w-[1400px] flex items-center">
            <div className="w-full flex flex-col items-center gap-6">
               <div className="flex items-center gap-6 tl:flex-col">
                  <div className="w-1/2 tl:w-full tl:px-4 mb:flex-col flex items-center gap-4">
                     <div className="w-[125px] h-[125px] border border-[##C0A888] flex items-center justify-center">
                        <img src="/assets/images/anchor.png" alt="anchor" />
                     </div>
                     <div className="flex-1">
                        <h3 className="text-[24px] font-['Cormorant_Upright'] mb:text-center font-bold">
                           8 years experience
                        </h3>
                        <p className="text-[15px] mb:text-center">
                           With 8 years of expertise, we bring seasoned knowledge to every charter, ensuring a seamless
                           and enjoyable journey tailored to your preferences.
                        </p>
                     </div>
                  </div>
                  <div className="w-1/2 tl:w-full tl:px-4 mb:flex-col flex items-center gap-4">
                     <div className="w-[125px] h-[125px] border border-[##C0A888] flex items-center justify-center">
                        <img src="/assets/images/about1.png" alt="anchor" />
                     </div>
                     <div className="flex-1">
                        <h3 className="text-[24px] font-['Cormorant_Upright'] mb:text-center font-bold">
                           Professional Crew
                        </h3>
                        <p className="text-[15px] mb:text-center">
                           Our dedicated crew, with a commitment to service excellence, ensures your safety and comfort,
                           creating a memorable and luxurious yachting experience.
                        </p>
                     </div>
                  </div>
               </div>
               <div className="flex items-center gap-6  tl:flex-col">
                  <div className="w-1/2 tl:w-full tl:px-4 mb:flex-col flex items-center gap-4">
                     <div className="w-[125px] h-[125px] border border-[##C0A888] flex items-center justify-center">
                        <img src="/assets/images/about2.png" alt="anchor" />
                     </div>
                     <div className="flex-1">
                        <h3 className="text-[24px] font-['Cormorant_Upright'] mb:text-center font-bold">
                           Amazing Ports
                        </h3>
                        <p className="text-[15px] mb:text-center">
                           Explore breathtaking destinations as we dock in amazing ports, offering you the chance to
                           savor diverse cultures and picturesque landscapes.
                        </p>
                     </div>
                  </div>
                  <div className="w-1/2 tl:w-full tl:px-4 mb:flex-col flex items-center gap-4">
                     <div className="w-[125px] h-[125px] border border-[##C0A888] flex items-center justify-center">
                        <img src="/assets/images/about3.png" alt="anchor" />
                     </div>
                     <div className="flex-1">
                        <h3 className="text-[24px] font-['Cormorant_Upright'] mb:text-center font-bold">
                           Discover new places
                        </h3>
                        <p className="text-[15px] mb:text-center">
                           Embark on a journey of discovery with us. From hidden gems to renowned destinations, our
                           charters open the door to new and exciting experiences at sea.
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="relative mt-32 w-full h-[525px] bg-[url('/assets/images/home-1-parallax.png')] bg-fixed bg-no-repeat bg-cover bg-center flex items-center">
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#dddddd11] backdrop-blur-sm"></div>
            <div className="absolute w-full flex flex-col items-center justify-center">
               <h2 className="text-[80px] font-bold font-['Cormorant_Upright'] text-white text-center tl:text-[60px] mb:text-[30px] ">
                  DISCOVER NEW YACHTS
               </h2>
               <Link
                  to={'/'}
                  className="mt-10 py-[16px] px-[50px] bg-[#BFA888] text-white hover:no-underline hover:bg-white hover:text-black"
               >
                  EXPLORE
               </Link>
            </div>
         </div>
         <div className="my-32 max-w-[1400px] flex tl:flex-col gap-10 px-10 tl:px-2 items-center">
            <div className="w-2/3">
               <img src="/assets/images/About-img-2.png" alt="" />
            </div>
            <div className="flex flex-col w-full ml-20 gap-3">
               <span className="uppercase text-[#BFA888] font-['Inconsolata']">Nautical service</span>
               <h3 className="text-[60px] font-bold font-['Cormorant_Upright'] uppercase tl:text-[30px]">
                  What We Offer
               </h3>
               <ul className="flex flex-col gap-10 mt-10 w-2/3 tl:mt-2">
                  <li>
                     • Effortless Charter Experience: Enjoy a hassle-free journey from inquiry to disembarkation. Our
                     seasoned Charter Consultants handle all logistics, guaranteeing a seamless and stress-free yacht
                     rental experience for you and your guests.
                  </li>
                  <li>
                     • Unrivaled Luxury Services: Indulge in unparalleled luxury with our top-notch amenities, including
                     Michelin-level dining, seven-star service, and an extensive list of watersports and shore
                     excursions. Your yacht vacation with us promises not just a trip but a memory-rich, unforgettable
                     adventure.
                  </li>
               </ul>
            </div>
         </div>
         <div className="py-32 w-full flex flex-col items-center bg-[#F4F2ED]">
            <span className="uppercase text-[#BFA888] font-['Inconsolata']">Nautical Company</span>
            <h3 className="text-[60px] font-bold font-['Cormorant_Upright'] uppercase tl:text-[30px]">Meet our Crew</h3>
            <p className="text-center w-2/4">
               Our team is committed to curating unparalleled yacht experiences, ensuring every voyage is a seamless
               blend of luxury, safety, and unforgettable moments.
            </p>
            <div className="max-w-[1400px] mt-10 flex items-center gap-10">
               <div className="flex flex-col items-center gap-3">
                  <div className="w-[200px] h-[200px] p-2 object-cover border border-[#CCC]">
                     <img src="/assets/images/team-1.jpg" alt="team1" className="" />
                  </div>
                  <span className="text-[20px] font-bold font-['Cormorant_Upright'] uppercase">Pham Minh Khang</span>
                  <span className="mt-[-15px] text-[14px] font-['Inconsolata']">CEO</span>
               </div>
               <div className="flex flex-col items-center gap-3">
                  <div className="w-[200px] h-[200px] p-2 object-cover border border-[#CCC]">
                     <img src="/assets/images/team-2.jpg" alt="team1" className="" />
                  </div>
                  <span className="text-[20px] font-bold font-['Cormorant_Upright'] uppercase">Tran quang dai</span>
                  <span className="mt-[-15px] text-[14px] font-['Inconsolata']">Head of Captains</span>
               </div>
               <div className="flex flex-col items-center gap-3">
                  <div className="w-[200px] h-[200px] p-2 object-cover border border-[#CCC]">
                     <img src="/assets/images/team-3.jpg" alt="team1" className="" />
                  </div>
                  <span className="text-[20px] font-bold font-['Cormorant_Upright'] uppercase">bui thien nga</span>
                  <span className="mt-[-15px] text-[14px] font-['Inconsolata']">COO</span>
               </div>
               <div className="flex flex-col items-center gap-3">
                  <div className="w-[200px] h-[200px] p-2 object-cover border border-[#CCC]">
                     <img src="/assets/images/team-4.jpg" alt="team1" className="" />
                  </div>
                  <span className="text-[20px] font-bold font-['Cormorant_Upright'] uppercase">sam gia cuong</span>
                  <span className="mt-[-15px] text-[14px] font-['Inconsolata']">Chairman</span>
               </div>
            </div>
         </div>
      </div>
   );
};

export default AboutUs;
