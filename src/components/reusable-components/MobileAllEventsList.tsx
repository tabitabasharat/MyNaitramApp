import MobileFilter from '../organisms/MobileFilter';
import { Button } from '../ui/button';
import MobileEventCard from './MobileEventCard';

const MobileAllEventsList = ({ events }: any) => {
  return (
    <div className="relative flex flex-col gap-4">
      <MobileFilter />
      {events.slice(0, 6).map((event: any) => (
        <MobileEventCard key={event.id} img={event.img} title={event.title} />
      ))}

      <div
        style={{
          background:
            'linear-gradient(to top, black, transparent 33%, transparent 66%, transparent)',
        }}
        className="absolute inset-0 to-transparent z-[3] pointer-events-none"
      ></div>
      <Button
        variant="secondary"
        className="z-[4] w-fit absolute bottom-[5%] left-1/2 -translate-x-1/2"
      >
        View More Events
      </Button>
    </div>
  );
};

export default MobileAllEventsList;
