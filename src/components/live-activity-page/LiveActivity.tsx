'use client';

import { useRouter } from 'next/navigation';
import AttendanceList from './AttendanceList';
import LiveActivityChat from './live-actvity-chat/LiveActivityChat';
import PhotoRoll from './PhotoRoll';
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr';
import { truncateString } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { getEventAttend } from '@/lib/middleware/event';
import { useAppDispatch } from '@/lib/hooks';
import { useSearchParams } from "next/navigation";

const LiveActivity = () => {
  const router = useRouter();
  const [eventID, setEventId] = useState<any>("");
  const [evantName,setEventName]=useState<any>("")
  const dispatch: any = useAppDispatch();
  const searchParams = useSearchParams();

  // useEffect(() => {
  //   const currentUrl: any =
  //     typeof window !== "undefined" ? window.location.href : null;
  //   const parts = currentUrl.split("/");
  //   const value = parts[parts.length - 1];
  //   setEventId(value);
  //   console.log("my event id is", value);
  //   dispatch(getEventAttend(value));


  // }, []);
  useEffect(() => {
    const currentUrl: any =
      typeof window !== "undefined" ? window.location.href : null;
  
    if (currentUrl) {
      const parts = currentUrl.split("/");
      const lastPart = parts[parts.length - 1].split("?")[0]; 
  
      setEventId(lastPart); 
      console.log("My event id is", lastPart);
  
   
      dispatch(getEventAttend(lastPart));
    }
  }, []);

  useEffect(() => {
    const eventDataParam = searchParams.get("eventName");
    console.log("Parsed Event Type live:", eventDataParam);

    if (eventDataParam) {
      try {
        const decodedData = decodeURIComponent(eventDataParam);

        try {
          JSON.parse(decodedData);
          // setEventType(JSON.parse(decodedData));
          setEventName(JSON.parse(decodedData))
        } catch (e) {
          setEventName(decodedData)
        }



      } catch (error) {
      }
    }
  }, [searchParams]);
  return (
    <section className="pt-[8rem] lg:pt-[9rem] pb-[8rem]  md:w-[70%] lg:w-full md:mx-auto lg:mx-0">
      <div className="flex gap-4 mb-8 lg:mb-[48px]  xl:px-[216px] lg:px-[80px] md:px-[0px] px-[24px] mx-2xl">
        <button onClick={() => router.back()}>
          <ArrowLeft size={22} />
        </button>
        <p>
          <span className="text-[#BFBFBF]">Event</span> /
          <span className="text-[#BFBFBF] lg:hidden">
            {' '}
            {truncateString(evantName, 5)}{' '}
          </span>
          <span className="text-[#BFBFBF] hidden lg:inline-block px-1">
            {' '}
            {evantName}{' '}
          </span>
          / <span>Live Activity</span>
        </p>
      </div>
      <div className="flex flex-col xl:px-[216px] lg:px-[80px] md:px-[0px] px-[24px] lg:flex-row gap-[48px] mx-2xl 2xl:mt-12">
        <div className="w-full lg:w-[384px] flex flex-col gap-4 lg:gap-8 border border-t-0 border-x-0 lg:border-none pb-12 lg:pb-0 border-white/10">
          <AttendanceList />
          {/* <PhotoRoll /> */}
        </div>

        <div className="w-full lg:w-1/2">
          <LiveActivityChat  eventID={eventID}/>
        </div>
      </div>
    </section>
  );
};

export default LiveActivity;
