export default function formatDateAndTime(inputDateTimeString) {
   const inputDate = new Date(inputDateTimeString);

   const day = String(inputDate.getDate()).padStart(2, '0');
   const month = String(inputDate.getMonth() + 1).padStart(2, '0');
   const year = inputDate.getFullYear();

   const formattedDate = `${year}-${month}-${day}`;

   return `${formattedDate}`;
}
