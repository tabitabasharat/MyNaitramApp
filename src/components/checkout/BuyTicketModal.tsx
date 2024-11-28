"use client";

import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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
const BuyTicketModal = ({ onNext, setTicketPrice, setTicketType, setTicketIndex }: any) => {
  const [selectedTicket, setSelectedTicket] = useState(-1);
  const [selectedTicketPrice, setSelectedTicketPrice] = useState(0);
  const [selectedTicketType, setSelectedTIcketType] = useState<any>();
  const [eventid, setEventid] = useState<any>();

  const dispatch = useAppDispatch();
  function buyTicket() {
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

  const EventData = useAppSelector((state) => state?.getEventByEventID?.eventIdEvents?.data?.tickets);
  const EventDatas = useAppSelector((state) => state?.getEventByEventID?.eventIdEvents);
  console.log("my data in buy tickets", EventDatas?.data?.totalSoldOut);

  function formatDate(inputDate: any) {
    // Parse the input date string
    const date = new Date(inputDate);

    // Get individual components
    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
    const day = date.getDate();
    const month = date.toLocaleDateString("en-US", { month: "long" });
    const year = date.getFullYear();

    // Get the ordinal suffix for the day
    const suffix = day % 10 === 1 && day !== 11 ? "st" : day % 10 === 2 && day !== 12 ? "nd" : day % 10 === 3 && day !== 13 ? "rd" : "th";

    // Construct the formatted string
    return `${dayOfWeek}, ${day}${suffix} ${month} ${year}`;
  }

  return (
    <DialogContent className="sm:max-w-md lg:max-w-[600px] text-white">
      <div>
        <DialogHeader className="mb-5">
          <DialogTitle className="font-bold text-2xl mb-1">Buy Tickets</DialogTitle>
          <Separator className="scale--[1.12] bg-[#292929]" />
        </DialogHeader>

        <div>
          <p className="text-[#ffffff] font-extrabold text-[15px] pb-4">CHOOSE TICKET TYPE</p>

          {/* <ScrollArea className="h-[30rem] w-full">
            <div className="flex flex-col gap-3">
              
              {EventData?.map((ticket: any) =>
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
                            <p className="font-extrabold">£{ticket?.price}</p>
                          </div>
                        </div>
                        {ticket?.options && (
                          <CollapsibleContent className="border-t border-t-[#282828] mt-2 text-left">
                            <div className="flex flex-col items-start mt-2">
                              <p className="text-[#BFBFBF] font-extrabold text-[12px]">
                                INCLUDED
                              </p>
                              <div className="mt-3">
                               
                                {ticket?.options &&
                                  ticket?.options.map(
                                    (include: any, index: any) => (
                                      <p key={index} className="text-[12px]">
                                        {include?.label}
                                      </p>
                                    )
                                  )}
                              </div>
                            </div>
                          </CollapsibleContent>
                        )}
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
                          <p className="font-extrabold">£{ticket?.price}</p>
                        </div>
                      </div>
                    </CollapsibleTrigger>
                  </Collapsible>
                )
              )}
            </div>
          </ScrollArea> */}
          <ScrollArea className="w-full">
            <div className="flex flex-col gap-3">
              {/* ENTRY TICKET */}
              <p className="text-[14px] text-[#BFBFBF] font-[400]">Entry Ticket</p>
              {EventData?.map((ticket: any, index: any) => {
                let isSoldOut = false; // Check if the ticket is sold out
                console.log(EventDatas?.data?.totalSoldOut[index], "my data in buy tickets");
                if (ticket?.no <= 0) {
                  isSoldOut = true;
                }

                return selectedTicket === index ? (
                  <Collapsible
                    key={index}
                    open={selectedTicket === index}
                    onOpenChange={() => {
                      setSelectedTicket(index);
                      setSelectedTicketPrice(ticket.ticketPrice);
                      setSelectedTIcketType(ticket.selectedEventTicketType);
                      setTicketIndex(index);
                    }}
                    className="w-full"
                  >
                    <CollapsibleTrigger className="w-full">
                      <GradientBorder>
                        <div
                          className={`border border-muted rounded-lg gradient-slate px-3 py-[0.65rem] cursor-pointer ${
                            isSoldOut ? "bg-gray-300 text-gray-500 cursor-not-allowed" : ""
                          }`}
                        >
                          <div className="flex justify-between">
                            <p className="font-bold">{ticket.selectedEventTicketType}</p>
                            <p className="font-extrabold">{ticket.selectedEventTicketType !== "RSVP Ticketing" ? `£${ticket.ticketPrice}` : ""}</p>
                          </div>

                          <CollapsibleContent className="border-t border-t-[#282828] mt-2 text-left">
                            {ticket.selectedEventTicketType === "RSVP Ticketing" && (
                              <>
                                <div className="flex flex-col items-start mt-2">
                                  <p className="text-[#BFBFBF] font-extrabold text-[12px]">RSVP Deadline</p>
                                  <div className="mt-3">
                                    <p key={index} className="text-[12px]">
                                      {`${formatDate(ticket?.rsvpDeadline)}`}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex flex-col items-start mt-2">
                                  <p className="text-[#BFBFBF] font-extrabold text-[12px]">RSVP Capacity</p>
                                  <div className="mt-3">
                                    <p key={index} className="text-[12px]">
                                      {`${ticket?.rsvpCapacity} persons`}
                                    </p>
                                  </div>
                                </div>
                              </>
                            )}
                            <>
                              {ticket?.whatsIncluded && (
                                <div className="flex flex-col items-start mt-2">
                                  <p className="text-[#BFBFBF] font-extrabold text-[12px]">INCLUDED</p>
                                  <div className="mt-3">
                                    {ticket?.whatsIncluded &&
                                      ticket?.whatsIncluded?.map((include: any, index: any) => (
                                        <p key={index} className="text-[12px]">
                                          {include?.label}
                                        </p>
                                      ))}
                                  </div>
                                </div>
                              )}
                            </>
                          </CollapsibleContent>
                        </div>
                      </GradientBorder>
                    </CollapsibleTrigger>
                  </Collapsible>
                ) : (
                  <Collapsible
                    key={index}
                    open={selectedTicket === index}
                    onOpenChange={() => {
                      if (!isSoldOut) {
                        setSelectedTicket(index);
                        setSelectedTicketPrice(ticket.ticketPrice);
                        setSelectedTIcketType(ticket.selectedEventTicketType);
                        setTicketIndex(index);
                      }
                    }}
                    className="w-full"
                  >
                    <CollapsibleTrigger className="w-full">
                      <div
                        className={`border border-muted rounded-lg gradient-slate px-3 py-[0.65rem] cursor-pointer ${
                          isSoldOut ? "bg-gray-300 text-gray-500 cursor-not-allowed" : ""
                        }`}
                      >
                        <div className="flex justify-between">
                          <p className="font-bold">{ticket.selectedEventTicketType}</p>
                          <p className="font-extrabold">{ticket.selectedEventTicketType !== "RSVP Ticketing" ? `£${ticket.ticketPrice}` : ""}</p>
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
                  £{selectedTicketPrice}.00 <span className="text-[12px] text-[#BFBFBF] font-normal">inc fees</span>
                </p>
              </div>
            </div>

            <Button
              disabled={selectedTicket === -1 && true}
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
