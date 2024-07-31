import { shimmer, toBase64 } from '@/lib/utils';
import Image from 'next/image';
import { Button } from '../ui/button';

const JoinEventCard = ({ img, title }: { img: string; title: string }) => {
  return (
    <div className="gradient-slate border-2 border-[#1F1F1F] rounded-lg p-2 flex justify-between w-full md:w-[300px] lg:w-[380px]">
      <div className="flex gap-4">
        <Image
          src={img}
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
            <p className="text-white text-sm">Join Evelyn Lynn to</p>
            <p className="font-bold leading-[1.2] my-1">{title}</p>
          </div>
          <Button size="sm" className="w-fit">
            Join Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JoinEventCard;
