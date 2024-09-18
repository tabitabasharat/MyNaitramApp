"use client";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import "./EventHero.css";
import EventsHeroSlide from "./EventsHeroSlide";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import Image from "next/image";

import { getEventByEventId, getEventCount } from "@/lib/middleware/event";

import Link from "next/link";
import gift from "@/assets/gift.png";
import Avatar1 from "@/assets/Avatar-1.svg";
import Avatar2 from "@/assets/Avatar-2.svg";
import Avatar3 from "@/assets/Avatar-3.svg";
import rightarrow from "@/assets/right-arrow.svg";
import leftarrow from "@/assets/left-arrow.svg";
import shareicon from "@/assets/blackUpload Simple.svg";
import { Button } from "@/components/ui/button";
import GradientBorder from "@/components/ui/gradient-border";
import FollowPromoter from "@/components/reusable-components/FollowPromoter";
import { useRouter } from "next/navigation";
import {
  Lock,
  DownloadSimple,
  UsersThree,
  Ticket,
  DeviceMobile,
  ArrowLeft,
  Heart,
} from "@phosphor-icons/react/dist/ssr";
import ScreenLoader from "@/components/loader/Screenloader";
const CustomPrevArrow = (props: any) => (
  <div
    style={{ cursor: "pointer" }}
    className="custom-arrow custom-prev-arrow"
    onClick={props.onClick}
  >
    <Image src={leftarrow} width={60} height={60} alt="right arrow" />
  </div>
);

const CustomNextArrow = (props: any) => (
  <div
    style={{ cursor: "pointer" }}
    className="custom-arrow custom-next-arrow"
    onClick={props.onClick}
  >
    <Image src={rightarrow} width={60} height={60} alt="left arrow" />
  </div>
);

const SpecificEventHero = ({ setShowTicket, eventType }: any) => {
  const router = useRouter();
  const [eventID, setEventId] = useState("");
  const [loader, setLoader] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<any>(null);

  const dispatch: any = useAppDispatch();
  const [isAbout, setisAbout] = useState(false);
  const EventData = useAppSelector(
    (state) => state?.getEventByEventID?.eventIdEvents?.data
  );
  const userLoading = useAppSelector((state) => state?.getEventByEventID);

  console.log("my data", EventData);
  const settings: any = {
    dots: false,
    infinite: EventData?.eventmedia?.length > 1,
    autoplay: true, // Corrected the typo to enable autoplay
    autoplaySpeed: 3000, // Sets the interval between slide changes (in milliseconds)
    speed: 500, // Slide transition speed
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: EventData?.eventmedia?.length > 1 ? <CustomPrevArrow /> : null,
    nextArrow: EventData?.eventmedia?.length > 1 ? <CustomNextArrow /> : null,
    arrows: EventData?.eventmedia?.length > 1 ? true : false,
  };
  // const settings: any = {
  //   dots: false,
  //   infinite: EventData?.eventmedia?.length > 1,
  //   speed: 700,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   prevArrow: EventData?.eventmedia?.length > 1 ? <CustomPrevArrow /> : null,
  //   nextArrow: EventData?.eventmedia?.length > 1 ? <CustomNextArrow /> : null,
  //   arrows: EventData?.eventmedia?.length > 1 ? true : false,
  // };
  useEffect(() => {
    const currentUrl: any =
      typeof window !== "undefined" ? window.location.href : null;
    const parts = currentUrl.split("/");
    const value = parts[parts.length - 1];
    setEventId(value);
    console.log("my event id is", value);
    dispatch(getEventByEventId(value));
  }, []);

  useEffect(() => {
    dispatch(getEventCount(EventData?.userId));
  }, [EventData?.userId]);

  return (
    <section className="bg-img ">
      {userLoading?.loading && <ScreenLoader />}
      <Image
        style={{ filter: "blur(30px)" }}
        width={1000}
        height={1000}
        src={EventData?.coverEventImage}
        className="w-full h-screen absolute object-cover object-center z-0 opacity-30"
        alt=""
      />

      <div className="">
        <div className="main-abovee px-[24px] w-full md:px-[100px] lg:px-[100px] xl:px-[216px] pt-[8rem] lg:justify-center lg:pt-[9rem] pb-[6rem] z-[2] gap-[32px] lg:gap-12 w-full md:w-[100%] xl:w-full relative   ">
          <div className="flex mb-[32px] justify-between items-center">

            <div className="flex items-center gap-4 ">
              {/* <div className="flex items-center gap-4 mb-6"> */}
              <button onClick={() => router.back()} type="button">
                <ArrowLeft size={22} />
              </button>
              <p>
                <span className="text-[#BFBFBF]">Event</span> /{" "}
                <span>{EventData?.name}</span>
              </p>
            </div>
            <div className="">
              <button className="bg-[#13FF7A] text-sm font-extrabold flex w-full sm:w-fit justify-center p-[10px] gap-[6px] rounded-[100px] text-[black]">
                {" "}
                <Image src={shareicon} sizes="16px" alt="share icon" />{" "}
                <p> Share</p>
              </button>
            </div>
          </div>
          <div className="flex gap-[40px] flex-col lg:flex-row">
          <div className="">
            <div className="lhs-hero w-full lg:w-[392px] flex items-center justify-center flex-col relative ">
              <Image
                src={EventData?.coverEventImage}
                alt="takeover"
                width={392}
                height={200}
                className="img-center rounded-lg relative"
              />

              {/* <div className="bg-white/20 p-[1rem] rounded-full backdrop-blur-lg webkit-header-blur w-fit absolute right-[24px] bottom-0">
                <Heart size={23} weight="fill" />
              </div> */}

              {EventData?.userId && (
                <FollowPromoter
                  userId={EventData?.userId}
                  eventName={EventData?.name}
                />
              )}
            </div>
          </div>

          <div className="main-div-takeoverr ">
            <div className="rhs-hero md:w-[576px] mt-0">
              <EventsHeroSlide
                instaUrl={EventData?.instaUrl}
                tiktokUrl={EventData?.tiktokUrl}
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
                ticketStartPrice={
                  EventData?.tickets?.length === 1
                    ? "0"
                    : EventData?.tickets[0]?.price
                }
                ticketEndPrice={
                  EventData?.tickets[EventData?.tickets.length - 1]?.price
                }
                // handleBulletClick={() => handleBulletClick(event)}
                AboutDrop={isAbout}
                AboutToggle={() => setisAbout(!isAbout)}
                userId={EventData?.userId}
                eventType={eventType}
              />

              {/* Gallery Media Slider */}
              {/* {EventData?.eventmedia?.length > 0 &&
            Array.isArray(EventData?.eventmedia) && (
              <div className="w-[665px] h-[296px] mt-[48px] slider-main-div">
                <Slider {...settings}>
                  {EventData?.eventmedia?.length > 0 &&
                    EventData?.eventmedia?.map((item: any, index: any) => (
                      <div key={index} className="w-full">
                        <Image
                          src={item}
                          width={330}
                          height={200}
                          className="w-full h-[296px] slider-img"
                          alt={`Slide ${index + 1}`}
                        />
                      </div>
                    ))}
                </Slider>
              </div>
            )} */}

              {EventData?.eventmedia?.length > 0 &&
                Array.isArray(EventData?.eventmedia) && (
                  <div className="w-[665px] md:w-[576px] h-[296px] mt-[48px] slider-main-div">
                    <Slider {...settings}>
                      {EventData?.eventmedia?.map((item: any, index: any) => (
                        <div key={index} className="w-full">
                          {item.endsWith(".mp4") ||
                          item.endsWith(".avi") ||
                          item.endsWith(".mov") ||
                          item.endsWith(".mkv") ? (
                            <video
                              src={item}
                              width={330}
                              height={300}
                              className="w-full h-[296px] slider-img object-contain "
                              controls
                              // alt={`Slide ${index + 1}`}
                            />
                          ) : (
                            <Image
                              src={item}
                              width={330}
                              height={300}
                              className="w-full h-[315px] slider-img "
                              alt={`Slide ${index + 1}`}
                            />
                          )}
                        </div>
                      ))}
                    </Slider>
                  </div>
                )}

              {/* LIVE ACTIVITY */}
              <GradientBorder className="mt-[48px] w-full">
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
                        src={Avatar1}
                        width={60}
                        height={60}
                        alt="avatar"
                        className="rounded-full border border-[#034C22] z-[1]"
                      />
                      <Image
                        src={Avatar2}
                        width={60}
                        height={60}
                        alt="avatar"
                        className="rounded-full border border-[#034C22] z-[2]"
                      />
                      <Image
                        src={Avatar3}
                        width={60}
                        height={60}
                        alt="avatar"
                        className="rounded-full border border-[#034C22] z-[3]"
                      />
                    </div>
                    <h3 className="lg:text-[20px] text-[16px] text-[#0FFF77] font-extrabold leading-[20px] text-center mt-[12px]">
                      Evelyn and 348 others going
                    </h3>
                    <p className="text-[#BFBFBF] text-[12px] pt-[4px]">
                      Tap to see the live activities
                    </p>
                    <Link
                      href={`/events/event-detail/live-activity/${EventData?.id}?eventName=${EventData?.name}`}
                    >
                      <Button className="flex items-center gap-[0.5rem] text-[14px] font-extrabold rounded-full mt-[12px] w-fit ps-[0] pe-[16px] py-[10px]">
                        <Lock size={20} weight="fill" className="ms-[10px]" />
                        Live Activity
                      </Button>
                    </Link>
                  </div>
                </div>
              </GradientBorder>

              {/* DOWNLOAD NAITRAM */}
              <div className="relative gradient-slate border border-[#262626] mt-12 rounded-xl lg:p-8 p-[16px] w-full">
                <h2 className="text-[20px] font-bold">Download NAITRAM App</h2>
                <div className="flex flex-col gap-2 mt-4">
                  <div className="flex gap-3">
                    <UsersThree
                      size={18}
                      weight="fill"
                      className="text-[#8F8F8F]"
                    />
                    <p className="text-[14px]">
                      Keep up with the event with Live Activity Feature
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Ticket
                      size={18}
                      weight="fill"
                      className="text-[#8F8F8F]"
                    />
                    <p className="text-[14px]">
                      View and open your tickets easily
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <DeviceMobile
                      size={18}
                      weight="fill"
                      className="text-[#8F8F8F]"
                    />
                    <p className="text-[14px]">
                      Browse any event anytime from your hand
                    </p>
                  </div>
                </div>
                <Button
                  className="flex items-center gap-[0.5rem] rounded-full mt-[32px] w-full 
            font-extrabold py-[14px] text-[14px] lg:text-[16px] xl:text-[16px] font-extrabold h-auto flex-wrap lg:flex-nowrap"
                >
                  <DownloadSimple size={20} weight="fill" />
                  <Link href="/download-app">
                  Download App to Unlock Features
                  </Link>
                </Button>
                <Image
                  src={gift}
                  width={200}
                  height={200}
                  className="absolute top-[-10%] lg:right-0 xl:right-[-8%] hidden lg:block"
                  alt="gift"
                />
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecificEventHero;
