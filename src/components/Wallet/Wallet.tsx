"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Walletbalancetable from "./Wallet-balance-table/Walletbalancetable";
import ticket from "../../assets/Ticket.svg";
import ticketgreen from "../../assets/Ticket (1).svg";
import cards from "../../assets/Cards.svg";
import cardsgreen from "../../assets/Cards (1).svg";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";
import EventCards from "../eventCards/EventCards";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getTicketsByID } from "@/lib/middleware/wallet";
import Link from "next/link";
type SelectedOption = "tickets" | "collectables" | null;

const Wallet = () => {
  const [selected, setSelected] = useState<SelectedOption>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userid = localStorage.getItem("_id");
    dispatch(getTicketsByID(userid));
  }, []);
  const myevents = useAppSelector(
    (state) => state?.getTicketsByUId?.myTickets?.data
  );
  return (
    <div className="min-h-screen flex items-start justify-center pt-[132px] px-[24px]">
      <div className="flex flex-col w-full max-w-[1200px] justify-center items-start">
        <h3 className="pb-[16px] md:pb-[20px] md:text-[32px] font-extrabold text-[20px]">
          Wallet
        </h3>
        <Walletbalancetable />
        <div className="flex pt-[32px] w-full pb-[28px] md:pb-[32px] gap-[12px]">
          <div className="flex gap-[12px] w-full">
            <Link href="/wallet/specific-ticket" className="w-full">
              <div
                className={`gradient-slate md:rounded-lg rounded-[44px] px-[12px] w-full flex md:items-start flex-col justify-center items-center  pt-[14px] pb-[10px] md:pt-[16px] md:pb-[12px] cursor-pointer ${
                  selected === "tickets"
                    ? "border border-[#00A849] text-[#00A849]"
                    : ""
                }`}
                onClick={() => setSelected("tickets")}
              >
                {selected === "tickets" ? (
                  <Image
                    src={ticketgreen}
                    className="pb-[8px] hidden md:block"
                    alt="Green Ticket"
                  />
                ) : (
                  <Image
                    src={ticket}
                    className="pb-[8px] hidden md:block"
                    alt="Default Ticket"
                  />
                )}
                <p>Tickets</p>
              </div>
            </Link>
          </div>
          <Link href="/wallet/collect-table" className="w-full">
            <div
              className={`gradient-slate md:rounded-lg rounded-[44px] px-[12px] flex w-full md:items-start flex-col justify-center items-center pt-[14px] pb-[10px] md:pt-[16px] md:pb-[12px] cursor-pointer ${
                selected === "collectables"
                  ? "border border-[#00A849] text-[#00A849]"
                  : ""
              }`}
              onClick={() => setSelected("collectables")}
            >
              {selected === "collectables" ? (
                <Image
                  src={cards}
                  className="pb-[8px] hidden md:block"
                  alt="Green Collectibles"
                />
              ) : (
                <Image
                  src={cardsgreen}
                  className="pb-[8px] hidden md:block"
                  alt="Default Collectibles"
                />
              )}
              <p>Collectables</p>
            </div>
          </Link>
        </div>
        <div className="w-full relative mb-[16px] md:mb-[32px]">
          <Input
            className="w-full h-14 rounded-[8px] px-[16px] py-[18px] text-[12px] md:text-sm font-normal"
            placeholder="Search Event"
          />
          <MagnifyingGlass
            size={20}
            className="absolute top-1/2 -translate-y-1/2 right-5"
          />
        </div>
        <EventCards />
      </div>
    </div>
  );
};

export default Wallet;
