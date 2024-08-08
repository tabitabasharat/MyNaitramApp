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
import { getAllEvents, getTicketsById } from "@/lib/middleware/event";
import Image from "next/image";
import takeover from "../../../assets/Images.png"
const EventsHero = ({ setShowTicket }: any) => {
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
  const EventsAllData = useAppSelector(
    (state) => state?.getAllEvents?.allEvents?.data?.data
  );

  useEffect(() => {
    dispatch(getAllEvents());
    const id =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    dispatch(getTicketsById(id));
  }, [dispatch]);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(0);
    }
  }, [EventsAllData]);

  return (
    // <section
    //   className={`max-w-screen overflow-hidden relative lg:h-[90vh] ${
    //     isAbout ? "h-[170vh] lg:h-[98vh]" : "h-[130vh]"
    //   }`}
    // >
    //   <Swiper
    //     onSlideChange={handleSlideChange}
    //     onSwiper={(swiper) => (swiperRef.current = swiper)}
    //     loop
    //     effect="fade"
    //     slidesPerView={1}
    //     modules={[Pagination, A11y, Autoplay, EffectFade]}
    //     pagination={false}
    //     autoplay={{ delay: 5000 }}
    //     navigation
    //     speed={1000}
    //     className="fade-slider h-full"
    //   >
    //     {EventsAllData?.events.length > 0 &&
    //       EventsAllData?.events.map((event: any, index: number) => (
    //         <SwiperSlide key={index}>
    //           <EventsHeroSlide
    //             event={event}
    //             title={event?.name}
    //             endTime={event?.endTime}
    //             startTime={event?.startTime}
    //             img={event?.eventPicture}
    //             location={event.location}
    //             activeIndex={activeIndex}
    //             setShowTicket={setShowTicket}
    //             eventDate={event?.eventDate}
    //             handleBulletClick={() => handleBulletClick(index)}
    //             AboutDrop={isAbout}
    //             AboutToggle={() => setisAbout(!isAbout)}
    //           />
    //         </SwiperSlide>
    //       ))}
    //   </Swiper>
    // </section>
    <section
    // style={{
    //   background: "#000000",
    //   backgroundImage: "url(/takeOver.png)",
    //   backgroundPosition: " top center",
    //   backgroundRepeat: "no-repeat",
    //   backgroundSize: "contain",
    //   opacity: "1",
    // }}
    className="bg-img"
    >
      {/* <div className="relative h-full ">
        <Image
          style={{ filter: "blur(30px)" }}
          width={1000}
          height={1000}
          src={"/takeOver.png"}
          className="w-full h-full object-cover object-center z-0 opacity30"
          alt=""
        />
        <div className="absolute inset-0 bg-black/65"></div>
      </div> */}
      <div className="main-div-takeover">
        <div>
        {/* <Image src={takeover} alt="takeover"   className=" takeover"/> */}

          {isAbout ? (
          <Image src={takeover} alt="takeover"   className=" takeover"/>

          )
        :
        (
          <Image src={"/takeover-new.png"} alt="takeover"  width={330} height={200} className="w-full h-full"/>


        )
        
        }


        </div>
        <div>
          {EventsAllData?.events.length > 0 &&
            EventsAllData?.events.map((event: any, index: number) => (
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
            ))}
        </div>
      </div>
    </section>
  );
};

export default EventsHero;
