"use client";
import React, { useState } from "react";
import Year2019 from "./Year2019";
import Year2021 from "./Year2021";
import Year2022 from "./Year2022";
import Year2023 from "./Year2023";
import { text } from "stream/consumers";
// import Year2021 from '../components/Year2021';
// import Year2022 from '../components/Year2022';
// import Year2023 from '../components/Year2023';

export default function Journy ()  {
  const [currentYear, setCurrentYear] = useState("2019");

  const renderComponent = () => {
    switch (currentYear) {
      case "2019":
        return <Year2019 />;
      case "2021":
        return <Year2021 />;
      case "2022":
        return <Year2022 />;
      case "2023/24":
        return <Year2023 />;
      default:
        return null;
    }
  };
  // const handleYearClick = (year) => {
  //   setCurrentYear(currentYear === year ? null : year);
  // };

  return (
    <section className="">
      <h2 className="md:text-6xl text-[30px] font-[600] text-center text-white md:mb-[20px]">
        Our Journey
      </h2>
      <div className="md:flex">
        <ul className="flex flex-col md:w-[50%] w-[100%] items-center justify-between">
          <li
            className="text-[27px] font-[600]  flex items-center justify-between  w-[100%] md:w-auto px-[20px] md:px-[0px] md:py-[0px]"
            onClick={() => setCurrentYear("2019")}
          >
            <a
              className={`md:px-[20px] md:py-[10px] px-[0px] py-[0px] md:h-auto h-[30px] cursor-pointer ${
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
              className={`md:px-[20px] md:py-[10px] px-[0px] py-[0px] md:h-auto h-[30px] cursor-pointer ${
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
              className={`md:px-[20px] md:py-[10px] px-[0px] py-[0px] md:h-auto h-[30px] cursor-pointer ${
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
              className={`md:px-[20px] md:py-[10px] px-[0px] py-[0px] text-center md:h-auto h-[30px] cursor-pointer ${
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
        <div className="md:w-[50%] w-[100%] flex flex-col">
          {renderComponent()}
        </div>
      </div>
    </section>
  );
};


