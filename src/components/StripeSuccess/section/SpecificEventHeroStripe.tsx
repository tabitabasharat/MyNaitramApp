"use client";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import WalletChooseModal from "@/components/Walletchoose/WalletChooseModal";
import Receviepayment from "@/components/popups/receviepayment/Receviepayment";
import "./Stripe.css";
import EventsHeroSlide from "@/components/EventOrganizer/PreviewEvent/sections/EventsHeroSlide";
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
import { Autoplay } from "swiper/modules";
import PreviewEventFollowPromoter from "@/components/reusable-components/PreviewEventFollowPromoter";
import {
  getOrganizerByID,
  getOrganizerSocialProfile,
} from "@/lib/middleware/organizer";
import StripeHero from "./StripeHero";
import TicketPurchaseSuccess from "@/components/checkout/TicketPurchaseSuccess";
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

const SpecificEventHeroStripe = ({
  setShowTicket,
  eventAllData,
  backData,
}: any) => {
  console.log("inside event new", eventAllData);
  const [isWalletModalOpen, setisWalletModalOpen] = useState(false);
  const [UserID, setUserID] = useState<any>("");

  const router = useRouter();

  const dispatch: any = useAppDispatch();
  const [isAbout, setisAbout] = useState(false);

  console.log("data", eventAllData);
  useEffect(() => {
    const id =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    console.log("user id ", id);
    setUserID(id);
    dispatch(getOrganizerByID(id));
    dispatch(getOrganizerSocialProfile(id));
  }, []);

 
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
        // <WalletChooseModal
        //   onClose={() => setisWalletModalOpen(false)}
        //   open={() => setisWalletModalOpen(true)}
        //   eventData={eventAllData}
        // />
        <Receviepayment
          onClose={() => setisWalletModalOpen(false)}
          open={() => setisWalletModalOpen(true)}
          eventData={eventAllData}
        />
      )}
      <Image
        style={{ filter: "blur(30px)" }}
        width={1000}
        height={1000}
        src={eventAllData?.coverEventImage}
        className="w-full h-screen absolute object-cover object-center z-0 opacity-30"
        alt=""
      />
      <div className="w-full">
        <div className="main-abovee px-[24px] w-full md:px-[100px] lg:ps-[40px] lg:pe-[40px] xl:px-[216px] pt-[8rem] lg:justify-center lg:pt-[9rem] pb-[6rem] z-[2] gap-[32px] lg:gap-12 lg:w-full wid-adjustment relative">
          <div className="flex gap-[40px] flex-col">
            <div className="flex gap-[24px] flex-col lg:flex-row">
              <div>
                <div className="lhs-hero w-full lg:w-[392px] flex items-center justify-center flex-col relative ">
                  <Image
                   src={eventAllData?.coverEventImage}
                    alt="img"
                    width={392}
                    height={200}
                    className="img-center rounded-lg relative"
                  />

                  {/* <div className="bg-white/20 p-[1rem] rounded-full backdrop-blur-lg webkit-header-blur w-fit absolute right-[24px] bottom-0">
                <Heart size={23} weight="fill" />
              </div> */}

                  {/* {eventAllData?.userId && ( */}
                  {/* )} */}
                </div>
              </div>

              <div className="main-div-takeoverr w-full lg:mt-[0px] mt-[0px] ">
                <div className="rhs-hero w-full lg:mt-0  mt-0">
                  <StripeHero
                    instaUrl={eventAllData?.instaurl}
                    tiktokUrl={eventAllData?.tiktokurl}
                    event={eventAllData?.name}
                    title={eventAllData?.name}
                    eventCategory={eventAllData?.eventcategory}
                    eventDate={eventAllData?.startTime}
                    endTime={eventAllData?.eventendtime}
                    startTime={eventAllData?.startTime}
                    img={eventAllData?.coverEventImage}
                    location={eventAllData?.eventlocation}
                    eventdescription={eventAllData?.eventdescription}
                    // activeIndex={activeIndex}
                    setShowTicket={setShowTicket}
                    // ticketStartPrice={
                    //   eventAllData?.ticketsdata?.length === 1
                    //     ? "0"
                    //     : eventAllData?.ticketsdata[0]?.price
                    // }
                    // ticketEndPrice={
                    //   eventAllData?.tickets[eventAllData?.ticketsdata.length - 1]?.price
                    // }
                    // handleBulletClick={() => handleBulletClick(event)}
                    AboutDrop={isAbout}
                    AboutToggle={() => setisAbout(!isAbout)}
                    ticketsdata={eventAllData?.ticketsdata}
                  />
                </div>
              </div>
            </div>
            <div className="relative gradient-slate border border-[#262626] rounded-xl lg:p-8 p-[16px] w-full">
            <div className="flex justify-between items center">
              <div className="w-full">
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
                <div>
                  <Button className="flex mt-[32px] w-full items-center sm:gap-[0.5rem] rounded-full mt-[32px]w-full lg:w-fit font-extrabold py-[8px] lg:py-[12px] px-[30px] lg:px-[49px] text-[14px] lg:text-[16px] xl:text-[16px] font-extrabold h-auto flex-nowrap">
                    <DownloadSimple size={20} weight="fill" />
                    <Link href="/download-app">
                      Download App to Unlock Features
                    </Link>
                  </Button>
                </div>
                </div>
                <div>
                  <Image
                    src={gift}
                    width={230}
                    height={230}
                    className=" hidden lg:block"
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

export default SpecificEventHeroStripe;
