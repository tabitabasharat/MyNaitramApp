"use client";
import { useEffect, useRef, useState } from "react";
import SpecificEventHero from "./sections/SpecificEventHero";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";


const SpecificEventPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  // const [eventData, setEventData] = useState(null);
  const [eventData, setEventData] = useState<any | null>(null);
  const [eventDataNotStringfy, seteventDataNotStringfy] = useState<any | null>(null);

  const [showTicket, setShowTicket] = useState<any>(false);
  console.log(showTicket, "this is data");
  const qrCodeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (showTicket && qrCodeRef.current) {
      qrCodeRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showTicket]);

  // useEffect(() => {
  //   const eventDataParam = searchParams.get("eventData");
  //   console.log("my data not stringfy", eventDataParam);
  //   seteventDataNotStringfy(eventDataParam);
  //   if (eventDataParam) {
  //     try {
  //       const decodedData = decodeURIComponent(eventDataParam);
  //       const parsedData = JSON.parse(decodedData);
  //       setEventData(parsedData);

  //       console.log("Parsed Event Data:", parsedData);
  //     } catch (error) {
  //       console.error("Failed to decode and parse event data", error);
  //     }
  //   }
  // }, [searchParams]);

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     const storedData = localStorage.getItem('eventData');
  //     if (storedData) {
  //       setEventData(storedData);
  //     } else {
  //       setEventData(null); // No data found in localStorage
  //     }
  //   }
  // }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem('eventData');
      if (storedData) {
        try {
          // Parse the JSON data from localStorage
          const parsedData: any = JSON.parse(storedData);
          setEventData(parsedData);
          console.log("my parsed data",parsedData);
        } catch (error) {
          console.error("Error parsing event data from localStorage:", error);
          setEventData(null); // Reset state in case of an error
        }
      } else {
        setEventData(null); // No data found in localStorage
      }
    }
  }, []);

  return (
    <>
      <SpecificEventHero
        setShowTicket={setShowTicket}
        eventAllData={eventData}
        backData={eventDataNotStringfy}
      />
    </>
  );
};

export default SpecificEventPage;
