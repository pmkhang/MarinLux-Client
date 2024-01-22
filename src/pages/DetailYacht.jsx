/* eslint-disable react/no-unknown-property */
/* eslint-disable react-refresh/only-export-components */
import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
   BookYacht,
   Breadcrumb,
   DetailYachtItem,
   LoaddingScreen,
   ModalBooking,
   ModalLogin,
   YachtItem,
} from '../components';
import { setCategories, setLocations } from '../redux/Slice/AppStateSlice';
import { setYacht } from '../redux/Slice/YachtSlice';
import { apiGetCategories } from '../services/categoryService';
import { apiGetLocations } from '../services/locationService';
import { apiGetYacht, apiGetYachts } from '../services/yachtService';

const DetailYacht = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { yacht } = useSelector((state) => state.yachts);
   const [showModal, setShowModal] = useState(false);
   const [showBooking, setShowBooking] = useState(false);
   const [similarYachts, setSimilarYachts] = useState([]);
   const { categories } = useSelector((state) => state.appState);
   const [loading, setLoading] = useState(false);

   const location = useLocation();

   useEffect(() => {
      window.scrollTo(0, 0);
   }, [location]);

   useEffect(() => {
      if (id) {
         const fetchYacht = async () => {
            try {
               setLoading(true);
               const response = await apiGetYacht(id);
               if (response?.data?.status) {
                  dispatch(setYacht(response?.data?.yacht));
               }
            } catch (error) {
               if (error.response.status === 404) navigate('/not-found-404');
            } finally {
               setLoading(false);
            }
         };
         fetchYacht();
      }
   }, [dispatch, id, navigate]);

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

   useEffect(() => {
      const fetchYachts = async (query) => {
         try {
            const response = await apiGetYachts(query);
            if (response.data.status) {
               const data = response?.data?.yachts?.data;
               const yachts = data.filter((i) => i?.id !== yacht?.id);
               setSimilarYachts(yachts);
            }
         } catch (error) {
            console.log(error);
         }
      };
      if (yacht?.location_id && yacht?.category_id) {
         fetchYachts({ location: yacht?.location_id, category: yacht?.category_id });
      }
   }, [yacht, yacht?.category_id, yacht?.location_id]);

   return (
      <>
         {loading && <LoaddingScreen />}
         {!loading && (
            <>
               <Breadcrumb title={yacht?.name} />
               <div className="max-w-[1400px] flex flex-col my-10 mx-auto px-6 relative">
                  <div className="flex tl:flex-col items-start gap-10 relative">
                     <DetailYachtItem yacht={yacht} />
                     <div id="sticky" className="w-1/5 tl:w-full flex flex-col items-center sticky top-5">
                        <BookYacht
                           price={yacht?.price_per_day}
                           yachtId={yacht?.id}
                           setShowModal={setShowModal}
                           crewNumber={yacht?.yacht_specifications?.crew}
                           setShowBooking={setShowBooking}
                           location={yacht?.location_id}
                        />
                     </div>
                  </div>
                  {similarYachts.length > 0 && (
                     <div className="max-w-[1400px] mt-10">
                        <h4 className="uppercase font-['Cormorant_Upright'] text-[33px] font-bold">
                           Similar category yacht listings
                        </h4>
                        <div className="grid grid-cols-4 tl:grid-cols-2 mb:grid-cols-1 gap-10 mt-5">
                           {similarYachts.map((i) => (
                              <YachtItem
                                 key={i?.id}
                                 category={
                                    categories?.find((cate) => cate?.id == i?.category_id)?.name || 'Unknown Category'
                                 }
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
                           ))}
                        </div>
                     </div>
                  )}
                  {showModal && <ModalLogin setShowModal={setShowModal} />}
                  {showBooking && <ModalBooking setShowBooking={setShowBooking} />}
               </div>
            </>
         )}
      </>
   );
};

export default memo(DetailYacht);
