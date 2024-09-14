"use client";

import {
  Calendar,
  CirclesFour,
  Funnel,
  MapPin,
  Coins,
  CaretDown,
  CurrencyDollar,
} from "@phosphor-icons/react/dist/ssr";
import { Checkbox } from "../ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DatePicker } from "./DatePicker";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getViewAllEvent,getLiveEventById,getViewPastEvents } from "@/lib/middleware/event";
import { useState, useEffect } from "react";
import {
  SuccessToast,
  ErrorToast,
} from "../reusable-components/Toaster/Toaster";

type EventTime = "Today" | "This Week" | "This Month" | null;
type Location = "London" | "Atlanta" | "New York" | "Malta" | null;

const FilterSideBar = () => {
  const dispatch = useAppDispatch();
  const [loader, setLoader] = useState(false);
  

  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const [chosenDate, setchosenDate] = useState<Date | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location>(null);
  const [selectedEventTime, setSelectedEventTime] = useState<EventTime>(null);
  const [thisMonth,setThisMonth]=useState<any>(false);
  const [currentWeek, setCurrentWeek] = useState<{
    startOfWeek: string;
    endOfWeek: string;
  } | null>(null);
  const [currentMonth, setCurrentMonth] = useState<{
    startOfMonth: string;
    endOfMonth: string;
  } | null>(null);

  useEffect(() => {
    const userid =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    const data: any = {
      page: 1,
      location: selectedLocation || null,
      today: null,
      startDate: null,
      endDate: null,
      startMonth: null,
      endMonth: null,
      chooseDate: chosenDate ? formatChosenDate(chosenDate) : null,
      thisMonth:thisMonth,
      userId:userid

    };
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const type = urlParams.get('EventType');
    console.log(type,"R")

    if (selectedEventTime === "Today") {
      data.today = getCurrentDate();
    } else if (selectedEventTime === "This Week" && currentWeek) {
      data.startDate = currentWeek.startOfWeek;
      data.endDate = currentWeek.endOfWeek;
    } else if (selectedEventTime === "This Month" && currentMonth) {
      data.startMonth = currentMonth.startOfMonth;
      data.endMonth = currentMonth.endOfMonth;
    } else {
      data.startDate = startDate || null;
    data.endDate = endDate || null;
    }

    dispatch(getViewAllEvent(data));
    dispatch(getLiveEventById(data));
    dispatch(getViewPastEvents(data));

    
  }, [
    dispatch,
    dispatch,
    selectedLocation,
    selectedEventTime,
    startDate,
    endDate,
    currentWeek,
    currentMonth,
    chosenDate,
  ]);

  const getCurrentDate = () => {
    const today = new Date();

    return formatDate(today);
  };

  const getCurrentWeekDates = () => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)

    // Calculate the offset for Monday
    const mondayOffset = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;

    // Calculate the start and end dates of the current week
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() + mondayOffset); // Move to Monday

    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + (7 - dayOfWeek)); // Move to Sunday

    // Format the dates to DD-MM-YYYY
    return {
      startOfWeek: formatDate(startOfWeek),
      endOfWeek: formatDate(endOfWeek),
    };
  };

  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const getCurrentMonthDates = () => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Last day of the current month

    // Format the dates to DD-MM-YYYY
    return {
      startOfMonth: formatDate(startOfMonth),
      endOfMonth: formatDate(endOfMonth),
    };
  };

  useEffect(() => {
    const { startOfWeek, endOfWeek } = getCurrentWeekDates();
    setCurrentWeek({ startOfWeek, endOfWeek });

    const { startOfMonth, endOfMonth } = getCurrentMonthDates();
    console.log("Start of Month:", startOfMonth);
    console.log("End of Month:", endOfMonth);
    setCurrentMonth({ startOfMonth, endOfMonth });
  }, []);

  const handleEventTimeChange = (eventTime: EventTime) => {
    setSelectedEventTime(eventTime);
    setchosenDate(null); // Reset chosenDate when eventTime is selected

    switch (eventTime) {
      case "Today":
        const today = getCurrentDate();
        setThisMonth(false);
        setStartDate(today);
        setEndDate(today);
        break;

      case "This Week":
        if (currentWeek) {
          setThisMonth(false)
          setStartDate(currentWeek.startOfWeek);
          setEndDate(currentWeek.endOfWeek);
        }
        break;

      case "This Month":
        if (currentMonth) {
          setThisMonth(true)

          setStartDate(currentMonth.startOfMonth);
          setEndDate(currentMonth.endOfMonth);
        }
        break;

      default:
        setStartDate(null);
        setEndDate(null);
    }
  };

  // const handleEventTimeChange = (eventTime: EventTime) => {
  //   setSelectedEventTime(eventTime);
  //   switch (eventTime) {
  //     case "Today":
  //       const today = getCurrentDate();
  //       setStartDate(today);
  //       setEndDate(today);
  //       break;

  //     case "This Week":
  //       if (currentWeek) {
  //         setStartDate(currentWeek.startOfWeek);
  //         setEndDate(currentWeek.endOfWeek);
  //       }
  //       break;

  //     case "This Month":
  //       if (currentMonth) {
  //         setStartDate(currentMonth.startOfMonth);
  //         setEndDate(currentMonth.endOfMonth);
  //       }
  //       break;

  //     default:
  //       setStartDate(null);
  //       setEndDate(null);
  //   }
  // };

  const handleLocationChange = (location: Location) => {
    setSelectedLocation(location);
  };

  const handleResetFilters = () => {
    setSelectedEventTime(null);
    setSelectedLocation(null);
    setStartDate(null);
    setEndDate(null);
    setchosenDate(null);

    dispatch(getViewAllEvent({ page: 1 }));
  };

  const formatChosenDate = (date: Date | null): string => {
    if (!date) {
      console.log("not selected");
      return "";
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
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
      {/* EVENT TIME */}

      <div className="mt-6 flex flex-col gap-[0.6rem]">
        <div className="flex justify-between">
          <div className="flex gap-3">
            <Calendar size={20} weight="bold" className="text-primary" />
            <p>Event Time</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Checkbox
            id="today"
            checked={selectedEventTime === "Today"}
            onCheckedChange={() => handleEventTimeChange("Today")}
          />
          <label htmlFor="today" className="leading-none">
            Today
          </label>
        </div>
        <div className="flex items-center space-x-3">
          <Checkbox
            id="this week"
            checked={selectedEventTime === "This Week"}
            onCheckedChange={() => handleEventTimeChange("This Week")}
          />
          <label htmlFor="this week" className="leading-none">
            {/* This Week (
            {currentWeek
              ? `${currentWeek.startOfWeek} - ${currentWeek.endOfWeek}`
              : "Loading..."}
            ) */}
            This Week
          </label>
        </div>
        <div className="flex items-center space-x-3">
          <Checkbox
            id="this month"
            checked={selectedEventTime === "This Month"}
            onCheckedChange={() => handleEventTimeChange("This Month")}
          />
          <label htmlFor="this month" className="leading-none">
            {/* This Month (
            {currentMonth
              ? `${currentMonth.startOfMonth} - ${currentMonth.endOfMonth}`
              : "Loading..."}
            ) */}
            This Month
          </label>
        </div>

        <DatePicker
          setSelectedDate={(date: Date | null) => {
            setchosenDate(date);
            setSelectedEventTime(null); // Reset eventTime when a date is selected
            setStartDate(date ? formatChosenDate(date) : null);
            setEndDate(date ? formatChosenDate(date) : null);
          }}
        />
      </div>
      <hr className="opacity-20 h-px mt-6" />
      {/* LOCATIONS */}
      <div className="flex flex-col gap-[0.6rem]">
        <div className="flex justify-between mt-6">
          <div className="flex gap-3">
            <MapPin size={20} weight="bold" className="text-primary" />
            <p>Locations</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Checkbox
            id="london"
            checked={selectedLocation === "London"}
            onCheckedChange={() => handleLocationChange("London")}
          />
          <label htmlFor="london" className="leading-none">
            London
          </label>
        </div>
        <div className="flex items-center space-x-3">
          <Checkbox
            id="atlanta"
            checked={selectedLocation === "Atlanta"}
            onCheckedChange={() => handleLocationChange("Atlanta")}
          />
          <label htmlFor="atlanta" className="leading-none">
            Atlanta
          </label>
        </div>
        <div className="flex items-center space-x-3">
          <Checkbox
            id="new york"
            checked={selectedLocation === "New York"}
            onCheckedChange={() => handleLocationChange("New York")}
          />
          <label htmlFor="new york" className="leading-none">
            New York
          </label>
        </div>
        <div className="flex items-center space-x-3">
          <Checkbox
            id="malta"
            checked={selectedLocation === "Malta"}
            onCheckedChange={() => handleLocationChange("Malta")}
          />
          <label htmlFor="malta" className="leading-none">
            Malta
          </label>
        </div>
        <Button
          variant="ghost"
          className="w-fit flex gap-[0.5rem] items-center ml-4"
        >
          See more <CaretDown size={17} weight="bold" />
        </Button>
      </div>
      <hr className="opacity-20 h-px mt-4" />

      {/* CATEGORY */}
      {/* <div className="flex flex-col gap-[0.6rem]">
        <div className="flex justify-between mt-6">
          <div className="flex gap-3">
            <CirclesFour size={20} weight="bold" className="text-primary" />
            <p>Category</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Checkbox id="today" />
          <label htmlFor="terms" className="leading-none">
            All Category
          </label>
        </div>
        <div className="flex items-center space-x-3">
          <Checkbox id="today" />
          <label htmlFor="terms" className="leading-none">
            Shows
          </label>
        </div>
        <div className="flex items-center space-x-3">
          <Checkbox id="today" />
          <label htmlFor="terms" className="leading-none">
            Dj
          </label>
        </div>
        <div className="flex items-center space-x-3">
          <Checkbox id="today" />
          <label htmlFor="terms" className="leading-none">
            Party
          </label>
        </div>{' '}
        <Button
          variant="ghost"
          className="w-fit flex gap-[0.5rem] items-center ml-4"
        >
          See more <CaretDown size={17} weight="bold" />
        </Button>
      </div> */}
      {/* <hr className="opacity-20 h-px mt-4" /> */}

      {/* PRICE RANGE */}
      {/* <div className="flex flex-col gap-2">
        <div className="flex mt-6">
          <div className="flex gap-3">
            <Coins size={20} weight="bold" className="text-primary" />
            <p>Price Range</p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Input
              type="number"
              placeholder="MIN"
              className="pl-7 placeholder:text-white/40"
            />
            <CurrencyDollar
              size={18}
              weight="bold"
              className="absolute left-2 top-[0.6rem]"
            />
          </div>
          <div className="relative">
            {' '}
            <Input
              type="number"
              placeholder="MAX"
              className="pl-7 placeholder:text-white/40"
            />
            <CurrencyDollar
              size={18}
              weight="bold"
              className="absolute left-2 top-[0.6rem]"
            />
          </div>
        </div>
        
      </div> */}
    </div>
  );
};

export default FilterSideBar;
