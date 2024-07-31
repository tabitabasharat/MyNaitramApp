import EventCard from '@/components/reusable-components/EventCard';
import { Button } from '@/components/ui/button';
import { events } from '@/lib/dummyData';
import { Envelope } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import ufo from '@/assets/ufo.png';
import GradientBorder from '@/components/ui/gradient-border';

const StayInformed = () => {
  return (
    <div
      style={{ height: '' }}
      className="pxpx mx-2xl flex gap-4 h-[1180px] md:h-[600px] md:mt-10 md:mb-20"
    >
      <div className="w-1/2 hidden lg:block h-full">
        <EventCard height="600px" img={events[5].img} title={events[5].title} />
      </div>

      <div className="flex-col w-full lg:w-1/2">
        <div className="flex flex-col md:flex-row h-[60.5%] md:h-[58%] gap-4">
          <EventCard
            height="350px"
            img={events[9].img}
            title={events[9].title}
          />
          <EventCard
            height="350px"
            img={events[10].img}
            title={events[10].title}
          />
        </div>

        <div className="h-[42%] w-full pt-4">
          <GradientBorder className="h-[75%] md:h-full">
            <div className="bg-black h-full w-full rounded-lg px-8 py-6">
              <h1 className="text-[25px] lg:text-[27px] xl:text-[37px] font-bold text-center md:text-left">
                Stay Informed, Stay Ahead
              </h1>
              <p className="text-muted mt-2 text-center md:text-left text-sm md:text-base">
                Enter your email address and join our community today. Stay
                connected and ahead of the curve with our regular updates.
              </p>
              <div className="relative h-[45px]">
                <Envelope
                  size={27}
                  weight="fill"
                  className="absolute top-6 left-3"
                />
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="w-full h-full rounded-full bg-white/10 mt-4 border border-[#3C3C3C] outline-none focus:border-[#087336] px-[3.2rem] placeholder:text-muted"
                />
                <Button
                  variant="secondary"
                  className="absolute right-0 h-[45px] top-4 hidden md:block"
                >
                  Join Now
                </Button>
                <Button
                  variant="secondary"
                  className="md:hidden h-[45px] w-full mt-4"
                >
                  Join Now
                </Button>
                <Image
                  src={ufo}
                  width={300}
                  height={300}
                  className="absolute right-0 top-0 pointer-events-none"
                  alt="ufo"
                />
              </div>
            </div>
          </GradientBorder>
        </div>
      </div>
    </div>
  );
};

export default StayInformed;
