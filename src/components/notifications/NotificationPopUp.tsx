import { X } from '@phosphor-icons/react/dist/ssr';
import GradientBorder from '../ui/gradient-border';
import EventNotificationCard from './EventNotificationCard';
import MessgaeNotificationCard from './MessgaeNotificationCard';

const NotificationPopUp = ({ setNotifPopupOpen }: any) => {
  return (
    <div className="bg-black">
      <div className="flex justify-between">
        <p className="text-[22px] font-bold">Notifications</p>
        <X
          className="cursor-pointer"
          onClick={() => {
            setNotifPopupOpen(false);
          }}
          size={20}
        />
      </div>
      <div className="flex flex-wrap gap-3 mt-3">
        <GradientBorder className="rounded-full w-fit">
          <div className="border border-[#3C3C3C] w-fit rounded-full flex flex-row lg:flex-col gap-1 px-4 py-2 gradient-slate text-primary items-center lg:items-start">
            <p>Today</p>
          </div>
        </GradientBorder>
        <div className="border border-[#3C3C3C] w-fit rounded-full flex flex-row lg:flex-col gap-1 px-4 py-2 gradient-slate text-white items-center lg:items-start">
          <p>This Week</p>
        </div>
        <div className="border border-[#3C3C3C] w-fit rounded-full flex flex-row lg:flex-col gap-1 px-4 py-2 gradient-slate text-white items-center lg:items-start">
          <p>This Month</p>
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-2">
        <EventNotificationCard />
        <MessgaeNotificationCard />
        <EventNotificationCard />
        <MessgaeNotificationCard />
        <EventNotificationCard />
        <MessgaeNotificationCard />
      </div>
    </div>
  );
};

export default NotificationPopUp;
