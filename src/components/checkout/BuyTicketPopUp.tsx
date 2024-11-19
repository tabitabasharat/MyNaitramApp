"use client";

import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import "./ticket.css";
import Image from "next/image";
import Iconpop from "@/assets/whitelist-icon.svg";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { ticketsType, ticketsType2 } from "@/lib/dummyData";

import GradientBorder from "../ui/gradient-border";
import { ScrollArea } from "../ui/scroll-area";
import { Minus, Plus, SealCheck } from "@phosphor-icons/react/dist/ssr";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getEventById } from "@/lib/middleware/event";
import { useState, useEffect } from "react";
import { setContractEditor } from "@/lib/reducer/setBuyTicket";
// import { setTicketPrice } from "@/lib/reducer/setBuyTicket";
const BuyTicketPopUp = ({ onNext, setTicketPrice, setTicketType }: any) => {
  const [selectedTicket, setSelectedTicket] = useState("");
  const [selectedTicketPrice, setSelectedTicketPrice] = useState(0);
  const [selectedTicketType, setSelectedTIcketType] = useState<any>();
  const [eventid, setEventid] = useState<any>();
  const count = useAppSelector((state) => state);
  console.log(count);

  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const dispatch = useAppDispatch();
  function buyTicket() {
    console.log("hellothis is good", selectedTicketPrice);
    setTicketPrice(selectedTicketPrice);

    setTicketType(selectedTicketType);
    // dispatch(setContractEditor(selectedTicketPrice));

    onNext();
  }

  useEffect(() => {
    const currentUrl:any = typeof window !== "undefined" ? window.location.href:null;
    const parts = currentUrl.split("/");
    const value = parts[parts.length - 1];
    setEventid(value);
    console.log("my event id is", value);
    // dispatch(getEventById(value));
  }, []);

  const EventDetail = useAppSelector(
    (state) => state?.getEventById?.specificEvent?.data?.data[0]?.eventTickets
  );
  console.log("tickets data in checkout modal", EventDetail);
  return (
    <DialogContent className="sm:max-w-md lg:max-w-[600px] text-white pb-[24px] ps-[40px] pe-[40px]">
      <div>
        <DialogHeader className="mb-5">
          <DialogTitle className="font-bold text-2xl mb-1"></DialogTitle>
        </DialogHeader>

        <div className="flex items-center flex-col">
          <Image src={Iconpop} alt="icon" />
          {/* <p className="mt-[16px] font-weight[700] leading-[24px] whitelist-txt text-center">
            You must be on the whitelist to purchase tickets.<br></br>
            Please contact the email below to get added.
          </p> */}

          <Button
            onClick={() => {
              typeof window !== "undefined"?  window.open("https://api.leadconnectorhq.com/widget/form/LvQ5oOH9zKPbzLtYhFh6", "_blank"):null;
            }}
            className="mt-[56px] lg:w-[369px] leading-[24px] text-center font-extrabold pt-[16px] pb-[16px] w-full text-[#030303] "
          >
            Join Waitlist
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};

export default BuyTicketPopUp;
