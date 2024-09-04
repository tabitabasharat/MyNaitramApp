import { FadeReveal } from "../animations/FadeReveal";
import { Button } from "../ui/button";
import EventCard from "./EventCard";
// import { Pagination } from "swiper/modules";
import Pagination from "./pagination/Pagination";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getViewAllEvent } from "@/lib/middleware/event";
import { getViewPastEvents } from "@/lib/middleware/event";
import { getEventById, getLiveEventById } from "@/lib/middleware/event";

const AllEventsGrid = ({ events, eventType }: any) => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const userid =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    console.log("user id ", userid);
    const data = {
      page: 1,
    };

    dispatch(getViewAllEvent(data));
    dispatch(getViewPastEvents());
    // dispatch(getEventById(userid));
    dispatch(getLiveEventById(userid));
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

  console.log("All Events are", EventsAllData);

  const EventsPastData = useAppSelector(
    (state) => state?.getPastEvents?.ViewPastEvents?.data
  );

  console.log("All Past Events are", EventsPastData);

  const myEvents = useAppSelector(
    (state) => state?.getUserLiveEvents?.myLiveEvents?.data
  );

  console.log("my Live Events are", myEvents);

  return (
    <>
      {/* All Events */}
      {eventType === "All Events" &&
        (events && events.length > 0 ? (
          <>
            <div className="relative grid md:grid-cols-1 lg:grid-cols-3 gap-[1rem]">
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
                currentPage={EventsAllData?.currentPage}
                totalPages={EventsAllData?.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        ) : (
          <div className="relative grid md:grid-cols-2 lg:grid-cols-3 gap-[1rem]">
            <p>No Event Found</p>
            <div className="absolute inset-0 to-transparent z-[3] pointer-events-none"></div>
          </div>
        ))}

      {/* Past Events */}
      {eventType === "Past Events" &&
        (events && events?.length > 0 ? (
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
          <div className="relative grid md:grid-cols-2 lg:grid-cols-3 gap-[1rem]">
            <p>No Event Found</p>
            <div className="absolute inset-0 to-transparent z-[3] pointer-events-none"></div>
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
          <div className="relative grid md:grid-cols-2 lg:grid-cols-3 gap-[1rem]">
            <p>No Event Found</p>
            <div className="absolute inset-0 to-transparent z-[3] pointer-events-none"></div>
          </div>
        ))}
    </>
  );
};

export default AllEventsGrid;
