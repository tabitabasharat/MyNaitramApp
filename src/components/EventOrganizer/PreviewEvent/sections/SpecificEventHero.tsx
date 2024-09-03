"use client";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import WalletChooseModal from "@/components/Walletchoose/WalletChooseModal";

import "./EventHero.css";
import EventsHeroSlide from "./EventsHeroSlide";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import Image from "next/image";

import Link from "next/link";
import gift from "@/assets/gift.png";
import Avatar1 from "@/assets/Avatar-1.svg";
import Avatar2 from "@/assets/Avatar-2.svg";
import Avatar3 from "@/assets/Avatar-3.svg";
import rightarrow from "@/assets/right-arrow.svg";
import leftarrow from "@/assets/left-arrow.svg";

import { Button } from "@/components/ui/button";
import GradientBorder from "@/components/ui/gradient-border";
import { useRouter } from "next/navigation";
import {
  Lock,
  DownloadSimple,
  UsersThree,
  Ticket,
  DeviceMobile,
} from "@phosphor-icons/react/dist/ssr";
import ScreenLoader from "@/components/loader/Screenloader";
import backbtn from "@/assets/Wallet/back-btn-event.svg";
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

const SpecificEventHero = ({ setShowTicket, eventAllData }: any) => {
  console.log("inside event new", eventAllData);
  const [isWalletModalOpen, setisWalletModalOpen] = useState(false);

  const router = useRouter();

  const dispatch: any = useAppDispatch();
  const [isAbout, setisAbout] = useState(false);

  const settings: any = {
    dots: false,
    infinite: eventAllData?.eventmedia?.length > 1,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow:
      eventAllData?.eventmedia?.length > 1 ? <CustomPrevArrow /> : null,
    nextArrow:
      eventAllData?.eventmedia?.length > 1 ? <CustomNextArrow /> : null,
    arrows: eventAllData?.eventmedia?.length > 1 ? true : false,
  };
  // useEffect(() => {
  //   const currentUrl: any =
  //     typeof window !== "undefined" ? window.location.href : null;
  //   const parts = currentUrl.split("/");
  //   const value = parts[parts.length - 1];
  //   setEventId(value);
  //   console.log("my event id is", value);
  //   dispatch(getEventByEventId(value));
  // }, []);

  // useEffect(() => {
  //   dispatch(getEventCount(EventData?.userId));
  // }, [EventData?.userId]);

  return (
    <section className="bg-imgg">
      {isWalletModalOpen && (
        <WalletChooseModal
          onClose={() => setisWalletModalOpen(false)}
          open={() => setisWalletModalOpen(true)}
          eventData={eventAllData}
        />
      )}
      <Image
        style={{ filter: "blur(30px)" }}
        width={1000}
        height={1000}
        src={eventAllData?.eventcoverimg}
        className="w-full h-screen absolute object-cover object-center z-0 opacity-30"
        alt=""
      />
      <div className="mx-2xl">
        <div className="main-abovee pxpx pt-[8rem] lg:pt-[9rem] pb-[6rem] z-[2] flex flex-col xl:flex-row gap-[32px] lg:gap-12 w-full md:w-[70%] md:mx-auto xl:w-full relative   ">
          {/* <div className="flex items-center justify-between mb-[24px]">
          <div
            className="flex items-center gap-[16px]  "
            onClick={() => router.back()}
          >
            <button onClick={() => router.back()} type="button">
              <Image src={backbtn} width={44} height={44} alt="back btn"  className="lg:w-[44px] lg:h-[44px] w-[40px] h-[40px]"/>
            </button>
            <p className="text-[24px] font-extrabold -tracking-[0.04em] text-[#E6E6E6]">
              Back
            </p>
          </div>
          <Button
            className="px-[68px] py-[12px] font-extrabold"
            onClick={() => setisWalletModalOpen(true)}
          >
            Submit
          </Button>
        </div> */}
          <div className="">
            <div className="flex items-center   mb-[24px] justify-between ">
              <div className="flex items-center gap-[16px]">
                <button onClick={() => router.back()} type="button">
                  <Image
                    src={backbtn}
                    width={44}
                    height={44}
                    alt="back btn"
                    className="lg:w-[44px] lg:h-[44px] w-[40px] h-[40px]"
                  />
                </button>
                <p className="text-[24px] font-extrabold -tracking-[0.04em] text-[#E6E6E6]">
                  Back
                </p>
              </div>

              <Button
                type="submit"
                className=" flex  justify-center items-center font-bold py-[12px] px-[68px] rounded-[200px]  font-extrabold h-[52px] edit-btn"
                onClick={() => setisWalletModalOpen(true)}
                // onClick={(event) => handleFormSubmit(event, "create")}
              >
                Submit
              </Button>
            </div>

            <div className="lhs-hero flex items-center justify-center flex-col relative ">
              <Image
                src={eventAllData?.eventcoverimg}
                alt="takeover"
                width={392}
                height={200}
                className="img-center rounded-lg relative"
              />
            </div>
          </div>

          <div className="main-div-takeoverr lg:mt-[24px] mt-[0px] ">
            <div className="rhs-hero lg:mt-12  mt-0">
              <EventsHeroSlide
                instaUrl={eventAllData?.instaurl}
                tiktokUrl={eventAllData?.tiktokurl}
                event={eventAllData?.eventname}
                title={eventAllData?.eventname}
                eventCategory={eventAllData?.eventcategory}
                eventDate={eventAllData?.eventstarttime}
                endTime={eventAllData?.eventendtime}
                startTime={eventAllData?.eventstarttime}
                img={eventAllData?.eventcoverimg}
                location={eventAllData?.eventlocation}
                eventdescription={eventAllData?.eventdescription}
                // activeIndex={activeIndex}
                setShowTicket={setShowTicket}
                ticketStartPrice={
                  eventAllData?.tickets?.length === 1
                    ? "0"
                    : eventAllData?.tickets[0]?.price
                }
                ticketEndPrice={
                  eventAllData?.tickets[eventAllData?.tickets.length - 1]?.price
                }
                // handleBulletClick={() => handleBulletClick(event)}
                AboutDrop={isAbout}
                AboutToggle={() => setisAbout(!isAbout)}
                ticketsdata={eventAllData?.ticketsdata}
              />

              {eventAllData?.eventmedia?.length > 0 &&
                Array.isArray(eventAllData?.eventmedia) && (
                  <div className="w-[665px] h-[296px] mt-[48px] slider-main-div">
                    <Slider {...settings}>
                      {eventAllData?.eventmedia?.map(
                        (item: any, index: any) => (
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
                        )
                      )}
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
              {/* <div className="relative gradient-slate border border-[#262626] mt-12 rounded-xl lg:p-8 p-[16px] w-full">
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
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecificEventHero;
