"use client";

import { Funnel, CaretDown } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { Checkbox } from "../ui/checkbox";
import { DatePicker } from "./DatePicker";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/lib/hooks";
import { getViewAllEvent, getViewPastEvents, getLiveEventById } from "@/lib/middleware/event";
// import ProgressBar from "@ramonak/react-progress-bar";
import arrowup from "@/assets/Arrow up.svg";
import arrowdown from "@/assets/aboutdropdown.svg";
import React, { useCallback, useEffect, useRef, useState } from "react";
import category from "@/assets/element-3.svg";
import price from "@/assets/greenprice.svg";
import sortby from "@/assets/arrange-square-2.svg";
import downarrow from "@/assets/Wallet/Caret Down.svg";
// import NextNProgress from 'nextjs-progressbar';
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

type FilterDate = "Date" | null;

function valuetext(value: number) {
  return `${value}°C`;
}

const FilterSideBar: React.FC = ({ Component, pageProps }: any) => {
  const dispatch = useAppDispatch();
  const [loader, setLoader] = useState(false);
  const [toggleDrop, setToggleDrop] = useState<boolean>(false);

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState<boolean>(false);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  // const [chosenDate, setChosenDate] = useState<Date | null>(null);
  const [chosenDate, setChosenDate] = useState<Date | null>(null);
  const [chosenEndDate, setChosenEndDate] = useState<Date | null>(null);
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [filterDate, setFilterDate] = useState<FilterDate>(null);
  const [filterEndDate, setFilterEndDate] = useState<FilterDate>(null);

  const [isFree, setisFree] = useState<boolean>(false);
  const [showAllCategories, setShowAllCategories] = useState<boolean>(false);

  const [value1, setValue1] = useState<number[]>([0, 10000]);

  const categories: string[] = [
    "Arts",
    "Auto, Boat & Air",
    "Business",
    "Charities & Causes",
    "Community",
    "Fashion",
    "Family & Education",
    "Film & Media",
    "Food & Drink",
    "Government",
    "Health",
    "Hobbies",
    "Music",
    "Science & Tech",
    "School Activities",
    "Seasonal",
    "Spirituality",
    "Sports & Fitness",
    "Travel & outdoor",
    "Other",
  ];

  // useEffect(() => {
  //   const userId =
  //     typeof window !== "undefined" ? localStorage.getItem("_id") : null;
  //     const formattedCategories = selectedCategories.map(cat =>
  //       cat === "Food & Drink" ? "Food" : cat
  //     );
  //   const data: any = {
  //     page: 1,
  //     // category: selectedCategories?.length > 0 ? selectedCategories : null,
  //     category: formattedCategories.length > 0 ? formattedCategories : null,
  //     free: isFree ? true : null,

  //     startDate: chosenEndDate ? formatChosenDate(chosenDate) : null,
  //     endDate: chosenEndDate ? formatChosenDate(chosenEndDate) : null,
  //     // chooseDate:
  //     //   chosenDate.length > 0
  //     //     ? chosenDate.map(formatChosenDate).join(",")
  //     //     : null,
  //     userId: userId,
  //   };
  //   if (data.category) {
  //     data.category = JSON.stringify(data.category);
  //   }

  //   dispatch(getViewAllEvent(data));
  //   dispatch(getViewPastEvents(data));
  //   dispatch(getLiveEventById(data));
  // }, [dispatch, selectedCategories, chosenEndDate, chosenEndDate, isFree]);

  useEffect(() => {
    const userId = typeof window !== "undefined" ? localStorage.getItem("_id") : null;

    // Function to transform categories
    const formatCategory = (category: string) => {
      // Split the category by spaces and return the first word
      return category.split(" ")[0];
    };

    // Transform categories: apply the formatting to all
    const formattedCategories = selectedCategories.map((cat) => formatCategory(cat));

    const data: any = {
      page: 1,
      category: formattedCategories.length > 0 ? formattedCategories : null,
      free: isFree ? true : null,
      startDate: chosenDate ? formatChosenDate(chosenDate) : null,
      endDate: chosenEndDate ? formatChosenDate(chosenEndDate) : null,
      userId: userId,
      minPrice: value1[0],
      maxPrice: value1[1],
    };

    if (data.category) {
      data.category = JSON.stringify(data.category);
    }

    dispatch(getViewAllEvent(data));
    dispatch(getViewPastEvents(data));
    dispatch(getLiveEventById(data));
  }, [dispatch, selectedCategories, chosenEndDate, chosenDate, isFree, value1]);

  const formatChosenDate = (date: Date | null): string => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setChosenDate(null);
    setChosenEndDate(null);
    setisFree(false);
    setShowDatePicker(false);
    setShowEndDatePicker(false);
    setFilterDate(null);
    setFilterEndDate(null);
    setValue1([0, 10000]);

    dispatch(getViewAllEvent({ page: 1 }));
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) => (prev.includes(category) ? prev.filter((item) => item !== category) : [...prev, category]));
  };

  const handleStartDateChange = () => {
    setShowDatePicker((prev) => !prev);
    setActiveButton((prev) => (prev === "start" ? null : "start"));
    setFilterDate((prev) => (prev === "Date" ? null : "Date"));
  };
  const handleEndDateChange = () => {
    setShowEndDatePicker((prev) => !prev);
    setActiveButton((prev) => (prev === "end" ? null : "end"));
    setFilterEndDate((prev) => (prev === "Date" ? null : "Date"));
  };

  const toggleShowAllCategories = () => {
    setShowAllCategories((prev) => !prev);
  };

  const toggleDateDropdown = () => {
    setToggleDrop((prev) => !prev);
  };

  const categoriesToDisplay = showAllCategories ? categories : categories.slice(0, 6);

  const toggleDateDropdownOpen = () => {
    setToggleDrop((prev) => !prev);
  };

  const minDistance = 0; // Ensure a reasonable minimum distance

  const handleChange1 = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([
        Math.max(0, Math.min(newValue[0], value1[1] - minDistance)), // Ensure within bounds and respects minDistance
        value1[1],
      ]);
    } else {
      setValue1([
        value1[0],
        Math.min(10000, Math.max(newValue[1], value1[0] + minDistance)), // Ensure within bounds and respects minDistance
      ]);
    }
  };

  const handlePriceInputChange = (event: React.ChangeEvent<HTMLInputElement>, inputNumber: number) => {
    let [poundSymbol, number] = event.target.value.split(/(\d+)/);
    if (number === undefined) {
      number = "0";
    }

    const newValue = Number(number); // Parse the input value as a number
    // Check if the new value is a valid number
    if (isNaN(newValue) || newValue > 10000) return; // Exit if the value is not a valid number

    if (inputNumber === 1) {
      if (newValue <= value1[1]) {
        setValue1([newValue, value1[1]]);
      }
    } else {
      if (newValue >= value1[0]) {
        setValue1([value1[0], newValue]);
      }
    }
  };

  return (
    <div className="lg:w-[300px]">
      <div className="flex md:flex-col lg:flex-row justify-between gap-1 lg:gap-0">
        <div className="flex gap-[0.5rem]">
          <Funnel size={22} weight="bold" className="text-primary" />
          <p className="text-[20px]">Filters</p>
        </div>
        <p className="font-bold underline cursor-pointer" onClick={handleResetFilters}>
          Reset filters
        </p>
      </div>

      {/* CATEGORIES */}
      <div className="mt-6 flex flex-col gap-[0.6rem]">
        <div className="flex gap-3">
          <Image src={category} alt="category" />
          <p className="font-bold text-base">Categories</p>
        </div>

        {categoriesToDisplay.map((category) => (
          <div key={category} className="flex items-center space-x-3">
            <Checkbox
              id={category.toLowerCase().replace(/\s+/g, "-")}
              checked={selectedCategories.includes(category)}
              onCheckedChange={() => handleCategoryChange(category)}
            />
            <label htmlFor={category.toLowerCase().replace(/\s+/g, "-")} className="leading-none font-bold text-base">
              {category}
            </label>
          </div>
        ))}
        {categories.length > 6 && (
          <Button
            variant="ghost"
            className="w-fit flex gap-[0.5rem] items-center ml-4"
            onClick={toggleShowAllCategories} // Function to toggle show/hide state
          >
            {showAllCategories ? "See less" : "See more"}{" "}
            {showAllCategories ? (
              <Image src={arrowup} sizes="12px" alt="arrowup" /> // Arrow Up when showing less
            ) : (
              <Image src={arrowdown} sizes="12px" alt="arrowdown" /> // Arrow Down when showing more
            )}
          </Button>
        )}
      </div>

      <hr className="opacity-20 h-px mt-6" />
      {/* PRICE BAR */}
      <div className="flex flex-col gap-[10px]">
        <div className="flex gap-3 mt-8">
          <Image src={price} alt="price" className="h-[20px] w-[20px]" />
          <p className="font-bold text-base">Price</p>
        </div>
        {/* <div ref={progressBarRef} className="progress-container" style={{ width: `${progressBarWidth}px` }}>
          <div
            className="progress-bar"
            style={{
              left: `${startThumbPosition}px`,
              width: `${endThumbPosition - startThumbPosition}px`,
            }}
          ></div>
          <div className="thumb" style={{ left: `${startThumbPosition}px`, zIndex: "100" }} onMouseDown={() => handleMouseDown("start")}></div>
          <div className="thumb-end" style={{ left: `${endThumbPosition}px`, zIndex: "100" }} onMouseDown={() => handleMouseDown("end")}></div>
        </div> */}
        <div className="w-full flex justify-center sm:justify-start items-start">
          <Box sx={{ width: 200, marginBottom: "-8px" }}>
            <Slider
              getAriaLabel={() => "Minimum distance"}
              value={value1}
              onChange={handleChange1}
              valueLabelDisplay="off"
              getAriaValueText={valuetext}
              disableSwap
              min={0} // Set the minimum value
              max={10000} // Set the maximum value
              step={1} // Optional: step size
              sx={{
                "& .MuiSlider-track": {
                  backgroundColor: "#333",
                  border: "none", // Remove border
                  boxShadow: "none", // Remove any shadow effect
                  height: "6px",
                  opacity: 1, // Ensure full opacity
                },
                "& .MuiSlider-rail": {
                  backgroundColor: "#00d059",
                  border: "none", // Remove border
                  boxShadow: "none", // Remove any shadow effect
                  height: "6px",
                  opacity: 1, // Ensure full opacity
                },
                "& .MuiSlider-thumb": {
                  boxShadow: "none", // Removes the hover shadow
                  position: "absolute",
                  top: "50%",
                  width: "20px",
                  height: "20px",
                  background: "#000",
                  borderRadius: "50%",
                  transform: "translate(-50%, -50%)",
                  cursor: "pointer",
                  zIndex: 1,
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    padding: "1px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #13ff7a 0.2%, #002b12 50.2%, #13ff7a 100.2%)",
                    WebkitMask: "radial-gradient(circle, transparent 60%, #000 63%)",
                    mask: "radial-gradient(circle, transparent 60%, #000 63%)",
                  },
                  "&:focus, &:hover, &.Mui-active": {
                    boxShadow: "none", // Removes the focus/active shadow
                  },
                },
              }}
            />
          </Box>
        </div>
        <div className="flex gap-[5px] text-sm items-center justify-center sm:justify-start font-extrabold">
          <input
            type="text"
            className="gradient-slate py-[8px] px-[30.5px] w-[109px] text-center rounded-[44px] border border-solid border-muted"
            value={`£${value1[0]}`}
            onChange={(e) => handlePriceInputChange(e, 1)}
          />
          <p>To</p>
          <input
            type="text"
            className="gradient-slate py-[8px] px-[20.5px] w-[109px] text-center rounded-[44px] border border-solid border-muted"
            value={`£${value1[1]}`}
            onChange={(e) => handlePriceInputChange(e, 2)}
          />
        </div>
      </div>
      <hr className="opacity-20 h-px mt-10" />
      {/* DATE FILTER */}
      <div className="flex flex-col gap-[0.6rem]">
        <div className="flex gap-3 mt-6">
          <Image src={sortby} alt="sortby" />
          <p className="font-bold text-base">Sort By</p>
        </div>

        {/* Clickable Dropdown Toggle */}
        <div className="flex items-center justify-between cursor-pointer" onClick={toggleDateDropdownOpen}>
          <p>Date</p>
          <Image
            src={toggleDrop ? arrowup : arrowdown} // Switch the arrow based on toggleDrop state
            alt="arrow"
            className="cursor-pointer"
          />
        </div>

        {/* Date Options */}
        {toggleDrop && (
          <div className="flex flex-col items-start gap-[12px]">
            <Button
              className={`gradient-slate text-[#E6E6E6] text-[14px] w-[109px] h-[36px] border ${
                activeButton === "start" ? "border-green-500" : "border-muted"
              }`}
              onClick={handleStartDateChange}
            >
              Start Date
            </Button>
            <Button
              className={`gradient-slate text-[#E6E6E6] text-[14px] w-[109px] h-[36px] border ${
                activeButton === "end" ? "border-green-500" : "border-muted"
              }`}
              onClick={handleEndDateChange}
            >
              End Date
            </Button>
          </div>
        )}

        {/* Date Picker Components */}
        {showDatePicker && (
          <DatePicker
            setSelectedDate={(date: Date | null) => {
              setChosenDate(date);
            }}
            closeDatePicker={() => setShowDatePicker(false)}
          />
        )}

        {showEndDatePicker && (
          <DatePicker
            setSelectedDate={(date: Date | null) => {
              setChosenEndDate(date);
            }}
            closeDatePicker={() => setShowEndDatePicker(false)}
          />
        )}
      </div>
    </div>
  );
};

export default FilterSideBar;
