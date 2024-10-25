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
import Protectedroute from "@/lib/ProtectedRoute/Protectedroute";
import filter from "@/assets/whitefilter.svg"

type SelectedOption = "tickets" | "collectables" | null;

 function Wallet() {
  const [selected, setSelected] = useState<SelectedOption>("tickets");
  const dispatch = useAppDispatch();
  const [searchQuerytickets, setSearchQuerytickets] = useState("");
  const [searchQueryCollectibles, setSearchQueryCollectibles] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userid =
        typeof window !== "undefined" ? localStorage.getItem("_id") : null;
      dispatch(getTicketsByID(userid));
    }
  }, []);

  const myWalletCollect = useAppSelector(
    (state) =>
      state?.getWalletCollectByUID?.myWalletCollectibles?.data?.userCollectibles
  );

  const filteredCollectibles = myWalletCollect?.filter((item: any) =>
    item?.Collectiblee?.name
      ?.toLowerCase()
      .includes(searchQueryCollectibles.toLowerCase())
  );

  console.log("my filtered scollectibles are ", filteredCollectibles);
  console.log("my wallet collectibles are ", myWalletCollect);

  const mytickets = useAppSelector(
    (state) => state?.getTicketsByUId?.myTickets?.data
  );
  console.log("my events are ", mytickets);

  const filteredTickets = mytickets?.filter((item: any) =>
    item?.event?.name?.toLowerCase().includes(searchQuerytickets.toLowerCase())
  );
  console.log("my filtered tickets are ", filteredTickets);

  return (
    <section className="min-h-screen pt-[7rem] lg:pt-[8rem] pb-[8rem] bg-cover bg-no-repeat md:px-[100px]   bg-reward  ">
      <div className="min-h-screen flex items-start justify-center md:px-[0px] px-[24px]">
        <div className="flex flex-col w-full max-w-[1200px] justify-center items-start">
          <h3 className="pb-[16px] md:pb-[20px] md:text-[32px] font-extrabold text-[20px]">
            Wallet
          </h3>
          <h2 className=" text-base font-bold mb-[4px] md:mb-[8px]">
            Your Balance
          </h2>
          <Walletbalancetable />
          <div className="flex pt-[32px] w-full pb-[28px] md:pb-[32px] gap-[12px]">
            <div className="flex gap-[12px] w-full">
              <div
                className={`gradient-slate rounded-stlying px-[12px] w-full flex md:items-start flex-col justify-center items-center  pt-[14px] pb-[10px] md:pt-[16px] md:pb-[12px] cursor-pointer ${
                  selected === "tickets"
                    ? "gradient-border-rounded text-[#00A849]"
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
              className={`gradient-slate rounded-stlying px-[12px] flex w-full md:items-start flex-col justify-center items-center pt-[14px] pb-[10px] md:pt-[16px] md:pb-[12px] cursor-pointer ${
                selected === "collectables"
                  ? "gradient-border-rounded text-[#00A849]"
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
              <p>Collectibles</p>
            </div>
          </div>
          {selected === "tickets" && (
            <div className="flex mb-[16px] md:mb-[32px] gap-[10px] w-full">
            <div className="w-full relative ">
              <Input
                className="w-full h-14 rounded-[8px] px-[16px] py-[18px] text-[12px] md:text-sm font-normal"
                placeholder="Search Events"
                value={searchQuerytickets}
                onChange={(event) => setSearchQuerytickets(event.target.value)}
              />
              <MagnifyingGlass
                size={20}
                className="absolute top-1/2 -translate-y-1/2 right-5"
              />
            </div>
            <Image src={filter} alt="filter" sizes="30px"/>
            </div>
          )}
          {selected == "collectables" && (
            <div className="w-full relative mb-[16px] md:mb-[32px]">
              <Input
                className="w-full h-14 rounded-[8px] px-[16px] py-[18px] text-[12px] md:text-sm font-normal"
                placeholder="Search Collectibles"
                value={searchQueryCollectibles}
                onChange={(event) =>
                  setSearchQueryCollectibles(event.target.value)
                }
              />
              <MagnifyingGlass
                size={20}
                className="absolute top-1/2 -translate-y-1/2 right-5"
              />
            </div>
          )}


          <EventCards eventType={selected}  eventitems={selected === "tickets" ? filteredTickets : filteredCollectibles}/>
        </div>
      </div>
    </section>
  );
}

export default Protectedroute(Wallet);
