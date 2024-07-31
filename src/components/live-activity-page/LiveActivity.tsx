'use client';

import { useRouter } from 'next/navigation';
import AttendanceList from './AttendanceList';
import LiveActivityChat from './live-actvity-chat/LiveActivityChat';
import PhotoRoll from './PhotoRoll';
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr';
import { truncateString } from '@/lib/utils';

const LiveActivity = () => {
  const router = useRouter();
  return (
    <section className="pt-[8rem] lg:pt-[9rem] pb-[8rem] md:w-[70%] lg:w-full md:mx-auto lg:mx-0">
      <div className="flex gap-4 mb-8 pxpx mx-2xl">
        <button onClick={() => router.back()}>
          <ArrowLeft size={22} />
        </button>
        <p>
          <span className="text-[#BFBFBF]">Event</span> /
          <span className="text-[#BFBFBF] lg:hidden">
            {' '}
            {truncateString("PIZDEZ Women's Day Party 2024", 5)}{' '}
          </span>
          <span className="text-[#BFBFBF] hidden lg:inline-block px-1">
            {' '}
            PIZDEZ Women's Day Party 2024{' '}
          </span>
          / <span>Live Activity</span>
        </p>
      </div>
      <div className="flex flex-col lg:flex-row gap-16 mx-2xl 2xl:mt-12">
        <div className="w-full lg:w-1/2 flex flex-col gap-8 pxpx border border-t-0 border-x-0 lg:border-none pb-12 lg:pb-0 border-white/10">
          <AttendanceList />
          <PhotoRoll />
        </div>

        <div className="w-full lg:w-1/2 pr-0 md:pr-[1.5rem] lg:pr-[4rem] md:pl-[1.5rem] lg:pl-0">
          <LiveActivityChat />
        </div>
      </div>
    </section>
  );
};

export default LiveActivity;
