import TicketCard from '../reusable-components/TicketCard';
import UpcomingTicketCard from '../reusable-components/UpcomingTicketCard';
import { Badge } from '../ui/badge';

const YourTickets = () => {
  return (
    <div className="w-full md:w-[70%] md:mx-auto lg:w-full lg:mx-0">
      <h2 className="font-bold text-[24px] lg:text-[32px]">Your Tickets</h2>

      <div className="flex flex-col lg:flex-row gap-10 w-full mt-4 lg:mt-10">
        <div>
          <Badge className="bg-primary text-[14px] text-black border-none mb-4">
            NEXT EVENT
          </Badge>
          <div className=" flex flex-col gap-5">
            <TicketCard
              date="16/03/24"
              time="07:00 PM"
              title="NAITRAM Launch Party 2024"
              tag="Guest-list Admission"
              img="/event2.png"
            />
          </div>
        </div>
        <div>
          <Badge className="border-[#007A35] mb-4 text-[14px]">
            UPCOMING EVENTS
          </Badge>
          <div className="flex flex-col gap-5">
            <UpcomingTicketCard
              date="02/04/24"
              time="07:00 PM"
              title="50 Cent Live at Naitram Launch Event"
              tag="1x Standing"
              img="/person4.jpg"
            />
            <UpcomingTicketCard
              date="05/04/24"
              time="07:00 PM"
              title="NAITRAM Podcast Launch Party Hosted by Amari"
              tag="2x FREE Entry Pass"
              img="/person5.jpg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourTickets;
