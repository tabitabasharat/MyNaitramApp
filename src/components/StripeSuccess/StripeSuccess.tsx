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
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { getEventByEventId } from "@/lib/middleware/event";

const StripeSuccess = ()=>{
  const dispatch = useAppDispatch();
    const router = useRouter();
  const [eventID, setEventId] = useState("");

    const searchParams = useSearchParams();
    const [eventData, setEventData] = useState<any | null>(null);
  
    const [showTicket, setShowTicket] = useState<any>(false);
    console.log(showTicket, "this is data");
    const qrCodeRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      if (showTicket && qrCodeRef.current) {
        qrCodeRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, [showTicket]);
  
    const EventData = useAppSelector(
      (state) => state?.getEventByEventID?.eventIdEvents?.data
    );
    useEffect(() => {
      const currentUrl: any =
        typeof window !== "undefined" ? window.location.href : null;
      const parts = currentUrl.split("/");
      const value = parts[parts.length - 1];
      setEventId(value);
      console.log("my event id is", value);
      dispatch(getEventByEventId(34));
     
    }, []);
    return(
        <>
        <SpecificEventHeroStripe
          setShowTicket={setShowTicket}
          eventAllData={EventData}
         
        />
      </>
    )
}
export default StripeSuccess