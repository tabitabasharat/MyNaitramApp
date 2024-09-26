"use client";
import React from "react";
import Image from "next/image";
import backward from "@/assets/Back - Button.svg";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import SubmitSucessModal from "./SubmitSuccessModal";
import { getPayoutCryptoDetail } from "@/lib/middleware/payout";
import ScreenLoader from "@/components/loader/Screenloader";

const CryptoWallets = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [openModal, setOpenModal] = useState(false);
  const eventAllData = "hello";

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };
  useEffect(() => {
    const userid =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    dispatch(getPayoutCryptoDetail(userid));
  }, []);

  const myCryptoHistory = useAppSelector(
    (state) => state?.getPayoutCrypto?.myHistory?.data
  );
  const userloading = useAppSelector((state) => state?.getPayoutCrypto);
  console.log("my crypto payout history is", myCryptoHistory);

  return (
    <div className="pt-[120px] pb-[59.12px] lg:pb-[26.25px] px-[24px] bank-bg-effect lg:px-[100px] xl:px-[216px] md:pt-[132px] mx-auto">
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
          Crypto Wallets
        </p>
      </div>

      <div className="flex gap-[32px] lg:gap-[24px] flex-col">
        { myCryptoHistory?.map((item:any, index:any) => (
          <div
            key={index}
            className={`w-full gap-[16px] gradient-slate md:w-[676px] p-[16px] rounded-[12px] ${
              activeIndex === index ? "gradient-border" : ""
            }`} // Apply the gradient-border class only if the current div is active
            onClick={() => handleClick(index)} // Set the clicked div as active
          >
            <div className="flex justify-between items-center">
              <p className="text-sm font-normal text-[#E6E6E6]">Wallet Name</p>
              <p className="text-[#E6E6E6] text-base font-bold text-end">
              {item?.walletName}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm font-normal text-[#E6E6E6]">
                Wallet Address
              </p>
              <p className="text-[#E6E6E6] text-base font-bold text-end">
              {item?.walletAddress}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm font-normal text-[#E6E6E6]">Chain</p>
              <p className="text-[#E6E6E6] text-base font-bold text-end">
              {item?.chain}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div
        onClick={() => setOpenModal(true)}
        className="flex mb-[32px] lg:mb-[158px] w-full mt-[20px] lg:mt-[32px] md:w-[676px]"
      >
        <button className="text-sm w-full lg:text-base font-extrabold bg-[#00D059] text-[black] rounded-[200px] md:px-[62px] md:py-[12px] py-[16px]">
          Submit
        </button>
        {openModal && (
          <SubmitSucessModal
            onClose={() => setOpenModal(false)}
            open={() => setOpenModal(true)}
          />
        )}
      </div>
    </div>
  );
};
export default CryptoWallets;
