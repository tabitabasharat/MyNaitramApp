"use client";
import SubmitSucessModal from "../../GetPaidOrganiser/SubmitSuccessModal";
import Image from "next/image";
import backward from "@/assets/Back - Button.svg";
import { useState } from "react";
import { useRouter } from "next/navigation";
import trash from "@/assets/trash.svg";
import { useAppDispatch } from "@/lib/hooks";
import add from "@/assets/Plus.svg";
import Link from "next/link";

const Cryptowallet = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const eventAllData = "hello";

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="pt-[42px] pb-[59.12px] lg:pb-[26.25p] px-[24px] lg:px-[100px] xl:px-[216px] md:pt-[90px] mx-auto">
      <div className="w-full md:w-[676px]">
        <p className="block ms-[25px] mb-[32px] sm:mb-[0px] sm:hidden text-[24px] font-extrabold">
          Profile Menu
        </p>
        <div
          onClick={() => router.back()}
          className="mb-[32px] gap-[16px] w-full lg:w-[676px] items-center flex lg:w-[903px] w-full "
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
        <div className="flex md:gap-[12px] gap-[10px] btons-wrap-adjustment mb-[32px] w-full md:justify-end">
          <Link href="/organizer-event/payout-detail/cryptowallet/addCryptowallet" className="w-full md:w-fit">
          <button className="text-[#00D059] text-[11px] font-extrabold table-gradient w-full md:w-fit py-[10px] px-[0px] md:p-[20px] rounded-[100px] add-bank-account-border flex items-center justify-center gap-[8px]">
            {" "}
            <Image
              src={add}
              alt="add"
              className="lg:h-[12px] lg:w-[12px] w-[16px] h-[16px]"
            />{" "}
            <p>Add Crypto Wallet </p>
          </button>
          </Link>
          <button className="bg-[#FF1717B2] text-[11px] font-extrabold w-full md:w-fit py-[10px] px-[0px] text-[white] md:p-[20px] rounded-[100px] flex items-center justify-center gap-[8px]">
            {" "}
            <Image
              src={trash}
              alt="trash-icon"
              className=" lg:h-[12px] lg:w-[12px] w-[16px] h-[16px]"
            />{" "}
            <p> Delete Crypto Account </p>
          </button>
        </div>
        <div className="flex gap-[32px] lg:gap-[24px] flex-col">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className={`w-full flex flex-col gap-[16px] gradient-slate md:w-[676px] p-[16px] rounded-[12px] ${
                activeIndex === index ? "gradient-border" : ""
              }`} // Apply the gradient-border class only if the current div is active
              onClick={() => handleClick(index)} // Set the clicked div as active
            >
              <div className="flex justify-between items-center">
                <p className="text-sm font-normal text-[#A6A6A6] ">
                  Wallet Name
                </p>
                <p className="text-[#E6E6E6] text-base font-bold text-end">
                  Lloyd Bank
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm font-normal text-[#A6A6A6] ">
                  Wallet Address
                </p>
                <p className="text-[#E6E6E6] text-base font-bold text-end">
                  0x9605.....6cBf
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm font-normal text-[#A6A6A6]">Chain</p>
                <p className="text-[#E6E6E6] text-base font-bold text-end">
                  Ethereum
                </p>
              </div>
            </div>
          ))}
        </div>

        <div
          // onClick={() => setOpenModal(true)}
          className="flex lg:mb-[158px] mb-[32px] mt-[39px] md:mt-[32px] w-full mt-[20px] lg:mt-[32px] md:w-[676px]"
        >
          <button className="text-sm w-full lg:text-base font-extrabold bg-[#00D059] text-[black] rounded-[200px] md:px-[62px] md:py-[12px] py-[16px]">
            Payout
          </button>
          {/* {openModal && (
          <SubmitSucessModal
            onClose={() => setOpenModal(false)}
            open={() => setOpenModal(true)}
          />
        )} */}
        </div>
      </div>
    </div>
  );
};
export default Cryptowallet;
