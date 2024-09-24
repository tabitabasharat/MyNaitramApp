"use client";
import { useState, useEffect } from "react";
import ReceviePaymentModal from "../GetPaidOrganiser/ReceivePaymentModal";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import SubmitSucessModal from "../GetPaidOrganiser/SubmitSuccessModal";
import Image from "next/image";
import backbtn from "@/assets/Wallet/back-btn-create.svg";

const BankAccountPayoutDetail = () => {
  const dispatch = useAppDispatch();
  const [openModal, setOpenModal] = useState(false);
  const eventAllData = "hello";
  return (
    <div className="w-full md:w-[70%] px-[24px] md:px-[0px] mb-[120px] lg:px-[114px] xl:ps-[114px] xl:pe-[200px] md:mx-auto lg:w-full mt-[38px] md:mt-[90px] lg:mx-0 relative lg:h-[auto] h-[auto]">
      <h2 className=" font-bold lg:text-[24px] ms-[20px] lg:ms-[0px] mb-[24px] lg:mb-[32px] text-[32px]">
        Bank Accounts
      </h2>
      <Image
        src={backbtn}
        width={44}
        height={44}
        alt="back btn"
        className="lg:w-[44px] lg:h-[44px] w-[40px] h-[40px]"
      />
    
    </div>
  );
};
export default BankAccountPayoutDetail;
