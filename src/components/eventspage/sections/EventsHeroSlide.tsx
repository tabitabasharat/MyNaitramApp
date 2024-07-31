import BuyTicket from '@/components/reusable-components/BuyTicket';
import { Badge } from '@/components/ui/badge';
import { Heart } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import { top5Events } from '@/lib/dummyData';

const EventsHeroSlide = ({
  title,
  date,
  img,
  location,
  activeIndex,
  handleBulletClick,
}: any) => {
  return (
    <>
      {' '}
      <div className="relative h-full">
        <Image
          style={{ filter: 'blur(30px)' }}
          width={1000}
          height={1000}
          src={img}
          className="w-full h-full object-cover object-center z-0 opacity30"
          alt=""
        />
        <div className="absolute inset-0 bg-black/65"></div>
      </div>
      <div className="pxpx mx2xl absolute z-[2] top-32 lg:top-1/2 lg:-translate-y-[38%] flex flex-col lg:flex-row gap-6 lg:gap-12 w-full md:w-[70%] lg:w-fit translate-x-1/2 right-1/2">
        <div>
          <div className="lg:hidden flex gap-1 mb-3">
            {top5Events.map((_, index) => (
              <div
                key={index}
                className={`size-3 ${
                  index === activeIndex ? 'bg-white' : 'border border-white'
                } rounded-full cursor-pointer`}
                onClick={() => handleBulletClick(index)}
              ></div>
            ))}
          </div>

          <div
            style={{
              backgroundImage: `url(${img})`,
              backgroundPosition: 'center',
            }}
            className="bg-cover bg-no-repeat h-[300px] w-full lg:h-[300px] lg:w-[300px] xl:h-[470px] xl:w-[470px] rounded-lg relative"
          >
            {' '}
            <div className="bg-white/20 p-[1rem] rounded-full backdrop-blur-lg webkit-header-blur w-fit absolute right-6 bottom-6">
              <Heart size={23} weight="fill" />
            </div>
          </div>
        </div>
        <div className="lg:w-[70%] ">
          <div className="lg:flex gap-1 hidden mt-4">
            {top5Events.map((_, index) => (
              <div
                key={index}
                className={`size-3 ${
                  index === activeIndex ? 'bg-white' : 'border border-white'
                } rounded-full cursor-pointer`}
                onClick={() => handleBulletClick(index)}
              ></div>
            ))}
          </div>
          <div className="flex gap-[0.35rem] mt-4">
            <Badge>Party</Badge>
            <Badge>Invitation</Badge>
            <Badge>Women Day</Badge>
          </div>
          <h2 className="text-[28px] lg:w-full lg:text-[40px] xl:text-[55px] font-extrabold leading-[1.2] mt-2">
            {title}
          </h2>
          <p className="text-muted mt-4">{location}</p>
          <p className="text-muted lg:mt-2 mb-6">{date}</p>
          <BuyTicket />
        </div>
      </div>
    </>
  );
};

export default EventsHeroSlide;
