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
import takeover from "../../../assets/Images.png";
import takeoverfull from "@/assets/takeover-txt-img.svg";
import takeover1000 from "@/assets/takeover-1000px.svg";
import takeover500 from "@/assets/takeover-500.svg";
import { getEventByEventId, getEventCount } from "@/lib/middleware/event";
import fallbackImage from "../../../assets/event-video.png";

import Link from "next/link";
import gift from "@/assets/gift.png";
import Avatar1 from "@/assets/Avatar-1.svg";
import Avatar2 from "@/assets/Avatar-2.svg";
import Avatar3 from "@/assets/Avatar-3.svg";
import rightarrow from "@/assets/right-arrow.svg";
import leftarrow from "@/assets/left-arrow.svg";

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
} from "@phosphor-icons/react/dist/ssr";
import ScreenLoader from "@/components/loader/Screenloader";
const CustomPrevArrow = (props: any) => (
  <div className="custom-arrow custom-prev-arrow" onClick={props.onClick}>
    <Image src={leftarrow} width={60} height={60} alt="right arrow" />
  </div>
);

const CustomNextArrow = (props: any) => (
  <div className="custom-arrow custom-next-arrow" onClick={props.onClick}>
    <Image src={rightarrow} width={60} height={60} alt="left arrow" />
  </div>
);

const SpecificEventHero = ({ setShowTicket }: any) => {
  const router = useRouter();
  const [eventID, setEventId] = useState("");
  const [loader, setLoader] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<any>(null);

  const dispatch:any = useAppDispatch();
  const [isAbout, setisAbout] = useState(false);
  const EventData = useAppSelector(
    (state) => state?.getEventByEventID?.eventIdEvents?.data
  );
  const userLoading = useAppSelector((state) => state?.getEventByEventID);

  console.log("my data", EventData);
  const settings: any = {
    dots: false,
    infinite: EventData?.eventmedia?.length > 1,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: EventData?.eventmedia?.length > 1 ? <CustomPrevArrow /> : null,
    nextArrow: EventData?.eventmedia?.length > 1 ? <CustomNextArrow /> : null,
    arrows: EventData?.eventmedia?.length > 1 ? true : false,
  };
  useEffect(() => {
    const currentUrl:any = typeof window !== "undefined" ? window.location.href:null;
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
    <section className="bg-img">
      {userLoading?.loading && <ScreenLoader />}

      <div className="main-above  mx-auto max-w-screen-lg">
        <div className="flex items-center gap-4 mb-6 ">
          <button onClick={() => router.back()} type="button">
            <ArrowLeft size={22} />
          </button>
          <p>
            <span className="text-[#BFBFBF]">Event</span> /{" "}
            <span>{EventData?.name}</span>
          </p>
        </div>

        <div className="main-div-takeover ">
          <div className="lhs-hero">
            <Image
              src={EventData?.coverEventImage}
              alt="takeover"
              width={392}
              height={200}
             className="img-center"
            />
            {/* <Image src={takeover500} alt="takeover"  width={330} height={200} className=" h-full"/> */}
            {/* )} */}

            {EventData?.userId && <FollowPromoter userId={EventData?.userId} />}
          </div>
          <div className="rhs-hero">
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
              ticketStartPrice={EventData?.tickets?.length===1?"0":EventData?.tickets[0]?.price}
              ticketEndPrice={
                EventData?.tickets[EventData?.tickets.length - 1]?.price
              }
              // handleBulletClick={() => handleBulletClick(event)}
              AboutDrop={isAbout}
              AboutToggle={() => setisAbout(!isAbout)}
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
                <div className="w-[665px] h-[296px] mt-[48px] slider-main-div">
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
                            height={200}
                            className="w-full h-[296px] slider-img object-fill "
                            controls
                            // alt={`Slide ${index + 1}`}
                          />
                        ) : (
                          <Image
                            src={item}
                            width={330}
                            height={200}
                            className="w-full h-[296px] slider-img "
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
                  <Link href={"/events/event-detail/live-activity"}>
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
                  <Ticket size={18} weight="fill" className="text-[#8F8F8F]" />
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
                Download App to Unlock Features
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
    </section>
  );
};

export default SpecificEventHero;
