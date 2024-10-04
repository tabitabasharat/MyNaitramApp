"use client";

import React from "react";
import Image from "next/image";
import backwardimg from "@/assets/Back - Button.svg";
import leftimg  from "@/assets/Wallet/Left-reward-item.svg"
import "../Reward.css"
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useState,useEffect } from "react";
import { getRewardCollectibleByID } from "@/lib/middleware/reward";



export default function Rewarditem() {
    const router = useRouter();
    const dispatch = useAppDispatch();
  const [collectID, setCollectID] = useState("");

    useEffect(() => {
      const currentUrl: any =
        typeof window !== "undefined" ? window.location.href : null;
      const parts = currentUrl.split("/");
      const value = parts[parts.length - 1];
      setCollectID(value);
      console.log("my event id is", value);
      // dispatch(getRewardCollectibleByID(value));
    }, []);

    const myData = useAppSelector(
      (state) =>
        state?.getRewardCollectibleID?.mySpecificCollectible?.data?.collectible
    );
    console.log("my data inside item",myData)
    const imageUrl = myData?.image?.startsWith("http" || "https")
    ? myData?.image
    : leftimg;
  return (
    <section
     
      className="min-h-screen pb-[32px] px-[24px] py-[8rem] bg-cover bg-no-repeat bg-reward "
    >
      <div className="lg:pt-[56px] lg:pb-[295px] mx-auto max-w-screen-lg">
        <div className="flex items-center mb-[20px] lg:mb-[32px] gap-[12px] lg:gap-[16px]">
          <Image
            src={backwardimg}
            className="lg:w-[44px] lg:h-[44px]  w-[28px] h-[28px] cursor-pointer"
            alt="img"
            onClick={() => router.back()}
          />
          <h2 className="text-[24px] font-extrabold -tracking-[0.04em] text-[#E6E6E6]">
            My Items
          </h2>
        </div>
        <div className="flex lg:items-center justify-start flex-col lg:flex-row lg:gap-[40px] gap-[32px]">
          <div className="flex items-center justify-center lg:block">
          <Image
              src={imageUrl}
              alt="img"
              className="lg:size-[392px] size-[345px] "
              width={392}
              height={392}
            />
            {/* <Image src={leftimg} className="" alt="img" /> */}
          </div>
          <div className="flex gap-[24px] flex-col lg:gap-[32px]">
            <h3 className="lg:text-[48px] font-extrabold text-[32px] -tracking-[0.02em] ">
            {myData?.name}
            </h3>
            <p className="font-normal text-[13px] lg:text-[16px] textbr">
            {myData?.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
