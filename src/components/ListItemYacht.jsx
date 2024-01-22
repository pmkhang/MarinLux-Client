/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategories, setLocations } from '../redux/Slice/AppStateSlice';
import { apiGetCategories } from '../services/categoryService';
import { apiGetLocations } from '../services/locationService';
import FilterYachts from './FilterYachts';
import YachtItem from './YachtItem';

const ListItemYacht = ({ params, setParams }) => {
   const dispatch = useDispatch();
   const { yachts } = useSelector((state) => state.yachts);
   const [isLoading, setIsLoading] = useState(false);
   const { categories } = useSelector((state) => state.appState);

   useEffect(() => {
      const fetchData = async (apiFunction, handleData) => {
         try {
            const response = await apiFunction();
            if (response?.data?.status) {
               handleData(response?.data);
            }
         } catch (error) {
            console.log(error);
         }
      };

      const handleCategoriesData = (data) => {
         dispatch(setCategories(data?.categories));
      };

      const handleLocationsData = (data) => {
         dispatch(setLocations(data?.locations));
      };
      fetchData(apiGetCategories, handleCategoriesData);
      fetchData(apiGetLocations, handleLocationsData);
   }, [dispatch]);

   return (
      <div className="w-full flex flex-col gap-10 p-3">
         <FilterYachts setIsLoading={setIsLoading} params={params} setParams={setParams}/>
         <div className="grid grid-cols-4 tl:grid-cols-2 mb:grid-cols-1 gap-10">
            {isLoading ? (
               Array.from({ length: 4 }, (_, index) => (
                  <div key={index} role="status" className="animate-pulse">
                     <div className="flex items-center justify-center w-[300px] h-[400px] mb-4 bg-[#fef5ec] rounded"></div>
                     <div className="h-2.5 bg-[#fff8f1] rounded-full w-48 mb-4" />
                     <div className="h-2 bg-[#fff8f1] rounded-full mb-2.5" />
                     <div className="h-2 bg-[#fff8f1] rounded-full mb-2.5" />
                     <div className="h-2 bg-[#fff8f1] rounded-full mb-2.5" />
                     <div className="h-2 bg-[#fff8f1] rounded-full mb-2.5" />
                     <div className="h-2 bg-[#fff8f1] rounded-full" />
                  </div>
               ))
            ) : yachts && yachts.length > 0 ? (
               yachts.map((i) => (
                  <YachtItem
                     key={i?.id}
                     category={categories?.find((cate) => cate?.id == i?.category_id)?.name || 'Unknown Category'}
                     desc={
                        i?.description?.length > 100
                           ? `${i?.description.slice(0, 100)}...`
                           : i?.description || 'No description available'
                     }
                     name={i?.name || 'No Name'}
                     price={i?.price_per_day || 0}
                     id={i?.id}
                     img={i?.yacht_images?.[0]?.image || ''}
                  />
               ))
            ) : (
               <p className="text-xl px-2">No yachts available.</p>
            )}
         </div>
      </div>
   );
};

export default ListItemYacht;
