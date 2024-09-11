"use client";

import { events } from "@/lib/dummyData";
import Link from "next/link";

import {
  ArrowLeft,
  SealCheck,
  InstagramLogo,
  XLogo,
  TwitterLogo
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import GoldGradientBorder from "../ui/gold-gradient-border";
import MobileEventCard from "../reusable-components/MobileEventCard";
import { shimmer, toBase64, truncateString } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useState, useEffect } from "react";
import { getOrganizerSocialProfile } from "@/lib/middleware/organizer";
import { useSearchParams } from 'next/navigation';
import sealnew from "@/assets/Wallet/Sealnew.svg"


const PromoterProfile = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const eventName = searchParams.get('eventname'); 
  useEffect(() => {
    const userid =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;

    console.log("user id ", userid);
    dispatch(getOrganizerSocialProfile(userid));
  }, []);

  const myEventInfo = useAppSelector(
    (state) => state?.getOrgSocialProfile?.mySocialData?.data?.data
  );

  console.log("my  infooo is", myEventInfo);

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
  const getMinimumPrice = (tickets: { price: string }[] | null): string => {
    if (!tickets || tickets.length === 0) return "N/A";
  
    const prices = tickets.map(ticket => parseFloat(ticket.price)).filter(price => !isNaN(price));
    if (prices.length === 0) return "N/A";
  
    const minPrice = Math.min(...prices);
    return minPrice.toFixed(2); // Format to 2 decimal places
  };
  return (
    <section className="pt-[8rem] lg:pt-[9rem] pb-[8rem] relative overflow-hidden">
      {/* BLUR BACKGROUND IMAGE */}
      <Image
        style={{ filter: "blur(40px)" }}
        width={1000}
        height={1000}
        src={"/promoter-profile.png"}
        className="w-full object-cover absolute top-0 object-center z-0 opacity-30 h-screen"
        alt=""
      />

      <div className="relative pxpx mx-2xl z-[2] flex flex-col lg:flex-row gap-6 lg:gap-12 justify-center">
        <div className="md:w-[70%] md:mx-auto lg:mx-0 lg:w-[50%]">
          <div className="flex items-center gap-4 mb-6 md:whitespace-nowrap">
            <button onClick={() => router.back()}>
              <ArrowLeft size={22} />
            </button>
            <p>
              <span className="text-[#BFBFBF]">Event</span> /
              <span className="text-[#BFBFBF] lg:hidden">
                {" "}
                {truncateString("PIZDEZ Women's Day Party 2024", 5)}{" "}
              </span>
              <span className="text-[#BFBFBF] hidden lg:inline-block px-1">
                {" "}
               {eventName}{" "}
              </span>
              / <span>Promoter Profile</span>
            </p>
          </div>

          <div>
            <GoldGradientBorder className="w-fit rounded-full p-[3px]">
              <div className="bg-black rounded-full p-[7px]">
                <Image
                  src={myEventInfo?.profile?.profilePicture}
                  width={500}
                  height={500}
                  className="h-[120px] w-[120px] lg:h-[150px] lg:w-[150px] object-cover object-center rounded-full"
                  placeholder={`data:image/svg+xml;base64,${toBase64(
                    shimmer(1200, 1800)
                  )}`}
                  alt=""
                />
              </div>
            </GoldGradientBorder>
            <div>
              <p className="font-bold flex items-center gap-1  gap-1 text-[26px] mt-10">
                {myEventInfo?.userProfile?.fullname}
                <Image src={sealnew} alt="verified" />
                {/* <SealCheck
                  className="text-[#FFC109] -translate-y-1"
                  size={18}
                  weight="fill"
                /> */}
              </p>

              <p>
                <span className="text-muted">
                  {myEventInfo?.profile?.totalEvents} Events
                </span>{" "}
                <span className="opacity-50"> | </span>{" "}
                <span className="text-muted">
                  {myEventInfo?.profile?.totalAttendees} Attendees
                </span>
              </p>
              <p className="md:w-[80%] text-muted mt-4">
                {myEventInfo?.profile?.bio}
              </p>
              <div className="flex gap-3 mt-10 items-center">
                <Button variant="secondary" className="h-14">
                  Follow Promoter
                </Button>
                <div className="flex gap-3 h-full">
                  <Link
                    href={myEventInfo?.profile?.instaUrl || "#"}
                    passHref
                    target="_blank"
                  >
                    <div className="border border-white w-fit h-fit  p-3 lg:p-3 p-[10px] flex items-center justify-center rounded-full h-[36px] w-[36px] lg:h-[54px] lg:w-[54px] hover:bg-white hover:text-black duration-300">
                      <InstagramLogo
                        className=" w-[16px] h-[16px] lg:w-[16px] lg:h-[16px]"
                        weight="fill"
                      />
                    </div>
                  </Link>
                  <Link
                    href={myEventInfo?.profile?.twitterUrl || "#"}
                    passHref
                    target="_blank"
                  >
                    <div className="border border-white w-fit h-fit  p-3 lg:p-3 p-[10px] flex items-center justify-center rounded-full h-[36px] w-[36px] lg:h-[54px] lg:w-[54px] hover:bg-white hover:text-black duration-300">
                      <TwitterLogo
                        className=" w-[16px] h-[16px] lg:w-[16px] lg:h-[16px]"
                        weight="fill"
                      />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DIVISION */}

        <div className="md:w-[70%] md:mx-auto lg:mx-0 lg:w-[50%] mt-12">
          <p className="text-[18px] font-bold text-[#E6E6E6]">
            Our Upcoming Events
          </p>
          <div className="flex flex-col gap-3 mt-4">
            {myEventInfo?.events &&
              myEventInfo?.events?.map((events: any, index: any) => (
                <MobileEventCard
                  img={events?.coverEventImage}
                  title={events?.name}
                  eventId={events?.id}
                  eventDate={ConvertDate(events?.startTime)}
                  ticketPrice={getMinimumPrice(events?.tickets)}
                  likedEvents={events?.likes} 
                />
              ))}
            {/* <MobileEventCard img={events[3].img} title={events[3].title} eventId={events[3].id}/>
            <MobileEventCard img={events[4].img} title={events[4].title} eventId={events[4].id} />
            <MobileEventCard img={events[5].img} title={events[5].title} eventId={events[5].id} /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoterProfile;
