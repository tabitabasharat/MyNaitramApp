"use client";

import Backward from "@/components/Backward/Backward";
import { events } from "@/lib/dummyData";
import Link from "next/link";
import edit from "@/assets/Favorite - Button2.svg"
import Image from "next/image";
import { shimmer, toBase64 } from "@/lib/utils";
import { ScaleReveal } from "../animations/ScaleReveal";
import event12 from "../../../public/event12.png";
import React from "react";
import Pagination from "../reusable-components/pagination/Pagination";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getViewAllEvent } from "@/lib/middleware/event";
import AllEventsGrid from "../reusable-components/AllEventsGrid";
import EventCard from "../reusable-components/EventCard";
import { useState,useEffect } from "react";
import { EditIcon } from "lucide-react";

function Manageevent({ events, eventType,  title,
  img,
  eventId,
  height = "345px",
  width = "100%", }: any) {
  const dispatch = useAppDispatch();
  const EventsAllData = useAppSelector(
    (state) => state?.getViewAllEvents?.ViewallEvents?.data
  );
  const handlePageChange = (page: number) => {
    const data = {
      page: page,
    };

    dispatch(getViewAllEvent(data));
  };
  console.log("All Events are", EventsAllData);

  useEffect(() => {
    const userid = localStorage.getItem("_id");
    console.log("user id ", userid);
    const data={
      page:1
    }

    dispatch(getViewAllEvent(data));
    }, []);
  const imageUrl = img?.startsWith("http") || img?.startsWith("https") ? img : event12;
  console.log("image src is", imageUrl);
  // const title = selectedEvent ? selectedEvent.title : "All Events";
  return (
    <div className="w-full md:w-[70%] lg:pe-[88px] px-[24px] lg:ps-[80px] md:mx-auto lg:w-full pt-[120px] md:pt-[136px] lg:mx-0 relative lg:h-[auto] h-[90vh]">
      <Backward />
      <h3 className=" font-bold lg:text-[48px] text-[32px] my-[24px] lg:my-[32px]">Manage Event</h3>
    
        {EventsAllData?.events?.length > 0 ? (
          <>
            <div className="relative grid md:grid-cols-1 lg:grid-cols-4 gap-[12px] lg:gap-[20px]">
              {EventsAllData?.events?.length > 0 &&
                EventsAllData?.events?.map((event: any) => (
                  <ScaleReveal extraStyle="w-full">
                  {/* <Link href={`/events`} className="w-full"> */}
                  <Link
                    href={eventId ? `/specific-event/${eventId}` : "/events"}
                    className="w-full"
                  >
                    <div
                      style={{ height, width }}
                      className="relative overflow-hidden rounded-lg w-full h-fit border border-[#424242]"
                    >
                      <Image
                        src={imageUrl}
                        width={1000}
                        height={1000}
                        className="w-full h-full rounded-lg object-cover relative mx-auto overflow-hidden"
                        placeholder={`data:image/svg+xml;base64,${toBase64(
                          shimmer(1200, 1800)
                        )}`}
                        alt="event-img"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            
                      <div className="absolute flex justify-between gap-[2rem] h-full items-end z-[2] p-4 top-0 w-full">
                        <p className="font-bold text-white text-xl">{title}</p>
                        <Link href="management/edit-event">
                        <Image src={edit} alt="edit"/>
                        </Link>
                      </div>
                    </div>
                  </Link>
                </ScaleReveal>
                ))}

              <div className="absolute inset-0 to-transparent z-[3] pointer-events-none"></div>
            </div>
            <div className="container p-0">
              <Pagination
                currentPage={EventsAllData?.currentPage}
                totalPages={EventsAllData?.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        ) : (
          <div className="relative grid md:grid-cols-3 lg:grid-cols-4 gap-[1rem]">
            <p>No Event Found</p>
            <div className="absolute inset-0 to-transparent z-[3] pointer-events-none"></div>
          </div>
        )}
    </div>
  );
}

export default Manageevent;
