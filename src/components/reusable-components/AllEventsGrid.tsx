import { FadeReveal } from "../animations/FadeReveal";
import { Button } from "../ui/button";
import EventCard from "./EventCard";
import { Pagination } from "swiper/modules";
const AllEventsGrid = ({ events }: any) => {
  return (
    <>
      <div className="relative grid md:grid-cols-2 lg:grid-cols-3 gap-[1rem]">
        {events.map((event: any) => (
          <EventCard key={event.id} img={event.img} title={event.title} />
        ))}

        <div
          // style={{
          //   background:
          //     "linear-gradient(to top, black, transparent 33%, transparent 66%, transparent)",
          // }}
          className="absolute inset-0 to-transparent z-[3] pointer-events-none"
        ></div>

        {/* <FadeReveal extraStyle="z-[4]">
        <Button
          variant="secondary"
          className="w-fit absolute bottom-[5%] left-1/2 -translate-x-1/2"
        >
          View More Events
        </Button>
      </FadeReveal> */}
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination pt-[32px] flex justify-between">
          <li className="page-item disabled">
            <a className="page-link bg-[#424242] p-[16px] text-base font-bold rounded-[8px]">Previous</a>
          </li>
          <div className="flex">
            <li className="page-item">
              <a className="page-link text-sm font-normal text-[#D9D9D9]" href="#">
                page
              </a>
            </li>
            <li className="page-item">
              <a className="page-link text-sm font-normal text-[#D9D9D9]" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link text-sm font-normal text-[#D9D9D9]" href="#">
             {" "}   of
              </a>
            </li>
            <li className="page-item">
              <a className="page-link text-sm font-normal text-[#D9D9D9]" href="#">
                8
              </a>
            </li>
          </div>
          <li className="page-item">
            <a className="page-link bg-[white] text-[black] p-[16px] text-base font-bold rounded-[8px]" href="#">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default AllEventsGrid;
