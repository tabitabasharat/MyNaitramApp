"use client";

import "swiper/css";
import "swiper/css/free-mode";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { CaretRight, MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import Avatar from "../reusable-components/Avatar";
import { attendees } from "@/lib/dummyData";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { Separator } from "../ui/separator";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import Link from "next/link";
import { useAppSelector } from "@/lib/hooks";
import ScreenLoader from "../loader/Screenloader";

const AttendanceList = () => {
  const eventAttendy = useAppSelector((state: any) => state?.getAllAttend);
  console.log(eventAttendy, "this is event attendy");
  return (
    <div>
      {eventAttendy.loading && <ScreenLoader />}
      <Dialog>
        <div className="flex justify-between">
          <p className="text-sm font-extrabold lg:text-base lg:font-bold">Active Users</p>
          <DialogTrigger asChild>
            <button className="text-[#8F8F8F] flex hover:text-white duration-300">
              View All <CaretRight size={20} weight="bold" />
            </button>
          </DialogTrigger>
        </div>

        {/* LARGE SCREEN VIEW */}
        <div className="hidden md:flex flex-wrap justify-normal items-center mt-[16px]">
          {eventAttendy?.attend?.data?.map((attendee: any) => (

        
            <Avatar
              size="size-[64px]"
              key={attendee?.id}
              img={attendee?.profilePicture ? attendee?.profilePicture:""}
            />
            
          ))}
        </div>

        {/* SMALL SCREEN VIEW */}

        <div className="block scrollbar-hide gap-[8px] overflow-y-auto md:hidden mt-[16px]">
          <Swiper
            slidesPerView={4}
            spaceBetween={5}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            modules={[FreeMode]}
            style={{ overflow: "visible" }}
          >
            {eventAttendy?.attend?.data?.map((attendee: any) => (
              <SwiperSlide key={attendee.id}>
                
                <Avatar
                  size="size-[64px]"
                  img={attendee?.profilePicture ? attendee?.profilePicture:""}
                />
               
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <DialogContent className="sm:max-w-md lg:max-w-[500px] pb-0">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl">
             <p className="font-extrabold text-[20px] lg:text-[24px]">Active Users List</p>
            </DialogTitle>
            <Separator className="scale-x-[1.12] bg-[#292929]" />
          </DialogHeader>
          <div className="relative">
            <Input
              id="search"
              placeholder="Search Attendance"
              className="h-12 mt-4"
            />
            <MagnifyingGlass
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            />
          </div>
          <ScrollArea className="h-72 w-full mt-1">
            <div className="flex flex-col gap-4">
            {eventAttendy?.attend?.data?.map((attendee: any) => (
                <div className="flex items-center gap-4">
                  <Avatar
                    key={attendee?.id}
                    img={attendee?.profilePicture ? attendee?.profilePicture:""}
                    size="size-[55px]"
                  />
                  <p className="font-bold text-[18px]">{attendee.fullname}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AttendanceList;
