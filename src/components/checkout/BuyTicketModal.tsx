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
import { getEventById } from "@/lib/middleware/event";
import { useState, useEffect } from "react";
import { setContractEditor } from "@/lib/reducer/setBuyTicket";
// import { setTicketPrice } from "@/lib/reducer/setBuyTicket";
const BuyTicketModal = ({ onNext, setTicketPrice, setTicketType }: any) => {
  const [selectedTicket, setSelectedTicket] = useState("");
  const [selectedTicketPrice, setSelectedTicketPrice] = useState(0);
  const [selectedTicketType, setSelectedTIcketType] = useState<any>();
  const [eventid, setEventid] = useState<any>();
  const count = useAppSelector((state) => state);
  const EventsAllDataCount = useAppSelector(
    (state) => state?.getEventsCount?.allEvents?.data
  );

  console.log(EventsAllDataCount, "this is eevnt count");

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
    const currentUrl = window.location.href;
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
    <DialogContent className="sm:max-w-md lg:max-w-[600px] text-white">
      <div>
        <DialogHeader className="mb-5">
          <DialogTitle className="font-bold text-2xl mb-1">
            Buy Tickets
          </DialogTitle>
          <Separator className="scale--[1.12] bg-[#292929]" />
        </DialogHeader>

        <div>
          <p className="text-[#BFBFBF] font-extrabold text-[13px] pb-4">
            CHOOSE TICKET TYPE
          </p>

          <ScrollArea className="h-[25rem] w-full">
            <div className="flex flex-col gap-3">
              {/* ENTRY TICKET */}
              <p className="text-[14px] text-[#BFBFBF] font-[400]">
                Entry Ticket
              </p>
              {ticketsType.map((ticket) => {
                const count = EventsAllDataCount[ticket?.title] || 0; // Get the count for the ticket title
                const isSoldOut = count >= ticket.soldOutCount; // Check if the ticket is sold out

                return selectedTicket === ticket.type ? (
                  <Collapsible
                    key={ticket.type}
                    open={selectedTicket === ticket.type}
                    onOpenChange={() => {
                      if (!isSoldOut) {
                        setSelectedTicket(ticket.type);
                        setSelectedTicketPrice(ticket.price);
                        setSelectedTIcketType(ticket.title);
                      }
                    }}
                    className="w-full"
                  >
                    <CollapsibleTrigger className="w-full">
                      <GradientBorder>
                        <div
                          className={`border border-muted rounded-lg gradient-slate px-3 py-[0.65rem] cursor-pointer ${
                            isSoldOut
                              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          <div className="flex justify-between">
                            <p className="font-bold">{ticket.title}</p>
                            <p className="font-extrabold">
                              {isSoldOut ? "Sold" : `£${ticket.price}`}
                            </p>
                          </div>
                          {ticket.included && (
                            <CollapsibleContent className="border-t border-t-[#282828] mt-2 text-left">
                              <div className="flex flex-col items-start mt-2">
                                <p className="text-[#BFBFBF] font-extrabold text-[12px]">
                                  INCLUDED
                                </p>
                                <div className="mt-3">
                                  {ticket.included &&
                                    ticket.included.map((include, index) => (
                                      <p key={index} className="text-[12px]">
                                        {include}
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
                        setSelectedTIcketType(ticket.title);
                      }
                    }}
                    className="w-full"
                  >
                    <CollapsibleTrigger className="w-full">
                      <div
                        className={`border border-muted rounded-lg gradient-slate px-3 py-[0.65rem] cursor-pointer ${
                          isSoldOut
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        <div className="flex justify-between">
                          <p className="font-bold">{ticket.title}</p>
                          <p className="font-extrabold">
                            {isSoldOut ? "Sold" : `£${ticket.price} `}
                          </p>
                        </div>
                      </div>
                    </CollapsibleTrigger>
                  </Collapsible>
                );
              })}
              <p className="text-[14px] text-[#BFBFBF] font-[400]">
                VIP Table Packages
              </p>
              {ticketsType2.map((ticket) => {
                const count = EventsAllDataCount[ticket?.title] || 0; // Get the count for the ticket title
                const isSoldOut = count >= ticket.soldOutCount; // Check if the ticket is sold out

                return selectedTicket === ticket.type ? (
                  <Collapsible
                    key={ticket.type}
                    open={selectedTicket === ticket.type}
                    onOpenChange={() => {
                      if (!isSoldOut) {
                        setSelectedTicket(ticket.type);
                        setSelectedTicketPrice(ticket.price);
                        setSelectedTIcketType(ticket.title);
                      }
                    }}
                    className="w-full"
                  >
                    <CollapsibleTrigger className="w-full">
                      <GradientBorder>
                        <div
                          className={`border border-muted rounded-lg gradient-slate px-3 py-[0.65rem] cursor-pointer ${
                            isSoldOut
                              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          <div className="flex justify-between">
                            <p className="font-bold">{ticket.title}</p>
                            <p className="font-extrabold">
                              {isSoldOut ? "Sold" : `£${ticket.price}`}
                            </p>
                          </div>
                          {ticket.included && (
                            <CollapsibleContent className="border-t border-t-[#282828] mt-2 text-left">
                              <div className="flex flex-col items-start mt-2">
                                <p className="text-[#BFBFBF] font-extrabold text-[12px]">
                                  INCLUDED
                                </p>
                                <div className="mt-3">
                                  {ticket.included &&
                                    ticket.included.map((include, index) => (
                                      <p key={index} className="text-[12px]">
                                        {include}
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
                        setSelectedTIcketType(ticket.title);
                      }
                    }}
                    className="w-full"
                  >
                    <CollapsibleTrigger className="w-full">
                      <div
                        className={`border border-muted rounded-lg gradient-slate px-3 py-[0.65rem] cursor-pointer ${
                          isSoldOut
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        <div className="flex justify-between">
                          <p className="font-bold">{ticket.title}</p>
                          <p className="font-extrabold">
                            {isSoldOut ? "Sold" : `£${ticket.price} `}
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
                {/* <div className="flex gap-1">
                  <SealCheck className="text-white" size={14} weight="fill" />
                  <div className="text-[#BFBFBF] items-center text-[12px] flex gap-1">
                    <p className="line-through">£{selectedTicketPrice+(selectedTicketPrice/10)}</p>
                    <p>10%</p>
                  </div>
                </div> */}
              </div>
              {/* <div className="flex items-center justify-evenly gradient-slate border border-muted text-white rounded-lg  py-2 h-fit w-[120px] px-2">
                <button onClick={handleDecrement} className="">
                  <Minus size={16} />
                </button>
                <span className="px-4 font-bold">{quantity}</span>
                <button onClick={handleIncrement} className="">
                  <Plus size={16} />
                </button>
              </div> */}
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
