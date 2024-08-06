// import Nine from "./Nine";

// const Journy = () => {
//   return (
//     <section className="pt-[80px] pb-[40px] ">
//       <h2 className="md:text-6xl text-[30px] font-[600] text-center text-white mb-[20px]">Our Journey</h2>
//       <div className="md:flex d-none">
//         <ul className="flex flex-col md:w-[50%] w-[100%] items-center justify-between">
//           <li className="text-[27px] font-[600]"><a className="px-[20px] py-[10px] text-[#009540]">2019</a></li>
//           <li className="text-[27px] font-[600]"><a className="px-[20px] py-[10px]">2021</a></li>
//           <li className="text-[27px] font-[600]"><a className="px-[20px] py-[10px]">2022</a></li>
//           <li className="text-[27px] font-[600]"><a className="px-[20px] py-[10px]">2023/24</a></li>
//         </ul>
//         <div>
//             <Nine />
//         </div>
//       </div>
//     </section>
//   );
// };
// export default Journy;

"use client";
import React, { useState } from "react";
import Year2019 from "./Year2019";
import { text } from "stream/consumers";
// import Year2021 from '../components/Year2021';
// import Year2022 from '../components/Year2022';
// import Year2023 from '../components/Year2023';

const Journy = () => {
  const [currentYear, setCurrentYear] = useState("2019");

  const renderComponent = () => {
    switch (currentYear) {
      case "2019":
        return <Year2019 />;
      case "2021":
        return <Year2019 />;
      case "2022":
        return <Year2019 />;
      case "2023/24":
        return <Year2019 />;
      default:
        return null;
    }
  };

  return (
    <section className="pt-[80px] pb-[40px]">
      <h2 className="md:text-6xl text-[30px] font-[600] text-center text-white mb-[20px]">
        Our Journey
      </h2>
      <div className="md:flex">
        <ul className="flex flex-col md:w-[50%] w-[100%] items-center justify-between">
          <li
            className="text-[27px] font-[600]  flex items-center justify-between  w-[100%] md:w-auto px-[20px] md:px-[0px] md:py-[0px]"
            onClick={() => setCurrentYear("2019")}
          >
            <a
              className={`md:px-[20px] md:py-[10px] px-[0px] py-[0px] md:h-auto h-[30px]  ${
                currentYear === "2019" ? "text-[#009540]" : "text-white"
              }`}
            >
              2019
            </a>
            <a
              className={`font-[900] text-[40px] md:hidden text-center  ${
                currentYear === "2019" ? "text-[#009540]" : "text-white"
              } `}
            >
              {currentYear === "2019" ? "-" : "+"}
            </a>
          </li>
          <li
            className="text-[27px] font-[600]  flex items-center justify-between  w-[100%] md:w-auto px-[20px] md:px-[0px] md:py-[0px]"
            onClick={() => setCurrentYear("2021")}
          >
            <a
              className={`md:px-[20px] md:py-[10px] px-[0px] py-[0px] md:h-auto h-[30px] ${
                currentYear === "2021" ? "text-[#009540]" : "text-white"
              }`}
            >
              2021
            </a>
            <a
              className={`font-[900] text-[40px] md:hidden text-center ${
                currentYear === "2021" ? "text-[#009540]" : "text-white"
              } `}
            >
              {currentYear === "2021" ? "-" : "+"}
            </a>
          </li>
          <li
            className="text-[27px] font-[600]  flex items-center justify-between  w-[100%] md:w-auto px-[20px] md:px-[0px] md:py-[0px]"
            onClick={() => setCurrentYear("2022")}
          >
            <a
              className={`md:px-[20px] md:py-[10px] px-[0px] py-[0px] md:h-auto h-[30px] ${
                currentYear === "2022" ? "text-[#009540]" : "text-white"
              }`}
            >
              2022
            </a>
            <a
              className={`font-[900] text-[40px] md:hidden text-center ${
                currentYear === "2022" ? "text-[#009540]" : "text-white"
              } `}
            >
              {currentYear === "2022" ? "-" : "+"}
            </a>
          </li>
          <li
            className="text-[27px] font-[600] flex items-center justify-between  w-[100%] md:w-auto px-[20px] md:px-[0px] md:py-[0px] "
            onClick={() => setCurrentYear("2023/24")}
          >
            <a
              className={`md:px-[20px] md:py-[10px] px-[0px] py-[0px] text-center md:h-auto h-[30px] ${
                currentYear === "2023/24" ? "text-[#009540]" : "text-white"
              }`}
            >
              2023/24
            </a>
            <a
              className={`font-[900] text-[40px] md:hidden text-center ${
                currentYear === "2023/24" ? "text-[#009540]" : "text-white"
              }`}
            >
              {currentYear === "2023/24" ? "-" : "+"}
            </a>
          </li>
        </ul>
        <div className="md:w-[50%] w-[100%] md:flex hidden">
          {renderComponent()}
        </div>
      </div>
    </section>
  );
};

export default Journy;
