"use client"
import { useEffect, useRef, useState } from 'react';
import AllNaitramEvents from '../homepage/sections/AllNaitramEvents';
import CategoryList from './sections/CategoryList';
import EventsHero from './sections/EventsHero';
import MobileAppQRCode from './sections/MobileAppQRCode';
import PopularEvents from './sections/PopularEvents';

const EventsPage = () => {
  const [showTicket,setShowTicket]=useState<any>(false)
  console.log(showTicket,"this is data")
  const qrCodeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (showTicket && qrCodeRef.current) {
      qrCodeRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showTicket]);
  return (
    <>
      <EventsHero setShowTicket={setShowTicket} />
       {/* <PopularEvents /> */}
       {
        showTicket && 
        <div ref={qrCodeRef}>
        <MobileAppQRCode />
      </div>

       }
      {/* <CategoryList />
      <AllNaitramEvents />   */}
    </>
  );
};

export default EventsPage;
