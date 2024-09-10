import { shimmer, toBase64 } from '@/lib/utils';
import { Heart } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import Link from 'next/link';
import { ScaleReveal } from '../animations/ScaleReveal';
import fallbackImage from "../../assets/event-video.png";

const MobileEventCard = ({ img, title,eventId, eventDate }: { img: string; title: string ; eventId:any, eventDate:any}) => {
  const imageUrl = img?.startsWith("http" || "https") ? img : fallbackImage.src;
  console.log("image src is", imageUrl);
 
  return (
    <ScaleReveal>
      <Link  href={eventId ? `/specific-event/${eventId}` : "/events"} className="w-full">
        <div className="gradient-slate border-2 border-[#1F1F1F] rounded-lg p-4 flex justify-between w-full">
          <div className="flex gap-4">
            <Image
              src={imageUrl}
              width={800}
              height={800}
              className="w-[90px] rounded-lg object-cover"
              placeholder={`data:image/svg+xml;base64,${toBase64(
                shimmer(1200, 1800),
              )}`}
              alt="event"
            />
            <div className="flex flex-col justify-between">
              <div>
                <p className="text-primary text-sm"> {eventDate}</p>
                <p className="font-bold text-[18px] w-[90%] lg:w-full leading-[1.2] my-1">
                  {title}
                </p>
              </div>
              <div className="flex ">
                <p className="text-sm">From £25</p>
              </div>
            </div>
          </div>
          <div className="flex items-end">
            <Heart size={20} weight="fill" />
          </div>
        </div>
      </Link>
    </ScaleReveal>
  );
};

export default MobileEventCard;
