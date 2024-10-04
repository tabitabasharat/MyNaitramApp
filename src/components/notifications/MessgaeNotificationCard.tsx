import { shimmer, toBase64 } from '@/lib/utils';
import Image from 'next/image';

const MessgaeNotificationCard = ({heading, msg, notifyTime}:any) => {
  const formatTime = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };
  return (
    <div className="gradient-slate border border-muted w-full rounded-lg p-3 flex gap-4 relative">
      <p className="text-sm opacity-50 absolute right-3 top-3">{formatTime(notifyTime)}</p>

      <div className=" w-[40px] h-[40px] rounded-full border border-[#FF8A08] overflow-hidden">
        <Image
          src={'/person3.jpg'}
          width={500}
          height={500}
          className="object-cover w-[40px] h-[40px]"
          placeholder={`data:image/svg+xml;base64,${toBase64(
            shimmer(1200, 1800),
          )}`}
          alt=""
        />
      </div>
      <div>
        <div className="flex justify-between w-full">
          <h3 className="font-bold">{heading}</h3>
        </div>
        <p className="text-[#BFBFBF] text-sm mt-2">{msg}</p>
      </div>
    </div>
  );
};

export default MessgaeNotificationCard;
