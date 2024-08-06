"use client"
import { useState } from 'react';
import AllNaitramEvents from '../homepage/sections/AllNaitramEvents';
import CategoryList from './sections/CategoryList';
import EventsHero from './sections/EventsHero';
import MobileAppQRCode from './sections/MobileAppQRCode';
import PopularEvents from './sections/PopularEvents';

const EventsPage = () => {
  const [showTicket,setShowTicket]=useState<any>(false)
  console.log(showTicket,"this is data")
  return (
    <>
      <EventsHero setShowTicket={setShowTicket} />
       {/* <PopularEvents /> */}
       {
        showTicket && 
        <MobileAppQRCode />

       }
      {/* <CategoryList />
      <AllNaitramEvents />   */}
    </>
  );
};

export default EventsPage;
