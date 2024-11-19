import Link from "next/link";
import HeartBadge from "../ui/heart-badge";
import Image from "next/image";
import { shimmer, toBase64 } from "@/lib/utils";
import { ScaleReveal } from "../animations/ScaleReveal";
import { SuccessToast, ErrorToast } from "./Toaster/Toaster";
import { useAppDispatch } from "@/lib/hooks";
import { useEffect, useState } from "react";
import { LikeEvent, disLikeEvent } from "@/lib/middleware/event";
import girl from "@/assets/Images.png"; // Use the same image or dynamic data
import { Heart } from "@phosphor-icons/react/dist/ssr";

// Array containing data for 6 event cards
const eventCardsData = new Array(6).fill({
  id: 1,
  title: "Amet est massa volutpat faucibus",
  image: girl, // Use the same image for all cards here, replace with dynamic data if available
});

const EventcardText = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {eventCardsData.map((event, index) => (
        <ScaleReveal key={index} extraStyle="w-[288px]">
          <div className="relative overflow-hidden rounded-lg w-[288px] h-[288px] border border-[#424242] ">
            <Image
              src={event.image}
              width={288}
              height={288}
              className="w-[288px] h-[288px] rounded-lg object-cover relative mx-auto overflow-hidden"
              placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(1200, 1800))}`}
              alt="event-img"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

            <div className="absolute flex justify-between gap-[2rem] h-full items-end z-[2] p-4 top-0 w-full">
              <p className="font-bold text-white text-xl">{event.title}</p>
            </div>
          </div>
        </ScaleReveal>
      ))}
    </div>
  );
};

export default EventcardText;
