import { FadeReveal } from '../animations/FadeReveal';
import { Button } from '../ui/button';
import EventCard from './EventCard';

const AllEventsGrid = ({ events }: any) => {
  return (
    <div className="relative grid md:grid-cols-2 lg:grid-cols-3 gap-[1rem]">
      {events.map((event: any) => (
        <EventCard key={event.id} img={event.img} title={event.title} />
      ))}

      <div
        style={{
          background:
            'linear-gradient(to top, black, transparent 33%, transparent 66%, transparent)',
        }}
        className="absolute inset-0 to-transparent z-[3] pointer-events-none"
      ></div>
      <FadeReveal extraStyle="z-[4]">
        <Button
          variant="secondary"
          className="w-fit absolute bottom-[5%] left-1/2 -translate-x-1/2"
        >
          View More Events
        </Button>
      </FadeReveal>
    </div>
  );
};

export default AllEventsGrid;
