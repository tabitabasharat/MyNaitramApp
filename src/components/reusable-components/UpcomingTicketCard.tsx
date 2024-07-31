import { QrCode } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import Link from 'next/link';

const UpcomingTicketCard = ({ date, time, title, tag, img }: any) => {
  return (
    <Link
      href={'/profile/your-tickets/ticket'}
      className="gradient-slate border border-[#007A35] flex items-center justify-between p-4 rounded-xl shadow-md relative cursor-pointer"
    >
      <div className="absolute size-[25px] rounded-full z-[5] border-l border-l-[#007A35] bg-black right-0 top-1/2 -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute size-[25px] rounded-full z-[5] border-r border-r-[#007A35] bg-black left-0 top-1/2 -translate-y-1/2 -translate-x-1/2"></div>
      <div className="flex flex-col px-4 py-1 w-full">
        <div className="flex items-center">
          <div className="mr-4 size-[60px] overflow-hidden rounded-full">
            <Image
              src={img}
              width={500}
              height={500}
              alt="Event"
              className="rounded-full w-full object-cover"
            />
          </div>
          <div className="w-[80%]">
            <div className="text-[12px] md:text-sm text-[#A6A6A6]">
              {date} • Starts at {time}
            </div>
            <div className="text-lg font-bold leading-[1.3] mt-1 w-[80%]">
              {title}
            </div>
          </div>
        </div>

        <div className="bg-[#1E1E1E] rounded-lg py-3 px-4 text-base relative w-full mt-4">
          {tag}
          <QrCode
            size={24}
            className="text-[#BFBFBF] absolute right-4 top-1/2 -translate-y-1/2"
            weight="bold"
          />
        </div>
      </div>
    </Link>
  );
};

export default UpcomingTicketCard;
