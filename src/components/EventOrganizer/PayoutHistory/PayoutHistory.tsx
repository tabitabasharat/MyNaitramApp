"use client";
import React from "react";
import Image from "next/image";
import backward from "@/assets/Back - Button.svg";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
// import SubmitSucessModal from "./SubmitSuccessModal";
import { getPayoutHistory } from "@/lib/middleware/payout";

const PayoutHistory = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };
  useEffect(() => {
    const userid =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    dispatch(getPayoutHistory(userid));
  }, []);
  const myPayoutHistory = useAppSelector(
    (state) => state?.getPayoutHistory?.myHistory?.data
  );
  console.log("my payout history is", myPayoutHistory);

  function formatDate(isoString: string): string {
    const date = new Date(isoString);

    const day = date.getUTCDate();
    const monthIndex = date.getUTCMonth();
    const year = date.getUTCFullYear();

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const getOrdinalSuffix = (day: number): string => {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    const formattedDay = `${day}${getOrdinalSuffix(day)}`;

    return `${formattedDay} ${months[monthIndex]}, ${year}`;
  }

  return (
    <div className="pt-[32px] pb-[80px] lg:pb-[134px] px-[24px] lg:px-[100px] xl:px-[216px] md:pt-[90px] mx-auto">
      <div className="mb-[32px] gap-[16px] w-full lg:w-[676px] items-center flex lg:w-[903px] w-full lg:mb-[24px]">
        {" "}
        <p className="lg:text-[48px] ms-[26px] md:ms-[0px] font-extrabold text-[32px]">
          {" "}
          Payout History
        </p>
      </div>
      <div className="flex gap-[32px] lg:gap-[24px] flex-col">
        {myPayoutHistory?.length > 0 ? (
          myPayoutHistory?.map((item: any, index: any) => (
            <div
              key={index}
              className="w-full flex flex-col gap-[16px] gradient-slate md:w-[676px] p-[16px] rounded-[12px]"
              onClick={() => handleClick(index)} // Set the clicked div as active
            >
              <div className="flex justify-between lg:items-center items-start wallet-div-content">
                <p className="text-sm font-normal text-[#A6A6A6]">Event</p>
                <p className="text-[#E6E6E6] text-base font-bold alignment-text">
                  {item?.eventName}
                </p>
              </div>
              {item?.category?.length > 0 && (
                <div className="flex justify-between lg:items-center items-start wallet-div-content">
                  <p className="text-sm font-normal text-[#A6A6A6]">Category</p>
                  <p className="text-[#E6E6E6] text-base alignment-text font-bold">
                    {item.category.join(", ")}
                  </p>
                </div>
              )}
              <div className="flex justify-between lg:items-center items-start wallet-div-content">
                <p className="text-sm font-normal text-[#A6A6A6]">Location</p>
                <p className="text-[#E6E6E6] alignment-text text-base font-bold">
                  {item?.location}
                </p>
              </div>
              <div className="flex justify-between lg:items-center items-start wallet-div-content">
                <p className="text-sm font-normal text-[#A6A6A6]">Start Date</p>
                <p className="text-[#E6E6E6] text-base alignment-text font-bold">
                  {formatDate(item?.startDate)}
                </p>
              </div>
              <div className="flex justify-between lg:items-center items-start wallet-div-content">
                <p className="text-sm font-normal text-[#A6A6A6]">End Date</p>
                <p className="text-[#E6E6E6] text-base alignment-text font-bold">
                  {formatDate(item?.endDate)}
                </p>
              </div>
              <div className="flex justify-between lg:items-center items-start wallet-div-content">
                <p className="text-sm font-normal text-[#A6A6A6]">
                  Amount Withdrawn
                </p>
                <p className="text-[#E6E6E6] text-base alignment-text font-bold">
                  ${item?.amountWithdrawn != null ? item?.amountWithdrawn : "0.00"}
                </p>
              </div>
              <div className="flex justify-between lg:items-center items-start wallet-div-content">
                <p className="text-sm font-normal text-[#A6A6A6]">
                  Withdrawal Method
                </p>
                <p className="text-[#E6E6E6] text-base alignment-text font-bold">
                  {item?.types === "bank_account"
                    ? "Bank Account"
                    : "Crypto Wallet"}
                </p>
              </div>
              <div className="flex justify-between lg:items-center items-start wallet-div-content">
                <p className="text-sm font-normal text-[#A6A6A6]">
                  Account Name
                </p>
                <p className="text-[#E6E6E6] text-base alignment-text font-bold">
                  {item?.accountTitle}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No Payout History Exist</p>
        )}
      </div>
    </div>
  );
};
export default PayoutHistory;
