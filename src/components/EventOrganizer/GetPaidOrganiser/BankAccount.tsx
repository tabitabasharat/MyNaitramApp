"use client";
import React from "react";
import Image from "next/image";
import backward from "@/assets/Back - Button.svg";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import SubmitSucessModal from "./SubmitSuccessModal";
import ScreenLoader from "@/components/loader/Screenloader";
import {
  getPayoutBankDetail,
  deleteBankAccount,
  SubmitPaid,
} from "@/lib/middleware/payout";
import { useSearchParams } from "next/navigation";
import {
  SuccessToast,
  ErrorToast,
} from "@/components/reusable-components/Toaster/Toaster";
import { Button } from "@/components/ui/button";

const BankAccount = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [eventID, setEventID] = useState<any>("");
  const [loader, setLoader] = useState(false);
  const [bankId, setBankId] = useState<any>("");

  const handleClick = (index: number, id: number) => {
    setActiveIndex(index);
    setBankId(id);
  };
  useEffect(() => {
    const userid =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    dispatch(getPayoutBankDetail(userid));
  }, []);
  const myBankDetail = useAppSelector(
    (state) => state?.getPayoutBankDetail?.myHistory?.data
  );
  console.log("my payout bank history is", myBankDetail);

  const userloading = useAppSelector((state) => state?.getPayoutBankDetail);

  const ticketSold = searchParams.get("ticketSold");
  const platformFee = searchParams.get("PlatformFee");
  const payout = searchParams.get("Payout");

  useEffect(() => {
    const path = window.location.pathname;
    const accountId = path.split("/")[3];
    setEventID(accountId);
  }, []);

  async function handleSubmit() {
    setLoader(true);
    const userID =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;

    try {
      const data = {
        eventId: eventID,
        ticketSold: ticketSold,
        platformFee: platformFee,
        payoutAvailable: payout,
        userId: userID,
        payoutId: bankId,
      };
      dispatch(SubmitPaid(data)).then((res: any) => {
        if (res?.payload?.status === 201) {
          setLoader(false);

          setOpenModal(true);

          // router.push("/organizer-event/payout-detail/cryptowallet");
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
    <div className="min-h-screen bg-cover bg-no-repeat lg:px-0 bg-reward bg-reward-outer">
    <div className="pt-[120px] pb-[59.12px] lg:pb-[26.25px] px-[24px] lg:px-[100px] xl:px-[216px] md:pt-[132px] mx-auto">
      {userloading.loading && <ScreenLoader />}

      <div
        onClick={() => router.back()}
        className="mb-[32px] gap-[16px] w-full lg:w-[676px] items-center flex lg:w-[903px] w-full lg:mb-[24px]"
      >
        <Image
          src={backward}
          alt="back-btn"
          className="md:w-[44px] md:h-[44px] h-[40px] w-[40px]"
          sizes="44px"
        />
        <p className="lg:text-[24px] font-extrabold text-[15px]">
          {" "}
          Bank Accounts{" "}
        </p>
      </div>
      <div className="flex gap-[32px] lg:gap-[24px] flex-col h-[500px] overflow-y-auto w-full scrollbar-hide">
        {myBankDetail?.map((item: any, index: any) => (
          <div
            key={index}
            className={`w-full flex flex-col gap-[16px] gradient-slate md:w-[676px] p-[16px] rounded-[12px] ${
              activeIndex === index ? "gradient-border" : ""
            }`} 
            onClick={() => handleClick(index, item?.id)} 
          >
            <div className="flex justify-between md:items-center items-start wallet-div-content">
              <p className="text-sm font-normal text-[#E6E6E6]">Bank Name</p>
              <p className="text-[#E6E6E6] text-base font-bold alignment-text">
                {item?.bankName}
              </p>
            </div>
            <div className="flex justify-between md:items-center items-start wallet-div-content">
              <p className="text-sm font-normal text-[#E6E6E6]">
                Title of Account
              </p>
              <p className="text-[#E6E6E6] text-base font-bold alignment-text">
                {item?.accountTitle}
              </p>
            </div>
            <div className="flex justify-between md:items-center items-start wallet-div-content">
              <p className="text-sm font-normal text-[#E6E6E6] ">
                Account Number
              </p>
              <p className="text-[#E6E6E6] text-base font-bold alignment-text truncate">
                {item?.IBAN}
              </p>
            </div>
            <div className="flex justify-between md:items-center items-start wallet-div-content">
              <p className="text-sm font-normal text-[#E6E6E6]">Country/City</p>
              <p className="text-[#E6E6E6] text-base font-bold alignment-text">
                {item?.country}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div
        
        className="flex lg:mb-[158px] mb-[32px] w-full mt-[20px] lg:mt-[32px] md:w-[676px]"
      >
        <Button className="text-sm w-full
         lg:text-base font-extrabold bg-[#00D059] 
         text-[black] rounded-[200px] md:px-[62px] md:py-[12px] py-[16px]" onClick={() => handleSubmit()}>
          Submit
        </Button>
        {openModal && (
          <SubmitSucessModal
            onClose={() => setOpenModal(false)}
            open={() => setOpenModal(true)}
          />
        )}
      </div>
    </div>
    </div>
  );
};
export default BankAccount;
