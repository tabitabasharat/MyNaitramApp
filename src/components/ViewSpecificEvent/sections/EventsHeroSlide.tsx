"use client";
import BuyTicket from "@/components/reusable-components/BuyTicket";
import { Badge } from "@/components/ui/badge";
import { Heart } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { useState } from "react";
import { top5Events } from "@/lib/dummyData";
import {
  DownloadSimple,
  LinkedinLogo,
  InstagramLogo,
  TiktokLogo,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import Arrowdown from "@/assets/arrow-down.svg";
import {
  ArrowLeft,
  User,
  MapPin,
  Clock,
  Lock,
  UsersThree,
  Ticket,
  DeviceMobile,
} from "@phosphor-icons/react/dist/ssr";
import Clocktime from "@/assets/Wallet/specific-icon-clock.svg";
import Calendar from "@/assets/Wallet/specific-icon-calender.svg";
import Location from "@/assets/Wallet/specific-icon-location.svg";


const EventsHeroSlide = ({
  title,
  date,
  img,
  event,
  location,
  activeIndex,
  eventDate,
  endTime,
  startTime,
  setShowTicket,
  handleBulletClick,
  AboutDrop,
  AboutToggle,
  eventCategory,
  ticketStartPrice,
  ticketEndPrice,
  eventdescription,
  instaUrl,
  tiktokUrl,
  eventType,
  userId
}: any) => {
  const [isOpenDropdown, setisOpenDropdown] = useState(false);

console.log("this is event price",  ticketStartPrice,
  ticketEndPrice)

  const ConvertDate = (originalDateStr: string): string => {
    const originalDate = new Date(originalDateStr);
  
    // Extract the day, date, month, and year
    const dayOfWeek = originalDate.toLocaleDateString("en-US", {
      weekday: "long",
    });
    const date = originalDate.getDate();
    const month = originalDate.toLocaleDateString("en-US", { month: "long" });
    const year = originalDate.getFullYear();
  
    // Function to get ordinal suffix
    const getOrdinalSuffix = (date: number) => {
      if (date > 3 && date < 21) return "th"; // covers 11th to 19th
      switch (date % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };
  
    const ordinalSuffix = getOrdinalSuffix(date);
  
    // Construct the formatted date string
    const formattedDate = `${dayOfWeek}, ${date}${ordinalSuffix} ${month} ${year}`;
  
    return formattedDate;
  };
  
  const ConvertTime = (timeStr: string): string => {
    // Ensure input is a string
    if (typeof timeStr !== "string") {
      console.error("Input must be a string");
      return "";
    }
  
    // Extract the time part if the input includes a date and time
    const timeOnly = timeStr.split("T")[1]?.split("Z")[0];
  
    if (!timeOnly) {
      console.error("Input must include a valid time");
      return "";
    }
  
    const parts = timeOnly.split(":");
  
    // Check if timeOnly is in HH:MM or HH:MM:SS format
    if (parts.length < 2) {
      console.error("Input time must be in HH:MM or HH:MM:SS format");
      return "";
    }
  
    const [hours, minutes] = parts.map(Number);
  
    // Ensure the hours and minutes are valid numbers
    if (isNaN(hours) || isNaN(minutes)) {
      console.error("Invalid time format");
      return "";
    }
  
    // Determine AM or PM
    const period = hours >= 12 ? "PM" : "AM";
  
    // Convert hours from 24-hour to 12-hour format
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for midnight
  
    // Combine hours and period
    const formattedTime = `${formattedHours}:${minutes < 10 ? '0' + minutes : minutes} ${period}`;
  
    return formattedTime;
  };
  
 
  
  


  return (
    <>
      {" "}
      
      <div>
        <div>
          <div className="hidden flex gap-1 mb-3">
            {top5Events.map((_, index) => (
              <div
                key={index}
                className={`size-3 ${
                  index === activeIndex ? "bg-white " : "border border-white"
                } rounded-full cursor-pointer`}
                onClick={() => handleBulletClick(index)}
              ></div>
            ))}
          </div>
          

          <div className="flex gap-[0.35rem]">
            <Badge className="lg:text-[12px]">Party</Badge>
            <Badge className="lg:text-[12px]">Invitation</Badge>
            <Badge className="lg:text-[12px]">TAKEOVR</Badge>
          </div>
          <div className="flex gap-[0.35rem] mt-3">
            <Link
              target="_blank"
              href="https://www.instagram.com/takeovr_uk?igsh=ZzVyMmRvcDhob3po"
            >
              <InstagramLogo size={30} weight="fill" />
            </Link>
            <Link
              target="_blank"
              href="https://www.tiktok.com/@takeovr_uk?_t=8ocugSj8bKa&_r=1"
            >
              <TiktokLogo size={30} weight="fill" />
            </Link>
          </div>

          <h2 className="text-[32px] lg:w-full lg:text-[48px] xl:text-[48px] font-extrabold leading-[1.2] mt-[12px] mb-[24px] -tracking-[0.02em] ">
            {title}
          </h2>
          <div className="">
            {/* <p className="text-[#E6E6E6] font-extrabold mt-[10px]">
              {eventCategory ? eventCategory : " TAKEOVR Boat Party"}
            </p> */}
            <div className="flex items-center gap-[8px] ">
              <Image src={Location} alt="location" />
              <p className=" text-[16px] font-bold leading-[24px]">
                {location}
              </p>
            </div>
            <div className="flex items-center gap-[8px] mt-[12px] ">
              <Image src={Calendar} alt="calendar"  />
              <p className=" text-[16px] font-bold leading-[24px]">
                {ConvertDate(eventDate)}
              </p>
            </div>
            <div className="flex items-center gap-[8px] mt-[12px]">
              <Image src={Clocktime} alt="time" />
              <p className=" text-[16px] font-bold leading-[24px]">
                {ConvertTime(startTime)} - {ConvertTime(endTime)}{" "}
                
              </p>
            </div>
          </div>
          <div
            className="flex items-center gap-[6px] cursor-pointer mt-[10px] mb-[12px]"
            onClick={() => AboutToggle()}
          >
            <p className="text-[#13FF7A]">About this event</p>
            <Image src={Arrowdown} alt="arrow-icon" className="" />
          </div>
          {AboutDrop && (
            <div>
              <div>
                <p className="text-[#E6E6E699] text-[13px] font-normal leading-[18px] mt-[5px]  w-[400px] mb-[12px]">
                  {eventdescription}
                </p>
              </div>
            </div>
          )}

          {/* <p className="text-muted mt-4">Location: {location}</p> */}
        
          <BuyTicket
          eventType={eventType}
            event={event}
            setShowTicket={setShowTicket}
            startPrice={ticketStartPrice}
            endPrice={ticketEndPrice}
            userId={userId}
          />
        </div>
      </div>
    </>
  );
};

export default EventsHeroSlide;
