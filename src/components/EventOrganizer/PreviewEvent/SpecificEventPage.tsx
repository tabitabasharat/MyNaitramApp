"use client";
import { useEffect, useRef, useState } from "react";
import SpecificEventHero from "./sections/SpecificEventHero";
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

const SpecificEventPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [eventData, setEventData] = useState(null);
  const [showTicket, setShowTicket] = useState<any>(false);
  console.log(showTicket, "this is data");
  const qrCodeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (showTicket && qrCodeRef.current) {
      qrCodeRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showTicket]);

  useEffect(() => {

    const eventDataParam = searchParams.get('eventData');
    if (eventDataParam) {
      try {
     
        const decodedData = decodeURIComponent(eventDataParam);
        const parsedData = JSON.parse(decodedData);
        setEventData(parsedData);

     
        console.log("Parsed Event Data:", parsedData);
      } catch (error) {
        console.error("Failed to decode and parse event data", error);
      }
    }
  }, [searchParams]);

  return (
    <>
      <SpecificEventHero setShowTicket={setShowTicket}   eventAllData={eventData}/>
    </>
  );
};

export default SpecificEventPage;
