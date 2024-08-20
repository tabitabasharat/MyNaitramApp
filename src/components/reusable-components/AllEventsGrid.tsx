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
  const totalPages = 8;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const userid = localStorage.getItem("_id");
    console.log("user id ", userid);
    dispatch(getViewAllEvent());
    dispatch(getViewPastEvents());
    // dispatch(getEventById(userid));
    dispatch(getLiveEventById(userid));
  }, []);

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
      {eventType === "All Events" && (
        <>
          <div className="relative grid md:grid-cols-2 lg:grid-cols-3 gap-[1rem]">
            {EventsAllData?.events?.length > 0 &&
              EventsAllData?.events?.map((event: any) => (
                <EventCard
                  key={event?.id}
                  img={event?.coverEventImage}
                  title={event?.name}
                  eventId={event?.id}
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
      )}
      {eventType === "Past Events" && (
        <>
          <div className="relative grid md:grid-cols-2 lg:grid-cols-3 gap-[1rem]">
            {EventsPastData?.events?.length > 0 &&
              EventsPastData?.events?.map((event: any) => (
                <EventCard
                  key={event?.id}
                  img={event?.coverEventImage}
                  title={event?.name}
                  eventId={event?.id}
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
      )}

      {eventType === "Your Events" &&
        (myEvents?.length > 0 ? (
          <div className="relative grid md:grid-cols-2 lg:grid-cols-3 gap-[1rem]">
            {myEvents?.map((event: any) => (
              <EventCard
                key={event?.id}
                img={event?.coverEventImage}
                title={event?.name}
                eventId={event?.id}
              />
            ))}
            <div className="absolute inset-0 to-transparent z-[3] pointer-events-none"></div>
          </div>
        ) : (
          <div className="relative grid md:grid-cols-2 lg:grid-cols-3 gap-[1rem]">
            <p>No data found</p>
            <div className="absolute inset-0 to-transparent z-[3] pointer-events-none"></div>
          </div>
        ))}
    </>
  );
};

export default AllEventsGrid;
