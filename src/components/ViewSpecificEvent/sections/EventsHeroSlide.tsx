"use client";
import BuyTicket from "@/components/reusable-components/BuyTicket";
import { Badge } from "@/components/ui/badge";
import { Heart } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { useState } from "react";
import clander from "@/assets/startdate.svg";
import time from "@/assets/endDate.svg";
import Arrowup from "@/assets/arrow up.svg";
import { top5Events } from "@/lib/dummyData";
import {
  DownloadSimple,
  LinkedinLogo,
  InstagramLogo,
  TiktokLogo,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { useEffect, useRef } from "react";
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
  // AboutDrop,
  // AboutToggle,
  eventCategory,
  ticketStartPrice,
  ticketEndPrice,
  eventdescription,
  instaUrl,
  tiktokUrl,
  eventType,
  ticketLength,
  userId,
  ticketEndDate,
  ticketStartDate,
  soldout,
  salesStop,
  allTickets,
  eventTags,
}: any) => {
  const [isOpenDropdown, setisOpenDropdown] = useState(false);

  console.log("this is event price", ticketStartPrice, ticketEndPrice);

  // const ConvertDate = (originalDateStr: string): string => {
  //   const utcDate = new Date(`${originalDateStr}Z`);
  //   console.log("Converted UTC time:", utcDate);

  //   if (isNaN(utcDate.getTime())) {
  //     console.error("Invalid date format");
  //     return "";
  //   }

  //   const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  //   const dayOfWeek = utcDate.toLocaleDateString("en-US", {
  //     weekday: "long",
  //     timeZone: timeZone,
  //   });
  //   const dayOfMonth = utcDate.toLocaleDateString("en-US", {
  //     day: "numeric",
  //     timeZone: timeZone,
  //   });
  //   const month = utcDate.toLocaleDateString("en-US", {
  //     month: "long",
  //     timeZone: timeZone,
  //   });
  //   const year = utcDate.toLocaleDateString("en-US", {
  //     year: "numeric",
  //     timeZone: timeZone,
  //   });

  //   const getOrdinalSuffix = (date: number) => {
  //     if (date > 3 && date < 21) return "th";
  //     switch (date % 10) {
  //       case 1:
  //         return "st";
  //       case 2:
  //         return "nd";
  //       case 3:
  //         return "rd";
  //       default:
  //         return "th";
  //     }
  //   };

  //   const numericDay = parseInt(dayOfMonth, 10); // Convert day string to number
  //   const ordinalSuffix = getOrdinalSuffix(numericDay);

  //   const formattedDate = `${dayOfWeek}, ${numericDay}${ordinalSuffix} ${month} ${year}`;

  //   return formattedDate;
  // };

  const ConvertDateold = (originalDateStr: string | undefined): string => {
    // Ensure input is a valid string
    if (typeof originalDateStr !== "string") {
      console.error("Input must be a string");
      return "";
    }

    // Check if the input has a timezone indicator (e.g., "Z" or "+/-HH:mm")
    let utcDate: Date;

    console.log("Converted UTC time:", originalDateStr);

    // if (
    //   originalDateStr.endsWith("Z") ||
    //   originalDateStr.includes("+") ||
    //   originalDateStr.includes("-")
    // ) {
    //   // If it already has a timezone indicator, treat it as UTC
    //   utcDate = new Date(originalDateStr);
    // } else {

    //   // Otherwise, treat it as a local time and convert to UTC
    //   utcDate = new Date(`${originalDateStr}Z`);
    // }

    utcDate = new Date(`${originalDateStr}Z`);

    // Check if the date is valid
    if (isNaN(utcDate.getTime())) {
      console.error("Invalid date format");
      return "";
    }

    // Detect local time zone
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Extract local time parts using toLocaleDateString with time zone adjustment
    const dayOfWeek = utcDate.toLocaleDateString("en-US", {
      weekday: "long",
      timeZone: timeZone,
    });
    const dayOfMonth = utcDate.toLocaleDateString("en-US", {
      day: "numeric",
      timeZone: timeZone,
    });
    const month = utcDate.toLocaleDateString("en-US", {
      month: "long",
      timeZone: timeZone,
    });
    const year = utcDate.toLocaleDateString("en-US", {
      year: "numeric",
      timeZone: timeZone,
    });

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

    // Convert day string to a number and calculate ordinal suffix
    const numericDay = parseInt(dayOfMonth, 10); // Convert day string to number
    const ordinalSuffix = getOrdinalSuffix(numericDay);

    // Combine all parts into a properly formatted date string
    const formattedDate = `${dayOfWeek}, ${numericDay}${ordinalSuffix} ${month} ${year}`;

    return formattedDate;
  };

  const ConvertDate = (originalDateStr: string | undefined): string => {
    // Ensure input is a valid string
    if (typeof originalDateStr !== "string") {
      console.error("Input must be a string");
      return "";
    }

    console.log("Converted UTC time:", originalDateStr);
    const isUTC = originalDateStr.endsWith("Z");
    const utcDate = new Date(isUTC ? originalDateStr : `${originalDateStr}Z`);

    // Check if the input already has a timezone indicator

    // Check if the date is valid
    if (isNaN(utcDate.getTime())) {
      console.error("Invalid date format");
      return "";
    }

    // Detect local time zone
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Extract local time parts using toLocaleDateString with time zone adjustment
    const dayOfWeek = utcDate.toLocaleDateString("en-US", {
      weekday: "long",
      timeZone: timeZone,
    });
    const dayOfMonth = utcDate.toLocaleDateString("en-US", {
      day: "numeric",
      timeZone: timeZone,
    });
    const month = utcDate.toLocaleDateString("en-US", {
      month: "long",
      timeZone: timeZone,
    });
    const year = utcDate.toLocaleDateString("en-US", {
      year: "numeric",
      timeZone: timeZone,
    });

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

    // Convert day string to a number and calculate ordinal suffix
    const numericDay = parseInt(dayOfMonth, 10); // Convert day string to number
    const ordinalSuffix = getOrdinalSuffix(numericDay);

    // Combine all parts into a properly formatted date string
    const formattedDate = `${dayOfWeek}, ${numericDay}${ordinalSuffix} ${month} ${year}`;

    return formattedDate;
  };

  const ConvertTime = (timeStr: string): string => {
    // Ensure input is a string
    if (typeof timeStr !== "string") {
      console.error("Input must be a string");
      return "";
    }
    const isUTC = timeStr.endsWith("Z");
    const utcDate = new Date(isUTC ? timeStr : `${timeStr}Z`);

    // Convert the input UTC time to a local time using the Date object

    // const utcDate = new Date(`${timeStr}Z`);
    // Appending 'Z' to ensure UTC parsing
    if (isNaN(utcDate.getTime())) {
      console.error("Invalid time format");
      return "";
    }

    // Detect local time zone
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Convert UTC date to local time string in "HH:MM" format
    const localTime = utcDate.toLocaleTimeString("en-GB", {
      timeZone: timeZone,
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });

    // Split the time into hours and minutes
    const [hoursStr, minutesStr] = localTime.split(":");
    const hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);

    // Ensure the hours and minutes are valid numbers
    if (isNaN(hours) || isNaN(minutes)) {
      console.error("Invalid time format");
      return "";
    }

    // Determine AM or PM
    const period = hours >= 12 ? "PM" : "AM";

    // Convert hours from 24-hour to 12-hour format
    const formattedHours = hours % 12 || 12; // Handle 0 as 12 for midnight

    // Format minutes with leading zero if necessary
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    // Combine hours, minutes, and period
    const formattedTime = `${formattedHours}:${formattedMinutes} ${period}`;

    return formattedTime;
  };

  const [AboutDrop, setAboutDrop] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Toggle the dropdown visibility
  const AboutToggle = () => {
    setAboutDrop((prev) => !prev);
    setShowFullDescription(false); // Close full description when toggling dropdown
  };

  // Toggle the full description visibility
  const toggleDescription = () => {
    setShowFullDescription((prev) => !prev);
  };

  const descriptionText = eventdescription || "";
  const maxLines = 4;

  // Function to strip HTML tags
  const stripHtmlTags = (html: string) => {
    return html.replace(/<\/?[^>]+(>|$)/g, ""); // Regular expression to remove HTML tags
  };

  // Get HTML content directly without stripping
  const firstParagraphHtml = descriptionText
    .split("\n")
    .slice(0, maxLines)
    .join("\n"); // You don't need to remove the HTML tags here anymore

  const myid =
    typeof window !== "undefined" ? localStorage.getItem("_id") || "" : "";

  const textRef: any = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    if (textRef.current) {
      const lineHeight = parseFloat(
        getComputedStyle(textRef.current).lineHeight
      );
      const oneLineHeight = lineHeight; // height of one line
      setIsOverflowing(textRef.current.scrollHeight > oneLineHeight);
    }
  }, [firstParagraphHtml, showFullDescription]);

  // Check for overflowing content

  const APIKEY = "AIzaSyA78WzK8evJ7Vier7fUXAqjM5KDhDwyq88";

  return (
    <>
      {" "}
      <div className="">
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

          <div className="flex gap-[0.35rem] flex-wrap w-[80%]">
            {eventCategory?.length > 0 &&
              eventCategory?.map((category: any, index: any) => (
                <Badge key={index} className="lg:text-[12px]">
                  {category}
                </Badge>
              ))}
            {/* <Badge className="lg:text-[12px]">Party</Badge>
            <Badge className="lg:text-[12px]">Invitation</Badge>
            <Badge className="lg:text-[12px]">TAKEOVR</Badge> */}
          </div>
          {/* <div className="flex gap-[0.35rem] mt-3">
            <Link target="_blank" href={`${instaUrl}`}>
              <InstagramLogo size={30} weight="fill" />
            </Link>
            <Link target="_blank" href={`${tiktokUrl}`}>
              <TiktokLogo size={30} weight="fill" />
            </Link>
          </div> */}

          <h2 className="text-[32px] lg:w-full lg:text-[48px] xl:text-[48px] font-extrabold leading-[1.2] mt-[12px] mb-[24px] -tracking-[0.02em] ">
            {title}
          </h2>
          <div className="">
            <div className="flex items-center gap-[8px]">
              <Image src={Location} alt="location" />
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  location
                )}&key=${APIKEY}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className="text-[16px] font-bold leading-[24px]">
                  {location}
                </p>
              </a>
            </div>

            <div className="flex items-center gap-[8px] mt-[12px] ">
              <Image src={clander} alt="calendar" />
              <p className=" text-[16px] font-bold leading-[24px]">
                {/* {ConvertDate(eventDate)} */}
                {ConvertDate(eventDate)} - {ConvertTime(startTime)}
              </p>
            </div>
            <div className="flex items-center gap-[8px] mt-[12px]">
              <Image src={time} alt="time" />
              <p className=" text-[16px] font-bold leading-[24px]">
                {/* {ConvertTime(startTime)} - {ConvertTime(endTime)}{" "} */}
                {ConvertDate(endTime)} - {ConvertTime(endTime)}
              </p>
            </div>
          </div>
          <div>
            {/* Description Section */}
            <div className="relative">
              <div className="mb-4 md:mt-[48px] mt-[24px]">
                <button
                  onClick={AboutToggle}
                  className="text-white flex items-center gap-[10px]"
                >
                  <p className="text-[#13FF7A] text-sm font-bold md:text-base">
                    About this event
                  </p>
                  {/* Toggle between arrow down and arrow up based on AboutDrop state */}
                  <Image
                    src={Arrowdown} // Use Arrowdown icon for the base
                    alt="arrow"
                    sizes="16px"
                    className={`h-[16px] w-[16px] transition-transform duration-300 ${
                      AboutDrop ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              {AboutDrop && (
                <div
                  className="mb-[12px] text-white break-words overflow-hidden"
                  ref={textRef}
                >
                  {showFullDescription ? (
                    <div
                      dangerouslySetInnerHTML={{ __html: descriptionText }}
                    />
                  ) : (
                    <div
                      className="line-clamp-3 overflow-hidden"
                      dangerouslySetInnerHTML={{ __html: firstParagraphHtml }}
                    />
                  )}

                  {/* Show "Read More" if text is overflowing, or "Show Less" when expanded */}
                  {isOverflowing && (
                    <button
                      onClick={toggleDescription}
                      className="text-[#13FF7A] text-sm font-bold md:text-base cursor-pointer mt-2"
                    >
                      {showFullDescription ? "Show Less" : "Read More"}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
          {/* Tags Section */}
          <div>
            <div className="flex w-full gap-[8px] flex-wrap mb-[48px] mt-[10px]">
              {eventTags &&
                eventTags.map((tag: string, index: number) => {
                  return (
                    <div
                      key={index}
                      className="gradient-bg gradient-border-edit py-[8px] px-[10px] gradient-slate w-fit text-[12px] font-extrabold leading-[16.2px] text-left"
                    >
                      {tag?.startsWith("#") ? `${tag}` : `#${tag}`}
                    </div>
                  );
                })}
            </div>
          </div>
          <BuyTicket
            eventType={eventType}
            event={event}
            setShowTicket={setShowTicket}
            startPrice={ticketStartPrice}
            endPrice={ticketEndPrice}
            userId={userId}
            ticketlength={ticketLength}
            endTime={endTime}
            ticketEndTime={ticketEndDate}
            ticketStartTime={ticketStartDate}
            soldout={soldout}
            salesStop={salesStop}
            allTickets={allTickets}
          />
        </div>
      </div>
    </>
  );
};

export default EventsHeroSlide;
