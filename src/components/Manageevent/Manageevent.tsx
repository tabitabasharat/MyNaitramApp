"use client";

import Backward from "@/components/Backward/Backward";
import { events } from "@/lib/dummyData";
import Link from "next/link";
import edit from "@/assets/Favorite - Button2.svg";
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
import { useState, useEffect } from "react";
import { getEventsByUID } from "@/lib/middleware/organizer";
import { ErrorToast } from "../reusable-components/Toaster/Toaster";
function Manageevent({
  events,
  eventType,
  title,
  img,
  eventId,
  height = "345px",
  width = "100%",
}: any) {
  const dispatch = useAppDispatch();

  const handlePageChange = (page: number) => {
    const userid =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    const data = {
      page: page,
      userId: userid,
    };

    dispatch(getEventsByUID(data));
  };
  // console.log("All Events are", EventsAllData);

  useEffect(() => {
    const userid =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    console.log("user id ", userid);
    const data = {
      page: 1,
      userId: userid,
    };
    dispatch(getEventsByUID(data));

    dispatch(getViewAllEvent(data));
  }, []);

  const EventsData = useAppSelector(
    (state) => state?.getEventsByUID?.myEvents?.data
  );
  console.log("my events data", EventsData);
  const imageUrl =
    img?.startsWith("http") || img?.startsWith("https") ? img : event12;
  console.log("image src is", imageUrl);
  // const title = selectedEvent ? selectedEvent.title : "All Events";
  return (
    <div className="w-full md:w-[100%] lg:pe-[88px] px-[24px] lg:ps-[80px] md:px-[75px] lg:w-full pt-[120px] pb-[57px] lg:pb-[170px] md:pt-[136px] lg:mx-0 relative  ">
      <Backward />
      <h3 className=" font-bold lg:text-[48px] text-[32px] my-[24px] lg:my-[32px]">
        Manage Event
      </h3>

      {EventsData?.data?.events?.length > 0 ? (
        <>
          <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[12px] lg:gap-[20px]">
            {EventsData?.data?.events?.length > 0 &&
              EventsData?.data?.events?.map((event: any) => (
                <ScaleReveal extraStyle="w-full">
                  {/* <Link href={`/events`} className="w-full"> */}
                  <Link
                    href={event?.id ? `/event/${event?.id}` : "/events"}
                    className="w-full"
                  >
                    <div
                      style={{ height, width }}
                      className="relative overflow-hidden rounded-lg w-full h-fit border border-[#424242]"
                    >
                      <Image
                        src={event?.coverEventImage}
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
                        <p className="font-bold text-white text-xl">
                          {event?.name}
                        </p>
                        {/* <Link
                          href={
                            event?.eventTickets?.length == 0  ||  event?.eventTickets == undefined
                              ? `/management/edit-event/${event.id}`
                              : "javascript:void(0)"
                          }
                          onClick={() => {

                           
                            if (event?.eventTickets?.length != 0  || event?.eventTickets != undefined) {
                              ErrorToast("You Can't Edit this Event");
                            }
                          }}
                        >
                          <Image src={edit} alt="edit" />
                        </Link> */}
                        <Link
                          href={`/management/edit-event/${event.id}`}
                          onClick={(e) => {
                            if (
                              event?.eventTickets !== undefined &&
                              event?.eventTickets.length > 0
                            ) {
                              e.preventDefault(); // Prevent navigation
                              ErrorToast("You cannot edit this event because tickets from this event have been sold already");
                            }
                           
                          }}
                        >
                          <Image src={edit} alt="edit" />
                        </Link>
                      </div>
                    </div>
                  </Link>
                </ScaleReveal>
              ))}

            <div className="absolute inset-0 to-transparent z-[3] pointer-events-none"></div>
          </div>
          <div className="p-0 w-full ">
            <Pagination
              currentPage={EventsData?.data?.currentPage}
              totalPages={EventsData?.data?.totalPages}
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
