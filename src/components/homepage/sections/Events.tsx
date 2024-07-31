'use client';

import 'swiper/css';
import 'swiper/css/autoplay';

import EventCard from '@/components/reusable-components/EventCard';
import { events } from '@/lib/dummyData';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';

import { A11y, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import useMedia from '@/hooks/useMedia';
import { Button } from '@/components/ui/button';
import { FadeReveal } from '@/components/animations/FadeReveal';
import { Reveal } from '@/components/animations/Reveal';

const Events = () => {
  const isMobile = useMedia('(max-width: 768px)', false);
  const isTablet = useMedia('(max-width: 1050px)', false);
  const isDesktop = useMedia('(max-width: 1500px)', false);

  return (
    <section className="mt-[4rem] mb-[5rem] w-screen overflow-x-hidden">
      <Reveal y={100} width="100%">
        <div className="flex justify-between items-center pxpx mx-2xl">
          <h2 className="font-bold text-[32px] lg:text-[48px]">
            🎉 Featured Event
          </h2>
          <Link
            href="/events"
            className="font-bold lg:flex items-center gap-2 group hidden"
          >
            Explore More Events{' '}
            <ArrowRight
              size={20}
              weight="bold"
              className=" group-hover:translate-x-1 duration-300 ease-in-out"
            />
          </Link>
        </div>
      </Reveal>

      <div className="mx-2xl mx-auto pxpx translate-y-[-2rem] cursor-grab scale-[0.95] lg:scale-100 origin-bottom-left">
        <Swiper
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          slidesPerView={isMobile ? 1 : isTablet ? 2 : isDesktop ? 3 : 4}
          modules={[A11y, Autoplay]}
          speed={1000}
          spaceBetween={isMobile ? 15 : 25}
          style={{ overflow: 'visible' }}
          className="mt-12 lg:mt-16 flex"
        >
          {events.map((event) => (
            <SwiperSlide key={event.id}>
              <EventCard key={event.id} img={event.img} title={event.title} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <FadeReveal>
        <Link href={'/events'}>
          <Button
            variant="outline"
            className="flex items-center gap-2 hover:gap-4 mx-auto lg:hidden"
          >
            Explore More Events
            <ArrowRight
              size={20}
              weight="bold"
              className="group-hover:translate-x-1 duration300 ease-in-out"
            />
          </Button>
        </Link>
      </FadeReveal>
    </section>
  );
};

export default Events;
