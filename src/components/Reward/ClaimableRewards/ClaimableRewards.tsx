"use client";
import React from "react";
import Backbtn from "@/assets/Wallet/Back - Button.svg";
import Image from "next/image";
import leftimg from "@/assets/Wallet/Left.svg";
import { Badge } from "@/components/ui/badge";
import "../Reward.css";
import { Button } from "../../ui/button";
import claimbtn from "@/assets/Wallet/claim-btn.svg";
import ClaimRewardPopUp from "../ClaimRewardPopUp";
import { useState } from "react";
export default function ClaimableRewards() {
  const [isClaimOpen, setisClaimOpen] = useState(false);

  return (
    <section className="min-h-screen py-[8rem]  bg-cover bg-no-repeat px-[24px] md:px-[100px]   bg-reward ">
      <div className="mx-auto max-w-screen-xl  ">
        <div className="flex items-center gap-[16px] ">
          <Image src={Backbtn} alt="back" />
          <p className="text-[24px] font-extrabold -tracking-[0.04em] text-[#E6E6E6]">
            Claimable Rewards
          </p>
        </div>
        <div className="mt-[32px]   claimable-container  ">
          <div className="img-contain">
            <Image src={leftimg} alt="img" className="w-full" />
          </div>
          <div>
            <Badge className="lg:text-[12px]">Featured</Badge>
            <p className="font-extrabold  text-[32px] lg:text-[48px] -tracking-[0.04em] lg:-tracking-[0.02em] pt-[12px]">
              Naitram TOP EARNER
            </p>
            <p className="font-bold text-[14px] lg:text-[16px] text-primary lg:pt-0 pt-[24px]">
              Created by Naitram
            </p>
            <p className="font-normal text-[16px] pt-[12px] lg:pt-[32px] textbr">
              Consequat bibendum mattis nam tincidunt amet nunc neque nunc
              blandit.<br></br> Senectus tempor lectus accumsan gravida neque.
              Pellentesque<br></br>
              scelerisque consectetur nisl ut hac id enim.
            </p>
            <div className="flex items-start gap-[12px] mt-[48px]">
              <Button className="px-[78px] py-16px h-[52px] text-[14px] font-extrabold " 
              
              onClick={() => setisClaimOpen(true)}
              >
                Claim Collectible
              </Button>
              <Image src={claimbtn} alt="btn" />
            </div>
          </div>
        </div>
      </div>
      {isClaimOpen && 
      <ClaimRewardPopUp
        onClose={() => setisClaimOpen(false)}
        open={() => setisClaimOpen(true)}
      />}
    </section>
  );
}
