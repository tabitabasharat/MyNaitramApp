"use client";

import {
  DialogContent,
  DialogFooter,
  Dialog,
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
const BuyTicketModal = ({onClose,isOpen, onNext, setTicketPrice, setTicketType, setTicketIndex }: any) => {
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
    const currentUrl: any = typeof window !== "undefined" ? window.location.href : null;
    const parts = currentUrl.split("/");
    const value = parts[parts.length - 1];
    setEventid(value);
    console.log("my event id is", value);
    // dispatch(getEventById(value));
  }, []);

  const EventData = useAppSelector(
    (state) => state?.getEventByEventID?.eventIdEvents?.data?.tickets
  );
  const EventDatas = useAppSelector(
    (state) => state?.getEventByEventID?.eventIdEvents
  );
  console.log("my data in buy tickets", EventDatas?.data?.totalSoldOut);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
          <ScrollArea className="w-full">
            <div className="flex flex-col gap-3">
              {EventData?.map((ticket: any, index: any) => {
                let isSoldOut = false
                console.log(EventDatas?.data?.totalSoldOut[index], "my data in buy tickets")
                if (ticket?.no <= 0) {
                  isSoldOut = true
                }

                return selectedTicket === ticket.type ? (
                  <Collapsible
                    key={ticket.type}
                    open={selectedTicket === ticket.type}
                    onOpenChange={() => {

                      setSelectedTicket(ticket.type);
                      setSelectedTicketPrice(ticket.price);
                      setSelectedTIcketType(ticket.type);
                      setTicketIndex(index)

                    }}
                    className="w-full"
                  >
                    <CollapsibleTrigger className="w-full">
                      <GradientBorder>
                        <div
                          className={`border border-muted rounded-lg gradient-slate px-3 py-[0.65rem] cursor-pointer ${isSoldOut
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : ""
                            }`}
                        >
                          <div className="flex justify-between">
                            <p className="font-bold">{ticket.type}</p>
                            <p className="font-extrabold">
                              £{ticket?.price}
                            </p>
                          </div>
                          {ticket?.options && (
                            <CollapsibleContent className="border-t border-t-[#282828] mt-2 text-left">
                              <div className="flex flex-col items-start mt-2">
                                <p className="text-[#BFBFBF] font-extrabold text-[12px]">
                                  INCLUDED
                                </p>
                                <div className="mt-3">
                                  {ticket?.options &&
                                    ticket?.options?.map((include: any, index: any) => (
                                      <p key={index} className="text-[12px]">
                                        {include?.label}
                                      </p>
                                    ))}
                                </div>
                              </div>
                            </CollapsibleContent>
                          )}
                        </div>
                      </GradientBorder>
                    </CollapsibleTrigger>
                  </Collapsible>
                ) : (
                  <Collapsible
                    key={ticket.type}
                    open={selectedTicket === ticket.type}
                    onOpenChange={() => {
                      if (!isSoldOut) {
                        setSelectedTicket(ticket.type);
                        setSelectedTicketPrice(ticket.price);
                        setSelectedTIcketType(ticket.type);
                        setTicketIndex(index)
                      }
                    }}
                    className="w-full"
                  >
                    <CollapsibleTrigger className="w-full">
                      <div
                        className={`border border-muted rounded-lg gradient-slate px-3 py-[0.65rem] cursor-pointer ${isSoldOut
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : ""
                          }`}
                      >
                        <div className="flex justify-between">
                          <p className="font-bold">{ticket.type}</p>
                          <p className="font-extrabold">
                            £{ticket.price}
                          </p>
                        </div>
                      </div>
                    </CollapsibleTrigger>
                  </Collapsible>
                );
              })}

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
    </Dialog>
  );
};

export default BuyTicketModal;
