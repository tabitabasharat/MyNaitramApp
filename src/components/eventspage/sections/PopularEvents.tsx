"use client";

import "swiper/css";
import "swiper/css/autoplay";
import { useState, useEffect } from "react";
import EventCard from "@/components/reusable-components/EventCard";

import { events } from "@/lib/dummyData";

import { A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getAllEvents } from "@/lib/middleware/event";
import eventimg from "../../../../public/event12.png";

const PopularEvents = () => {
  const dispatch = useAppDispatch();
  const EventsAllData = useAppSelector((state) => state?.getAllEvents?.allEvents?.data?.data);
  console.log("All Event Data", EventsAllData);
  useEffect(() => {
    dispatch(getAllEvents());
  }, []);
  return (
    <section className="pxpx mx-2xl pb-20 mt-20">
      <h2 className="font-bold text-[32px] leading-[1.1] lg:text-[48px] md:mb-[2rem] 2xl:mt-20">📍 Popular Events Near Me</h2>
      {/* <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.slice(0, 6).map((event) => (
          <EventCard key={event.id} img={event.img} title={event.title} />
        ))}
      </div> */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {EventsAllData?.events.length > 0 &&
          EventsAllData?.events.map((event: any, index: any) => (
            <EventCard likedEvents={[]} key={index} img={event?.eventPicture} title={event?.name} eventId={event?.id} eventType={"test"} price="0" />
          ))}
      </div>
      <div className="md:hidden mx-auto cursor-grab scale-[0.95] lg:scale-100 origin-bottom-left">
        <Swiper
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          slidesPerView={1}
          modules={[A11y, Autoplay]}
          speed={1000}
          spaceBetween={15}
          className="mt-6 flex"
          style={{ overflow: "visible" }}
        >
          {events.slice(0, 6).map((event) => (
            <SwiperSlide key={event.id}>
              <EventCard
                likedEvents={[]}
                key={event.id}
                img={event.img}
                title={event.title}
                eventId={event?.id}
                eventType={"test"}
                price="0"

                // eventid={event.id}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default PopularEvents;
