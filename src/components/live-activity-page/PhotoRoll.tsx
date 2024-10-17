"use client";

import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import { useState, useEffect } from "react";
import { photorolls } from "@/lib/dummyData";
import "./live-actvity-chat/Chat.css";
import Thumbnail from "../ui/thumbnail";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "../ui/separator";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import Thumbnillive from "../ui/Thumbnillive";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getPhotoRoll } from "@/lib/middleware/liveactivity";

const PhotoRoll = () => {
  const [EventID, setEventID] = useState<any>("");
  const dispatch = useAppDispatch();
  useEffect(() => {
    const currentUrl: any =
      typeof window !== "undefined" ? window.location.href : null;

    if (currentUrl) {
      const parts = currentUrl.split("/");
      const lastPart = parts[parts.length - 1].split("?")[0];

      setEventID(lastPart);
      console.log("My event id is", lastPart);
      dispatch(getPhotoRoll(lastPart));
    }
  }, []);
 
const photoRoll = useAppSelector((state: any) => state?.getPhotoRollChat?.myData?.data);
console.log("Chat photos are", photoRoll)
  return (
    <div>
      <Dialog>
        <div className="flex justify-between">
          <p className="lg:font-bold lg:text-[16px] font-extrabold text-sm">
            Photo Roll
          </p>
          <DialogTrigger asChild>
            <button className="text-[#8F8F8F] flex hover:text-white duration-300">
              View All <CaretRight size={20} weight="bold" />
            </button>
          </DialogTrigger>
        </div>

        {/* LARGE SCREEN VIEW */}
        <div className="flex hidden md:flex flex-wrap  space-e-[16px]  gap-[16px] items-center mt-[16px] h-[200px] overflow-auto scrollbar-hide">
          {photoRoll?.length > 0 && photoRoll.map((photoroll:any, index:any) => (
            <Thumbnillive key={index} img={photoroll.picture} />
          ))}
        </div>

        {/* SMALL SCREEN VIEW */}
        <ScrollArea className="block md:hidden w-full  whitespace-nowrap ">
          <div className="flex gap-[8px] mt-6">
          {photoRoll?.length > 0 && photoRoll.map((photoroll:any, index:any) => (
            <Thumbnillive key={index} img={photoroll.picture} />
          ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <DialogContent className="sm:max-w-full md:max-w-[660px] pb-0 px-[24px] pt-[18px] ">
          <DialogHeader>
            <DialogTitle className="font-bold text-sm lg:text-[24px] pb-[18px]">
              Photo Roll
            </DialogTitle>
            <Separator className="scale-x-[1.09] bg-[#292929]" />
          </DialogHeader>

          <ScrollArea className="h-[402px] w-full mt-1 pb-1 overflow-auto  ">
            <div className=" gap-[14px] photo-container">
            {photoRoll?.length > 0 && photoRoll.map((photoroll:any, index:any) => (
            <Thumbnillive key={index} img={photoroll.picture}  size="size-[168.5px]  md:size-[140px]"/>
          ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PhotoRoll;
