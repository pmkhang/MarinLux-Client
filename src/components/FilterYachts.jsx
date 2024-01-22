/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { setCount, setYachts } from '../redux/Slice/YachtSlice';
import { apiGetYachts } from '../services/yachtService';
import InputField from './InputField';
import Selector from './Selector';

const FilterYachts = ({ setIsLoading, params, setParams }) => {
   const [searchParams, setSearchParams] = useSearchParams([]);
   const {
      handleSubmit,
      formState: { errors },
      control,
      setValue,
   } = useForm();
   const dispatch = useDispatch();
   const { categories, locations } = useSelector((state) => state.appState);
   const FilerPrice = [
      { id: 'DESC', name: 'High to Low' },
      { id: 'ASC', name: 'Low to High' },
   ];

   const { page, name, location, category, priceOrder } = params;

   useEffect(() => {
      setSearchParams({
         page,
         name,
         location,
         category,
         priceOrder,
      });
   }, [category, location, name, page, priceOrder, setSearchParams]);

   useEffect(() => {
      const fetchYachts = async (query, page) => {
         try {
            setIsLoading(true);
            const response = await apiGetYachts(query, page);
            if (response.data.status) {
               const data = response?.data?.yachts?.data;
               const count = response?.data?.yachts?.total;
               dispatch(setYachts(data));
               dispatch(setCount(count));
            }
         } catch (error) {
            console.log(error);
         } finally {
            setIsLoading(false);
         }
      };
      const queryParams = ['name', 'location', 'category', 'priceOrder'];
      const query = {};
      queryParams.forEach((param) => {
         const value = searchParams.get(param);
         if (value) {
            setValue(param, value);
            query[param] = value;
         }
      });
      const hasQueryParams = Object.keys(query).length > 0;
      fetchYachts(hasQueryParams ? query : undefined, page);
   }, [dispatch, page, searchParams, setIsLoading, setValue]);

   const submitQuery = (data) => {
      setParams({
         page: 1,
         name: data.name,
         location: data.location,
         category: data.category,
         priceOrder: data.priceOrder,
      });
   };

   return (
      <form className="flex items-center mb:flex-col gap-6" onSubmit={handleSubmit(submitQuery)}>
         <Selector name={'location'} control={control} optionPlaceHolder={'Location'} options={locations} />
         <Selector name={'category'} control={control} optionPlaceHolder={'Category'} options={categories} />
         <Selector name={'priceOrder'} control={control} optionPlaceHolder={'Filter price'} options={FilerPrice} />
         <InputField name="name" type="text" control={control} errors={errors} placeholder="Search yacht name" />
         <button className="w-[150px] tl:w-full p-3 border-2 bg-[#021527] text-[#fbce9f] hover:text-white">
            <i className="fa-solid fa-magnifying-glass"></i>
         </button>
      </form>
   );
};

export default FilterYachts;
