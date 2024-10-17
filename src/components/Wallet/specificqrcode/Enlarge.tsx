"use client";
import React from "react";
import Image from "next/image";
import blurqrcode from "@/assets/Wallet/BlurQrGreen.svg";

import Backbtn from "@/assets/Wallet/Back - Button.svg";
import { Badge } from "@/components/ui/badge";
import rhsimg from "@/assets/qr.svg";
import location from "@/assets/Location.svg";
import candendar from "@/assets/calendar1.svg";
import time from "@/assets/clock1.svg";
import stall from "@/assets/stall1.svg";
import food from "@/assets/dob1.svg";
import vip from "@/assets/crown1.svg";
import security from "@/assets/security.svg";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import ScreenLoader from "@/components/loader/Screenloader";
import { getTicketByQR } from "@/lib/middleware/wallet";
import { useRouter } from "next/navigation";
import img1 from "@/assets/Handbag (1).svg";
import img2 from "@/assets/Cake.svg";
import img3 from "@/assets/Crown.svg";
import img4 from "@/assets/Shield Star.svg";
import img5 from "@/assets/Whats-Included/option5.svg";
import img6 from "@/assets/Whats-Included/option6.svg";
import img7 from "@/assets/Whats-Included/option7.svg";
import img8 from "@/assets/Whats-Included/option8.svg";
import img9 from "@/assets/Whats-Included/option9.svg";
import img10 from "@/assets/Whats-Included/option10.svg";
import img11 from "@/assets/Whats-Included/option11.svg";
import img12 from "@/assets/Whats-Included/option12.svg";
import img13 from "@/assets/Whats-Included/option13.svg";
import img14 from "@/assets/Whats-Included/option14.svg";
import img15 from "@/assets/Whats-Included/option15.svg";
import img16 from "@/assets/Whats-Included/option16.svg";
import img17 from "@/assets/Whats-Included/option17.svg";
import img18 from "@/assets/Whats-Included/option18.svg";
import img19 from "@/assets/Whats-Included/option19.svg";
import img20 from "@/assets/Whats-Included/option20.svg";
import { Button } from "@/components/ui/button";


interface Location {
  id: number;
  address: any;
  image: any;
}
interface Ticket {
  id: number;
  address: any;
  image: any;
}

const Ticket: Ticket[] = [
  // {
  //   id: 1,
  //   image: stall,
  //   address: "Merchandise Stalls",
  // },
  // { id: 2, image: food, address: "Food and Beverages" },
  // { id: 3, image: vip, address: "VIP Lounge" },
  // { id: 4, image: security, address: "Security and First Aid" },

  { id: 1, address: "Merchandise Stalls", image: img1 },
  { id: 2, address: "Food and Beverages", image: img2 },
  { id: 3, address: "VIP Lounge", image: img3 },
  { id: 4, address: "Security and First Aid", image: img4 },
  { id: 5, address: "Workshops & Networking", image: img5 },
  { id: 6, address: "Entertainment Zone", image: img6 },
  { id: 7, address: "Charging Stations", image: img7 },
  { id: 8, address: "Information Desk", image: img8 },
  { id: 9, address: "Rest Areas", image: img9 },
  { id: 10, address: "Photo Booths", image: img10 },
  { id: 11, address: "Lost & Found", image: img11 },
  { id: 12, address: "Kids Play Area", image: img12 },
  { id: 13, address: "Merchandise Pickup", image: img13 },
  { id: 14, address: "Eco-Friendly Zones", image: img14 },
  { id: 15, address: "Parking Assistance", image: img15 },
  { id: 16, address: "Virtual Reality Booths", image: img16 },
  { id: 17, address: "Interactive Displays", image: img17 },
  { id: 18, address: "Cloakroom Services", image: img18 },
  { id: 19, address: "Water Stations", image: img19 },
  { id: 20, address: "Ticketing & Registration", image: img20 },
];

// const imageMap:any = {
//   "Merchandise Stalls": stall,
//   "Food and Beverages": food,
//   "VIP Lounge": vip,
//   "Security and First Aid": security,
// };

const imageMap: any = {
  "Merchandise Stalls": img1,
  "Food and Beverages": img2,
  "VIP Lounge": img3,
  "Security and First Aid": img4,
  "Workshops & Networking": img5,
  "Entertainment Zone": img6,
  "Charging Stations": img7,
  "Information Desk": img8,
  "Rest Areas": img9,
  "Photo Booths": img10,
  "Lost & Found": img11,
  "Kids Play Area": img12,
  "Merchandise Pickup": img13,
  "Eco-Friendly Zones": img14,
  "Parking Assistance": img15,
  "Virtual Reality Booths": img16,
  "Interactive Displays": img17,
  "Cloakroom Services": img18,
  "Water Stations": img19,
  "Ticketing & Registration": img20,
};
const locations: Location[] = [
  {
    id: 1,
    image: location,

    address: "DOMA PUB Main floor, Light Street, London",
  },
  { id: 2, image: candendar, address: "Saturday, 5th March 2024" },
  { id: 3, image: time, address: "5 PM - 12 AM" },
];

export default function Enlarge() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [eventID, setEventId] = useState("");
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    const currentUrl: any =
      typeof window !== "undefined" ? window.location.href : null;
    const parts = currentUrl.split("/");
    const value = parts[parts.length - 1];
    setEventId(value);
    console.log("my event id is", value);
    dispatch(getTicketByQR(value));
  }, []);

  const TicketData = useAppSelector(
    (state) => state?.getTicketByQR?.myQRTickets?.data
  );
  console.log("MY ticket data enlarge qr is", TicketData);
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

  const ConvertTimeold = (timeStr: string): string => {
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
  const locations: Location[] = [
    {
      id: 1,
      image: location,

      address: TicketData?.event?.location,
    },
    {
      id: 2,
      image: candendar,
      address: ConvertDate(TicketData?.event?.startTime),
    },
    {
      id: 3,
      image: time,
      address: `${ConvertTime(TicketData?.event?.startTime)} - ${ConvertTime(
        TicketData?.event?.endTime
      )}`,
    },
  ];
  return (
    <section className="min-h-screen py-[8rem]  bg-cover bg-no-repeat px-[24px] md:px-[100px]   bg-reward  ">
      <div className="max-w-screen-lg lg:gap-[0px]  mx-auto text-center lg:text-left">
        {/* Container for back button and title */}
        <div className="flex justify-start items-center lg:gap-[16px] gap-[12px] mb-[52px] lg:mb-[34px]">
          <Image
            src={Backbtn}
            alt="back"
            onClick={() => router.back()}
            className="w-[28px] h-[28px] lg:w-[44px] lg:h-[44px]"
          />
          <p className="text-[20px] lg:text-[24px] font-bold">
            {TicketData?.event?.name}
          </p>
        </div>
        {/* Main content container */}
        <div className="flex flex-col-reverse justify-between items-center gap-[62px]  lg:flex-row">
          <div className="flex w-full flex-col">
            <div className="flex flex-col w-full lg:flex-row items-center  lg:items-start gap-[16px]">
              <div className="flex w-full gap-[8px] mb-[12px] mt-[11px] lg:mt-[0px] lg:mb-0 w-full lg:w-[100%] flex-wrap">
                {TicketData?.event?.category?.length > 0 &&
                  TicketData?.event?.category?.map(
                    (category: any, index: any) => (
                      <Badge
                        key={index}
                        className="bg-[#FFFFFF33] pt-[6px] px-[10px] lg:pt-[8px] lg:px-[12px] text-center lg:bg-[#292929] text-[11px] lg:text-[12px]"
                      >
                        {category}
                      </Badge>
                    )
                  )}
              </div>
            </div>
            <div>
              <h2 className="font-extrabold text-start pb-[12px] lg:pb-[24px] text-[32px] lg:text-[48px]">
                {TicketData?.event?.name}
              </h2>
              <div className="flex flex-col justify-center">
                {locations.map((location) => (
                  <div
                    key={location.id}
                    className="flex items-center mb-[12px] gap-[8px]"
                  >
                    <Image
                      src={location.image}
                      width={30}
                      height={30}
                      // className=" "
                      alt="Location Icon"
                    />
                    <p className="font-bold text-start text-[16px]">
                      {location.address}
                    </p>
                  </div>
                ))}
              </div>
              {/* <div className="">
                <div>
                  <p className="text-[#00D059] text-[13px] text-start font-bold mt-[12px] mb-[12px] md:mb-[8px]">
                    Ticket ID
                  </p>
                  <p className="font-bold text-start text-[24px]">
                    {TicketData?.id}
                  </p>
                </div>
                <div>
                  <p className="text-[#00D059] text-start text-[13px] font-bold mt-[12px] mb-[12px] md:mb-[8px]">
                    Ticket Type
                  </p>
                  <p className="font-bold text-start text-[24px]">
                    {" "}
                    {TicketData?.event?.tickets[TicketData?.isIndex]?.type}
                  </p>
                </div>
                <div>
                  <p className="text-[#00D059] text-start text-[13px] font-bold mt-[12px] mb-[12px] md:mb-[8px]">
                    Ticket Price
                  </p>
                  <p className="font-bold text-start text-[24px]">£
                  {TicketData?.event?.tickets[TicketData?.isIndex]?.price}

                  </p>
                </div>
              </div> */}
              <div className="flex flex-col justify-center">
                <h3 className="font-bold text-start text-[20px] lg:pt-[24px] pt-[16px] pb-[12px]">
                  Included in this ticket type
                </h3>
                {TicketData?.event?.tickets[TicketData?.isIndex]?.options.map(
                  (Ticket: any) => (
                    <div
                      key={Ticket.id}
                      className="flex items-center mb-[12px]"
                    >
                      <Image
                        src={imageMap[Ticket?.label]}
                        width={20}
                        height={20}
                        alt={`${Ticket.label} icon`}
                        className=" me-[8px]"
                      />
                      <p className="font-bold text-start text-[16px]">
                        {Ticket?.label}
                      </p>
                    </div>
                  )
                )}
              </div>
              {/* <div className="flex flex-col justify-center">
                <h3 className="font-bold text-start text-[20px] lg:pt-[24px] pt-[16px] pb-[12px]">
                  Included in this ticket type
                </h3>
                {TicketData?.event?.tickets?.map(
                  (ticket: any, index: number) => (
                    <div key={index}>
                      <h4 className="font-bold text-[18px] mb-[12px]">
                        {ticket?.type}
                      </h4>
                      {ticket.options?.map((option: any) => (
                        <div
                          key={option.id}
                          className="flex items-center mb-[12px]"
                        >
                          <Image
                            src={imageMap[option?.label]}
                            width={20}
                            height={20}
                            alt={`${option.label} icon`}
                            className=" me-[8px]"
                          />
                          <p className="font-bold text-start text-[16px] ">
                            {option?.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  )
                )}
              </div> */}
            </div>
          </div>      
             <div className="w-full flex flex-col items-center">
             <Image
            style={{ borderRadius: "12px" }}
            width={320}
            height={320}
            // src={TicketData?.qrCode}
            src={blurqrcode}
            alt="rhs"
            className="pt-[0px]"
          />
            <p className="py-[24px] text-center w-[320px] font-normal text-[18px]">
              Please view the ticket QR code on the Naitram Mobile App{" "}
            </p>
            {/* <div className="flex gap-[16px] w-full "> */}
            <Button
              onClick={() => {
                window.open(`https://sepolia.lineascan.build/tx/${TicketData?.txHash}`, '_blank', 'noopener,noreferrer');
              }}
              className="flex items-center gap-[4px] sm:p-[12px] w-full sm:w-[320px]"
            >
              <p className=" font-extrabold text-sm"> View on Blockchain</p>
            </Button>
          {/* </div> */}
          </div>
        </div>
        {/* </div> */}
      </div>
    </section>
  );
}
