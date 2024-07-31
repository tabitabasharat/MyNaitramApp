import { CaretLeft } from '@phosphor-icons/react/dist/ssr';
import ExpandedTicket from '../reusable-components/ExpandedTicket';
import { Badge } from '../ui/badge';
import Link from 'next/link';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';

const TicketDetail = () => {
  return (
    <div className="w-full md:w-[70%] md:mx-auto lg:w-fit lg:mx-0 relative">
      <div className="absolute bg-gradient-to-l from-black via-transparent to-transparent inset-0 z-[10] pointer-events-none translate-x-[5rem]"></div>
      <div className="flex gap-4 items-center pb-2 lg:pb-0">
        <Link
          href={'/profile/your-tickets'}
          className="lg:bg-white/20 lg:size-[50px] grid place-items-center rounded-full "
        >
          <CaretLeft weight="bold" size={25} />
        </Link>
        <h2 className="font-bold text-[18px] lg:text-[32px] translate-y-[0.2rem]">
          NAITRAM Launch Party 2024
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 w-full mt-4 lg:mt-10">
        <div>
          <div className="flex gap-3">
            <Badge className="bg-primary text-[14px] text-black border-none mb-4">
              Ticket 1
            </Badge>
            <Badge className="bg-primary text-[14px] text-black border-none mb-4 opacity-50">
              Ticket 2
            </Badge>{' '}
            <Badge className="bg-primary text-[14px] text-black border-none mb-4 opacity-50">
              Ticket 3
            </Badge>
          </div>
          <div className="m-auto max-w-[900px] lg:max-w-[600px] xl:max-w-[800px] 2xl:max-w-[900px] w-full">
            <ScrollArea className="whitespace-nowrap">
              <div className="flex whitespace-nowrap gap-4 mt-6">
                <ExpandedTicket />
                <ExpandedTicket />
                <ExpandedTicket />
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
