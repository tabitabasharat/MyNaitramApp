"use client";

import React from "react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { rewardposts } from "@/lib/dummyData";
import Thumbnail from "../ui/thumbnail";
import ClaimRewardCard from "../reusable-components/ClaimRewardCard";
import { Calendar, FlyingSaucer, Planet } from "@phosphor-icons/react/dist/ssr";
import Calendarnew from "@/assets/Wallet/Calendar-31.svg";
import "./Reward.css";
import { useAppDispatch,useAppSelector } from "@/lib/hooks";
import { useState,useEffect } from "react";
import { getClaimStatus } from "@/lib/middleware/reward";

function Rewards() {
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
      className="min-h-screen py-[8rem] bg-cover bg-no-repeat flex items-start justify-center px-[24px] lg:px-0 bg-reward"
    >
      <div className="flex items-start justify-center flex-col ">
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

          <ScrollArea className="w-full whitespace-nowrap ">
            <div className="flex gap-4 mt-[8px] ">
              {rewardposts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-start flex-col gap-[8px]"
                >
                  <Thumbnail key={post.id} img={post.img} />
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
          {claimableRewards.map((reward: any, index: any) => {
            if (index % 3 === 0) {
              return (
                <div
                  key={index}
                  className="flex items-start gap-[12px] mb-4 claim-container"
                >
                  {claimableRewards.slice(index, index + 3).map((reward, i) => (
                    <ClaimRewardCard
                      key={i}
                      heading={reward.heading}
                      desc={reward.desc}
                      icon={reward.icon}
                    />
                  ))}
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </section>
  );
}

export default Rewards;
