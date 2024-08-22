"use client";
import React from "react";
import Image from "next/image";
import Walletbalancetable from "./Wallet-balance-table/Walletbalancetable";
import { Ticket } from "@phosphor-icons/react";
import ticket from "../../assets/Ticket.svg";
import ticketgreen from "../../assets/Ticket (1).svg";
import cards from "../../assets/Cards.svg";
import cardsgreen from "../../assets/Cards (1).svg";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";
import EventCard from "../reusable-components/EventCard";
import EventCards from "../eventCards/EventCards";
import { useState } from "react";
import { string } from "zod";

type SelectedOption = "tickets" | "collectibles" | null;

const Wallet = () => {
  const [selected, setSelected] = useState<SelectedOption>(null);
  return (
    <div className="pt-[132px] px-[24px] mx-auto flex justify-start">
      <div className="flex flex-col mx-auto w-full justify-center items-start">
        <h3 className=" pb-[16px] md:pb-[20px] md:text-[32px] font-extrabold text-[20px]">
          Wallet
        </h3>
        <Walletbalancetable />
        <div className="flex w-full pb-[28px] md:pb-[32px] gap-[12px]">
          {/* <div className="gradient-slate md:rounded-lg rounded-[44px] px-[12px] flex md:items-start flex-col justify-center items-center w-full pt-[14px] pb-[10px] md:pt-[16px] md:pb-[12px]"> */}
          <div className="flex w-full gap-[12px]">
            <div
              className={`gradient-slate md:rounded-lg rounded-[44px] px-[12px] flex md:items-start flex-col justify-center items-center w-full pt-[14px] pb-[10px] md:pt-[16px] md:pb-[12px] cursor-pointer ${
                selected === "tickets"
                  ? "border border-green-500 text-green-500"
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
          </div>
          <div
            className={`gradient-slate md:rounded-lg rounded-[44px] px-[12px] flex md:items-start flex-col justify-center items-center w-full pt-[14px] pb-[10px] md:pt-[16px] md:pb-[12px] cursor-pointer ${
              selected === "collectibles"
                ? "border border-green-500 text-green-500"
                : ""
            }`}
            onClick={() => setSelected("collectibles")}
          >
            {selected === "collectibles" ? (
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
            <p>Collectibles</p>
          </div>
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
