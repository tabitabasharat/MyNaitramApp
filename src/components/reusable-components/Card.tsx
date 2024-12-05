import Link from "next/link";
import HeartBadge from "../ui/heart-badge";
import Image from "next/image";
import { shimmer, toBase64 } from "@/lib/utils";
import { ScaleReveal } from "../animations/ScaleReveal";
import event12 from "../../../public/event12.png";
import { SuccessToast, ErrorToast } from "./Toaster/Toaster";
import imageurl from "@/assets/image28.svg"
import { useAppDispatch } from "@/lib/hooks";
import { useEffect, useState } from "react";
import { LikeEvent, disLikeEvent } from "@/lib/middleware/event";
import { Heart } from "@phosphor-icons/react/dist/ssr";

const Card = () => {
    return (
        <ScaleReveal extraStyle="w-full">
            {/* <Link href={eventId ? `/event/${eventId}?EventType=${Eventtype}` : "/viewallevents"} className="w-full"> */}
            <div className="relative overflow-hidden rounded-lg w-full  xl:h-[500px] h-fit border border-[#424242] ">
                <Image
                    src={imageurl}
                    width={1000}
                    height={1000}
                    className="w-full xl:h-[500px] h-full rounded-lg object-cover relative mx-auto overflow-hidden"
                    // placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(1200, 1800))}`}
                    alt="event-img"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

                <div className="absolute flex justify-between gap-[2rem]  h-full items-end z-[2] p-[24px] top-0 w-full">
                    <p className="font-extrabold text-white text-[22px] sm:text-[24px]">The Orbitians <br />
                        <span className="text-[#BFBFBF] text-sm sm:text-base">What’s New</span>
                    </p>
                </div>
            </div>
        </ScaleReveal >
    );
};

export default Card;
