import MobileFilter from "../organisms/MobileFilter";
import { Button } from "../ui/button";
import MobileEventCard from "./MobileEventCard";
import Pagination from "./pagination/Pagination";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  getViewAllEvent,
  getViewPastEvents,
  getEventById,
} from "@/lib/middleware/event";
const MobileAllEventsList = ({ events, eventType }: any) => {
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
    dispatch(getEventById(userid));
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
    (state) => state?.getEventById?.myEvents?.data
  );

  console.log("my Events are", myEvents);

  const renderEvents = (events: any) => {
    if (events?.length > 0) {
      return events.map((event: any) => (
        <MobileEventCard
          key={event?.id}
          img={event?.coverEventImage}
          title={event?.name}
          eventId={event?.id}
        />
      ));
    } else {
      return <p>No events available</p>;
    }
  };
  return (
    <div className="relative flex flex-col gap-[12px]">
      <MobileFilter />

      {eventType === "All Events"
        ? renderEvents(EventsAllData?.events)
        : eventType === "Past Events"
        ? renderEvents(EventsPastData?.events)
        : eventType === "Your Events"
        ? renderEvents(myEvents)
        : null}

      <div className="absolute inset-0 to-transparent z-[3] pointer-events-none"></div>
      {eventType === "All Events" && (
        <div className="container p-0">
          <Pagination
            currentPage={EventsAllData?.currentPage}
            totalPages={EventsAllData?.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
      {eventType === "Past Events" && (
        <div className="container p-0">
          <Pagination
            currentPage={EventsPastData?.currentPage}
            totalPages={EventsPastData?.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default MobileAllEventsList;
