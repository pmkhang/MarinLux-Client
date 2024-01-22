import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import { Link } from 'react-router-dom';

const Banner = () => {
   const splideOptions = {
      type: 'loop',
      rewind: true,
      perPage: 1,
      arrows: false,
      pagination: false,
      autoplay: true,
      interval: 5000,
      pauseOnHover: true,
   };
   const matches = [
      { id: 1, url: '/assets/images/banner1.jpg' },
      { id: 2, url: '/assets/images/banner2.jpg' },
      { id: 3, url: '/assets/images/banner3.jpg' },
      { id: 4, url: '/assets/images/banner4.jpg' },
      { id: 5, url: '/assets/images/banner5.jpg' },
   ];

   return (
      <div className="flex items-center justify-center relative">
         <div className="absolute flex flex-col items-center justify-center gap-6 mb-[100px] z-10">
            <img src="/assets/images/logo1.png" alt="logo" className="drop-shadow-3xl w-[600px] mb:w-[300px]" />
            <h2 className="text-white font-['Cormorant_Upright'] text-[40px] font-bold mb:text-[20px]">
               BEYOND WAVES - BENEATH STARTS
            </h2>
            <Link
               className="bg-[#BFA888]  transition-all py-3 px-5 text-white font-bold font-['Inconsolata'] hover:bg-white hover:text-black"
               to={'/yachts-gallery'}
            >
               Booking now
            </Link>
         </div>
         <div>
            <Splide options={splideOptions}>
               {matches.map((match) => (
                  <SplideSlide key={match.id}>
                     <div className="w-full">
                        <img
                           src={match.url}
                           alt={`img ${match.id}`}
                           className="w-full h-[900px] object-cover mb:h-[600px]"
                        />
                     </div>
                     <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#16161694] backdrop-blur-sm"></div>
                  </SplideSlide>
               ))}
            </Splide>
         </div>
      </div>
   );
};

export default Banner;
