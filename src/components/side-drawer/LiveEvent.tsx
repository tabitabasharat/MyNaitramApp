"use client";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import ticket from "../../assets/Ticket.svg";
import Image from "next/image";
import cards from "../../assets/Cards.svg";
import cardsgreen from "../../assets/Cards (1).svg";
import ticketgreen from "../../assets/Ticket (1).svg";
import calender from "@/assets/Calender.svg";
import calendercheck from "@/assets/Calender Check.svg";
import calenderX from "@/assets/Calender X.svg";
import calendercheckgreen from "@/assets/Calender Checkgreen.svg";
import calenderXgreen from "@/assets/Calender Xgreen.svg";
import caledndergreen from "@/assets/Calendergreen.svg";
import EventcardText from "../reusable-components/EventcardText";
import Link from "next/link";
import Pagination from "../reusable-components/pagination/Pagination";
import { getOrganizerProfileFutures, getOrganizerPastEvents } from "@/lib/middleware/event_analytics";

type SelectedOption = "live" | "past" | null;

const LiveEvent = () => {
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<SelectedOption>("live");
  const [currentData, setCurentData] = useState<any>({});

  useEffect(() => {
    const userid: string | null = typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    console.log("user id ", userid);

    dispatch(getOrganizerProfileFutures(userid));
    dispatch(getOrganizerPastEvents(userid));
  }, []);

  const OrganizerLiveEvent = useAppSelector((state) => state?.getOrganizerProfileFutures?.allOrganizerProfileFutures?.data);
  const OrganizerPastEvent = useAppSelector((state) => state?.getOrganizerPastEvents?.organizerPastEvents?.data);

  useEffect(() => {
    console.log("All Events are new", OrganizerLiveEvent);
    console.log("All Past Events are", OrganizerPastEvent);
  }, [OrganizerLiveEvent, OrganizerPastEvent]);

  useEffect(() => {
    if (selected === "live") {
      setCurentData(OrganizerLiveEvent);
    } else {
      setCurentData(OrganizerPastEvent);
    }
  }, [selected]);

  return (
    <>
      <div className="w-full flex flex-col gap-[32px] lg:w-[70%] xl:pe-[97px] ps-[0px] xl:ps-[92px] md:mx-auto lg:w-full mt-[48px] lg:mt-[120px] lg:mx-0 relative h-[100vh]">
        <div className="mt-[45px] lg:mt-[0px] ">
          <div className="flex gap-[12px] w-full">
            <div
              className={`gradient-slate border border-[#292929] rounded-stlying px-[12px] w-full flex md:items-start flex-col justify-center items-center  pt-[14px] pb-[10px] md:pt-[16px] md:pb-[12px] cursor-pointer ${
                selected === "live" ? "gradient-border-rounded text-[#00A849]" : ""
              }`}
              onClick={() => setSelected("live")}
            >
              {selected === "live" ? (
                <Image src={caledndergreen} className="pb-[8px] hidden md:block" alt="Green Ticket" />
              ) : (
                <Image src={calender} className="pb-[8px] hidden md:block" alt="Default Ticket" />
              )}
              <p>Live Events</p>
            </div>
            <div
              className={`gradient-slate border border-[#292929] rounded-stlying px-[12px] flex w-full md:items-start flex-col justify-center items-center pt-[14px] pb-[10px] md:pt-[16px] md:pb-[12px] cursor-pointer ${
                selected === "past" ? "gradient-border-rounded text-[#00A849]" : ""
              }`}
              onClick={() => setSelected("past")}
            >
              {selected === "past" ? (
                <Image src={calenderXgreen} className="pb-[8px] hidden md:block" alt="Green Collectibles" />
              ) : (
                <Image src={calenderX} className="pb-[8px] hidden md:block" alt="Default Collectibles" />
              )}
              <p>Past Events</p>
            </div>
          </div>
          <h1 className="text-[24px] mt-[38px] ps-[20px] sm:ps-[0px] mb-[32px] md:text-[48px] font-extrabold">Live Events </h1>
          <Link href="/side-drawer/ticket-data">
            <EventcardText />
          </Link>
        </div>
        {/* <Pagination currentPage={EventsAllData?.currentPage} totalPages={EventsAllData?.totalPages} onPageChange={handlePageChange} /> */}
      </div>
    </>
  );
};
export default LiveEvent;
