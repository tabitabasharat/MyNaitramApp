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
import { getAllEvents, getTicketsById } from "@/lib/middleware/event";

const EventsHero = ({setShowTicket}:any) => {
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
  const[isAbout,setisAbout]=useState(false);
  const EventsAllData = useAppSelector(
    (state) => state?.getAllEvents?.allEvents?.data?.data
  );

  useEffect(() => {
    dispatch(getAllEvents());
    const id = typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    dispatch(getTicketsById(id));
  }, [dispatch]);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(0);
    }
  }, [EventsAllData]);

  return (
    <section  className={`max-w-screen overflow-hidden relative lg:h-[100vh] ${isAbout ? 'h-[130vh]' : 'h-[98vh]'}`}>
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
                setShowTicket={setShowTicket}
                eventDate={event?.eventDate}
                handleBulletClick={() => handleBulletClick(index)}
                AboutDrop={isAbout}
                AboutToggle={() => setisAbout(!isAbout)}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

export default EventsHero;
