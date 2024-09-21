'use client'
import { useEffect, useRef, useState } from "react";
// import SpecificEventHero from "@/components/EventOrganizer/PreviewEvent/SpecificEventPage";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import SpecificEventHeroStripe from "./section/SpecificEventHeroStripe";
import TicketPurchaseSuccess from "../checkout/TicketPurchaseSuccess";
import { DeviceMobile, DownloadSimple, Ticket, UsersThree } from "@phosphor-icons/react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import gift from "@/assets/gift.png"

const StripeSuccess = ()=>{
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
    return(
        <>
        <SpecificEventHeroStripe
          setShowTicket={setShowTicket}
          eventAllData={eventData}
          backData={eventDataNotStringfy}
        />
      </>
    )
}
export default StripeSuccess