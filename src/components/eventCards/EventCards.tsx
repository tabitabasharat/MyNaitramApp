import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ScaleReveal } from "../animations/ScaleReveal";
import { shimmer, toBase64 } from "@/lib/utils";
import HeartBadge from "../ui/heart-badge";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTicketsByID } from "@/lib/middleware/wallet";

// Mock Data (replace with actual data)
const events = [
  { id: 1, imageUrl: "/event2.png", title: "Amet est massa volutpat faucibus" },
  { id: 2, imageUrl: "/event3.png", title: "Fashion Friday by Bushmills 2024" },
  { id: 3, imageUrl: "/event4.png", title: "PIZDEZ Womens Day Party 2024" },
  { id: 4, imageUrl: "/event5.png", title: "Deep Week with Hate Tuesday" },
  { id: 5, imageUrl: "/event7.png", title: "After Party for Ladies Night" },
  { id: 6, imageUrl: "/event8.png", title: "THE VAB with DJ CULOUGH" },
];

const EventCard: React.FC<{
  eventId: number;
  imageUrl: string;
  title: string;
  height?: string;
  width?: string;
}> = ({ eventId, imageUrl, title, height = "auto", width = "auto" }) => (
  <ScaleReveal extraStyle="w-full">
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
        <div className="absolute flex justify-between gap-[2rem] h-full items-end z-[2] px-4 md:p-[24px] py-[20px] top-0 w-full">
          <p className="font-extrabold text-white text-[28px]">{title}</p>
        </div>
      </div>
    </Link>
  </ScaleReveal>
);

const EventGrid: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userid = localStorage.getItem("_id");
    dispatch(getTicketsByID(userid));
  }, []);
  const myEvents = useAppSelector(
    (state) => state?.getTicketsByUId?.myTickets?.data
  );

  console.log("my events are ", myEvents);
  return (
    <div className="grid grid-cols-1 w-full pb-[28px]  md:pb-[132px] md:grid-cols-2 lg:grid-cols-3 gap-[12px] md:gap-[20px]">
      {myEvents?.length > 0 && myEvents?.map((item:any) => (
        <EventCard
          key={item?.event?.id}
          eventId={item?.event?.id}
          imageUrl={item?.event?.coverEventImage
          }
          title={item?.event?.name}
        />
      ))}
    </div>
  );
};

export default EventGrid;
