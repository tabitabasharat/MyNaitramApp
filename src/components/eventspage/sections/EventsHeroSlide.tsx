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
import Clocktime from "@/assets/clock.svg";
import Calendar from "@/assets/calendar.svg";
import Location from "@/assets/location.svg";

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
  handleBulletClick,
  AboutDrop,
  AboutToggle,
}: any) => {
  const [isOpenDropdown, setisOpenDropdown] = useState(false);
  const ConvertDate = (originalDateStr: any) => {
    const originalDate = new Date(originalDateStr);

    // Extract the day, date, month, and year
    const dayOfWeek = originalDate.toLocaleDateString("en-US", {
      weekday: "long",
    });
    const date = originalDate.getDate();
    const month = originalDate.toLocaleDateString("en-US", { month: "long" });
    const year = originalDate.getFullYear();

    // Function to get ordinal suffix
    const getOrdinalSuffix = (date: any) => {
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
    const formattedDate = `${dayOfWeek} ${month} ${date}${ordinalSuffix} , ${year}`;

    return formattedDate;
  };

  const ConvertTime = (timeStr: any): string => {
    // Ensure input is a string
    if (typeof timeStr !== "string") {
      console.error("Input must be a string");
      return "";
    }

    const parts = timeStr.split(":");

    // Check if timeStr is in HH:MM:SS format
    if (parts.length !== 3) {
      console.error("Input time must be in HH:MM:SS format");
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
    const formattedTime = `${formattedHours} ${period}`;

    return formattedTime;
  };
  const toggleAbout = () => {
    setisOpenDropdown(!isOpenDropdown);
  };
  return (
    <>
      {" "}
      <div className="relative h-full">
        <Image
          style={{ filter: "blur(30px)" }}
          width={1000}
          height={1000}
          src={img}
          className="w-full h-full object-cover object-center z-0 opacity30"
          alt=""
        />
        <div className="absolute inset-0 bg-black/65"></div>
      </div>
      <div className="pxpx mx2xl absolute z-[2] top-32 lg:top-1/2 lg:-translate-y-[38%] flex flex-col lg:flex-row gap-6 lg:gap-12 w-full md:w-[70%] lg:w-fit translate-x-1/2 right-1/2">
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

          <div
            style={{
              backgroundImage: `url(${img})`,
              backgroundPosition: "center",
            }}
            className="bg-cover bg-no-repeat h-[300px] w-full lg:h-[300px] lg:w-[300px] xl:h-full xl:w-[470px] rounded-lg relative"
          >
            {" "}
            <div className="bg-white/20 p-[1rem] rounded-full backdrop-blur-lg webkit-header-blur w-fit absolute right-6 bottom-6">
              <Heart size={23} weight="fill" />
            </div>
          </div>
        </div>
        <div className="lg:w-[70%] ">
          {/* <div className="lg:flex gap-1 hidden mt-4">
            {top5Events.map((_, index) => (
              <div
                key={index}
                className={`size-3 ${
                  index === activeIndex ? 'bg-white' : 'border border-white'
                } rounded-full cursor-pointer`}
                onClick={() => handleBulletClick(index)}
              ></div>
            ))}
          </div> */}

          <div className="flex gap-[0.35rem] mt-4">
            <Badge>Party</Badge>
            <Badge>Invitation</Badge>
            <Badge>Women Day</Badge>
          </div>
          <div className="flex gap-[0.35rem] mt-4">
            <Link href="https://www.instagram.com/naitram.live?igsh=MXhjcXI1bjlydG16Mw==">
              <InstagramLogo size={30} weight="fill" />
            </Link>
            <Link href="https://www.tiktok.com/@naitram.live?_t=8oczYiZWsN6&_r=1">
              <TiktokLogo size={30} weight="fill" />
            </Link>
          </div>

          <h2 className="text-[28px] lg:w-full lg:text-[40px] xl:text-[55px] font-extrabold leading-[1.2] mt-2">
            {title}
          </h2>
          <div
            className="flex items-center gap-[4px] cursor-pointer mt-[24px]"
            onClick={() => AboutToggle()}
          >
            <p className="text-[#13FF7A]">About </p>
            <Image src={Arrowdown} alt="arrow-icon" />
          </div>
          {AboutDrop && (
            <div>
              <div>
                <p className="text-[#E6E6E6] font-extrabold mt-[10px]">
                  TAKEOVER Boat Party
                </p>
                <div className="flex items-center gap-[4px] mt-[5px]">
                  <Image src={Location} alt="location" />
                  <p className="text-[#E6E6E699] text-[13px] font-normal leading-[18px]">
                    Tereza Joanne, King George V Dock, London, E16 2QY
                  </p>
                </div>
                <div className="flex items-center gap-[4px] mt-[10px]">
                  <Image src={Calendar} alt="location" height={12} width={12} />
                  <p className="text-[#E6E6E699] text-[13px] font-normal leading-[18px]">
                    Saturday 24th August 24
                  </p>
                </div>
                <div className="flex items-center gap-[4px] mt-[10px]">
                  <Image src={Clocktime} alt="location" />
                  <p className="text-[#E6E6E699] text-[13px] font-normal leading-[18px]">
                    16:00- 23:00
                  </p>
                </div>
              </div>
              <div>
                <p className="text-[#E6E6E6] mt-[10px]">Dj LINE UP </p>

                <p className="text-[#E6E6E699] text-[13px] font-normal leading-[18px] mt-[5px]">
                  Mars: 16:00 - 18:00
                </p>

                <p className="text-[#E6E6E699] text-[13px] font-normal leading-[18px] mt-[10px] ">
                  Dj Jada-Kai: 18:00 - 19:00
                </p>

                <p className="text-[#E6E6E699] text-[13px] font-normal leading-[18px] mt-[10px] ">
                  Dj Miami Lee: 19:00 - 21:00
                </p>
                <p className="text-[#E6E6E699] text-[13px] font-normal leading-[18px] mt-[10px]">
                  Dam shaq: 21:00-23:00
                </p>
                <p className="mt-[5px] font-extrabold">Host: 5ive</p>
              </div>
            </div>
          )}

          <p className="text-muted mt-4">Location: {location}</p>
          <p className="text-muted lg:mt-2 mb-6">
            {" "}
            {ConvertDate(eventDate)} {ConvertTime(startTime)} {"-"}{" "}
            {ConvertTime(endTime)}
          </p>
          <BuyTicket event={event} />
        </div>
      </div>
    </>
  );
};

export default EventsHeroSlide;
