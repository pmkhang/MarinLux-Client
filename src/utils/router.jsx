import {
   AboutUs,
   ContactUs,
   ListYacht,
   Home,
   DetailYacht,
   Login,
   Register,
   Payment,
   UserProfile,
   UserBooking,
   BookingDetail,
   RefundPolicy,
   Feedback,
} from '../pages';

const router = [
   { path: '', element: <Home />, title: 'Home' },
   { path: 'yachts-gallery', element: <ListYacht />, title: 'Yacht List' },
   { path: 'detail-yatch/:id', element: <DetailYacht />, title: 'Yacht Detail' },
   { path: 'about-us', element: <AboutUs />, title: 'About Us' },
   { path: 'contact-us', element: <ContactUs />, title: 'Contact Us' },
   { path: 'login', element: <Login />, title: 'Login' },
   { path: 'sign-up', element: <Register />, title: 'Sign Up' },
   { path: 'payment/:id', element: <Payment />, title: 'Payment' },
   { path: 'profile', element: <UserProfile />, title: 'Profile' },
   { path: 'my-booking', element: <UserBooking />, title: 'My booking' },
   { path: 'my-booking/:id', element: <BookingDetail />, title: 'booking detail' },
   { path: 'refund-policy', element: <RefundPolicy />, title: 'Refund policy' },
   { path: 'feedback/:id', element: <Feedback />, title: 'Feedback' },
];

export default router;
