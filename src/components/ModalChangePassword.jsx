/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { apiChangePassword } from '../services/authService';
import InputField from './InputField';

const ModalChangePassword = ({ setShowModal }) => {
   const {
      handleSubmit,
      control,
      formState: { errors },
      reset,
      watch,
   } = useForm();

   const changePassword = async (data) => {
      try {
         const response = await apiChangePassword(data);
         if (response?.data?.status) {
            toast.success('Change password successfully');
            setShowModal(false);
         }
      } catch (error) {
         if (!error?.response?.data?.status) {
            toast.error('Current password is incorrect.');
         }
      }
   };

   return (
      <div
         className="fixed flex items-center justify-center top-0 bottom-0 right-0 left-0 backdrop-blur bg-[#1f1f1f9e]"
         onClick={(e) => {
            e.stopPropagation();
            setShowModal(false);
         }}
      >
         <div
            className="w-[700px] h-fit bg-white shadow-lg pb-4 mb-5"
            onClick={(e) => {
               e.stopPropagation();
               setShowModal(true);
            }}
         >
            <form
               className="p-4 flex flex-col justify-center items-center relative"
               onSubmit={handleSubmit(changePassword)}
            >
               <i
                  className="fa-solid fa-x text-2xl absolute top-3 right-4 cursor-pointer"
                  onClick={(e) => {
                     e.stopPropagation();
                     setShowModal(false);
                     reset();
                  }}
               ></i>
               <h3 className="font-['Cormorant_Upright'] font-bold text-[40px] uppercase"></h3>
               <div className="w-full px-10 flex flex-col">
                  <InputField
                     label="Current password"
                     name="current_password"
                     type="password"
                     control={control}
                     rules={{
                        required: 'Please enter your current password',
                     }}
                     errors={errors}
                  />
                  <InputField
                     label="New password: "
                     name="new_password"
                     type="password"
                     control={control}
                     rules={{
                        required: 'Please enter new password',
                     }}
                     errors={errors}
                  />

                  <InputField
                     label="New password confirm:"
                     name="new_password_confirm"
                     type="password"
                     control={control}
                     rules={{
                        validate: (val) => {
                           if (watch('new_password') !== val) {
                              return 'New password confirm do no match';
                           }
                        },
                     }}
                     errors={errors}
                  />

                  <div className="mt-10 w-full flex flex-col gap-3">
                     <button
                        onClick={(e) => e.stopPropagation()}
                        className="bg-[#BFA888] transition-all p-3 text-white font-['Inconsolata'] hover:bg-white hover:text-black"
                     >
                        Submit
                     </button>
                  </div>
               </div>
            </form>
         </div>
      </div>
   );
};

export default ModalChangePassword;
