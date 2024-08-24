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

import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { ticketsType, ticketsType2 } from "@/lib/dummyData";

import GradientBorder from "../ui/gradient-border";
import { ScrollArea } from "../ui/scroll-area";
import { Minus, Plus, SealCheck } from "@phosphor-icons/react/dist/ssr";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getAllEventsCount, getEventById } from "@/lib/middleware/event";
import { useState, useEffect } from "react";
import { setContractEditor } from "@/lib/reducer/setBuyTicket";
// import { setTicketPrice } from "@/lib/reducer/setBuyTicket";
const BuyTicketModal = ({ onNext, setTicketPrice, setTicketType }: any) => {
  const [selectedTicket, setSelectedTicket] = useState("");
  const [selectedTicketPrice, setSelectedTicketPrice] = useState(0);
  const [selectedTicketType, setSelectedTIcketType] = useState<any>();
  const [eventid, setEventid] = useState<any>();

  const dispatch = useAppDispatch();
  function buyTicket() {
    console.log("hellothis is good", selectedTicketPrice);
    setTicketPrice(selectedTicketPrice);

    setTicketType(selectedTicketType);
    // dispatch(setContractEditor(selectedTicketPrice));

    onNext();
  }

  useEffect(() => {
    const currentUrl = window.location.href;
    const parts = currentUrl.split("/");
    const value = parts[parts.length - 1];
    setEventid(value);
    console.log("my event id is", value);
    // dispatch(getEventById(value));
  }, []);

  const EventData = useAppSelector(
    (state) => state?.getEventByEventID?.eventIdEvents?.data?.tickets
  );
  console.log("my data in buy tickets", EventData);

  return (
    <DialogContent className="sm:max-w-md lg:max-w-[600px] text-white">
      <div>
        <DialogHeader className="mb-5">
          <DialogTitle className="font-bold text-2xl mb-1">
            Buy Tickets
          </DialogTitle>
          <Separator className="scale--[1.12] bg-[#292929]" />
        </DialogHeader>

        <div>
          <p className="text-[#ffffff] font-extrabold text-[15px] pb-4">
            CHOOSE TICKET TYPE
          </p>

          <ScrollArea className="h-[30rem] w-full">
            <div className="flex flex-col gap-3">
              {/* ENTRY TICKET */}
              {EventData?.map((ticket:any) =>
                selectedTicket === ticket?.type ? (
                  <Collapsible
                    key={ticket?.type}
                    open={selectedTicket === ticket?.type}
                    onOpenChange={() => {
                      setSelectedTicket(ticket?.type);
                      setSelectedTicketPrice(ticket?.price);
                    }}
                    className="w-full"
                  >
                    <CollapsibleTrigger className="w-full">
                      <GradientBorder>
                        <div className="border border-muted rounded-lg gradient-slate px-3 py-[0.65rem] cursor-pointer">
                          <div className="flex justify-between">
                            <p className="font-bold">{ticket?.type}</p>
                            <p className="font-extrabold">
                              £{ticket?.price}
                            </p>
                          </div>
                         
                        </div>
                      </GradientBorder>
                    </CollapsibleTrigger>
                  </Collapsible>
                ) : (
                  <Collapsible
                    key={ticket?.type}
                    open={selectedTicket === ticket?.type}
                    onOpenChange={() => {
                      setSelectedTicket(ticket?.type);
                      setSelectedTicketPrice(ticket?.price);
                    }}
                    className="w-full"
                  >
                    <CollapsibleTrigger className="w-full">
                      <div className="border border-muted rounded-lg gradient-slate px-3 py-[0.65rem] cursor-pointer">
                        <div className="flex justify-between">
                          <p className="font-bold">{ticket?.type}</p>
                          <p className="font-extrabold">
                            £{ticket?.price}
                          </p>
                        </div>
                      </div>
                    </CollapsibleTrigger>
                  </Collapsible>
                )
              )}
            </div>
          </ScrollArea>
        </div>

        <DialogFooter className="w-full mt-4 pt-4 bg-[#101010] border-t border-muted">
          <div className="w-full">
            <div className="pb-4 flex justify-between items-end">
              <div>
                <span className="text-primary text-sm">Total Price</span>
                <p className="font-bold text-2xl">
                  £{selectedTicketPrice}.00{" "}
                  <span className="text-[12px] text-[#BFBFBF] font-normal">
                    inc fees
                  </span>
                </p>
               
              </div>
             
            </div>

            <Button
              disabled={selectedTicket === "" && true}
              onClick={() => {
                buyTicket();
              }}
              className="w-full"
            >
              Continue
            </Button>
          </div>
        </DialogFooter>
      </div>
    </DialogContent>
  );
};

export default BuyTicketModal;
