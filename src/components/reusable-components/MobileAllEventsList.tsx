import MobileFilter from "../organisms/MobileFilter";
import { Button } from "../ui/button";
import MobileEventCard from "./MobileEventCard";
import Pagination from "./pagination/Pagination";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getViewAllEvent } from "@/lib/middleware/event";
const MobileAllEventsList = ({ events, eventType }: any) => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 8;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    dispatch(getViewAllEvent());
  }, []);

  const EventsAllData = useAppSelector(
    (state) => state?.getViewAllEvents?.ViewallEvents?.data
  );

  console.log("All Events are", EventsAllData);
  const EventsPastData = useAppSelector(
    (state) => state?.getPastEvents?.ViewPastEvents?.data
  );

  console.log("All Past Events are", EventsPastData);

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
        : renderEvents(EventsPastData?.events)}

      <div className="absolute inset-0 to-transparent z-[3] pointer-events-none"></div>
      <div className="container p-0">
        <Pagination
          currentPage={EventsAllData?.currentPage}
          totalPages={EventsAllData?.totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default MobileAllEventsList;
