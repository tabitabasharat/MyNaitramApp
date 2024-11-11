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

type FilterDate = "Date" | null;

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

  // /////////// Handeling price Bar  //////////////
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const [startThumbPosition, setStartThumbPosition] = useState<number>(0); // Left thumb in pixels
  const [endThumbPosition, setEndThumbPosition] = useState<number>(200); // Right thumb in pixels
  const [activeThumb, setActiveThumb] = useState<"start" | "end" | null>(null);
  const [startPrice, setStartPrice] = useState<number>(0); // Initial start price value
  const [endPrice, setEndPrice] = useState<number>(100000); // Initial end price value
  const progressBarWidth = 200; // Fixed width of the progress container in pixels

  const minValue: number = 0; // Minimum price
  const maxValue: number = 100000; // Maximum price

  // Function to calculate price based on thumb position
  const calculateValueFromPosition = (position: number): number => {
    return Math.round(minValue + (position / progressBarWidth) * (maxValue - minValue));
  };

  const handleMouseDown = (type: "start" | "end") => {
    setActiveThumb(type);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!activeThumb || !progressBarRef.current) return;

      const progressBar = progressBarRef.current;
      const progressBarRect = progressBar.getBoundingClientRect();

      const mousePosition = e.clientX - progressBarRect.left;
      const clampedPosition = Math.min(Math.max(mousePosition, 0), progressBarWidth);

      if (activeThumb === "start") {
        const newPosition = Math.min(clampedPosition, endThumbPosition);
        setStartThumbPosition(newPosition);
        setStartPrice(calculateValueFromPosition(newPosition)); // Update start price
      } else if (activeThumb === "end") {
        const newPosition = Math.max(clampedPosition, startThumbPosition);
        setEndThumbPosition(newPosition);
        setEndPrice(calculateValueFromPosition(newPosition)); // Update end price
      }
    },
    [activeThumb, endThumbPosition, startThumbPosition, progressBarWidth]
  );

  const handleMouseUp = () => setActiveThumb(null);

  // Adding event listeners for mouse move and mouse up
  useEffect(() => {
    const handleMouseMoveWrapper = (e: MouseEvent) => handleMouseMove(e);

    if (activeThumb) {
      window.addEventListener("mousemove", handleMouseMoveWrapper);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMoveWrapper);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMoveWrapper);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [activeThumb, handleMouseMove]);

  ////////////////////////////////////////////////////////////////////////////////

  // Set up and clean up event listeners on mount/unmount
  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove as EventListener);
    document.addEventListener("mouseup", handleMouseUp as EventListener);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove as EventListener);
      document.removeEventListener("mouseup", handleMouseUp as EventListener);
    };
  }, [handleMouseMove]);

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
      minPrice: startPrice,
      maxPrice: endPrice,
    };

    if (data.category) {
      data.category = JSON.stringify(data.category);
    }

    dispatch(getViewAllEvent(data));
    dispatch(getViewPastEvents(data));
    dispatch(getLiveEventById(data));
  }, [dispatch, selectedCategories, chosenEndDate, chosenDate, isFree, startPrice, endPrice]);

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
    setStartPrice(0);
    setEndPrice(100000);
    setStartThumbPosition(0);
    setEndThumbPosition(200);

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
      <div className="flex flex-col gap-[16px]">
        <div className="flex gap-3 mt-6">
          <Image src={price} alt="price" className="h-[20px] w-[20px]" />
          <p className="font-bold text-base">Price</p>
        </div>
        <div ref={progressBarRef} className="progress-container" style={{ width: `${progressBarWidth}px` }}>
          <div
            className="progress-bar"
            style={{
              left: `${startThumbPosition}px`,
              width: `${endThumbPosition - startThumbPosition}px`,
            }}
          ></div>
          <div className="thumb" style={{ left: `${startThumbPosition}px` }} onMouseDown={() => handleMouseDown("start")}></div>
          <div className="thumb-end" style={{ left: `${endThumbPosition}px` }} onMouseDown={() => handleMouseDown("end")}></div>
        </div>
        <div className="flex gap-[5px] text-sm items-center font-extrabold">
          <p className="gradient-slate py-[8px] px-[30.5px] w-[109px] text-center rounded-[44px] border border-solid border-muted">{`£${startPrice.toLocaleString()}`}</p>
          <p>To</p>
          <p className="gradient-slate py-[8px] px-[13.5px] w-[109px] text-center rounded-[44px] border border-solid border-muted">{`£${endPrice.toLocaleString()}`}</p>
        </div>
      </div>
      <hr className="opacity-20 h-px mt-4" />
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
