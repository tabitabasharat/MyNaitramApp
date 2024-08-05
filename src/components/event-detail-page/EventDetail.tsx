"use client";

import BuyTicket from "@/components/reusable-components/BuyTicket";
import FollowPromoter from "@/components/reusable-components/FollowPromoter";
import { Badge } from "@/components/ui/badge";
import { events } from "@/lib/dummyData";
import {
  ArrowLeft,
  Heart,
  User,
  MapPin,
  Calendar,
  Clock,
  Lock,
  DownloadSimple,
  UsersThree,
  Ticket,
  DeviceMobile,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import eventVideo from "@/assets/event-video.png";
import avatar from "@/assets/avatar.png";
import gift from "@/assets/gift.png";

import { Button } from "@/components/ui/button";
import GradientBorder from "@/components/ui/gradient-border";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getEventById } from "@/lib/middleware/event";
const EventDetail = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initalEvent = events[2];

  const [eventid, setEventid] = useState<any>();

  useEffect(() => {
    const currentUrl = window.location.href;
    const parts = currentUrl.split("/");
    const value = parts[parts.length - 1];
    setEventid(value);
    console.log("my event id is", value);
    dispatch(getEventById(value));
  }, []);

  const EventDetail = useAppSelector(
    (state) => state?.getEventById?.specificEvent?.data?.data[0]
  );
  console.log("All Event Data", EventDetail);

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
    const formattedDate = `${dayOfWeek}, ${date}${ordinalSuffix} ${month} ${year}`;

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
  return (
    <section className="relative mx-2xl">
      {/* BLUR BACKGROUND IMAGE */}
      <Image
        style={{ filter: "blur(30px)" }}
        width={1000}
        height={1000}
        src={`${EventDetail?.eventPicture || initalEvent.img}`}
        className="w-full h-screen absolute object-cover object-center z-0 opacity-30"
        alt=""
      />

      <div className="pxpx pt-[8rem] lg:pt-[9rem] pb-[6rem] z-[2] flex flex-col xl:flex-row gap-6 lg:gap-12 w-full md:w-[70%] md:mx-auto xl:w-full relative">
        <div className="">
          <div className="flex items-center gap-4 mb-6">
            <button onClick={() => router.back()} type="button">
              <ArrowLeft size={22} />
            </button>
            <p>
              <span className="text-[#BFBFBF]">Event</span> /{" "}
              <span>{EventDetail?.name}</span>
            </p>
          </div>
          <div
            style={{
              backgroundImage: `url(${EventDetail?.eventPicture ||  initalEvent.img})`,
              backgroundPosition: "center",
            }}
            className="bg-cover bg-no-repeat h-[300px] lg:h-[450px] w-full xl:h-[470px] xl:w-[470px] rounded-lg relative"
          >
            <div className="bg-white/20 p-[1rem] rounded-full backdrop-blur-lg webkit-header-blur w-fit absolute right-6 bottom-6">
              <Heart size={23} weight="fill" />
            </div>
          </div>
          <FollowPromoter />
        </div>

        {/* DIVISION */}

        <div className=" mt-12">
          <div className="flex gap-[0.35rem]">
            {/* EVENT TAGS */}
            <Badge>Party</Badge>
            <Badge>Invitation</Badge>
            <Badge>Women Day</Badge>
          </div>
          {/* EVENT DETAILS */}
          <h2 className="text-[28px] lg:w-full lg:text-[40px] xl:text-[55px] font-extrabold leading-[1.2] mt-2">
            {EventDetail?.name}
          </h2>
          <div className="flex flex-col gap-3 mt-6 mb-10">
            <div className="flex items-center gap-3">
              <div className="border gradient-slate p-2 rounded-md border-[#262626] w-fit">
                <User size={20} weight="fill" />
              </div>
              <p>16+ ages</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="border gradient-slate p-2 rounded-md border-[#262626] w-fit">
                <MapPin size={20} weight="fill" />
              </div>
              <p>{EventDetail?.location}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="border gradient-slate p-2 rounded-md border-[#262626] w-fit">
                <Calendar size={20} weight="fill" />
              </div>
              <p>{ConvertDate(EventDetail?.eventDate)}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="border gradient-slate p-2 rounded-md border-[#262626] w-fit">
                <Clock size={20} weight="fill" />
              </div>
              <p>
                {ConvertTime(EventDetail?.startTime)} -{" "}
                {ConvertTime(EventDetail?.endTime)}{" "}
              </p>
            </div>
          </div>
          <BuyTicket eventid={eventid} />
          {/* EVENT VIDEO */}
          <Image
            src={eventVideo}
            width={800}
            height={800}
            className="w-full mt-12"
            alt="event-video"
          />
          {/*ABOUT EVENT */}
          <div className="mt-12">
            <h4 className="text-primary">About this Event</h4>
            <p className="mt-2">
              Join us for the PIZDEZ Women's Day Party 2024, an unforgettable
              celebration of women's achievements and empowerment! Enjoy an
              electrifying night filled with live music, dancing, and
              entertainment. Mingle with amazing people in a vibrant atmosphere,
              and take part in special activities designed to honor and uplift
              women. Delicious food and drinks will be available, making it a
              perfect night out. Don't miss this exciting event—come and
              celebrate with us!
            </p>
          </div>
          {/* LIVE ACTIVITY */}
          <GradientBorder className="mt-12">
            <div
              style={{
                backgroundImage: "url(/live-activity-bg.png)",
                backgroundPosition: "center",
              }}
              className="bg-cover bg-no-repeat w-full h-full rounded-lg relative overflow-hidden py-10"
            >
              <div className="w-full flex flex-col justify-center items-center">
                <div className="flex -space-x-3">
                  <Image
                    src={avatar}
                    width={60}
                    height={60}
                    alt="avatar"
                    className="rounded-full border border-[#034C22] z-[1]"
                  />
                  <Image
                    src={avatar}
                    width={60}
                    height={60}
                    alt="avatar"
                    className="rounded-full border border-[#034C22] z-[2]"
                  />
                  <Image
                    src={avatar}
                    width={60}
                    height={60}
                    alt="avatar"
                    className="rounded-full border border-[#034C22] z-[3]"
                  />
                </div>
                <h3 className="text-[20px] text-[#0FFF77] font-bold leading-[1.1] text-center mt-4">
                  Evelyn and 348 others going
                </h3>
                <p className="text-muted">Tap to see the live activities</p>
                <Link href={"/events/event-detail/live-activity"}>
                  <Button className="flex items-center gap-[0.5rem] rounded-full mt-4 w-fit">
                    <Lock size={20} weight="fill" />
                    Live Activity
                  </Button>
                </Link>
              </div>
            </div>
          </GradientBorder>
          {/* DOWNLOAD NAITRAM */}
          <div className="relative gradient-slate border border-[#262626] mt-12 rounded-xl p-8">
            <h2 className="text-2xl">Download NAITRAM App</h2>
            <div className="flex flex-col gap-2 mt-4">
              <div className="flex gap-3">
                <UsersThree
                  size={22}
                  weight="fill"
                  className="text-[#8F8F8F]"
                />
                <p>Keep up with the event with Live Activity Feature</p>
              </div>
              <div className="flex gap-3">
                <Ticket size={22} weight="fill" className="text-[#8F8F8F]" />
                <p>View and open your tickets easily</p>
              </div>
              <div className="flex gap-3">
                <DeviceMobile
                  size={22}
                  weight="fill"
                  className="text-[#8F8F8F]"
                />
                <p>Browse any event anytime from your hand</p>
              </div>
            </div>
            <Button className="flex items-center gap-[0.5rem] rounded-full mt-6 w-full">
              <DownloadSimple size={20} weight="fill" />
              Download App to Unlock Features
            </Button>
            <Image
              src={gift}
              width={200}
              height={200}
              className="absolute top-[-10%] lg:right-0 xl:right-[-10%] hidden lg:block"
              alt="gift"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetail;
