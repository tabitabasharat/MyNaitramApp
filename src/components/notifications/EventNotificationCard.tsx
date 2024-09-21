import { shimmer, toBase64 } from '@/lib/utils';
import Image from 'next/image';
import { useAppSelector } from '@/lib/hooks';

const EventNotificationCard = ({msg,heading,notifyTime, profileimg}:any) => {
  const Notify = useAppSelector(
    (state) => state?.getUserNotifications?.myNotifications?.data
  );

  console.log("All Notifications are", Notify);
  const formatTime = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };
  return (
    <div className="gradient-slate border border-muted w-full rounded-lg p-3 flex gap-4">
      <div className="size-[60px] rounded-lg border border-white overflow-hidden">
        <Image
          src={profileimg ? profileimg : '/person3.jpg'}
          width={500}
          height={500}
          className="object-cover size-[60px]"
          placeholder={`data:image/svg+xml;base64,${toBase64(
            shimmer(1200, 1800),
          )}`}
          alt=""
        />
       
      </div>
      {/* <div className="size-[50px] rounded-full border border-[#FF8A08] overflow-hidden">
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
      </div> */}
      <div className="w-full">
        <div className="flex justify-between w-full">
          <h3 className="font-bold">{heading}</h3>
          <p className="text-sm opacity-50">{formatTime(notifyTime)}</p>
        </div>
        <p className="text-[#BFBFBF] text-sm mt-2">
          {/* 🎉 Join us for an electrifying evening at the NAITRAM Launch Party,
          debuting our */}
          {msg}
        </p>
      </div>
    </div>
  );
};

export default EventNotificationCard;
