import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Breadcrumb, ListItemYacht } from '../components';

const ListYacht = () => {
   const { count } = useSelector((state) => state.yachts);
   const location = useLocation();
   const [searchParams] = useSearchParams([]);
   const page = searchParams.get('page') === null ? 1 : searchParams.get('page');

   const [params, setParams] = useState({
      page: page,
      name: '',
      location: '',
      category: '',
      priceOrder: '',
   });

   useEffect(() => {
      window.scrollTo(0, 0);
   }, [location]);

   const handleChangePage = (data) => {
      setParams((prev) => ({ ...prev, page: data?.selected + 1 }));
   };

   return (
      <>
         <Breadcrumb title="Yachts Gallery" />
         <div className="max-w-[1400px] my-10 mx-auto px-6">
            <div className="min-h-[800px] flex tl:flex-col gap-4">
               <ListItemYacht params={params} setParams={setParams} />
            </div>
            {count > 0 && (
               <ReactPaginate
                  breakLabel="..."
                  nextLabel={<i className="fa-solid fa-chevron-right text-xs"></i>}
                  previousLabel={<i className="fa-solid fa-chevron-left text-xs"></i>}
                  onPageChange={handleChangePage}
                  pageRangeDisplayed={5}
                  pageCount={Math.ceil(count / 24)}
                  containerClassName="w-full flex items-center justify-end gap-3 my-5"
                  pageLinkClassName="inline-flex items-center justify-center w-[35px] h-[35px] border-2 border-[#B3B3B3] hover:bg-gray-100"
                  previousLinkClassName="inline-flex items-center justify-center w-[35px] h-[35px] border-2 border-[#B3B3B3] hover:bg-gray-100"
                  nextLinkClassName="inline-flex items-center justify-center w-[35px] h-[35px] border-2 border-[#B3B3B3] hover:bg-gray-100"
                  activeLinkClassName={`bg-gray-700 text-white`}
               />
            )}
         </div>
      </>
   );
};

export default ListYacht;
