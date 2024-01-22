import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RollTop } from './components';
import { DefaultLayout } from './layouts';
import { setShowMenuUser } from './redux/Slice/AppStateSlice';
import { setIsLoggin, setUserData } from './redux/Slice/AuthSlice';
import { Routers } from './routes';
import { apiGetProfile } from './services/authService';

const App = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { isLoggedIn } = useSelector((state) => state.auth);

   const isLogin = JSON.parse(localStorage.getItem('auth'))?.isLogin;

   useEffect(() => {
      if (isLogin) {
         dispatch(setIsLoggin(isLogin));
      }
   }, [dispatch, isLogin]);

   useEffect(() => {
      const getProfile = async () => {
         try {
            const response = await apiGetProfile();
            if (response?.data?.status) {
               dispatch(
                  setUserData({
                     id: response?.data?.user?.id,
                     email: response?.data?.user?.email,
                     name: response?.data?.user?.name,
                     phone: response?.data?.user?.phone,
                     avatar: response?.data?.user?.avatar,
                  }),
               );
            }
         } catch (error) {
            if (error?.response?.status === 401) {
               dispatch(setUserData([]));
               dispatch(setIsLoggin(false));
               toast.warning('Your account has expired, you need to log in again to continue');
               navigate('/login');
            }
         }
      };
      if (isLoggedIn) {
         getProfile();
      }
   }, [dispatch, isLoggedIn, navigate]);

   return (
      <div className="w-full">
         <DefaultLayout>
            <main onClick={() => dispatch(setShowMenuUser(false))}>
               <Routers />
            </main>
         </DefaultLayout>
         <RollTop />
         <ToastContainer />
      </div>
   );
};

export default App;
