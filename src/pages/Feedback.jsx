import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { InputField } from '../components';
import { apiFeedback } from '../services/bookingService';

const Feedback = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   const {
      handleSubmit,
      formState: { errors },
      control,
      register,
      reset,
   } = useForm();

   const submit = async (data) => {
      try {
         const response = await apiFeedback(data, id);
         if (response?.data?.status) {
            reset();
            navigate('/my-booking/' + id);
         }
      } catch (error) {
         console.log(error);
      }
      console.log(data);
   };
   return (
      <div className="w-full h-fit py-20 bg-[#F4F2ED]">
         <div className="max-w-[1400px] px-5 mx-auto flex tl:flex-col justify-center  gap-20 tl:gap-0">
            <form className="w-1/2" onSubmit={handleSubmit(submit)}>
               <h3 className="font-['Cormorant_Upright'] text-[40px] font-bold">FEEDBACK</h3>
               <InputField
                  label="Title:"
                  name="title"
                  type="text"
                  control={control}
                  rules={{ required: 'Please enter title' }}
                  errors={errors}
                  placeholder="How do you feel ?"
               />
               <div className="w-full flex flex-col mb-2 gap-2 mt-2">
                  <label className="font-bold" htmlFor={'message'}>
                     Share your thoughts:
                  </label>
                  <textarea
                     rows={10}
                     id="messager"
                     className="p-3 border-2 border-[#B3B3B3] bg-[#F4F2ED]"
                     {...register('feedback', {
                        required: 'Please enter your feedback',
                     })}
                     placeholder="Please share your thoughts in more details so other customers could refer"
                  ></textarea>
                  {errors.feedback && <span className="text-red-500">{errors.feedback.message}</span>}
               </div>
               <button className="w-full mt-3 bg-[#BFA888] transition-all p-3 text-white font-['Inconsolata'] hover:bg-white hover:text-black">
                  Send Feedback
               </button>
            </form>
            <div className="w1/2 tl:w-full px-6 mt-20 tl:mb-20">
               <img src="/assets/images/Contact-img-1.jpg" alt="" />
            </div>
         </div>
      </div>
   );
};

export default Feedback;
