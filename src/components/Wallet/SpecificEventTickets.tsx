"use client";
import React from "react";
import Image from "next/image";
import Backbtn from "@/assets/Wallet/Back - Button.svg";
import { Badge } from "@/components/ui/badge";
import rhsimg from "@/assets/Wallet/Tickets.svg";
import location from "../../assets/Location.svg";
import candendar from "../../assets/calendar1.svg";
import time from "../../assets/clock1.svg";
import stall from "../../assets/stall1.svg";
import food from "../../assets/dob1.svg";
import vip from "../../assets/crown1.svg";
import security from "../../assets/security.svg";
import info from "../../assets/Info.svg";
import qrcode from "../../assets/QR Code.svg";
import blockchain from "../../assets/blockchain-icon 1.svg";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import ScreenLoader from "../loader/Screenloader";
import { getTicketByQR } from "@/lib/middleware/wallet";
import { useRouter } from "next/navigation";
interface Location {
  id: number;
  address: any;
  image: any;
}
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

export default function SpecificEventTickets() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [eventID, setEventId] = useState("");
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    const currentUrl:any =  typeof window !== "undefined" ? window.location.href:null;
    const parts = currentUrl.split("/");
    const value = parts[parts.length - 1];
    setEventId(value);
    console.log("my event id is", value);
    dispatch(getTicketByQR(value));
  }, []);

  const TicketData = useAppSelector(
    (state) => state?.getTicketByQR?.myQRTickets?.data
  );
  console.log("MY ticket data is", TicketData);
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
      <div className="max-w-screen-lg lg:gap-[0px]   mx-auto text-center lg:text-left">
        {/* Container for back button and title */}
        <div className="flex justify-start items-center lg:gap-[16px] gap-[12px] mb-8">
          <Image
            src={Backbtn}
            alt="back"
            className="w-[28px] h-[28px] lg:w-[44px] lg:h-[44px]"
            onClick={() => router.back()}
          />
          <p className="text-[20px] lg:text-[24px] font-bold">
            {TicketData?.event?.name}
          </p>
        </div>
        {/* Main content container */}
        <div className="flex flex-col-reverse gap-[62px] justify-between lg:items-start items-center lg:flex-row">
          <div className="flex flex-col">
            <div className="flex flex-col lg:flex-row items-center  lg:items-start gap-[16px]">
              <div className="flex w-full gap-[8px] mb-[12px] mt-[11px] lg:mt-[0px] lg:mb-0">
                <Badge className="bg-[#FFFFFF33] pt-[6px] px-[10px] lg:pt-[8px] lg:px-[12px] text-center lg:bg-[#292929] text-[11px] lg:text-[12px]">
                  Party
                </Badge>
                <Badge className="bg-[#FFFFFF33] pt-[6px] px-[10px] lg:pt-[8px] lg:px-[12px] text-center lg:bg-[#292929] text-[11px] lg:text-[12px]">
                  Invitation
                </Badge>
                <Badge className="bg-[#FFFFFF33] pt-[6px] px-[10px] lg:pt-[8px] lg:px-[12px] text-center lg:bg-[#292929] text-[11px] lg:text-[12px]">
                  TAKEOVR
                </Badge>
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
                        width={30}
                        height={30}
                        alt="Location Icon"
                        className=" me-[8px]"
                      />
                      <p className="font-bold text-start text-[16px]">
                        {Ticket?.label}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
          <div className="bg-ticket-img sm:w-[408px] md:w-[408px] lg:w-[408px] w-full rounded-[12px] pt-[12px] px-[20px] pb-[2px]">
            <div className="flex justify-end">
              <Image src={info} alt="img" />
            </div>
            <div className="flex flex-col justify-center items-center">
              <div>
                <Image style={{borderRadius:"12px"}}
                  width={144}
                  height={144}
                  src={TicketData?.qrCode}
                  alt="img"
                />
              </div>
              <Link href={`/wallet/specific-qr-code/${eventID}`}>
                <button className="font-extrabold text-sm rounded-[100px] mb-[24px] mt-[16px] px-[16px] py-[10px] bg-[#00D059] text-black">
                  Enlarge Code
                </button>
              </Link>
            </div>
            <div>
              <h2 className="font-normal text-sm pb-[4px]">Event Name</h2>
              <h3 className="font-extrabold text-base pb-[20px] border-b border-dashed border-[#00D059]">
                {TicketData?.event?.name}
              </h3>
            </div>
            <div className="pt-[24px]">
              <h2 className="font-normal text-sm pb-[4px]">Ticket Type</h2>
              <h3 className="font-extrabold text-base pb-[24px] border-b border-dashed border-[#00D059]">
                {TicketData?.event?.ticketType}
              </h3>
            </div>
            <div className=" flex justify-between rounded-[8px] my-[24px] p-[12px] items-center bg-[#007A35]">
              <div>
                <h2 className="font-normal text-sm">Transaction ID</h2>
                <h3 className="font-bold text-base ">Simple_1708531039717</h3>
              </div>
              <div>
                <Image src={blockchain} alt="img" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
