"use client";
import React from "react";
import Image from "next/image";
import backwardimg from "@/assets/Back - Button.svg";
import post from "../../../../public/Image.svg";

const Collectiontable = () => {
  return (
    <section
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.6)), url(/blur-green.png)",
        backgroundPosition: "center",
      }}
      className="min-h-screen pb-[32px] px-[24px] py-[8rem] bg-cover bg-no-repeat"
    >
      <div className="lg:pt-[56px] lg:pb-[295px] mx-auto max-w-screen-lg">
        <div className="flex items-center mb-[20px] lg:mb-[32px] gap-[12px] lg:gap-[16px]">
          <Image src={backwardimg} className="lg:w-[44px] lg:h-[44px]  w-[28px] h-[28px]"  alt="img"/>
          <h2 className="mb-0 text-[20px] lg:text-[24px] font-extrabold">Collectables</h2>
        </div>
        <div className="flex items-center justify-center flex-col lg:flex-row lg:gap-[40px] gap-[32px]">
          <div  className=" w-full h-full" >
            <Image src={post} className="w-full h-full"  alt="img"/>
          </div>
          <div className="flex gap-[24px] flex-col lg:gap-[32px]">
            <h3 className="lg:text-[48px] font-extrabold text-[32px]">Naitram TOP EARNER</h3>
            <p className="font-normal text-[13px] lg:text-[16px]">
              Consequat bibendum mattis nam tincidunt amet nunc neque nunc blandit. Senectus tempor lectus accumsan gravida neque. Pellentesque scelerisque consectetur nisl ut hac id enim. Consequat bibendum mattis nam tincidunt amet nunc neque nunc blandit. Senectus tempor lectus accumsan gravida neque. Pellentesque scelerisque consectetur nisl ut hac id enim.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Collectiontable;
