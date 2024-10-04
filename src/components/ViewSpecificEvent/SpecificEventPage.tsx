"use client";
import { useEffect, useRef, useState } from "react";
import AllNaitramEvents from "../homepage/sections/AllNaitramEvents";
import CategoryList from "./sections/CategoryList";
import SpecificEventHero from "./sections/SpecificEventHero";
import MobileAppQRCode from "./sections/MobileAppQRCode";
import { useSearchParams } from "next/navigation";
import { getEventByEventId, getEventCount } from "@/lib/middleware/event";
import { getEventAttend } from "@/lib/middleware/event";
import {
  getOrganizerByID,
  getOrganizerSocialProfile,
} from "@/lib/middleware/organizer";
import { useAppDispatch,useAppSelector } from "@/lib/hooks";

const SpecificEventPage = () => {
  const dispatch = useAppDispatch();
  const [showTicket, setShowTicket] = useState<any>(false);
  const searchParams = useSearchParams();
  const [eventType, setEventType] = useState<string | null>(null);
  console.log(showTicket, "this is data");
  const qrCodeRef = useRef<HTMLDivElement>(null);

  const EventData = useAppSelector(
    (state) => state?.getEventByEventID?.eventIdEvents?.data
  );
  useEffect(() => {
    if (showTicket && qrCodeRef.current) {
      qrCodeRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showTicket]);
  useEffect(() => {
    const eventDataParam = searchParams.get("EventType");
    console.log("Parsed Event Type:", eventDataParam);

    if (eventDataParam) {
      try {
        const decodedData = decodeURIComponent(eventDataParam);

        try {
          JSON.parse(decodedData);
          setEventType(JSON.parse(decodedData));
        } catch (e) {
          setEventType(decodedData);
        }

        console.log("Parsed Event Type:", eventDataParam);
      } catch (error) {
        console.log("Failed to decode event data", error);
      }
    }
  }, [searchParams]);



  useEffect(() => {
    const currentUrl: any =
      typeof window !== "undefined" ? window.location.href : null;

    if (currentUrl) {
        const url = new URL(currentUrl); 
        const pathname = url.pathname; 
        const parts = pathname.split("/"); 
        const eventId = parts[parts.length - 1]; 

        console.log("my event id is", eventId);
        dispatch(getEventByEventId(eventId));
        // dispatch(getEventAttend(eventId));
        dispatch(getOrganizerSocialProfile(EventData?.userId));
    }
}, []);

  return (
    <>
      <SpecificEventHero setShowTicket={setShowTicket}  eventType={eventType}/>
    </>
  );
};

export default SpecificEventPage;
