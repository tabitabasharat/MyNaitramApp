"use client";
import SubmitSucessModal from "../GetPaidOrganiser/SubmitSuccessModal";
import Image from "next/image";
import backward from "@/assets/Back - Button.svg";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";

const BankAccountPayoutDetail = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const eventAllData = "hello";

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="pt-[120px] pb-[59.12px] lg:pb-[26.25px] px-[24px] bank-bg-effect lg:px-[100px] xl:px-[216px] md:pt-[132px] mx-auto">
      <div
        onClick={() => router.back()}
        className="mb-[32px] gap-[16px] w-full lg:w-[676px] items-center flex lg:w-[903px] w-full lg:mb-[24px]"
      >
        <Image
          src={backward}
          alt="back-btn"
          className="w-[44px] h-[44px]"
          sizes="44px"
        />
        <p className="lg:text-[24px] font-extrabold text-[15px]">
          {" "}
          Bank Accounts{" "}
        </p>
      </div>
      <div className="flex gap-[12px] justify-end">
        <button className="text-[#00D059] bg-[green] p-[20px] rounded-[100px]">Add Bank Account</button>
        <button className="bg-[#FF1717B2] text-[white] p-[20px] rounded-[100px]">Delete Bank Account</button>
      </div>
      <div className="flex gap-[32px] lg:gap-[24px] flex-col">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className={`w-full gap-[16px] gradient-slate md:w-[676px] p-[16px] rounded-[12px] ${
              activeIndex === index ? "gradient-border" : ""
            }`} // Apply the gradient-border class only if the current div is active
            onClick={() => handleClick(index)} // Set the clicked div as active
          >
            <div className="flex justify-between items-center">
              <p className="text-sm font-normal text-[#E6E6E6]">Bank Name</p>
              <p className="text-[#E6E6E6] text-base font-bold">Lloyd Bank</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm font-normal text-[#E6E6E6]">
                Title of Account
              </p>
              <p className="text-[#E6E6E6] text-base font-bold">
                John Williams
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm font-normal text-[#E6E6E6]">
                Account Number
              </p>
              <p className="text-[#E6E6E6] text-base font-bold">
                126283399384039
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm font-normal text-[#E6E6E6]">Country/City</p>
              <p className="text-[#E6E6E6] text-base font-bold">USA/Texas</p>
            </div>
          </div>
        ))}
      </div>

      <div
        onClick={() => setOpenModal(true)}
        className="flex lg:mb-[158px] mb-[32px] w-full mt-[20px] lg:mt-[32px] md:w-[676px]"
      >
        <button className="text-sm w-full lg:text-base font-extrabold bg-[#00D059] text-[black] rounded-[200px] md:px-[62px] md:py-[12px] py-[16px]">
          Submmit
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
export default BankAccountPayoutDetail;
