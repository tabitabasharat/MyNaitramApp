"use client";
import React from "react";
import Image from "next/image";
import backward from "@/assets/Back - Button.svg";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
// import SubmitSucessModal from "./SubmitSuccessModal";

const PayoutHistory = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const eventAllData = "hello";

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };
  return (
    <div className="pt-[32px] pb-[80px] lg:pb-[134px] px-[24px] bank-bg-effect lg:px-[100px] xl:px-[216px] md:pt-[90px] mx-auto">
      <div
        className="mb-[32px] gap-[16px] w-full lg:w-[676px] items-center flex lg:w-[903px] w-full lg:mb-[24px]"
      > <p className="lg:text-[48px] ms-[26px] md:ms-[0px] font-extrabold text-[32px]">
          {" "}
          Payout History
        </p>
      </div>
      <div className="flex gap-[32px] lg:gap-[24px] flex-col">
        {[...Array(2)].map((_, index) => (
          <div
            key={index}
            className="w-full flex flex-col gap-[16px] gradient-slate md:w-[676px] p-[16px] rounded-[12px]"
            onClick={() => handleClick(index)} // Set the clicked div as active
          >
            <div className="flex justify-between items-center">
              <p className="text-sm font-normal text-[#A6A6A6]">Event</p>
              <p className="text-[#E6E6E6] text-base font-bold text-end">Naitram Launch Party 2024</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm font-normal text-[#A6A6A6]">
              Category
              </p>
              <p className="text-[#E6E6E6] text-base text-end font-bold">
              Party
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm font-normal text-[#A6A6A6]">
              Location
              </p>
              <p className="text-[#E6E6E6] text-end text-base font-bold">
              Light Street, London
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm font-normal text-[#A6A6A6]">Start Date</p>
              <p className="text-[#E6E6E6] text-base text-end font-bold">8th March, 2024</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm font-normal text-[#A6A6A6]">End Date</p>
              <p className="text-[#E6E6E6] text-base text-end font-bold">9th March, 2024</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm font-normal text-[#A6A6A6]">Amount Withdrawn</p>
              <p className="text-[#E6E6E6] text-base text-end font-bold">$100,000</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm font-normal text-[#A6A6A6]">Withdrawal Method</p>
              <p className="text-[#E6E6E6] text-base text-end font-bold">Crypto Wallet</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm font-normal text-[#A6A6A6]">Account Name</p>
              <p className="text-[#E6E6E6] text-base text-end font-bold">Account 1</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default PayoutHistory;
