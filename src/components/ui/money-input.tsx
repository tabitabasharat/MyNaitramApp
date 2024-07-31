// import React, { useState } from 'react';

// const formatMoney = (value) => {
//   // Remove any non-digit characters except for the decimal point
//   const cleanedValue = value.replace(/[^\d.]/g, '');
//   // Ensure there is only one decimal point
//   const parts = cleanedValue.split('.');
//   const integerPart = parts[0];
//   let decimalPart = parts[1] ? parts[1].slice(0, 2) : '';

//   // Format the integer part with commas
//   const formattedIntegerPart = integerPart.replace(
//     /\B(?=(\d{3})+(?!\d))/g,
//     ',',
//   );

//   // Ensure the decimal part has two digits
//   if (decimalPart.length === 1) {
//     decimalPart = `${decimalPart}0`;
//   } else if (decimalPart.length === 0 && parts.length > 1) {
//     decimalPart = '00';
//   }

//   // Join the integer part and the decimal part
//   const formattedValue = decimalPart
//     ? `${formattedIntegerPart}.${decimalPart}`
//     : formattedIntegerPart;
//   return formattedValue ? `$${formattedValue}` : '';
// };

// const MoneyInput = () => {
//   const [value, setValue] = useState('');

//   const handleChange = (e) => {
//     const inputValue = e.target.value;
//     const formattedValue = formatMoney(inputValue);
//     setValue(formattedValue);
//   };

//   return (
//     <div className="relative inline-block">
//       <input
//         type="text"
//         value={value}
//         onChange={handleChange}
//         className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
//         placeholder="$0.00"
//       />
//     </div>
//   );
// };

// export default MoneyInput;
