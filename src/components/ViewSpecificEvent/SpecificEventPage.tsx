"use client";
import { useEffect, useRef, useState } from "react";
import AllNaitramEvents from "../homepage/sections/AllNaitramEvents";
import CategoryList from "./sections/CategoryList";
import SpecificEventHero from "./sections/SpecificEventHero";
import MobileAppQRCode from "./sections/MobileAppQRCode";

const SpecificEventPage = () => {
  const [showTicket, setShowTicket] = useState<any>(false);
  console.log(showTicket, "this is data");
  const qrCodeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (showTicket && qrCodeRef.current) {
      qrCodeRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showTicket]);
  return (
    <>
      <SpecificEventHero setShowTicket={setShowTicket} />
      {/* {showTicket && (
        <div ref={qrCodeRef}>
          <MobileAppQRCode />
        </div>
      )} */}
      {/* <CategoryList />
      <AllNaitramEvents />   */}
      
    </>
  );
};

export default SpecificEventPage;
