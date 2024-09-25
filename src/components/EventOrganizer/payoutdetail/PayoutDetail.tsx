"use client";
import { useState, useEffect } from "react";
import ReceviePaymentModal from "../GetPaidOrganiser/ReceivePaymentModal";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import SubmitSucessModal from "../GetPaidOrganiser/SubmitSuccessModal";
import Link from "next/link";
const PayoutDetail = () => {
  const dispatch = useAppDispatch();
  const [openModal, setOpenModal] = useState(false);
  const eventAllData = "hello";
  return (
    <div className="w-full md:w-[70%] px-[24px] md:px-[0px] mb-[120px] lg:px-[114px] xl:ps-[114px] xl:pe-[200px] md:mx-auto lg:w-full mt-[38px] md:mt-[90px] lg:mx-0 relative lg:h-[auto] h-[auto]">
      <h3 className=" font-bold lg:text-[48px] ms-[20px] lg:ms-[0px] mb-[24px] lg:mb-[32px] text-[32px]">
        Payout Details
      </h3>
      <p className="font-bold lg:font-normal text-sm lg:text-base">
        Consequat bibendum mattis nam tincidunt amet nunc neque nunc blandit.
        Senectus tempor lectus accumsan <br className="hide-text" /> gravida
        neque. Pellentesque scelerisque consectetur nisl ut hac id enim.
        Consequat bibendum mattis nam tincidunt
        <br className="hide-text" />
        amet nunc neque nunc blandit. Senectus tempor lectus accumsan gravida
        neque. Pellentesque scelerisque
        <br className="hide-text" /> consectetur nisl ut hac id enim.
      </p>
      <div className="flex mt-[30px] w-full gap-[15px] lg:mt-[38px]">
      <Link href="/organizer-event/payout-detail/cryptowallet" className="w-full sm:w-fit">
      <div className="w-full">
        <button
          className="text-sm font-extrabold w-full text-center sm:w-[165px] table-gradient gradient-border-notify  rounded-[100px] py-[12px] text-[#00D059]"

        >
          Crypto Wallet
        </button>
        </div>
        </Link>
        <Link href="/organizer-event/payout-detail/bankaccount" className="w-full sm:w-fit">
        <div className="w-full">
        <button className="text-sm font-extrabold text-center w-full sm:w-[165px] rounded-[100px] py-[12px] text-[black] bg-[#00D059]">
          Bank Account
        </button>
        </div>
        </Link>
      </div>

    </div>
  );
};
export default PayoutDetail;
