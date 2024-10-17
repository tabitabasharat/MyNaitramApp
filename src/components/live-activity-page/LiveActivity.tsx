'use client';

import { useRouter } from 'next/navigation';
import AttendanceList from './AttendanceList';
import LiveActivityChat from './live-actvity-chat/LiveActivityChat';
import PhotoRoll from './PhotoRoll';
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr';
import { truncateString } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { getEventAttend } from '@/lib/middleware/event';
import { useAppDispatch ,useAppSelector} from '@/lib/hooks';
import { useSearchParams } from "next/navigation";
import ScreenLoader from '../loader/Screenloader';
import { getChat } from '@/lib/middleware/liveactivity';

const LiveActivity = () => {
  const router = useRouter();
  const [eventID, setEventId] = useState<any>("");
  const [evantName,setEventName]=useState<any>("")
  const dispatch: any = useAppDispatch();
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');

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
  const userLoading = useAppSelector((state) => state?.getEventChat);
  // useEffect(() => {
  //   if (eventID) {
  //     console.log("Fetching chat for eventID:", eventID);
  //     dispatch(getChat(eventID));
  //   }
  // }, [eventID, dispatch]);

  return (
    <section className="pt-[8rem] lg:pt-[9rem] pb-[8rem]  md:w-[70%] lg:w-full md:mx-auto lg:mx-0">
    
      <div className="flex gap-4 mb-8 lg:mb-[48px]  xl:ps-[100px] xl:pe-[216px] lg:px-[80px] md:px-[0px] px-[24px] mx-2xl">
        <button onClick={() => router.back()}>
          <ArrowLeft size={20} />
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
          / <span className='font-bold'>Live Activity</span>
        </p>
      </div>
      <div className="flex flex-col xl:ps-[100px] xl:pe-[216px] lg:px-[80px] md:px-[0px] px-[0px] lg:flex-row gap-[48px] mx-2xl 2xl:mt-12">
        <div className="w-full lg:w-[384px] px-[24px] lg:px-[0px] flex flex-col gap-4 lg:gap-[32px] border border-t-0 border-x-0 lg:border-none pb-12 lg:pb-0 border-white/10">
          <AttendanceList />
          <PhotoRoll />
        </div>

        <div className="w-full event-width-adjustments">
          <LiveActivityChat  eventID={eventID} userID={userId}/>
        </div>
      </div>
    </section>
  );
};

export default LiveActivity;
