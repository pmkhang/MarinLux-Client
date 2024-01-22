/** @type {import('tailwindcss').Config} */
export default {
   content: [
      './index.html',
      './src/**/*.{js,ts,jsx,tsx}',
      './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
   ],
   theme: {
      extend: {
         screens: {
            dt: { max: '1400px' },
            tl: { max: '1024px' },
            mb: { max: '768px' },
         },
      },
   },
   plugins: [],
};
