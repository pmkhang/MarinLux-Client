/* eslint-disable react/prop-types */
const FeeDetail = ({ price, charter, service, tax, insurance, total, deposit, refundAmount }) => {
   return (
      <div className="flex flex-col items-start justify-center my-4 px-2">
         <h4 className="uppercase text-xl font-semibold mb-2">Fee detail</h4>
         <div className="w-full flex flex-col gap-1">
            <div className="flex items-center justify-between border-b border-slate-200">
               <span>Charter yacht fee:</span>
               <span>${price}/day</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-200">
               <span>Total Charter yacht fee:</span>
               <span>${charter}</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-200">
               <span>
                  Service fee <i className="text-sm">(*15%)</i>:
               </span>
               <span>${service}</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-200">
               <span>
                  Tax <i className="text-sm">(*7%)</i>:
               </span>
               <span>${tax}</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-200">
               <span>
                  Insurance <i className="text-sm">$50/guest/day</i>:
               </span>
               <span>${insurance}</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-200 text-xl font-bold">
               <span>Total:</span>
               <span>${total}</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-200 text-xl font-bold">
               <span>Deposit:</span>
               <span>${deposit}</span>
            </div>
            <div>
               <p className="text-[16px]">
                  We will refund <b>${refundAmount}</b> when you complete the trip
               </p>
            </div>
         </div>
      </div>
   );
};

export default FeeDetail;
