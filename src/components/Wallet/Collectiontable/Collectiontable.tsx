"use client";
import React from "react";
import Image from "next/image";
import backwardimg from "@/assets/Back - Button.svg";
import leftimg from "@/assets/Wallet/Left-reward-item.svg";
import { useRouter } from "next/navigation";

const Collectiontable = () => {
  const router = useRouter();
  return (
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
            Collectables
          </h2>
        </div>
        <div className="flex items-center justify-center flex-col lg:flex-row lg:gap-[40px] gap-[32px]">
          <div className="">
            <Image src={leftimg} className="" alt="img" />
          </div>
          <div className="flex gap-[24px] flex-col lg:gap-[32px]">
            <h3 className="lg:text-[48px] font-extrabold text-[32px] -tracking-[0.02em] ">
              Naitram TOP EARNER
            </h3>
            <p className="font-normal text-[13px] lg:text-[16px] textbr">
              Consequat bibendum mattis nam tincidunt amet nunc neque nunc
              blandit.<br></br> Senectus tempor lectus accumsan gravida neque.
              Pellentesque<br></br> scelerisque consectetur nisl ut hac id enim.
              Consequat bibendum mattis<br></br> nam tincidunt amet nunc neque
              nunc blandit. Senectus tempor lectus<br></br> accumsan gravida
              neque. Pellentesque scelerisque consectetur nisl ut hac<br></br>{" "}
              id enim.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Collectiontable;
