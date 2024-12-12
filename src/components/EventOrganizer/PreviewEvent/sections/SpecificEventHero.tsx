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
import "./EventHero.css";
import EventsHeroSlide from "./EventsHeroSlide";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { EventSubmmitModal } from "@/components/EventSubmmitModal/EventSubmmitModal";
import { createevent } from "@/lib/middleware/event";

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
import { Lock, DownloadSimple, UsersThree, Ticket, DeviceMobile } from "@phosphor-icons/react/dist/ssr";
import ScreenLoader from "@/components/loader/Screenloader";
import backbtn from "@/assets/Wallet/back-btn-event.svg";
import { Autoplay } from "swiper/modules";
import PreviewEventFollowPromoter from "@/components/reusable-components/PreviewEventFollowPromoter";
import { getOrganizerByID, getOrganizerSocialProfile } from "@/lib/middleware/organizer";
import { SuccessToast, ErrorToast } from "@/components/reusable-components/Toaster/Toaster";
import CryptoJS from "crypto-js";

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

const SpecificEventHero = ({ setShowTicket, eventAllData, backData }: any) => {
  console.log("inside event new", eventAllData);
  const [isWalletModalOpen, setisWalletModalOpen] = useState(false);
  const [UserID, setUserID] = useState<any>("");
  const [loader, setLoader] = useState(false);

  const router = useRouter();

  const dispatch: any = useAppDispatch();
  const [isAbout, setisAbout] = useState(false);

  console.log("data", eventAllData);
  useEffect(() => {
    const id = typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    console.log("user id ", id);
    setUserID(id);
    dispatch(getOrganizerByID(id));
    dispatch(getOrganizerSocialProfile(id));
    console.log("HDJSHDJSHDJSDHSJHDSJHSJDHSJHDSJDH TAGS====> ", eventAllData?.eventHashtags);
  }, []);

  const settings: any = {
    dots: false,
    infinite: eventAllData?.eventmedia?.length > 1,
    autoplay: true, // Corrected the typo to enable autoplay
    autoplaySpeed: 5000, // Sets the interval between slide changes (in milliseconds)
    speed: 1000, // Slide transition speed
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: eventAllData?.eventmedia?.length > 1 ? <CustomPrevArrow /> : null,
    nextArrow: eventAllData?.eventmedia?.length > 1 ? <CustomNextArrow /> : null,
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
  const handleBackEvent = () => {
    router.push("/OrganizerEventCreate");
  };
  const eventAttendy = useAppSelector((state: any) => state?.getAllAttend?.attend?.data);
  const eventAttend = useAppSelector((state: any) => state?.getAllAttend?.attend);

  // Hashing is here
  const encryptionKey = "naitramV2SecretKey";
  const encryptArray = (arrayOfStrings: string[], secretKey: string) => {
    // Encrypt each string in the array and store the encrypted values in a new array
    const encryptedArray = arrayOfStrings.map((item) => {
      return CryptoJS.AES.encrypt(item, secretKey).toString(); // AES encryption
    });
    return encryptedArray;
  };

  function convertToUTC(localDateTime: string): string {
    // Create a Date object from the local date-time string
    const localDate = new Date(localDateTime);

    // Extract UTC time components
    const utcYear = localDate.getUTCFullYear();
    const utcMonth = localDate.getUTCMonth() + 1; // Months are 0-indexed
    const utcDate = localDate.getUTCDate();
    const utcHours = localDate.getUTCHours();
    const utcMinutes = localDate.getUTCMinutes();

    // Format the components to match the 'yyyy-MM-ddTHH:mm' format
    const formattedUTC = `${utcYear}-${String(utcMonth).padStart(2, "0")}-${String(utcDate).padStart(2, "0")}T${String(utcHours).padStart(
      2,
      "0"
    )}:${String(utcMinutes).padStart(2, "0")}`;

    return formattedUTC;
  }

  async function EventCreation() {
    setLoader(true);

    /////////////////// Setting the ticke types according to the API data Formate

    const updatedAllTicketTypes = eventAllData?.tickets?.map((ticket: any, t_index: number) =>
      ticket.type === "Festivals/Multi-Day Tickets/Season Passes"
        ? {
            selectedEventTicketType: ticket?.type,
            ticketFreePaid: ticket?.selected,
            ticketName: ticket?.typename,
            ticketPrice: ticket?.price,
            noOfTickets: ticket?.no,
            originalNoOfTickets: ticket?.no,
            ticketStartDT: convertToUTC(ticket?.ticketstart),
            ticketEndDT: convertToUTC(ticket?.ticketend),
            eventStartDT: convertToUTC(ticket?.eventdates?.[0]?.startDate),
            eventEndDT: convertToUTC(ticket?.eventdates?.[ticket?.eventdates?.length - 1]?.endDate),
            whatsIncluded: ticket?.options,
            festivalEventDates: ticket?.eventdates?.map((t: any, i: number) => ({
              eventStartDateTime: convertToUTC(t?.startDate),
              eventEndDateTime: convertToUTC(t?.endDate),
            })),
          }
        : ticket.type === "RSVP Ticketing"
        ? {
            selectedEventTicketType: ticket?.type,
            ticketName: ticket?.name,
            rsvpDeadline: convertToUTC(ticket?.deadline),
            noOfTickets: ticket?.capacity,
            originalNoOfTickets: ticket?.capacity,
            rsvpCapacity: ticket?.capacity,
            whatsIncluded: ticket?.options,
            rsvpName: ticket?.username,
            rsvpMail: ticket?.useremail,
            rsvpNumber: ticket?.usernumb,
            rsvpAdditionalFields: ticket?.additional?.map((add: any) => add?.title),
            isIndex: t_index,
          }
        : ticket.type === "Private Event Ticketing"
        ? {
            selectedEventTicketType: ticket?.type,
            ticketFreePaid: ticket?.selected,
            ticketName: ticket?.name,
            ticketPrice: ticket?.price,
            noOfTickets: ticket?.no,
            originalNoOfTickets: ticket?.no,
            ticketStartDT: convertToUTC(ticket?.ticketstart),
            ticketEndDT: convertToUTC(ticket?.ticketend),
            eventStartDT: convertToUTC(ticket?.eventstart),
            eventEndDT: convertToUTC(ticket?.eventend),
            whatsIncluded: ticket?.options,
            privateEventAdditionalFields: ticket?.emailmanual,
          }
        : ticket.type === "Passworded/Discounted Voucher Event"
        ? {
            selectedEventTicketType: ticket?.type,
            ticketFreePaid: ticket?.selected,
            ticketName: ticket?.name,
            ticketPrice: ticket?.price,
            noOfTickets: ticket?.no,
            originalNoOfTickets: ticket?.no,
            ticketStartDT: convertToUTC(ticket?.ticketstart),
            ticketEndDT: convertToUTC(ticket?.ticketend),
            eventStartDT: convertToUTC(ticket?.eventstart),
            eventEndDT: convertToUTC(ticket?.eventend),
            whatsIncluded: ticket?.options,
            privateEventAdditionalFields: ticket?.emailmanual,
            // passwordFields: encryptArray([...(ticket?.pswrdmanual || []), ...(ticket?.autoGeneratedPswrd || [])], encryptionKey),
            // autoPasswordFields: [],
            passwordFields: encryptArray(ticket?.pswrdmanual || [], encryptionKey),
            autoPasswordFields: encryptArray(ticket?.autoGeneratedPswrd || [], encryptionKey),
          }
        : {
            selectedEventTicketType: ticket?.type,
            ticketFreePaid: ticket?.selected,
            ticketName: ticket?.name,
            ticketPrice: ticket?.price,
            noOfTickets: ticket?.no,
            originalNoOfTickets: ticket?.no,
            ticketStartDT: convertToUTC(ticket?.ticketstart),
            ticketEndDT: convertToUTC(ticket?.ticketend),
            eventStartDT: convertToUTC(ticket?.eventstart),
            eventEndDT: convertToUTC(ticket?.eventend),
            whatsIncluded: ticket?.options,
          }
    );

    //////////////////////////////////////////////////////

    const nonRsvpTickets = eventAllData?.tickets?.filter((ticket: any) => ticket.type !== "RSVP Ticketing");

    let timings: any = {
      ticketStartDate: "",
      ticketEndDate: "",
      startTime: "",
      endTime: "",
    };

    if (nonRsvpTickets?.length !== 0) {
      let myTickets = nonRsvpTickets;
      const result = myTickets.reduce(
        (acc: any, ticket: any) => {
          if (new Date(ticket.eventstart) < new Date(acc.minEventStartDT.eventstart)) {
            acc.minEventStartDT = ticket;
          }
          if (new Date(ticket.ticketstart) < new Date(acc.minTicketStartDT.ticketstart)) {
            acc.minTicketStartDT = ticket;
          }
          if (new Date(ticket.eventend) > new Date(acc.maxEventEndDT.eventend)) {
            acc.maxEventEndDT = ticket;
          }
          if (new Date(ticket.ticketend) > new Date(acc.maxTicketEndDT.ticketend)) {
            acc.maxTicketEndDT = ticket;
          }
          return acc;
        },
        {
          minEventStartDT: myTickets[0],
          minTicketStartDT: myTickets[0],
          maxEventEndDT: myTickets[0],
          maxTicketEndDT: myTickets[0],
        }
      );
      console.log("this is result", result);
      timings = {
        ticketStartDate: result.minTicketStartDT?.ticketstart || "",
        ticketEndDate: result.maxTicketEndDT?.ticketend || "",
        startTime: result.minEventStartDT?.eventstart || "",
        endTime: result.maxEventEndDT?.eventend || "",
      };
    } else {
      const rsvpTickets = eventAllData?.tickets?.filter((ticket: any) => ticket.type == "RSVP Ticketing");
      console.log(rsvpTickets, "rsvp Tickets--");
      let myTickets = rsvpTickets;
      const ticketWithMaxRsvpDeadline = myTickets.reduce((maxTicket: any, currentTicket: any) => {
        return new Date(currentTicket.deadline) > new Date(maxTicket.deadline) ? currentTicket : maxTicket;
      }, myTickets[0]);
      // console.log(
      //   'Ticket with max rsvpDeadline:',
      //   ticketWithMaxRsvpDeadline?.rsvpDeadline,
      // );
      timings = {
        ticketStartDate: `${new Date()}`,
        ticketEndDate: ticketWithMaxRsvpDeadline?.deadline,
        startTime: `${new Date()}`,
        endTime: ticketWithMaxRsvpDeadline?.deadline,
      };
    }

    if (eventAllData?.tickets?.length !== 0 && nonRsvpTickets?.length !== 0) {
      const getMaxEventEndDateTime = (tickets: any) => {
        return tickets.reduce((maxDate: Date | null, ticket: any) => {
          if (ticket.type === "Festivals/Multi-Day Tickets/Season Passes") {
            ticket.eventdates.forEach((festivalDate: any) => {
              const eventEndDateTime = new Date(festivalDate.endDate);
              if (!maxDate || eventEndDateTime > maxDate) {
                maxDate = eventEndDateTime;
              }
            });
          }
          return maxDate;
        }, null);
      };
      const getMinEventStartDateTime = (tickets: any) => {
        return tickets.reduce((minDate: Date | null, ticket: any) => {
          if (ticket.type === "Festivals/Multi-Day Tickets/Season Passes") {
            ticket.eventdates.forEach((festivalDate: any) => {
              const eventStartDateTime = new Date(festivalDate.startDate);
              if (!minDate || eventStartDateTime < minDate) {
                minDate = eventStartDateTime;
              }
            });
          }
          return minDate;
        }, null);
      };
      const maxEventEndDateTime = getMaxEventEndDateTime(eventAllData?.tickets);
      const minEventStartTime = getMinEventStartDateTime(eventAllData?.tickets);

      console.log("maxEventEndDateTime--", maxEventEndDateTime, minEventStartTime);

      if (maxEventEndDateTime !== null && minEventStartTime !== null) {
        timings = {
          ...timings,
          endTime: timings.endTime > maxEventEndDateTime.toISOString() ? timings.endTime : maxEventEndDateTime.toISOString(),
          startTime: new Date(timings.startTime) < new Date(minEventStartTime) ? timings.startTime : minEventStartTime.toISOString(),
        };
      }
    }

    console.log("this is timming", timings);

    /////////////////////////////////////////////////////

    const userID = typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    const updatedTags: string[] =
      (eventAllData?.eventHashtags && eventAllData?.eventHashtags.map((tag: string) => (tag.trim().startsWith("#") ? tag : `#${tag}`))) || [];
    console.log("Updated Tags are as ========>   ", updatedTags);
    try {
      const data = {
        userId: userID,
        isFree: eventAllData?.isFree,
        name: eventAllData?.eventname,
        category: [eventAllData?.eventcategory],
        tags: updatedTags,
        eventDescription: eventAllData?.eventdescription,
        location: eventAllData?.eventlocation,
        coverEventImage: eventAllData?.eventcoverimg,
        tickets: updatedAllTicketTypes,
        totalComplemantaryTickets: eventAllData?.compticketno,
        fbUrl: eventAllData?.fburl,
        instaUrl: eventAllData?.instaurl,
        youtubeUrl: eventAllData?.youtubeurl,
        twitterUrl: eventAllData?.twitterurl,
        telegramUrl: eventAllData?.telegramurl,
        tiktokUrl: eventAllData?.tiktokurl,
        linkedinUrl: eventAllData?.linkedinurl,
        eventmedia: eventAllData?.eventmedia,
        stopBy: false,
        ticketStartDate: convertToUTC(timings?.ticketStartDate),
        ticketEndDate: convertToUTC(timings?.ticketEndDate),
        startTime: convertToUTC(timings?.startTime),
        endTime: convertToUTC(timings?.endTime),
      };
      dispatch(createevent(data)).then((res: any) => {
        if (res?.payload?.status === 200) {
          setLoader(false);

          setisWalletModalOpen(true);
          localStorage.removeItem("eventData");
          router.push("/management");
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

  return (
    <section className="bg-imgg">
      {/* {isWalletModalOpen && (
        <WalletChooseModal
          onClose={() => setisWalletModalOpen(false)}
          open={() => setisWalletModalOpen(true)}
          eventData={eventAllData}
        />
        <Receviepayment
          onClose={() => setisWalletModalOpen(false)}
          open={() => setisWalletModalOpen(true)}
          eventData={eventAllData}
        />
      )} */}
      {isWalletModalOpen && <EventSubmmitModal onClose={() => setisWalletModalOpen(false)} open={() => setisWalletModalOpen(true)} />}
      <Image
        style={{ filter: "blur(30px)" }}
        width={1000}
        height={1000}
        src={eventAllData?.eventcoverimg}
        className="w-full h-screen absolute object-cover object-center z-0 opacity-30"
        alt=""
      />
      <div>
        <div className="main-abovee px-[24px] w-full md:px-[100px] lg:ps-[40px] lg:pe-[40px] xl:px-[216px] pt-[8rem] lg:justify-center lg:pt-[9rem] pb-[6rem] z-[2] gap-[32px] lg:gap-12 w-full md:w-[100%] xl:w-full relative">
          <div className="flex justify-between items-center mb-[24px]">
            <div className="flex items-center gap-[16px]">
              <button onClick={() => handleBackEvent()} type="button">
                <Image src={backbtn} width={44} height={44} alt="back btn" className="lg:w-[44px] lg:h-[44px] w-[40px] h-[40px]" />
              </button>
              <p className="text-[24px] font-extrabold -tracking-[0.04em] text-[#E6E6E6]">Back</p>
            </div>

            <Button
              type="submit"
              className=" flex  justify-center items-center font-bold py-[12px]  px-[40px] lg:px-[68px] rounded-[200px]  font-extrabold  h-[44px] lg:h-[52px]  w-fit"
              onClick={() => EventCreation()}
              // onClick={(event) => handleFormSubmit(event, "create")}
            >
              Submit
            </Button>
          </div>
          <div className="flex gap-[40px] flex-col lg:flex-row">
            {/* <div className="">
            <div className="lhs-hero lg:w-[392px] w-full flex items-center justify-center flex-col relative ">
              <Image
                src={eventAllData?.eventcoverimg}
                alt="takeover"
                width={392}
                height={200}
                className="img-center rounded-lg relative"
              />
            </div>
          </div> */}
            <div className="">
              <div className="lhs-hero w-full lg:w-[392px] flex items-center justify-center flex-col relative ">
                <Image src={eventAllData?.eventcoverimg} alt="takeover" width={392} height={200} className="img-center rounded-lg relative" />

                {/* <div className="bg-white/20 p-[1rem] rounded-full backdrop-blur-lg webkit-header-blur w-fit absolute right-[24px] bottom-0">
                <Heart size={23} weight="fill" />
              </div> */}

                {/* {eventAllData?.userId && ( */}
                <PreviewEventFollowPromoter userId={UserID} eventName={eventAllData?.eventname} eventDATA={eventAllData} />
                {/* )} */}
              </div>
            </div>

            <div className="main-div-takeoverr lg:mt-[0px] mt-[0px] ">
              <div className="rhs-hero event-width-adjustment lg:mt-0  mt-0">
                <EventsHeroSlide
                  instaUrl={eventAllData?.instaurl}
                  tiktokUrl={eventAllData?.tiktokurl}
                  event={eventAllData?.eventname}
                  title={eventAllData?.eventname}
                  eventCategory={eventAllData?.eventcategory}
                  eventTags={eventAllData?.eventHashtags}
                  eventDate={eventAllData?.eventstarttime}
                  endTime={eventAllData?.eventendtime}
                  startTime={eventAllData?.eventstarttime}
                  img={eventAllData?.eventcoverimg}
                  location={eventAllData?.eventlocation}
                  eventdescription={eventAllData?.eventdescription}
                  // activeIndex={activeIndex}
                  setShowTicket={setShowTicket}
                  // ticketStartPrice={
                  //   eventAllData?.ticketsdata?.length === 1
                  //     ? "0"
                  //     : eventAllData?.ticketsdata[0]?.price

                  // }

                  ticketStartPrice={
                    eventAllData?.tickets?.length === 1
                      ? Number(eventAllData?.tickets[0]?.price) // Return the price of the single ticket as a number
                      : eventAllData?.tickets && eventAllData?.tickets?.length > 0
                      ? Math.min(
                          ...eventAllData?.tickets?.map((ticket: any) => {
                            const price = Number(ticket.price); // Convert price to number
                            return isNaN(price) ? Infinity : price; // Return Infinity if price is NaN
                          })
                        ).toString() // Find the lowest price and convert to string
                      : "0" // Default to "0" if there are no tickets
                  }
                  // ticketEndPrice={
                  //   eventAllData?.tickets[eventAllData?.ticketsdata.length - 1]?.price
                  // }
                  // handleBulletClick={() => handleBulletClick(event)}
                  AboutDrop={isAbout}
                  AboutToggle={() => setisAbout(!isAbout)}
                  ticketsdata={eventAllData?.tickets}
                  ticketLength={eventAllData?.tickets?.length}
                  // ticketStartPrice={
                  //   eventAllData?.ticketsdata?.length === 1
                  //     ? "0"
                  //     : eventAllData?.ticketsdata[0]?.price
                  // }

                  ticketEndPrice={
                    eventAllData?.tickets && eventAllData?.tickets?.length > 0
                      ? Math.max(...eventAllData?.tickets.map((ticket: any) => Number(ticket.price) || 0))
                      : 0 // Default to 0 if there are no tickets
                  }
                  // ticketStartPrice={
                  //   eventAllData?.ticketsdata && eventAllData?.ticketsdata?.length > 0
                  //     ? Math.min(
                  //         ...eventAllData?.ticketsdata.map((ticket:any) => Number(ticket.price) || 0)
                  //       )
                  //     : 0
                  // }
                />

                {eventAllData?.eventmedia?.length > 0 && Array.isArray(eventAllData?.eventmedia) && (
                  <div className="w-[576px] event-width-adjustment h-[350]px] mt-[48px] rounded-[12px] slider-main-div">
                    <Slider {...settings}>
                      {eventAllData?.eventmedia?.map((item: any, index: any) => (
                        <div key={index} className="w-full">
                          {item.endsWith(".mp4") || item.endsWith(".avi") || item.endsWith(".mov") || item.endsWith(".mkv") ? (
                            <video
                              src={item}
                              width={330}
                              height={200}
                              className="w-full h-[296px] slider-img object-contain "
                              controls
                              // alt={`Slide ${index + 1}`}
                            />
                          ) : (
                            <Image
                              src={item}
                              width={330}
                              height={200}
                              className="w-full h-[350px] object-contain slider-img "
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
                          src={eventAttend?.data?.[0]?.profilePicture || Avatar1}
                          width={60}
                          height={60}
                          alt="avatar"
                          className="rounded-full border border-[#034C22] z-[1]"
                        />
                        <Image
                          src={eventAttend?.data?.[1]?.profilePicture || Avatar2}
                          width={60}
                          height={60}
                          alt="avatar"
                          className="rounded-full border border-[#034C22] z-[2]"
                        />
                        <Image
                          src={eventAttend?.data?.[2]?.profilePicture || Avatar3}
                          width={60}
                          height={60}
                          alt="avatar"
                          className="rounded-full border border-[#034C22] z-[3]"
                        />
                      </div>
                      {/* <h3 className="lg:text-[20px] text-[16px] text-[#0FFF77] font-extrabold leading-[20px] text-center mt-[12px]">
                      Evelyn and 348 others going
                    </h3> */}
                      {/* <h3 className="lg:text-[20px] text-[16px] text-[#0FFF77] font-extrabold leading-[20px] text-center mt-[12px]">
                        {eventAttendy?.length > 0 && (
                          <>
                            {eventAttendy[0]?.fullname} and {eventAttendy?.length - 1} others going
                          </>
                        )}
                      </h3> */}
                      <p className="text-[#BFBFBF] text-[12px] pt-[4px]">Tap to see the live activities</p>

                      <Button
                        className="flex items-center gap-[0.5rem] text-[14px] font-extrabold rounded-full mt-[12px] w-fit ps-[0] pe-[16px] py-[10px]"
                        disabled
                      >
                        <Lock size={20} weight="fill" className="ms-[10px]" />
                        Live Activity
                      </Button>
                    </div>
                  </div>
                </GradientBorder>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecificEventHero;
