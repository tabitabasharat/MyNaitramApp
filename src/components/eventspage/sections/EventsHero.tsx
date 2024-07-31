'use client';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';

import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Autoplay, EffectFade, Pagination } from 'swiper/modules';

import EventsHeroSlide from './EventsHeroSlide';
import { top5Events } from '@/lib/dummyData';
import { useRef, useState } from 'react';

const EventsHero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.activeIndex);
  };
  const handleBulletClick = (index: number) => {
    if (swiperRef.current) {
      // @ts-ignore
      swiperRef.current.slideTo(index);
    }
  };

  return (
    <section className="h-[130vh] max-w-screen lg:h-[90vh] overflow-hidden relative">
      <Swiper
        onSlideChange={handleSlideChange}
        // @ts-ignore
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        loop
        effect="fade"
        slidesPerView={1}
        modules={[Pagination, A11y, Autoplay, EffectFade]}
        pagination={false}
        autoplay={{ delay: 5000 }}
        navigation
        speed={1000}
        className="fade-slider h-full"
      >
        {top5Events.map((event, i) => (
          <SwiperSlide key={i}>
            <EventsHeroSlide
              title={event.title}
              date={event.date}
              img={event.img}
              location={event.location}
              activeIndex={activeIndex}
              handleBulletClick={handleBulletClick}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default EventsHero;
