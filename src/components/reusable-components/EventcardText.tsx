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

interface EventcardTextProps {
  currentEvents: any;
}

const EventcardText: React.FC<EventcardTextProps> = ({ currentEvents }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {currentEvents?.data?.events.map((event: any, index: number) => (
        <ScaleReveal key={index} extraStyle="">
          <Link
            href={`/side-drawer/ticket-data/${event?.id}`}
            className="relative overflow-hidden rounded-lg h-[288px] w-full md:w-full xl:h-[380px] sm:w-[288px] border border-[#424242] shadow-innerBottom"
          >
            <Image
              src={event?.coverEventImage}
              width={288}
              height={288}
              className="w-full md:w-full h-[288px] xl:h-[380px] rounded-lg object-fill relative mx-auto overflow-hidden"
              placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(1200, 1800))}`}
              alt="event-img"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

            <div className="absolute flex justify-between gap-4 h-full items-end z-[2] pt-4 pb-4 pr-4 pl-5 top-0 w-full">
              <p className="font-bold w-[75%] text-white text-lg sm:text-xl mb-8">{event?.name}</p>
            </div>
          </Link>
        </ScaleReveal>
      ))}
    </div>
  );
};

export default EventcardText;
