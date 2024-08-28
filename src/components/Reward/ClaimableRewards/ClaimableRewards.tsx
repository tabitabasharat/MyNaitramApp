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
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import ScreenLoader from "@/components/loader/Screenloader";
import {
  SuccessToast,
  ErrorToast,
} from "@/components/reusable-components/Toaster/Toaster";
import { useEffect } from "react";
import { getRewardCollectibleByID } from "@/lib/middleware/reward";
import { claimRewardCollectible } from "@/lib/middleware/reward";

export default function ClaimableRewards() {
  const router = useRouter();
  const [collectID, setCollectID] = useState("");
  const [loader, setLoader] = useState(false);
  const dispatch = useAppDispatch();
  const [isClaimOpen, setisClaimOpen] = useState(false);
  useEffect(() => {
    const currentUrl = window.location.href;
    const parts = currentUrl.split("/");
    const value = parts[parts.length - 1];
    setCollectID(value);
    console.log("my event id is", value);
    dispatch(getRewardCollectibleByID(value));
  }, []);

  const myData = useAppSelector(
    (state) =>
      state?.getRewardCollectibleID?.mySpecificCollectible?.data?.collectible
  );

  console.log("my data", myData);
  const imageUrl = myData?.image?.startsWith("http" || "https")
    ? myData?.image
    : leftimg;

  async function ClaimCollectible() {
    console.log("Collectible Claimed");
    const userID = localStorage.getItem("_id");
    console.log("my id is", userID);
    try {
      const data = {
        collectibleId: collectID,
        userId: userID,
      };
      dispatch(claimRewardCollectible(data)).then((res: any) => {
        if (res?.payload?.status === 201) {
          setLoader(false);
          SuccessToast("Collectible Claimed Successfully");
        } else {
          setLoader(false);
          ErrorToast(res?.payload?.message);
        }
      });
    } catch (error) {
      console.error("Error:", error);
      ErrorToast(error);
    }
  }
  
  return (
    <section className="min-h-screen py-[8rem]  bg-cover bg-no-repeat px-[24px] md:px-[100px]   bg-reward  ">
      <div className="mx-auto max-w-screen-lg ">
        <div className="flex items-center gap-[16px] ">
          <Image
            src={Backbtn}
            alt="back"
            className="lg:w-[44px] lg:h-[44px]  w-[28px] h-[28px] cursor-pointer"
            onClick={() => router.back()}
          />
          <p className="text-[24px] font-extrabold -tracking-[0.04em] text-[#E6E6E6]">
            Claimable Rewards
          </p>
        </div>
        <div className="mt-[32px]   claimable-container   ">
          <div className="flex items-center justify-center">
            <Image
              src={imageUrl}
              alt="img"
              className="size-[392px]"
              width={392}
              height={392}
            />
          </div>
          <div>
            <Badge className="lg:text-[12px]">Featured</Badge>
            <p className="font-extrabold  text-[32px] lg:text-[48px] -tracking-[0.04em] lg:-tracking-[0.02em] -tracking-[0.04em] pt-[12px]">
              {myData?.name}
            </p>
            <p className="font-bold text-[14px] lg:text-[16px] text-primary lg:pt-0 pt-[24px]">
              Created by Naitram
            </p>
            <p className="font-normal lg:text-[16px] text-[13px] pt-[12px] lg:pt-[32px] textbr">
              {myData?.description}
            </p>
            <div className="flex items-start gap-[12px] mt-[48px]">
              <Button
                className="px-[78px] py-16px h-[52px] text-[14px] font-extrabold "
                // onClick={() => setisClaimOpen(true)}
                onClick={() => ClaimCollectible()}
              >
                Claim Collectible
              </Button>
              <Image src={claimbtn} alt="btn" />
            </div>
          </div>
        </div>
      </div>
      {isClaimOpen && (
        <ClaimRewardPopUp
          onClose={() => setisClaimOpen(false)}
          open={() => setisClaimOpen(true)}
        />
      )}
    </section>
  );
}
