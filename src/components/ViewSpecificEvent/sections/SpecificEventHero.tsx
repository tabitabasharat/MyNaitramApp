"use client";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";

import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, EffectFade, Pagination } from "swiper/modules";
import "./EventHero.css";
import EventsHeroSlide from "./EventsHeroSlide";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  getAllEvents,
  getAllEventsCount,
  getTicketsById,
} from "@/lib/middleware/event";
import Image from "next/image";
import takeover from "../../../assets/Images.png";
import takeoverfull from "@/assets/takeover-txt-img.svg";
import takeover1000 from "@/assets/takeover-1000px.svg";
import takeover500 from "@/assets/takeover-500.svg";
import { getEventByEventId } from "@/lib/middleware/event";
import fallbackImage from "../../../assets/event-video.png";

const SpecificEventHero = ({ setShowTicket }: any) => {
  const [eventID, setEventId] = useState("");

  useEffect(() => {
    const currentUrl = window.location.href;
    const parts = currentUrl.split("/");
    const value = parts[parts.length - 1];
    setEventId(value);
    console.log("my event id is", value);
    dispatch(getEventByEventId(value));
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<any>(null);

  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.activeIndex);
  };

  const handleBulletClick = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  const dispatch = useAppDispatch();
  const [isAbout, setisAbout] = useState(false);
  const EventData = useAppSelector(
    (state) => state?.getEventByEventID?.eventIdEvents?.data
  );
  console.log("my data", EventData);

  // useEffect(() => {
  //   if (swiperRef.current) {
  //     swiperRef.current.slideTo(0);
  //   }
  // }, [EventsAllData]);

  return (

    <section
    
      className="bg-img"
    >
   
      <div className="main-div-takeover">
        <div>
          {/* <Image src={takeover} alt="takeover"   className=" takeover"/> */}

          {/* {isAbout ? (
            <Image
              src={EventData?.coverEventImage  }
              alt="takeover"
              width={548}
              height={100}
              className=" w-full h-full"
            />
          ) : ( */}
            <Image
              src={EventData?.coverEventImage }
              alt="takeover"
              width={330}
              height={200}
              className=" w-full lg:w-[400px] h-full"
            />
             {/* <Image src={takeover500} alt="takeover"  width={330} height={200} className=" h-full"/> */}
          {/* )} */}
        </div>
        <div>
          <EventsHeroSlide
            event={EventData?.id}
            title={EventData?.name}
            eventCategory={EventData?.category}
            eventDate={EventData?.startTime}
            endTime={EventData?.endTime}
            startTime={EventData?.startTime}
            img={EventData?.eventPicture}
            location={EventData?.location}
            eventdescription={EventData?.eventDescription}
            // activeIndex={activeIndex}
            setShowTicket={setShowTicket}
            ticketStartPrice={EventData?.tickets[0]?.price}
            ticketEndPrice={
              EventData?.tickets[EventData?.tickets.length - 1]?.price
            }
            // handleBulletClick={() => handleBulletClick(event)}
            AboutDrop={isAbout}
            AboutToggle={() => setisAbout(!isAbout)}
          />
          {/* {EventData?.map((event: any) => (
            <EventsHeroSlide
              event={event}
              title={event?.name}
              endTime={event?.endTime}
              startTime={event?.startTime}
              img={event?.eventPicture}
              location={event.location}
              activeIndex={activeIndex}
              setShowTicket={setShowTicket}
              eventDate={event?.eventDate}
              // handleBulletClick={() => handleBulletClick(event)}
              AboutDrop={isAbout}
              AboutToggle={() => setisAbout(!isAbout)}
            />
          ))} */}
        </div>
      </div>
    </section>
  );
};

export default SpecificEventHero;
