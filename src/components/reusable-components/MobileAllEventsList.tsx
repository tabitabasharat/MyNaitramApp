import MobileFilter from '../organisms/MobileFilter';
import { Button } from '../ui/button';
import MobileEventCard from './MobileEventCard';

const MobileAllEventsList = ({ events }: any) => {
  return (
    <div className="relative flex flex-col gap-[12px]">
      <MobileFilter />
      {events.slice(0, 6).map((event: any) => (
        <MobileEventCard key={event.id} img={event.img} title={event.title} />
      ))}

      <div
        className="absolute inset-0 to-transparent z-[3] pointer-events-none"
      ></div>
      <nav aria-label="Page navigation example">
        <ul className="pagination mt-[28px] flex justify-between">
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
    </div>
  );
};

export default MobileAllEventsList;
