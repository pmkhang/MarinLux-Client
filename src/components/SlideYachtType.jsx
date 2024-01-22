import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import { useEffect, useState } from 'react';

const SlideYachtType = () => {
   const [windowWidth, setWindowWidth] = useState(window.innerWidth);
   const [perPage, setPerPage] = useState();
   const handleResize = () => {
      setWindowWidth(window.innerWidth);
   };

   useEffect(() => {
      if (windowWidth >= 1024) {
         setPerPage(4);
      } else {
         setPerPage(2);
      }
      window.addEventListener('resize', handleResize);

      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, [windowWidth]);

   const splideOptions = {
      type: 'loop',
      rewind: true,
      perPage,
      arrows: false,
      pagination: false,
      autoplay: true,
      interval: 5000,
      pauseOnHover: true,
   };
   const yatchType = [
      { id: 1, url: '/assets/images/yacht-type-catamarans.png', title: 'Catamarans' },
      { id: 2, url: '/assets/images/yacht-type-classic-yachts.png', title: 'classic' },
      { id: 3, url: '/assets/images/yacht-type-expedition-yachts.png', title: 'Expedition' },
      { id: 4, url: '/assets/images/yacht-type-gulet-yachts.png', title: 'Gulet' },
      { id: 6, url: '/assets/images/yacht-type-motor-yachts.png', title: 'Motor' },
      { id: 7, url: '/assets/images/yacht-type-open-yachts.png', title: 'Open' },
      { id: 8, url: '/assets/images/yacht-type-sailing-yachts.png', title: 'Sailing' },
      { id: 9, url: '/assets/images/yacht-type-sport-fishing.png', title: 'Sport' },
   ];
   return (
      <div className="max-w-[1200px] px-3">
         <Splide options={splideOptions}>
            {yatchType.map((i) => (
               <SplideSlide key={i.id}>
                  <div className="flex flex-col items-center  gap-2">
                     <img src={i.url} alt={i.title} className="h-[50px] mb:h-[50px]" />
                     <h3 className="text-xl font-['Cormorant_Upright'] font-bold mb:text-xl">{i.title}</h3>
                  </div>
               </SplideSlide>
            ))}
         </Splide>
      </div>
   );
};

export default SlideYachtType;
