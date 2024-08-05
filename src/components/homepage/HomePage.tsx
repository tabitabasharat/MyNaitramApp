"use client";
import About from './sections/About';
import AllNaitramEvents from './sections/AllNaitramEvents';
import Events from './sections/Events';
import Hero from './sections/Hero';
import RewardProgram from './sections/RewardProgram';
import StayInformed from './sections/StayInformed';
import ScreenLoader from '../loader/Screenloader';
import { useState } from 'react';

const HomePage = () => {
  const [loader,setLoader] =useState(true);
  return (
    <>
    {/* {loader && <ScreenLoader/>} */}
      <Hero />
      {/* <Events /> */}
      <About />
      <RewardProgram />
      {/* <AllNaitramEvents /> */}
      <StayInformed />
    </>
  );
};

export default HomePage;
