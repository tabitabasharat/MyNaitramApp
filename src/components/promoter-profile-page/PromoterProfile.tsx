'use client';

import { events } from '@/lib/dummyData';
import {
  ArrowLeft,
  SealCheck,
  InstagramLogo,
  XLogo,
} from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import GoldGradientBorder from '../ui/gold-gradient-border';
import MobileEventCard from '../reusable-components/MobileEventCard';
import { shimmer, toBase64, truncateString } from '@/lib/utils';
import { useRouter } from 'next/navigation';

const PromoterProfile = () => {
  const router = useRouter();
  return (
    <section className="pt-[8rem] lg:pt-[9rem] pb-[8rem] relative overflow-hidden">
      {/* BLUR BACKGROUND IMAGE */}
      <Image
        style={{ filter: 'blur(40px)' }}
        width={1000}
        height={1000}
        src={'/promoter-profile.png'}
        className="w-full object-cover absolute top-0 object-center z-0 opacity-30 h-screen"
        alt=""
      />

      <div className="relative pxpx mx-2xl z-[2] flex flex-col lg:flex-row gap-6 lg:gap-12 justify-center">
        <div className="md:w-[70%] md:mx-auto lg:mx-0 lg:w-[50%]">
          <div className="flex items-center gap-4 mb-6 md:whitespace-nowrap">
            <button onClick={() => router.back()}>
              <ArrowLeft size={22} />
            </button>
            <p>
              <span className="text-[#BFBFBF]">Event</span> /
              <span className="text-[#BFBFBF] lg:hidden">
                {' '}
                {truncateString("PIZDEZ Women's Day Party 2024", 5)}{' '}
              </span>
              <span className="text-[#BFBFBF] hidden lg:inline-block px-1">
                {' '}
                PIZDEZ Women's Day Party 2024{' '}
              </span>
              / <span>Promoter Profile</span>
            </p>
          </div>

          <div>
            <GoldGradientBorder className="w-fit rounded-full p-[3px]">
              <div className="bg-black rounded-full p-[7px]">
                <Image
                  src="/promoter-profile.png"
                  width={500}
                  height={500}
                  className="h-[120px] w-[120px] lg:h-[150px] lg:w-[150px] object-cover object-center rounded-full"
                  placeholder={`data:image/svg+xml;base64,${toBase64(
                    shimmer(1200, 1800),
                  )}`}
                  alt=""
                />
              </div>
            </GoldGradientBorder>
            <div>
              <p className="font-bold flex items-center gap-1 text-[26px] mt-10">
                Dreamscape Events{' '}
                <SealCheck
                  className="text-[#FFC109] -translate-y-1"
                  size={18}
                  weight="fill"
                />
              </p>

              <p>
                <span className="text-muted">48 Events</span>{' '}
                <span className="opacity-50"> | </span>{' '}
                <span className="text-muted">9.2k Attendees</span>
              </p>
              <p className="md:w-[80%] text-muted mt-4">
                Sit vel diam habitant ipsum volutpat. Quisque porttitor turpis
                orci at. Nibh quis nisi amet mi fames dictum fames orci.
              </p>
              <div className="flex gap-3 mt-10 items-center">
                <Button variant="secondary" className="h-14">
                  Follow Promoter
                </Button>
                <div className="flex gap-3 h-full">
                  <div className="border border-white w-fit p-4 rounded-full">
                    <InstagramLogo size={20} weight="fill" />
                  </div>
                  <div className="border border-white w-fit p-4 rounded-full">
                    <XLogo size={20} weight="fill" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DIVISION */}

        <div className="md:w-[70%] md:mx-auto lg:mx-0 lg:w-[50%] mt-12">
          <p className="text-[18px] font-bold text-[#E6E6E6]">
            Our Upcoming Events
          </p>
          <div className="flex flex-col gap-3 mt-4">
            <MobileEventCard img={events[2].img} title={events[2].title} eventId={events[2].id}/>
            <MobileEventCard img={events[3].img} title={events[3].title} eventId={events[3].id}/>
            <MobileEventCard img={events[4].img} title={events[4].title} eventId={events[4].id} />
            <MobileEventCard img={events[5].img} title={events[5].title} eventId={events[5].id} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoterProfile;
