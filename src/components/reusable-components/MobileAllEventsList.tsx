import MobileFilter from "../organisms/MobileFilter";
import { Button } from "../ui/button";
import MobileEventCard from "./MobileEventCard";
import { useState } from "react";
import Pagination from "./pagination/Pagination";

const MobileAllEventsList = ({ events }: any) => {
  // const [currentPage, setCurrentPage] = useState(1);
  // const totalPages = 8;

  // const handleNext = () => {
  //   if (currentPage < totalPages) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };

  // const handlePrevious = () => {
  //   if (currentPage > 1) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // };
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 8;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="relative flex flex-col gap-[12px]">
      <MobileFilter />
      {events.slice(0, 6).map((event: any) => (
        <MobileEventCard key={event.id} img={event.img} title={event.title} />
      ))}

      <div className="absolute inset-0 to-transparent z-[3] pointer-events-none"></div>
      <div className="container p-0">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default MobileAllEventsList;
