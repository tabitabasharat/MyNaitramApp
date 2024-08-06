"use client";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";

import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, EffectFade, Pagination } from "swiper/modules";

import EventsHeroSlide from "./EventsHeroSlide";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getAllEvents } from "@/lib/middleware/event";

const EventsHero = () => {
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
  const EventsAllData = useAppSelector(
    (state) => state?.getAllEvents?.allEvents?.data?.data
  );

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(0);
    }
  }, [EventsAllData]);

  return (
    <section className="h-[95vh] max-w-screen lg:h-[90vh]  overflow-hidden relative">
      <Swiper
        onSlideChange={handleSlideChange}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        loop
        effect="fade"
        slidesPerView={1}
        modules={[Pagination, A11y, Autoplay, EffectFade]}
        pagination={false}
        autoplay={{ delay: 5000 }}
        navigation
        speed={1000}
        className="fade-slider h-full"
      >
        {EventsAllData?.events.length > 0 &&
          EventsAllData?.events.map((event: any, index: number) => (
            <SwiperSlide key={index}>
              <EventsHeroSlide
              event={event}
                title={event?.name}
                endTime={event?.endTime}
                startTime={event?.startTime}
                img={event?.eventPicture}
                location={event.location}
                activeIndex={activeIndex}
                eventDate={event?.eventDate}
                handleBulletClick={() => handleBulletClick(index)}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

export default EventsHero;
