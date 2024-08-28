"use client";

import React from "react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { rewardposts } from "@/lib/dummyData";
import Thumbnail from "../ui/thumbnail";
import ClaimRewardCard from "../reusable-components/ClaimRewardCard";
import { Calendar, FlyingSaucer, Planet } from "@phosphor-icons/react/dist/ssr";
import Calendarnew from "@/assets/Wallet/Calendar-31.svg";
import "./Reward.css";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useState, useEffect } from "react";
import { getClaimStatus } from "@/lib/middleware/reward";
import Image from "next/image";
import ticket from "../../assets/Wallet/white-trophy.svg";
import ticketgreen from "../../assets/Wallet/rewarrd-trophy.svg";
import cards from "../../assets/Cards.svg";
import cardsgreen from "../../assets/Cards (1).svg";
import EventCards from "@/components/eventCards/EventCards";
type SelectedOption = "rewards" | "rewardcollectables" | null;

function Rewards() {
  const [selected, setSelected] = useState<SelectedOption>("rewards");

  const claimableRewards = [
    {
      heading: "Daily Login Bonus",
      desc: "Earn 5 MRT for Logging In Today!",
      icon: Calendarnew,
    },
    {
      heading: "Daily Login Bonus",

      desc: "Earn 5 MRT for Logging In Today!",
      icon: Calendarnew,
    },
    {
      heading: "Daily Login Bonus",

      desc: "Earn 5 MRT for Logging In Today!",
      icon: Calendarnew,
    },
    {
      heading: "Daily Login Bonus",

      desc: "Earn 5 MRT for Logging In Today!",
      icon: Calendarnew,
    },
    {
      heading: "Daily Login Bonus",

      desc: "Earn 5 MRT for Logging In Today!",
      icon: Calendarnew,
    },
    {
      heading: "Daily Login Bonus",

      desc: "Earn 5 MRT for Logging In Today!",

      icon: Calendarnew,
    },
  ];
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getClaimStatus());
  }, []);

  const ClaimStatusdata = useAppSelector(
    (state) => state?.getClaimStatus?.myClaim?.data
  );
  console.log("my claim status data", ClaimStatusdata);
  return (
    <section
      //   style={{
      //     backgroundImage:
      //       "linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.6)), url(/blur-green.png)",
      //     backgroundPosition: "center",
      //     backgroundImage: "url(/blur-green.png)",
      //     backgroundPosition: "right",
      //     backgroundRepeat: "no-repeat",
      //     backgroundSize: "cover",
      //   }}
      className="min-h-screen py-[8rem] bg-cover bg-no-repeat  px-[24px] lg:px-0 bg-reward bg-reward-outer"
    >
      <div className="bg-reward-outer2 ">
        <p className="font-extrabold text-[32px] -tracking-[0.02em]">
          Your Rewards
        </p>

        {/* <div className="pt-[32px]">
        <p className="text-[#E6E6E6] text-[16px] font-bold">My Items</p>
        <ScrollArea className="w-full whitespace-nowrap ">
          <div className="flex gap-4 mt-[8px] ">
            {rewardposts.map((post) => (
              <div
                key={post.id}
                className="flex items-start flex-col gap-[8px]"
              >
                <Thumbnail img={post.img} />
                <p className="text-[12px]">{post.title}</p>

                <div className="w-[108px]"> 
            <p className="overflow-hidden text-ellipsis whitespace-nowrap">{post.title}</p>
          </div>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div> */}
        <div className="pt-[32px]">
          <p className="text-[#E6E6E6] text-[16px] font-bold">My Items</p>
          <ScrollArea className="w-full overflow-auto ">
            <div className="flex gap-4 mt-6 whitespace-nowrap min-w-[800px]">
              {rewardposts.map((post: any) => (
                <div
                  key={post.id}
                  className="flex items-start flex-col gap-[8px]"
                >
                  <Thumbnail img={post.img} />
                  <p className="text-[12px]">{post.title}</p>
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
        <div className="h-full pt-[32px] w-full ">
          <p className="mb-[8px] text-[#E6E6E6] text-[16px] font-bold">
            Claimable Rewards
          </p>

          <div className="flex pt-[32px] w-full pb-[28px] md:pb-[32px] gap-[12px]">
            <div className="flex gap-[12px] w-full">
              <div
                className={`gradient-slate md:rounded-lg rounded-[44px] px-[12px] w-full flex md:items-start flex-col justify-center items-center  pt-[14px] pb-[10px] md:pt-[16px] md:pb-[12px] cursor-pointer ${
                  selected === "rewards"
                    ? "border border-[#00A849] text-[#00A849]"
                    : ""
                }`}
                onClick={() => setSelected("rewards")}
              >
                {selected === "rewards" ? (
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
              className={`gradient-slate md:rounded-lg rounded-[44px] px-[12px] flex w-full md:items-start flex-col justify-center items-center pt-[14px] pb-[10px] md:pt-[16px] md:pb-[12px] cursor-pointer ${
                selected === "rewardcollectables"
                  ? "border border-[#00A849] text-[#00A849]"
                  : ""
              }`}
              onClick={() => setSelected("rewardcollectables")}
            >
              {selected === "rewardcollectables" ? (
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
          {selected === "rewards" ? (
            ClaimStatusdata?.length &&
            ClaimStatusdata?.map((reward: any, index: any) => {
              if (index % 3 === 0) {
                return (
                  <div
                    key={index}
                    className="flex items-start gap-[12px] mb-4 claim-container"
                  >
                    {ClaimStatusdata.slice(index, index + 3).map(
                      (reward: any, i: any) => (
                        <ClaimRewardCard
                          key={reward?.id}
                          heading={reward?.claimType}
                          desc={reward?.claimText}
                          icon={Calendarnew}
                          claimID={reward?.id}
                        />
                      )
                    )}
                  </div>
                );
              }
              return null;
            })
          ) : (
            <div>
              <EventCards eventType={selected}  />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Rewards;
