import { FadeReveal } from "../animations/FadeReveal";
import { Button } from "../ui/button";
import EventCard from "./EventCard";
// import { Pagination } from "swiper/modules";
import Pagination from "./pagination/Pagination";
import { useState } from "react";

const AllEventsGrid = ({ events }: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 8;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <>
      <div className="relative grid md:grid-cols-2 lg:grid-cols-3 gap-[1rem]">
        {events.map((event: any) => (
          <EventCard key={event.id} img={event.img} title={event.title} />
        ))}

        <div
          className="absolute inset-0 to-transparent z-[3] pointer-events-none"
        ></div>
      </div>
      <div className="container p-0">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default AllEventsGrid;
