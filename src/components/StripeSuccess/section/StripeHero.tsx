"use client";
import BuyTicket from "@/components/reusable-components/BuyTicket";
import { Badge } from "@/components/ui/badge";
import { Heart } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import success from "@/assets/hurah.svg"
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
import stall from "@/assets/stall1.svg";
import food from "@/assets/dob1.svg";
import vip from "@/assets/crown1.svg";
import security from "@/assets/security.svg";
import Browserexplore from "@/components/reusable-components/Toaster/Browserexplore";

const StripeHero = ({
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
  ticketsdata,
}: any) => {
  const [isOpenDropdown, setisOpenDropdown] = useState(false);

  console.log("this is event price", ticketStartPrice, ticketEndPrice);

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
    const formattedTime = `${formattedHours}:${
      minutes < 10 ? "0" + minutes : minutes
    } ${period}`;

    return formattedTime;
  };

  interface Ticket {
    id: number;
    address: string;
    image: any;
  }

  const Ticket: Ticket[] = [
    {
      id: 1,
      image: stall,
      address: "Merchandise Stalls",
    },
    { id: 2, image: food, address: "Food and Beverages" },
    { id: 3, image: vip, address: "VIP Lounge" },
    { id: 4, image: security, address: "Security and First Aid" },
  ];

  const imageMap: any = {
    "Merchandise Stalls": stall,
    "Food and Beverages": food,
    "VIP Lounge": vip,
    "Security and First Aid": security,
  };

  return (
    <>
      {" "}
      <div>
        <div>
          <div className="ps-[20px] py-[16px] gap-[20px] flex-col lg:flex-row justify-center items-center bg-transparent flex rounded-[12px] lg:bg-[#007A353D]">
            <div className="rounded-full overflow-hidden size-[60px]">
              <Image
                src={success}
                className=" h-[80px] w-[80px] lg:w-[60px] lg:h-[60px]"
                width={60}
                height={60}
                alt="expired-icon"
              />
            </div>
            <div className="text-start flex items-center">
            <p className="text-base font-bold">
              Your ticket purchase is confirmed. <br />
              We can't wait to see you there!
            </p>
            </div>
          </div>
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

          {/* <div className="flex gap-[0.35rem] flex-wrap lg:w-[80%]">
            {eventCategory?.length > 0 &&
              eventCategory.map((category: any, index: any) => (
                <Badge key={index} className="lg:text-[12px]">
                  {category}
                </Badge>
              ))}
          </div> */}
          <h2 className="text-[32px] lg:w-full lg:text-[48px] xl:text-[48px] font-extrabold leading-[1.2] mt-[24px] mb-[24px] -tracking-[0.02em] ">
            {title}
          </h2>
          <div className="">
            <div className="flex items-center gap-[8px] mb-[24px]">
              <Image src={Calendar} alt="calendar" />
              <p className=" text-[16px] font-bold leading-[24px]">
                {ConvertDate(eventDate)}
              </p>
            </div>
          </div>
          {AboutDrop && (
            <div>
              <div>
                <div
                  dangerouslySetInnerHTML={{ __html: eventdescription }}
                  className="text-white break-words overflow-hidden text-ellipsis"
                />
              </div>
            </div>
          )}
          <Browserexplore />
        </div>
      </div>
    </>
  );
};

export default StripeHero;
