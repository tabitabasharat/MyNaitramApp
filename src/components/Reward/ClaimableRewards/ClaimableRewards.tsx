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
import { getRewardCollectibleByID } from "@/lib/middleware/reward";
import ScreenLoader from "@/components/loader/Screenloader";
import {
  SuccessToast,
  ErrorToast,
} from "@/components/reusable-components/Toaster/Toaster";
import { useEffect } from "react";

import { claimRewardCollectible } from "@/lib/middleware/reward";

export default function ClaimableRewards() {
  const router = useRouter();
  const [collectID, setCollectID] = useState("");
  const [loader, setLoader] = useState(false);
  const dispatch = useAppDispatch();
  const [isClaimOpen, setisClaimOpen] = useState(false);
  useEffect(() => {
    const currentUrl: any =
      typeof window !== "undefined" ? window.location.href : null;
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
    const userID =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;
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
          setisClaimOpen(true);
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
  const copyUrlToClipboard = () => {
    if (typeof window !== "undefined") {
      const currentUrl = window.location.href;
      if (currentUrl) {
        SuccessToast("URL copied Successfully");
        console.log("Your url is", currentUrl);
      } else {
        ErrorToast("Failed to copy URL.");
      }
      // navigator.clipboard
      //   .writeText(currentUrl)
      //   .then(() => {
      //     SuccessToast("URL copied to clipboard!");
      //     console.log("Your url is", currentUrl)
      //   })
      //   .catch((err) => {
      //     console.error("Failed to copy: ", err);
      //     ErrorToast("Failed to copy URL.");
      //   });
    }
  };

  return (
    <section className="min-h-screen pt-[8rem] lg:pt-[136px] pb-[8rem]  bg-cover bg-no-repeat px-[24px] md:px-[100px]   bg-reward  ">
      <div className="mx-auto max-w-screen-lg ">
        <div className="flex items-center lg:gap-[16px] gap-[12px]">
          <Image
            src={Backbtn}
            alt="back"
            className="lg:w-[44px] lg:h-[44px]  w-[28px] h-[28px] cursor-pointer"
            onClick={() => router.back()}
          />
          <p className="lg:text-[24px] text-[20px] font-extrabold -tracking-[0.04em] text-[#E6E6E6]">
            Claimable Collectible
          </p>
        </div>
        <div className="lg:mt-[32px] mt-[52px]  claimable-container   ">
          <div className="flex items-center justify-center">
            <Image
              src={imageUrl}
              alt="img"
              className="lg:size-[392px] size-[345px] "
              width={392}
              height={392}
            />
          </div>
          <div>
            <Badge className="lg:text-[12px] font-extrabold py-[8px] px-[12px] bg-[#292929]">
              Featured
            </Badge>
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
              <Image
                src={claimbtn}
                alt="btn"
                onClick={copyUrlToClipboard}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
      {isClaimOpen && (
        <ClaimRewardPopUp
          onClose={() => setisClaimOpen(false)}
          open={() => setisClaimOpen(true)}
          collectibleID={collectID}
        />
      )}
    </section>
  );
}
