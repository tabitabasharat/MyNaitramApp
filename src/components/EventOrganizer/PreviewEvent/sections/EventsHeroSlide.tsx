"use client";
import BuyTicket from "@/components/reusable-components/BuyTicket";
import { Badge } from "@/components/ui/badge";
import { Heart } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { useState } from "react";
import clander from "@/assets/startdate.svg";
import time from "@/assets/endDate.svg";
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
  setShowTicket, // const firstParagraph = getFirstParagraph(eventdescription);
  handleBulletClick,
  // AboutDrop,
  // AboutToggle,
  eventCategory,
  ticketStartPrice,
  ticketEndPrice,
  eventdescription,
  instaUrl,
  tiktokUrl,
  ticketsdata,
  ticketLength
}: any) => {
  const [isOpenDropdown, setisOpenDropdown] = useState(false);

  console.log("this is event price", endTime, startTime);

  const ConvertDateold = (originalDateStr: string): string => {
    // Ensure the input UTC date string is treated as UTC by appending 'Z'
    const utcDate = new Date(`${originalDateStr}Z`);
    console.log("Converted UTC time:", utcDate);

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

    // Convert the input UTC time to a local time using the Date object
    const utcDate = new Date(`${timeStr}Z`); // Appending 'Z' to ensure UTC parsing
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

  // const descriptionText = eventdescription || "";
  // const maxLines = 3;

  // // Function to strip HTML tags
  // const stripHtmlTags = (html: string) => {
  //   return html.replace(/<\/?[^>]+(>|$)/g, ""); // Regular expression to remove HTML tags
  // };

  // Get plain text version without HTML
  // const plainTextDescription = stripHtmlTags(descriptionText);
  // const firstParagraph = descriptionText
  //   .split("\n")
  //   .slice(0, maxLines)
  //   .join("\n");

  const descriptionText = eventdescription || "";
  const maxLines = 3;

  // Function to strip HTML tags
  const stripHtmlTags = (html: string) => {
    return html.replace(/<\/?[^>]+(>|$)/g, ""); // Regular expression to remove HTML tags
  };

  // Get HTML content directly without stripping
  const firstParagraphHtml = descriptionText
    .split("\n")
    .slice(0, maxLines)
    .join("\n"); // You don't need to remove the HTML tags here anymore


    const myid = typeof window !== "undefined" ? localStorage.getItem("_id") || "" : "";

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

          <div className="flex gap-[0.35rem] flex-wrap lg:w-[80%]">
            {eventCategory?.length > 0 &&
              eventCategory.map((category: any, index: any) => (
                <Badge key={index} className="lg:text-[12px]">
                  {category}
                </Badge>
              ))}
            {/* <Badge className="lg:text-[12px]">Party</Badge>
            <Badge className="lg:text-[12px]">Invitation</Badge>
            <Badge className="lg:text-[12px]">TAKEOVR</Badge> */}
          </div>
          {/* <div className="flex gap-[0.35rem] mt-3">
            <Link
              target="_blank"
              href={`${instaUrl}`}
            >
               
              <InstagramLogo size={30} weight="fill" />
            </Link>
            <Link
              target="_blank"
              href={`${tiktokUrl}`}
            >
              <TiktokLogo size={30} weight="fill" />
            </Link>
          </div> */}

          <h2 className="text-[32px] lg:w-full lg:text-[48px] xl:text-[48px] font-extrabold leading-[1.2] mt-[12px] mb-[24px] -tracking-[0.02em] ">
            {title}
          </h2>
          <div className="">
            <div className="flex items-center gap-[8px] ">
              <Image src={Location} alt="location" />
              <p className=" text-[16px] font-bold leading-[24px]">
                {location}
              </p>
            </div>
            <div className="flex items-center gap-[8px] mt-[12px] ">
              <Image src={clander} alt="calendar" />
              <p className=" text-[16px] font-bold leading-[24px]">
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
          {/* <div className="mt-[24px]">
            <p className="text-[20px]">Included</p>
            <div className="mt-[12px]">
              {ticketsdata?.map((ticket:any) => (
                <div key={ticket.type} className="mb-[20px]">
                  <p className="mb-[12px]">{ticket?.type}</p>
                  {ticket.options?.map((option:any) => (
                    <div
                      key={option.id}
                      className="flex items-center mb-[12px]"
                    >
                      <Image
                        src={
                          imageMap[option.label] || location
                        }
                        width={30}
                        height={30}
                        alt="Option Icon"
                        className="me-[8px]"
                      />
                      <p className="font-bold text-start text-[16px]">
                        {option.label}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div> */}
          {/* <div
            className="flex items-center gap-[6px] cursor-pointer mt-[24px] lg:mt-[48px] mb-[12px]"
            onClick={() => AboutToggle()}
          >
            <p className="text-[#13FF7A]">About this event</p>
            <Image src={Arrowdown} alt="arrow-icon" className="" />
          </div>
          {AboutDrop && (
            <div>
              <div>
              <div dangerouslySetInnerHTML={{ __html: eventdescription }} className="text-white break-words overflow-hidden text-ellipsis" />
              </div>
            </div>
          )} */}
          <div>
            <div className="relative">
              <div className="mb-4 md:mt-[48px] mt-[24px]">
                <button
                  onClick={AboutToggle}
                  className="text-white flex items-center gap-[10px]"
                >
                  <p className="text-[#13FF7A] text-sm font-bold md:text-base">
                    About this event{" "}
                  </p>{" "}
                  <Image src={Arrowdown} alt="arrow-down" sizes="16px" />
                </button>
              </div>
              {/* <div dangerouslySetInnerHTML={{ __html: eventdescription }} className="text-white break-words overflow-hidden text-ellipsis" /> */}

              {/* {AboutDrop && (
                <div className="mb-[12px] text-white break-words overflow-hidden">
                  {showFullDescription ? (
             <div dangerouslySetInnerHTML={{ __html: eventdescription }} className="text-white break-words overflow-hidden text-ellipsis" /> 
                   
                    
                  ) : (
                    <div className="line-clamp-3 overflow-hidden">
                      {firstParagraphh}
                    </div>
                
                  )}
                  <button
                    onClick={toggleDescription}
                    className="text-[#13FF7A]  text-sm font-bold md:text-base cursor-pointer mt-2"
                  >
                    {showFullDescription ? "Show Less" : "Read More"}
                  </button>
                </div>
              )} */}

              {AboutDrop && (
                <div className="mb-[12px] text-white break-words overflow-hidden">
                  {/* Show a limited number of lines if showFullDescription is false */}
                  {showFullDescription ? (
                    <div
                      dangerouslySetInnerHTML={{ __html: descriptionText }}
                    /> // Render full HTML when expanded
                  ) : (
                    <div
                      className="line-clamp-3 overflow-hidden"
                      dangerouslySetInnerHTML={{ __html: firstParagraphHtml }}
                    />
                  )}

                  {/* Button to toggle between showing more or less */}
                  <button
                    onClick={toggleDescription}
                    className="text-[#13FF7A] text-sm font-bold md:text-base cursor-pointer mt-2"
                  >
                    {showFullDescription ? "Show Less" : "Read More"}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* <p className="text-muted mt-4">Location: {location}</p> */}

          {/* <BuyTicket
            event={event}
            setShowTicket={setShowTicket}
            startPrice={ticketStartPrice}
            endPrice={ticketEndPrice}
          /> */}

<BuyTicket
            // eventType={eventType}
            event={event}
            setShowTicket={setShowTicket}
            startPrice={ticketStartPrice}
            endPrice={ticketEndPrice}
            userId={myid}
            ticketlength={ticketLength}
            endTime={endTime}
          />
        </div>
      </div>
    </>
  );
};

export default EventsHeroSlide;
