'use client';

import 'swiper/css';
import 'swiper/css/autoplay';

import EventCard from '@/components/reusable-components/EventCard';

import { events } from '@/lib/dummyData';

import { A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const PopularEvents = () => {
  return (
    <section className="pxpx mx-2xl pb-20 mt-20">
      <h2 className="font-bold text-[32px] leading-[1.1] lg:text-[48px] md:mb-[2rem] 2xl:mt-20">
        📍 Popular Events Near Me
      </h2>
      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.slice(0, 6).map((event) => (
          <EventCard key={event.id} img={event.img} title={event.title} />
        ))}
      </div>
      <div className="md:hidden mx-auto cursor-grab scale-[0.95] lg:scale-100 origin-bottom-left">
        <Swiper
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          slidesPerView={1}
          modules={[A11y, Autoplay]}
          speed={1000}
          spaceBetween={15}
          className="mt-6 flex"
          style={{ overflow: 'visible' }}
        >
          {events.slice(0, 6).map((event) => (
            <SwiperSlide key={event.id}>
              <EventCard key={event.id} img={event.img} title={event.title} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default PopularEvents;
