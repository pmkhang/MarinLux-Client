/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { apiGetYachtFeedback } from '../services/yachtService';
import formatDateAndTime from '../utils/dateFormat';

const DetailYachtItem = ({ yacht }) => {
   const { categories, locations } = useSelector((state) => state.appState);
   const [feedback, setFeedback] = useState([]);

   useEffect(() => {
      const getFeedback = async () => {
         try {
            const response = await apiGetYachtFeedback(yacht?.id);
            if (response.data.status) {
               setFeedback(response.data.feedbacks);
            }
         } catch (error) {
            console.log(error);
         }
      };
      getFeedback();
   }, [yacht?.id]);

   return (
      <div className="w-4/5 tl:w-full p-3">
         <Link to={'/yachts-gallery'}>
            <i className="fa-solid fa-chevron-left text-xs mr-5"></i>Back to List
         </Link>
         <div className="flex flex-col mt-10">
            <span className="text-[#BFA888] text-[17px]">
               {locations?.find((loca) => loca?.id == yacht?.location_id)?.name}
            </span>
            <h3 className="font-['Cormorant_Upright'] text-[33px] uppercase font-bold">{yacht?.name}</h3>
            <p className="text-[#404040] mt-10">{yacht?.description}</p>
            <h4 className="uppercase font-['Cormorant_Upright'] text-[33px] font-bold mt-[60px] mb-[-60px]">
               specifications
            </h4>
            <div className="mt-20 flex items-center gap-[250px] font-['Inconsolata'] tl:flex-col tl:items-start tl:gap-10">
               <table>
                  <tbody className="flex flex-col gap-4">
                     <tr className="flex items-center gap-[100px] ">
                        <td className="inline-block w-[10px] font-bold text-[#735c3b]">Year:</td>
                        <td className="inline-block ">{yacht?.yacht_specifications?.year}</td>
                     </tr>
                     <tr className="flex items-center gap-[100px]">
                        <td className="inline-block w-[10px] font-bold text-[#735c3b]">Wifi:</td>
                        <td className="inline-block ">Yes</td>
                     </tr>
                     <tr className="flex items-center gap-[100px]">
                        <td className="inline-block w-[10px] font-bold text-[#735c3b]">CREW:</td>
                        <td className="inline-block ">{yacht?.yacht_specifications?.crew}</td>
                     </tr>
                     <tr className="flex items-center gap-[100px]">
                        <td className="inline-block w-[10px] font-bold text-[#735c3b]">SPEEDS:</td>
                        <td className="inline-block ">{yacht?.yacht_specifications?.speed} km/h</td>
                     </tr>
                  </tbody>
               </table>
               <table>
                  <tbody className="flex flex-col gap-4">
                     <tr className="flex items-center gap-[100px]">
                        <td className="inline-block w-[10px] font-bold text-[#735c3b]">BUILDER:</td>
                        <td className="inline-block ">{yacht?.yacht_specifications?.builder}</td>
                     </tr>
                     <tr className="flex items-center gap-[100px]">
                        <td className="inline-block w-[10px] font-bold text-[#735c3b]">CATEGORY:</td>
                        <td className="inline-block ">
                           {categories?.find((cate) => cate?.id == yacht?.category_id)?.name}
                        </td>
                     </tr>
                     <tr className="flex items-center gap-[100px]">
                        <td className="inline-block w-[10px] font-bold text-[#735c3b]">CABIN:</td>
                        <td className="inline-block ">{yacht?.yacht_specifications?.cabin}</td>
                     </tr>
                     <tr className="flex items-center gap-[100px]">
                        <td className="inline-block w-[10px] font-bold text-[#735c3b]">LENGTH:</td>
                        <td className="inline-block ">{yacht?.yacht_specifications?.length}</td>
                     </tr>
                  </tbody>
               </table>
            </div>
            <div className="flex flex-col mt-10">
               <h4 className="uppercase font-['Cormorant_Upright'] text-[33px] font-bold">
                  {yacht?.name} IMAGES Gallery
               </h4>
               <div className="flex items-center gap-4 tl:flex-col mt-10">
                  <img
                     src={yacht?.yacht_images?.[0]?.image}
                     alt="home1"
                     className="w-[500px] h-[800px] tl:w-full object-cover"
                  />
                  <div className="flex flex-col gap-4 tl:flex-col">
                     <div className="flex items-center gap-4 tl:flex-col">
                        <img
                           src={yacht?.yacht_images?.[1]?.image}
                           alt="home1"
                           className="h-[390px] w-[260px] tl:h-[800px] tl:w-full object-cover"
                        />
                        <img
                           src={yacht?.yacht_images?.[2]?.image}
                           alt="home1"
                           className="h-[390px] w-[260px] tl:h-[800px] tl:w-full object-cover"
                        />
                     </div>
                     <div className="flex items-center gap-4 tl:flex-col">
                        <img
                           src={yacht?.yacht_images?.[3]?.image}
                           alt="home1"
                           className="h-[390px] w-[260px] tl:h-[800px] tl:w-full object-cover"
                        />
                        <img
                           src={yacht?.yacht_images?.[4]?.image}
                           alt="home1"
                           className="h-[390px] w-[260px] tl:h-[800px] tl:w-full object-cover"
                        />
                     </div>
                  </div>
               </div>
            </div>
            {feedback?.length > 0 && (
               <div className="mt-10 w-full">
                  <h3 className="uppercase font-['Cormorant_Upright'] text-[33px] font-bold">Feedback</h3>
                  <div className="w-full">
                     {feedback?.map((i) => (
                        <div key={i?.id} className="flex gap-4 mt-6">
                           <img
                              src={i?.user?.avatar}
                              className="w-14 h-14 rounded-full object-cover shadow-md"
                              alt="avatar"
                           />
                           <div className="flex flex-col w-full">
                              <p className="font-medium">
                                 <i className="uppercase">{i?.user?.name}</i> -
                                 <i className="ml-1">{formatDateAndTime(i?.created_at)}</i> -
                                 <i className="ml-1 text-lg uppercase">{i?.title}</i>
                              </p>
                              <span>{i?.feedback}</span>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            )}
         </div>
      </div>
   );
};

export default DetailYachtItem;
