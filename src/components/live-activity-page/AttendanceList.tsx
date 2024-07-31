'use client';

import 'swiper/css';
import 'swiper/css/free-mode';

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import { CaretRight, MagnifyingGlass } from '@phosphor-icons/react/dist/ssr';
import Avatar from '../reusable-components/Avatar';
import { attendees } from '@/lib/dummyData';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

import { Separator } from '../ui/separator';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import Link from 'next/link';

const AttendanceList = () => {
  return (
    <div>
      <Dialog>
        <div className="flex justify-between">
          <p>Attendance List</p>
          <DialogTrigger asChild>
            <button className="text-[#8F8F8F] flex hover:text-white duration-300">
              View All <CaretRight size={20} weight="bold" />
            </button>
          </DialogTrigger>
        </div>

        {/* LARGE SCREEN VIEW */}
        <div className="hidden md:flex flex-wrap gap-4 justify-center items-center mt-6">
          {attendees.map((attendee) => (
            <Link
              href={
                '/events/event-detail/live-activity/personal-social-profile'
              }
            >
              <Avatar
                size="size-[65px] lg:size-[85px]"
                key={attendee.id}
                img={attendee.img}
              />
            </Link>
          ))}
        </div>

        {/* SMALL SCREEN VIEW */}

        <div className="block md:hidden mt-6">
          <Swiper
            slidesPerView={4}
            spaceBetween={5}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            modules={[FreeMode]}
            style={{ overflow: 'visible' }}
          >
            {attendees.map((attendee) => (
              <SwiperSlide key={attendee.id}>
                <Link
                  href={
                    '/events/event-detail/live-activity/personal-social-profile'
                  }
                >
                  <Avatar
                    size="size-[65px] lg:size-[85px]"
                    img={attendee.img}
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <DialogContent className="sm:max-w-md lg:max-w-[500px] pb-0">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl">
              Attendance List
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
              {attendees.map((attendee) => (
                <div className="flex items-center gap-4">
                  <Avatar
                    key={attendee.id}
                    img={attendee.img}
                    size="size-[55px]"
                  />
                  <p className="font-bold text-[18px]">{attendee.name}</p>
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
