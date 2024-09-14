import { FadeReveal } from "../animations/FadeReveal";
import { Button } from "../ui/button";
import Image from "next/image";
import EventCard from "./EventCard";
// import { Pagination } from "swiper/modules";
import Pagination from "./pagination/Pagination";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getViewAllEvent } from "@/lib/middleware/event";
import { getViewPastEvents } from "@/lib/middleware/event";
import { getEventById, getLiveEventById } from "@/lib/middleware/event";
import rocket from "@/assets/Wallet/rocket-empty.svg";
import YourEvents from "./YourEvents";

const AllEventsGrid = ({ events, eventType }: any) => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const userid =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    console.log("user id ", userid);
    const data = {
      page: 1,
      
        
        location:  null,
        today: null,
        startDate: null,
        endDate: null,
        startMonth: null,
        endMonth: null,
        chooseDate:  null,
    
    };

    dispatch(getViewAllEvent(data));
    dispatch(getViewPastEvents(data));
    const dats={
      id:userid
    }
    // dispatch(getEventById(userid));
    // dispatch(getLiveEventById(dats));
  }, []);
  const handlePageChange = (page: number) => {
    const data = {
      page: page,
    };

    dispatch(getViewAllEvent(data));
  };

  const EventsAllData = useAppSelector(
    (state) => state?.getViewAllEvents?.ViewallEvents?.data
  );

  console.log("All Events are new", EventsAllData);

  const EventsPastData = useAppSelector(
    (state) => state?.getPastEvents?.ViewPastEvents?.data
  );

  console.log("All Past Events are", EventsPastData);

  const myEvents = useAppSelector(
    (state) => state?.getUserLiveEvents?.myLiveEvents?.data
  );

  console.log("my Live Events are", myEvents);

  console.log("event type", eventType);
  return (
    <>
      {/* All Events */}
      {eventType === "All Events" &&
        (events && events?.length > 0 ? (
          <>
            <div className="relative grid md:grid-cols-1 lg:grid-cols-3 gap-[1rem]">
              {events?.length > 0 &&
                events?.map((event: any) => (
                  <YourEvents
                    key={event?.id}
                    img={event?.coverEventImage}
                    title={event?.name}
                    eventId={event?.id}
                    eventType={eventType}
                    eventDate={event?.startTime}
                    endTime={event?.endTime}
                    startTime={event?.startTime}
                    likedEvents={event?.likes}
                  />
                ))}

              <div className="absolute inset-0 to-transparent z-[3] pointer-events-none"></div>
            </div>
            <div className="container p-0">
              <Pagination
                currentPage={EventsAllData?.currentPage}
                totalPages={EventsAllData?.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        ) : (
          <div className="relative gradient-slate py-[94.5px] border border-[#292929] flex items-center justify-center flex-col gap-[12px] rounded-[12px]">
            <p className="text-[16px] text-extrabold">There’s No Event</p>
            <button className="text-[16px]  font-extrabold bg-[#00D059] text-[#030303] flex items-center h-auto justify-center gap-[6px] py-[10px] ps-[10px] pr-[16px] rounded-[100px] w-auto ">
              <Image src={rocket} alt="rocket" />
              See What's On
            </button>
          </div>
        ))}

      {/* Past Events */}
      {eventType === "Past Events" &&
        (events?.length > 0 ? (
          <>
            <div className="relative grid md:grid-cols-2 lg:grid-cols-3 gap-[1rem]">
              {events?.length > 0 &&
                events?.map((event: any) => (
                  <EventCard
                    key={event?.id}
                    img={event?.coverEventImage}
                    title={event?.name}
                    eventId={event?.id}
                    eventType={eventType}
                  />
                ))}

              <div className="absolute inset-0 to-transparent z-[3] pointer-events-none"></div>
            </div>
            <div className="container p-0">
              <Pagination
                currentPage={EventsPastData?.currentPage}
                totalPages={EventsPastData?.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        ) : (
          <div className="relative gradient-slate py-[94.5px] border border-[#292929] flex items-center justify-center flex-col gap-[12px] rounded-[12px]">
            <p className="text-[16px] text-extrabold">There’s No Event</p>
            <button className="text-[16px]  font-extrabold bg-[#00D059] text-[#030303] flex items-center h-auto justify-center gap-[6px] py-[10px] ps-[10px] pr-[16px] rounded-[100px] w-auto ">
              <Image src={rocket} alt="rocket" />
              See What's On
            </button>
            {/* <div className="absolute inset-0 to-transparent z-[3] pointer-events-none"></div> */}
          </div>
        ))}

      {/* Your Events or Live Events */}
      {eventType === "Your Events" &&
        (events?.length > 0 ? (
          <div className="relative grid md:grid-cols-2 lg:grid-cols-3 gap-[1rem]">
            {events?.map((event: any) => (
              <EventCard
                key={event?.id}
                img={event?.coverEventImage}
                title={event?.name}
                eventId={event?.id}
                eventType={eventType}
              />
            ))}
            <div className="absolute inset-0 to-transparent z-[3] pointer-events-none"></div>
          </div>
        ) : (
          <div className="relative gradient-slate py-[94.5px] border border-[#292929] flex items-center justify-center flex-col gap-[12px] rounded-[12px]">
          <p className="text-[16px] text-extrabold">There’s No Event</p>
          <button className="text-[16px]  font-extrabold bg-[#00D059] text-[#030303] flex items-center h-auto justify-center gap-[6px] py-[10px] ps-[10px] pr-[16px] rounded-[100px] w-auto ">
            <Image src={rocket} alt="rocket" />
            See What's On
          </button>
        </div>
        ))}
    </>
  );
};

export default AllEventsGrid;
