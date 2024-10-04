"use client";
import React from "react";
import Image from "next/image";
import backwardimg from "@/assets/Back - Button.svg";
import leftimg from "@/assets/Wallet/Left-reward-item.svg";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useState, useEffect } from "react";
import ScreenLoader from "@/components/loader/Screenloader";
import { getRewardCollectibleByID } from "@/lib/middleware/reward";

const Collectiontable = () => {
  const router = useRouter();
  const [collectID, setCollectID] = useState("");
  const [loader, setLoader] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const currentUrl:any = typeof window !== "undefined" ? window.location.href:null;
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

  console.log("my data", myData);

  const imageUrl = myData?.image?.startsWith("http" || "https")
    ? myData?.image
    : leftimg;

  const userLoading = useAppSelector((state) => state?.getRewardCollectibleID);

  return (
    <>
      {userLoading.loading && <ScreenLoader />}
      <section className="min-h-screen pb-[32px] px-[24px] pt-[7rem] lg:pt-[8rem] pb-[8rem] bg-cover bg-no-repeat bg-reward ">
        <div className="lg:pt-[56px] lg:pb-[295px] mx-auto max-w-screen-lg">
          <div className="flex items-center mb-[20px] lg:mb-[32px] gap-[12px] lg:gap-[16px]">
            <Image
              src={backwardimg}
              className="lg:w-[44px] lg:h-[44px]  w-[28px] h-[28px] cursor-pointer"
              alt="img"
              onClick={() => router.back()}
            />
            <h2 className="text-[24px] font-extrabold -tracking-[0.04em] text-[#E6E6E6]">
              Collectibles
            </h2>
          </div>
          <div className="flex lg:items-center  flex-col lg:flex-row lg:gap-[40px] gap-[32px]">
            <div className="flex items-center justify-center ">
              <Image
                src={imageUrl}
                alt="img"
                className="size-[393px] flex items-center justify-center"
                width={393}
                height={393}
              />
            </div>
            <div className="flex gap-[24px] flex-col lg:gap-[32px]">
              <h3 className="lg:text-[48px] font-extrabold text-[32px] -tracking-[0.02em]">
                {myData?.name}
              </h3>
              <p className="font-normal text-[13px] lg:text-[16px] textbr">
                {myData?.description}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Collectiontable;
