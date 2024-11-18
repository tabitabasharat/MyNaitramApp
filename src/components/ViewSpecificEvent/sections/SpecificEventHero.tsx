"use client";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ShareModal from "./ShareModal";
import "./EventHero.css";
import EventsHeroSlide from "./EventsHeroSlide";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import menuicon from "@/assets/sharemenu.svg";
import reporticon from "@/assets/fi_2602490-1.svg";
import reporticongreen from "@/assets/fi_2602490.svg";
import Image from "next/image";
import Report from "@/components/ViewSpecificEvent/sections/ReportModal";
import { getEventByEventId, getEventCount } from "@/lib/middleware/event";
import { getEventAttend } from "@/lib/middleware/event";
import WalletChooseModal from "@/components/Walletchoose/WalletChooseModal";
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
import Followpromoter from "@/components/reusable-components/FollowPromoter";
import { useRouter } from "next/navigation";
import feedback from "@/assets/fi_1628629.svg";
import feedbackgreen from "@/assets/fi_1628629-1.svg";
import { Lock, DownloadSimple, UsersThree, Ticket, DeviceMobile, ArrowLeft, Heart } from "@phosphor-icons/react/dist/ssr";
import FeedbackModal from "./FeedbackModal";
import ScreenLoader from "@/components/loader/Screenloader";
import { SuccessToast, ErrorToast } from "@/components/reusable-components/Toaster/Toaster";
import { checkEventTicketStatus } from "@/lib/middleware/liveactivity";
import { FollowPromoter, getFollowingPromoters, UnFollowPromoter } from "@/lib/middleware/liveactivity";
import { getOrganizerByID, getOrganizerSocialProfile } from "@/lib/middleware/organizer";
import BuyTicketModal from "@/components/checkout/BuyTicketModal";

const CustomPrevArrow = (props: any) => (
  <div style={{ cursor: "pointer" }} className="custom-arrow custom-prev-arrow" onClick={props.onClick}>
    <Image src={leftarrow} width={60} height={60} alt="right arrow" />
  </div>
);

const CustomNextArrow = (props: any) => (
  <div style={{ cursor: "pointer" }} className="custom-arrow custom-next-arrow" onClick={props.onClick}>
    <Image src={rightarrow} width={60} height={60} alt="left arrow" />
  </div>
);

const SpecificEventHero = ({ setShowTicket, eventType }: any) => {
  const router = useRouter();
  const [sharemodal, setShareModal] = useState<any>(false);
  const [eventID, setEventId] = useState("");
  const [loader, setLoader] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<any>("");
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<any>(null);

  const dispatch: any = useAppDispatch();
  const [isAbout, setisAbout] = useState(false);
  const EventData = useAppSelector((state) => state?.getEventByEventID?.eventIdEvents?.data);
  const userLoading = useAppSelector((state) => state?.getEventByEventID);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [modalContent, setModalContent] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLinkClick = (link: string) => {
    setActiveLink(link); // Set the active link
    setIsModalOpen(true); // Open the modal
    setModalContent(link); // Set the modal content to either 'Report' or 'Feedback'
    setIsDropdownOpen(false); // Close the dropdown after clicking a link
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const [activeLink, setActiveLink] = useState<string | null>(null);
  // const [isOpen, setIsOpen] = useState<any>(false);

  // const handleLinkClick = (link: string) => {
  //   setActiveLink(link);
  //   setIsOpen(false); // Optional: close the menu after selection
  // };

  // const toggleDropdown = () => {
  //   setIsDropdownOpen((prev) => !prev);
  // };

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
    const currentUrl: any = typeof window !== "undefined" ? window.location.href : null;

    if (currentUrl) {
      const url = new URL(currentUrl);
      const pathname = url.pathname;
      const parts = pathname.split("/");
      const eventId = parts[parts.length - 1];

      console.log("my event id is", eventId);
      setEventId(eventId);

      dispatch(getEventByEventId(eventId));
      dispatch(getEventAttend(eventId));
      dispatch(getOrganizerSocialProfile(EventData?.userId));
    }
  }, []);

  useEffect(() => {
    dispatch(getEventCount(EventData?.userId));
  }, [EventData?.userId]);

  // const copyUrlToClipboard = () => {
  //   if (typeof window !== "undefined") {
  //     const currentUrl = window.location.href;
  //     if (currentUrl) {
  //       SuccessToast("URL copied Successfully");
  //       console.log("Your url is", currentUrl);
  //     } else {
  //       ErrorToast("Failed to copy URL.");
  //     }
  //   }
  // };

  const copyUrlToClipboard = () => {
    if (typeof window !== "undefined") {
      let currentUrl = window.location.href;
      if (currentUrl) {
        currentUrl = currentUrl.split("?")[0];

        setCopiedUrl(currentUrl);
        console.log("Your URL is", currentUrl);

        setShareModal(true);
      } else {
        ErrorToast("Failed to store URL.");
      }
    }
  };

  const handleShare = () => {
    setShareModal(true);
  };

  async function handleLiveActivity() {
    setLoader(true);

    const userID = typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    console.log("my id is", userID);
    const currentUrl: string = typeof window !== "undefined" ? window.location.href : "";
    const urlParts: string[] = currentUrl.split("/");
    const value: string = urlParts[urlParts.length - 1].split("?")[0];
    try {
      const data = {
        eventId: value,
        userId: userID,
      };
      dispatch(checkEventTicketStatus(data)).then((res: any) => {
        if (res?.payload?.status === 200) {
          setLoader(false);
          // SuccessToast("Collectible Claimed Successfully");
          console.log("status success", res?.payload?.data?.statusCode);

          if (res?.payload?.data?.statusCode === false) {
            console.log("status success", res?.payload?.data);
            ErrorToast("You can't access Live Activity before buying a ticket for this event");
          } else {
            router.push(`/events/event-detail/live-activity/${EventData?.id}?eventName=${EventData?.name}&userId=${EventData?.userId}`);
          }
        } else {
          setLoader(false);
          ErrorToast(res?.payload?.message);
        }
      });
    } catch (error) {
      console.error("Error:", error);
      ErrorToast(error);
    }
  }

  const eventAttendy = useAppSelector((state: any) => state?.getAllAttend?.attend?.data);

  const eventAttend = useAppSelector((state: any) => state?.getAllAttend?.attend);

  console.log("this is event attendees", eventAttendy);

  useEffect(() => {
    const myuserid = typeof window !== "undefined" ? localStorage.getItem("_id") : null;

    // dispatch(getEventCount(userId));
    // dispatch(getOrganizerByID(EventData?.userId));

    // const data = {
    //   followId: EventData?.userId,
    //   userId: myuserid,
    // };
    // dispatch(getFollowingPromoters(data));
  }, []);

  useEffect(() => {
    dispatch(getOrganizerSocialProfile(EventData?.userId));
  }, [EventData]);

  useEffect(() => {
    const myuserid = typeof window !== "undefined" ? localStorage.getItem("_id") : null;

    // dispatch(getEventCount(userId));

    const data = {
      followId: EventData?.userId,
      userId: myuserid,
    };
    dispatch(getFollowingPromoters(data));

    // dispatch(getOrganizerSocialProfile(userId));
  }, []);

  console.log(EventData, "this is my event data");

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
        <div className="main-abovee px-[24px] w-full md:px-[100px] lg:pe-[100px] lg:ps-[100px] xl:px-[216px] pt-[8rem] lg:justify-center lg:pt-[9rem] pb-[6rem] z-[2] gap-[32px] lg:gap-12 w-full md:w-[100%] xl:w-full relative   ">
          <div className="flex mb-[32px] justify-between items-center">
            <div className="flex items-center gap-4 ">
              {/* <div className="flex items-center gap-4 mb-6"> */}
              <button onClick={() => router.back()} type="button">
                <ArrowLeft size={22} />
              </button>
              <p>
                <span className="text-[#BFBFBF]">Event</span> / <span>{EventData?.name}</span>
              </p>
            </div>
            <div className="flex gap-[11px] relative">
              <button
                className="bg-[#13FF7A] text-sm font-extrabold flex w-full sm:w-fit justify-center p-[10px] gap-[6px] rounded-[100px] text-[black]"
                onClick={copyUrlToClipboard}
              >
                <Image src={shareicon} sizes="16px" alt="share icon" />
                <p>Share</p>
              </button>
              {/* <div className="relative">
                <Image
                  src={menuicon}
                  className="w-[36px] h-[36px] cursor-pointer"
                  alt="share-menu-icon"
                  onClick={toggleDropdown}
                />
                {isDropdownOpen && (
                  <div
                    style={{
                      background: "linear-gradient(360deg, #0F0F0F 72%, #1A1A1A 100%)",
                    }}
                    className="absolute top-full right-0 mt-[8px] w-[150px] border-none rounded-md shadow-lg"
                  >
                    <ul className="flex flex-col p-2">
                      <li
                        onClick={() => handleLinkClick("Report")}
                        className={`block text-start p-2 flex gap-[8px] text-green-500 cursor-pointer text-sm ${activeLink === "Report" ? "text-green-500" : "text-white"
                          }`}
                      >
                        <Image
                          src={activeLink === "Report" ? reporticongreen : reporticon}
                          alt="report-icon"
                        />
                        <p>Report</p>
                      </li>
                      <li
                        onClick={() => handleLinkClick("Feedback")}
                        className={`block text-start p-2 flex gap-[8px] cursor-pointer text-sm ${activeLink === "Feedback" ? "text-green-500" : "text-white"
                          }`}
                      >
                        <Image src={activeLink === "Feedback" ? feedbackgreen : feedback} alt="feedback" /> <p>Feedback</p>
                      </li>
                    </ul>
                  </div>
                )}
                {/* {isModalOpen && (
                 <Report
                 open={isModalOpen} onClose={() => setIsModalOpen(false)}
                //  onClose={() => setShareModal(false)}
                //  open={() => setShareModal(true)}  
                 />
                )} */}
              {isModalOpen && modalContent === "Report" && <Report open={isModalOpen} onClose={() => setIsModalOpen(false)} />}

              {/* Add a Feedback Modal here if needed */}
              {isModalOpen && modalContent === "Feedback" && <FeedbackModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />}
            </div>
            {sharemodal && <ShareModal onClose={() => setShareModal(false)} open={() => setShareModal(true)} eventUrl={copiedUrl} />}
          </div>
          <div className="flex gap-[40px] event-spacing-adjustment flex-col lg:flex-row">
            <div className="">
              <div className="lhs-hero w-full lg:w-[392px]  flex items-center justify-center flex-col relative ">
                <Image src={EventData?.coverEventImage} alt="takeover" width={392} height={200} className="img-center rounded-lg relative" />

                {/* <div className="bg-white/20 p-[1rem] rounded-full backdrop-blur-lg webkit-header-blur w-fit absolute right-[24px] bottom-0">
                <Heart size={23} weight="fill" />
              </div> */}

                {EventData?.userId && <Followpromoter EventData={EventData} userId={EventData?.userId} eventName={EventData?.name} />}
              </div>
            </div>

            <div className="main-div-takeoverr ">
              <div className="rhs-hero event-width-adjustment mt-0">
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
                  ticketLength={EventData?.tickets?.length}
                  ticketEndDate={EventData?.ticketEndDate}
                  ticketStartDate={EventData?.ticketStartDate}
                  soldout={EventData?.tickets.every((ticket: any) => ticket.no === 0)}
                  salesStop={EventData?.stopBy || false}
                  // ticketStartPrice={
                  //   EventData?.tickets?.length === 1
                  //     ? "0"
                  //     : EventData?.tickets[0]?.price
                  // }
                  ticketStartPrice={
                    EventData?.tickets?.length === 1
                      ? Number(EventData?.tickets[0]?.price) // Return the price of the single ticket as a number
                      : EventData?.tickets && EventData?.tickets.length > 0
                      ? Math.min(
                          ...EventData?.tickets.map((ticket: any) => {
                            const price = Number(ticket.price); // Convert price to number
                            return isNaN(price) ? Infinity : price; // Return Infinity if price is NaN
                          })
                        ).toString() // Find the lowest price and convert to string
                      : "0" // Default to "0" if there are no tickets
                  }
                  // ticketEndPrice={
                  //   EventData?.tickets[EventData?.tickets.length - 1]?.price
                  // }

                  ticketEndPrice={
                    EventData?.tickets && EventData?.tickets?.length > 0
                      ? Math.max(...EventData.tickets.map((ticket: any) => Number(ticket.price) || 0))
                      : 0 // Default to 0 if there are no tickets
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

                {EventData?.eventmedia?.length > 0 && Array.isArray(EventData?.eventmedia) && (
                  <div className="w-[665px] event-width-adjustment h-[350px] mt-[48px] slider-main-div">
                    <Slider {...settings}>
                      {EventData?.eventmedia?.map((item: any, index: any) => (
                        <div key={index} className="w-full">
                          {item.endsWith(".mp4") || item.endsWith(".avi") || item.endsWith(".mov") || item.endsWith(".mkv") ? (
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
                              className="w-full object-contain h-[350px] slider-img "
                              alt={`Slide ${index + 1}`}
                            />
                          )}
                        </div>
                      ))}
                    </Slider>
                  </div>
                )}

                {/* LIVE ACTIVITY */}
                <GradientBorder className="mt-[48px] w-full ">
                  <div
                    style={{
                      backgroundImage: "url(/live-activity-bg.png)",
                      backgroundPosition: "center",
                    }}
                    className="bg-cover bg-no-repeat w-full h-full rounded-lg relative overflow-hidden py-10"
                  >
                    <div className="w-full flex flex-col justify-center items-center">
                      {/* {eventAttendy?.length > 0 && (
                        <div className="flex -space-x-3">
                          <Image
                            src={
                              eventAttend?.data?.[0]?.profilePicture || Avatar1
                            }
                            width={48}
                            height={48}
                            alt="avatar"
                            className="rounded-full border border-[#034C22] z-[1] size-[48px]"
                          />
                          <Image
                            // src={Avatar2}
                            src={
                              eventAttend?.data?.[1]?.profilePicture || Avatar2
                            }
                            width={48}
                            height={48}
                            alt="avatar"
                            className="rounded-full border border-[#034C22] z-[2] size-[48px]"
                          />
                          <Image
                            src={
                              eventAttend?.data?.[2]?.profilePicture || Avatar3
                            }
                            width={48}
                            height={48}
                            alt="avatar"
                            className="rounded-full border border-[#034C22] z-[3] size-[48px]"
                          />
                        </div>
                      )} */}

                      {eventAttendy?.length > 0 && eventAttend?.data?.some((attendee: any) => attendee?.profilePicture) && (
                        <div className="flex -space-x-3">
                          {(() => {
                            // Function to randomly select one of the three avatars
                            const getRandomAvatar = () => {
                              const avatars = [Avatar1, Avatar2, Avatar3];
                              return avatars[Math.floor(Math.random() * avatars.length)];
                            };

                            // Filter to get attendees with profile pictures
                            const attendeesWithPictures = eventAttend.data.filter((attendee: any) => attendee?.profilePicture);

                            // Shuffle the array of attendees with profile pictures
                            const shuffledAttendees = attendeesWithPictures.sort(() => 0.5 - Math.random());

                            // Slice the shuffled array to get up to 3 random attendees
                            const selectedAttendees = shuffledAttendees.slice(0, 3);

                            // If there are fewer than 3 attendees with pictures, fill with random avatars
                            while (selectedAttendees.length < 3) {
                              selectedAttendees.push({
                                profilePicture: getRandomAvatar(),
                              });
                            }

                            return selectedAttendees.map((attendee: any, index: any) => (
                              <Image
                                key={index}
                                src={attendee?.profilePicture}
                                width={48}
                                height={48}
                                alt="avatar"
                                className="rounded-full border border-[#034C22] z-[1] size-[48px]"
                              />
                            ));
                          })()}
                        </div>
                      )}

                      <h3 className="lg:text-[20px] text-[16px] text-[#0FFF77] font-extrabold leading-[20px] text-center mt-[12px]">
                        {/* {eventAttendy?.length > 0 && (
                          <>
                            {eventAttendy[0]?.fullname} and{" "}
                            {eventAttendy?.length - 1} others going
                          </>
                        )} */}
                        {new Date() >= new Date(EventData?.startTime) && eventAttendy?.length > 0 ? (
                          <>
                            {eventAttendy[0]?.fullname} and {eventAttendy.length - 1} others going
                          </>
                        ) : null}
                      </h3>
                      <p className="text-[#BFBFBF] text-[12px] pt-[4px]">Tap to see the live activities</p>

                      <Button
                        className={`flex items-center gap-[0.5rem] text-[14px] font-extrabold rounded-full 
    mt-[12px] w-fit ps-[0] pe-[16px] py-[10px] 
    ${new Date() > new Date(EventData?.endTime) ? "opacity-50" : ""}`}
                        onClick={() => handleLiveActivity()}
                        disabled={eventType === "Past Events" ? true : false}
                      >
                        <Lock size={20} weight="fill" className="ms-[10px]" />
                        Live Activity
                      </Button>
                    </div>
                  </div>
                </GradientBorder>

                {/* DOWNLOAD NAITRAM */}
                {/* <div className="relative gradient-slate border border-[#262626] mt-12 rounded-xl lg:p-8 p-[16px] w-full">
                  <h2 className="text-[20px] font-bold">
                    Download NAITRAM App
                  </h2>
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
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecificEventHero;
