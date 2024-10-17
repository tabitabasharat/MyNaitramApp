'use client';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';

import { FreeMode } from 'swiper/modules';

import GradientBorder from '@/components/ui/gradient-border';
import {
  MicrophoneStage,
  Disc,
  Confetti,
  Microphone,
  FilmSlate,
  Smiley,
  Chats,
} from '@phosphor-icons/react/dist/ssr';
import useMedia from '@/hooks/useMedia';

const CategoryList = () => {
  const isMobile = useMedia('(max-width: 768px)', false);
  const isTablet = useMedia('(max-width: 1050px)', false);
  const isDesktop = useMedia('(max-width: 1400px)', false);
  return (
    <div className="pxpx mx-2xl mb-8 w-screen overflow-x-hidden">
      <Swiper
        slidesPerView={isMobile ? 2 : isTablet ? 5 : isDesktop ? 6 : 7}
        spaceBetween={12}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode]}
        style={{ overflow: 'visible' }}
      >
        <SwiperSlide>
          <GradientBorder className="rounded-full lg:rounded-lg w-full">
            <div className="border border-[#3C3C3C] w-full rounded-full lg:rounded-lg flex flex-row lg:flex-col gap-1 pl-4 pr-5 lg:pl-3 lg:pr-0 py-3 gradient-slate text-primary items-center lg:items-start">
              <MicrophoneStage size={22} weight="fill" />
              <p>Shows</p>
            </div>
          </GradientBorder>
        </SwiperSlide>
        <SwiperSlide>
          <div className="border border-[#3C3C3C] w-full rounded-full lg:rounded-lg flex flex-row lg:flex-col gap-1 pl-4 pr-5 lg:pl-3 lg:pr-0 py-3 gradient-slate items-center lg:items-start">
            <Disc size={22} weight="fill" />
            <p>DJ</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="border border-[#3C3C3C] w-full rounded-full lg:rounded-lg flex flex-row lg:flex-col gap-1 pl-4 pr-5 lg:pl-3 lg:pr-0 py-3 gradient-slate items-center lg:items-start">
            <Confetti size={22} weight="fill" />
            <p>Party</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="border border-[#3C3C3C] w-full rounded-full lg:rounded-lg flex flex-row lg:flex-col gap-1 pl-4 pr-5 lg:pl-3 lg:pr-0 py-3 gradient-slate items-center lg:items-start">
            <Microphone size={22} weight="fill" />
            <p>Talk</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="border border-[#3C3C3C] w-full rounded-full lg:rounded-lg flex flex-row lg:flex-col gap-1 pl-4 pr-5 lg:pl-3 lg:pr-0 py-3 gradient-slate items-center lg:items-start">
            <FilmSlate size={22} weight="fill" />
            <p>Film</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="border border-[#3C3C3C] w-full rounded-full lg:rounded-lg flex flex-row lg:flex-col gap-1 pl-4 pr-5 lg:pl-3 lg:pr-0 py-3 gradient-slate items-center lg:items-start">
            <Smiley size={22} weight="fill" />
            <p>Comedy</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="border border-[#3C3C3C] w-full rounded-full lg:rounded-lg flex flex-row lg:flex-col gap-1 pl-4 pr-5 lg:pl-3 lg:pr-0 py-3 gradient-slate items-center lg:items-start">
            <Chats size={22} weight="fill" />
            <p>Host</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default CategoryList;
