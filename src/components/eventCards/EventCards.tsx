import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ScaleReveal } from "../animations/ScaleReveal";
import { shimmer, toBase64 } from "@/lib/utils";
import HeartBadge from "../ui/heart-badge";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getTicketsByID,
  getWalletCollectByUserID,
} from "@/lib/middleware/wallet";
import { getRewardCollectibles } from "@/lib/middleware/reward";
import ScreenLoader from "../loader/Screenloader";
const EventCard: React.FC<{
  eventId: number;
  imageUrl: string;
  title: string;
  height?: string;
  width?: string;
  eventType: "tickets" | "collectables" | "rewardcollectables" | null;
}> = ({
  eventId,
  imageUrl,
  title,
  eventType,
  height = "345px",
  width = "100%",
}) => (
  <ScaleReveal extraStyle="w-full">
    <Link
      href={
        eventType === "tickets"
          ? `/wallet/specific-ticket/${eventId}`
          : eventType === "collectables"
          ? `/wallet/collect-table/${eventId}`
          : eventType === "rewardcollectables"
          ? `reward/claimable-reward/${eventId}`
          : "#"
      }
      className="w-full"
    >
      <div
        style={{ height, width }}
        className="relative overflow-hidden rounded-lg w-full h-full border border-[#424242]"
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

const EventGrid: React.FC<{
  eventType: "tickets" | "collectables" | "rewardcollectables" | null;
}> = ({ eventType }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userid = localStorage.getItem("_id");
    dispatch(getTicketsByID(userid));
    dispatch(getWalletCollectByUserID(userid));
    dispatch(getRewardCollectibles());
  }, []);

  const myEvents = useAppSelector(
    (state) => state?.getTicketsByUId?.myTickets?.data
  );
  console.log("my events are ", myEvents);

  const myWalletCollect = useAppSelector(
    (state) =>
      state?.getWalletCollectByUID?.myWalletCollectibles?.data?.userCollectibles
  );
  console.log("my wallet collectibles are ", myWalletCollect);

  const myRewardCollectibles = useAppSelector(
    (state) => state?.getRewardCollectibles?.myCollectibles?.data?.collectibles
  );
  console.log("my Rewards Collectibles are ", myRewardCollectibles);

  const userRewardCollectibleLoading = useAppSelector(
    (state) => state?.getRewardCollectibles
  );
  const ticketsLoading = useAppSelector((state) => state?.getTicketsByUId);
  const walletCollectLoading = useAppSelector((state) => state?.getWalletCollectByUID);


  return (
    <>
      {eventType === "tickets" && (
        <>
          {ticketsLoading.loading && <ScreenLoader />}
          <div className="grid grid-cols-1 w-full pb-[28px]  md:pb-[132px] md:grid-cols-2 lg:grid-cols-3 gap-[12px] md:gap-[20px]">
            {eventType === "tickets" && myEvents?.length > 0 ? (
              myEvents?.map((item: any) => (
                <EventCard
                  key={item?.event?.id}
                  eventId={item?.ticketId}
                  imageUrl={item?.event?.coverEventImage}
                  title={item?.event?.name}
                  eventType={eventType}
                  
                  
                />
              ))
            ) : (
              <p>No Data Found</p>
            )}
          </div>
        </>
      )}

      {eventType === "collectables" && (
        <>
          {walletCollectLoading.loading && <ScreenLoader />}
          <div className="grid grid-cols-1 w-full pb-[28px]  md:pb-[132px] md:grid-cols-2 lg:grid-cols-3 gap-[12px] md:gap-[20px]">
            {eventType === "collectables" && myWalletCollect?.length > 0 ? (
              myWalletCollect?.map((item: any) => (
                <EventCard
                  key={item?.id}
                  eventId={item?.Collectiblee?.id}
                  imageUrl={item?.Collectiblee?.image}
                  title={item?.Collectiblee?.name}
                  eventType={eventType}
                />
              ))
            ) : (
              <p>No Data Found</p>
            )}
          </div>
        </>
      )}
      {eventType === "rewardcollectables" && (
        <>
          {userRewardCollectibleLoading.loading && <ScreenLoader />}
          <div className="grid grid-cols-1 w-full pb-[28px]  md:pb-[132px] md:grid-cols-2 lg:grid-cols-3 gap-[12px] md:gap-[20px]">
            {eventType === "rewardcollectables" &&
            myRewardCollectibles?.length > 0 ? (
              myRewardCollectibles?.map((item: any) => (
                <EventCard
                  key={item?.id}
                  eventId={item?.id}
                  imageUrl={item?.image}
                  title={item?.name}
                  eventType={eventType}
                />
              ))
            ) : (
              <p>No Data Found</p>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default EventGrid;
