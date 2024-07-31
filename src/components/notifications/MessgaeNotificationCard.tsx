import { shimmer, toBase64 } from '@/lib/utils';
import Image from 'next/image';

const MessgaeNotificationCard = () => {
  return (
    <div className="gradient-slate border border-muted w-full rounded-lg p-3 flex gap-4 relative">
      <p className="text-sm opacity-50 absolute right-3 top-3">02:34 PM</p>

      <div className="size-[50px] rounded-full border border-[#FF8A08] overflow-hidden">
        <Image
          src={'/person3.jpg'}
          width={500}
          height={500}
          className="object-cover size-[50px]"
          placeholder={`data:image/svg+xml;base64,${toBase64(
            shimmer(1200, 1800),
          )}`}
          alt=""
        />
      </div>
      <div>
        <div className="flex justify-between w-full">
          <h3 className="font-bold">Emma Martinex</h3>
        </div>
        <p className="text-[#BFBFBF] text-sm mt-2">Text Message</p>
      </div>
    </div>
  );
};

export default MessgaeNotificationCard;
