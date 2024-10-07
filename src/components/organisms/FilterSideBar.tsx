"use client";

import { Funnel, CaretDown } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { Checkbox } from "../ui/checkbox";
import { DatePicker } from "./DatePicker";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/lib/hooks";
import {
  getViewAllEvent,
  getViewPastEvents,
  getLiveEventById,
} from "@/lib/middleware/event";
import { useState, useEffect } from "react";
import category from "@/assets/element-3.svg";
import price from "@/assets/money.svg";
import sortby from "@/assets/arrange-square-2.svg";
import downarrow from "@/assets/Wallet/Caret Down.svg";

type FilterDate = "Date" | null;

const FilterSideBar = () => {
  const dispatch = useAppDispatch();
  const [loader, setLoader] = useState(false);
  const [toggleDrop, setToggleDrop] = useState<boolean>(false);

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState<boolean>(false);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  // const [chosenDate, setChosenDate] = useState<Date | null>(null);
  const [chosenDate, setChosenDate] = useState<Date | null>(null);
  const [chosenEndDate, setChosenEndDate] = useState<Date | null>(null);

  const [filterDate, setFilterDate] = useState<FilterDate>(null);
  const [filterEndDate, setFilterEndDate] = useState<FilterDate>(null);


  const [isFree, setisFree] = useState<boolean>(false);
  const [showAllCategories, setShowAllCategories] = useState<boolean>(false);

  const categories: string[] = [
    "Music",
    "Business",
    "Food & Drink",
    "Community",
    "Arts",
    "Film & Media",
    "Sports & Fitness",
    "Health",
    "Science & Tech",
    "Travel & outdoor",
    "Charities & Causes",
    "Spirituality",
    "Seasonal",
    "Government",
    "Fashion",
    "Home & Lifestyle",
    "Auto, Biat & Air",
    "Hobbies",
    "Family & Education",
    "School Activities",
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
    const userId =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;
  
    // Function to transform categories
    const formatCategory = (category: string) => {
      // Split the category by spaces and return the first word
      return category.split(" ")[0];
    };
  
    // Transform categories: apply the formatting to all
    const formattedCategories = selectedCategories.map(cat => 
      formatCategory(cat)
    );
  
    const data: any = {
      page: 1,
      category: formattedCategories.length > 0 ? formattedCategories : null,
      free: isFree ? true : null,
      startDate: chosenDate ? formatChosenDate(chosenDate) : null,
      endDate: chosenEndDate ? formatChosenDate(chosenEndDate) : null,
      userId: userId,
    };
  
    if (data.category) {
      data.category = JSON.stringify(data.category);
    }
  
    dispatch(getViewAllEvent(data));
    dispatch(getViewPastEvents(data));
    dispatch(getLiveEventById(data));
  }, [dispatch, selectedCategories, chosenEndDate, chosenDate, isFree]);
  

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

    dispatch(getViewAllEvent({ page: 1 }));
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  

 
  const handleStartDateChange = () => {
    setShowDatePicker((prev) => !prev);
    setFilterDate((prev) => (prev === "Date" ? null : "Date"));
  };
  const handleEndDateChange = () => {
    setShowEndDatePicker((prev) => !prev);
    setFilterEndDate((prev) => (prev === "Date" ? null : "Date"));
  };

  const toggleShowAllCategories = () => {
    setShowAllCategories((prev) => !prev);
  };

  const toggleDateDropdown = () => {
    setToggleDrop((prev) => !prev);
  };

  const categoriesToDisplay = showAllCategories
    ? categories
    : categories.slice(0, 6);

  return (
    <div className="lg:w-[300px]">
      <div className="flex md:flex-col lg:flex-row justify-between gap-1 lg:gap-0">
        <div className="flex gap-[0.5rem]">
          <Funnel size={22} weight="bold" className="text-primary" />
          <p className="text-[20px]">Filters</p>
        </div>
        <p
          className="font-bold underline cursor-pointer"
          onClick={handleResetFilters}
        >
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
            <label
              htmlFor={category.toLowerCase().replace(/\s+/g, "-")}
              className="leading-none font-bold text-base"
            >
              {category}
            </label>
          </div>
        ))}

        {categories.length > 6 && (
          <Button
            variant="ghost"
            className="w-fit flex gap-[0.5rem] items-center ml-4"
            onClick={toggleShowAllCategories}
          >
            {showAllCategories ? "See less" : "See more"}{" "}
            <CaretDown size={17} weight="bold" />
          </Button>
        )}
      </div>

      <hr className="opacity-20 h-px mt-6" />

      {/* PRICE FILTER */}
      <div className="flex flex-col gap-[0.6rem]">
        <div className="flex gap-3 mt-6">
          <Image src={price} alt="price" />
          <p className="font-bold text-base">Price</p>
        </div>
        <div className="flex items-center space-x-3">
          <Checkbox
            id="free-events"
            checked={isFree}
            onCheckedChange={() => setisFree((prev: boolean) => !prev)}
          />
          <label
            htmlFor="free-events"
            className="leading-none font-bold text-base"
          >
            See only Free Events
          </label>
        </div>
      </div>

      <hr className="opacity-20 h-px mt-4" />

      {/* DATE FILTER */}
      <div className="flex flex-col gap-[0.6rem]">
        <div className="flex gap-3 mt-6">
          <Image src={sortby} alt="sortby" />
          <p className="font-bold text-base">Sort By</p>
        </div>

        {/* <div className="flex items-center space-x-3">
          <Checkbox
            id="date-filter"
            checked={filterDate === "Date"}
            onCheckedChange={handleDateChange}
          />
          <label
            htmlFor="date-filter"
            className="leading-none font-bold text-base"
          >
            Date
          </label>
        </div> */}

        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleDateDropdown()}
        >
          <p>Date</p>
          <Image src={downarrow} alt="arrow"  className="cursor-pointer"/>
        </div>
        {toggleDrop && 
        <div className="flex flex-col items-start gap-[12px]">
          <Button className="gradient-slate text-[#E6E6E6] text-[14px] w-[109px] h-[36px] border border-muted"
          onClick={handleStartDateChange}>
            Start Date
          </Button>
          <Button className="gradient-slate  text-[#E6E6E6] text-[14px] w-[109px] h-[36px] border border-muted"
          onClick={handleEndDateChange}>
            End Date
          </Button>
        </div>
}
        {showDatePicker && (
          
          <DatePicker
          setSelectedDate={(date: Date | null) => {
        
           setChosenDate(date);
            
          }}
          />
        )}

        {showEndDatePicker && (
          <DatePicker
          setSelectedDate={(date: Date | null) => {
        
           setChosenEndDate(date);
            
          }}
            
          />
        )}
      </div>
    </div>
  );
};

export default FilterSideBar;
