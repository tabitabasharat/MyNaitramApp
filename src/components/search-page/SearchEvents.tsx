'use client';

import { ArrowLeft, MagnifyingGlass } from '@phosphor-icons/react/dist/ssr';
import { useRouter } from 'next/navigation';
import { Input } from '../ui/input';
import { events } from '@/lib/dummyData';
import EventCard from '../reusable-components/EventCard';
import { useState } from 'react';

const SearchEvents = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const clearInput = () => {
    setSearchTerm('');
  };

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  return (
    <section
      style={{
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.6)), url(/blur-green.png)',
        backgroundPosition: 'center',
      }}
      className="min-h-screen py-[8rem] bg-cover bg-no-repeat"
    >
      <div className="pxpx mx-2xl">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => router.back()} type="button">
            <ArrowLeft size={22} />
          </button>
          <p>
            <span className="text-[#BFBFBF]">Home</span> / <span>Search</span>
          </p>
        </div>
        <div className="w-full relative mt-12">
          <Input
            value={searchTerm}
            className="w-full h-14 px-5"
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search Event"
          />
          <MagnifyingGlass
            size={20}
            className="absolute top-1/2 -translate-y-1/2 right-5"
          />
        </div>
        <div className="mt-12">
          {searchTerm === '' ? (
            <div className="flex flex-col justify-center items-center w-full h-full text-center mt-24">
              <h2 className="font-bold text-[24px] lg:text-[36px]">
                Easily Discover Events Here
              </h2>
              <p className="text-[#BFBFBF] font-light">
                Browse and find events quickly and effortlessly
              </p>
            </div>
          ) : filteredEvents.length > 0 ? (
            <div className="relative grid md:grid-cols-2 lg:grid-cols-3 xl:lg:grid-cols-4 gap-[1rem]">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} img={event.img} title={event.title} />
              ))}
            </div>
          ) : (
            <p>No events found</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchEvents;
