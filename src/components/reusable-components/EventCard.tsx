import Link from 'next/link';
import HeartBadge from '../ui/heart-badge';
import Image from 'next/image';
import { shimmer, toBase64 } from '@/lib/utils';
import { ScaleReveal } from '../animations/ScaleReveal';
import event12 from '../../../public/event12.png';

const EventCard = ({
  img,
  title,
  eventid,
  height = '345px',
}: {
  img: string;
  title: string;
  height?: string;
  eventid:any;
}) => {
  console.log("image src is",img)
  return (
    <ScaleReveal extraStyle="w-full">
      <Link href={`/events/event-detail/${eventid}`} className="w-full">
        <div
          style={{ height }}
          className="relative overflow-hidden rounded-lg w-full h-fit border border-[#424242]"
        >
          <Image
            src={img}
            width={1000}
            height={1000}
            className="w-full h-full rounded-lg object-cover relative mx-auto overflow-hidden"
            placeholder={`data:image/svg+xml;base64,${toBase64(
              shimmer(1200, 1800),
            )}`}
            alt="event-img"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

          <div className="absolute flex justify-between gap-[2rem] h-full items-end z-[2] p-4 top-0 w-full">
            <p className="font-bold text-white text-xl">{title}</p>
            <HeartBadge />
          </div>
        </div>
      </Link>
    </ScaleReveal>
  );
};

export default EventCard;
