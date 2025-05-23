"use client";
// import SubmitSucessModal from "../GetPaidOrganiser/SubmitSuccessModal";
import Image from "next/image";
import backward from "@/assets/Back - Button.svg";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import trash from "@/assets/trash.svg";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import add from "@/assets/Plus.svg";
import Link from "next/link";
import {
  getPayoutBankDetail,
  deleteBankAccount,
} from "@/lib/middleware/payout";
import {
  SuccessToast,
  ErrorToast,
} from "@/components/reusable-components/Toaster/Toaster";
import ScreenLoader from "@/components/loader/Screenloader";
import addicon from "@/assets/Wallet/plus-black.svg";
import { Button } from "@/components/ui/button";

const BankAccountPayoutDetail = () => {
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const dispatch = useAppDispatch();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [deletedID, setDeletedID] = useState<number | null>(null);

  const [openModal, setOpenModal] = useState(false);
  const eventAllData = "hello";

  const handleClick = (index: number, deletedId: any) => {
    setActiveIndex(index);
    setDeletedID(deletedId);
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

  async function deleteBank(deletedId: any) {
    setDeletedID(deletedId);
    setLoader(true);
    const userID =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    console.log("my deleted id", deletedID);

    try {
      dispatch(deleteBankAccount(deletedID)).then((res: any) => {
        if (res?.payload?.status === 200) {
          setLoader(false);

          SuccessToast("Account Deleted Successfully");
          dispatch(getPayoutBankDetail(userID));
          setDeletedID(null);
          setActiveIndex(null);
          // localStorage.clear();
          // router.push("/");
        } else {
          setLoader(false);
          console.log(res?.payload?.message);

          ErrorToast(
            res?.payload?.message || "Please select any bank account before deleting bank account detail."
          );
        }
      });
    } catch (error: any) {
      console.error("Error:", error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "An unexpected error occurred.";
      ErrorToast(errorMessage);
    }
  }
  const userloading = useAppSelector((state) => state?.getPayoutBankDetail);

  return (
    <div className="pt-[42px] pb-[59.12px] lg:pb-[26.25px] px-[24px] lg:px-[100px] xl:px-[216px] md:pt-[90px] mx-auto">
      <div
        className={`w-full  ${myBankDetail?.length == null ? "w-full" : "md:w-[676px]"
          }`}
      >
        <p className="block ms-[25px] mb-[32px] sm:mb-[0px] sm:hidden text-[24px] font-extrabold">
          Profile Menu
        </p>
        {userloading.loading && <ScreenLoader />}

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
            Bank Accounts{" "}
          </p>
        </div>
        {myBankDetail?.length > 0 && (
          <div className="flex gap-[12px] btons-wrap-adjustment mb-[32px] w-full md:justify-end">
            <Link
              href="/organizer-event/payout-detail/bankaccount/add-bank-account"
              className="w-full md:w-fit"
            >
              <Button className="text-[#00D059] text-[11px] font-extrabold table-gradient w-full md:w-fit py-[10px] px-[0px] md:p-[20px] rounded-[100px] add-bank-account-border flex items-center justify-center gap-[8px]">
                {" "}
                <Image
                  src={add}
                  alt="add"
                  className="lg:h-[12px] lg:w-[12px] w-[16px] h-[16px]"
                />{" "}
                <p>Add Bank Account </p>
              </Button>
            </Link>

            <Button
              className={`text-[14px] font-extrabold bg-[#FF1717B2] text-[white] flex items-center h-auto justify-center gap-[6px] py-[10px] ps-[10px] pr-[16px] rounded-[100px] w-auto ${!deletedID ? "opacity-50 cursor-not-allowed" : ""
                }`}
              onClick={deleteBank}
              disabled={!deletedID}
            //     className="bg-[#FF1717B2] text-[11px] font-extrabold w-full md:w-fit py-[10px] px-[0px] text-[white]
            //  md:p-[20px] rounded-[100px] flex items-center justify-center gap-[8px]"
            //     onClick={() => deleteBank()}
            >
              {" "}
              <Image
                src={trash}
                alt="trash-icon"
                className=" lg:h-[12px] lg:w-[12px] w-[16px] h-[16px]"
              />{" "}
              <p> Delete Bank Account </p>
            </Button>
          </div>
        )}
        <div className="flex gap-[32px] lg:gap-[24px] flex-col h-[500px] overflow-auto scrollbar-hide">
          {myBankDetail?.length > 0 ? (
            myBankDetail?.map((item: any, index: any) => (
              <div
                key={index}
                className={`w-full gap-[16px] gradient-slate md:w-[676px] p-[16px] rounded-[12px] flex flex-col  ${activeIndex === index ? "gradient-border" : ""
                  }`}
                onClick={() => handleClick(index, item?.id)}
              >
                <div
                  className="flex justify-between md:items-center
                 lg:items-center items-start wallet-div-content"
                >
                  <p className="text-sm font-normal text-[#E6E6E6]">
                    Bank Name
                  </p>
                  <p className="text-[#E6E6E6] text-base font-bold alignment-text">
                    {item?.bankName}
                  </p>
                </div>
                <div
                  className="flex justify-between lg:items-center md:items-center
                 items-start wallet-div-content"
                >
                  <p className="text-sm font-normal text-[#E6E6E6]">
                    Title of Account
                  </p>
                  <p className="text-[#E6E6E6] text-base font-bold alignment-text">
                    {item?.accountTitle}
                  </p>
                </div>
                <div
                  className="flex justify-between lg:items-center  md:items-center
                items-start wallet-div-content"
                >
                  <p className="text-sm font-normal text-[#E6E6E6]">
                    Account Number
                  </p>
                  <p
                    className="text-[#E6E6E6] text-base font-bold 
                    md:text-end lg:text-end alignment-text truncate w-full lg:w-auto"
                  >
                    {item?.IBAN}
                  </p>
                </div>
                <div
                  className="flex justify-between lg:items-center md:items-center
                 items-start wallet-div-content"
                >
                  <p className="text-sm font-normal text-[#E6E6E6]">
                    Country/City
                  </p>
                  <p className="text-[#E6E6E6] alignment-text text-base alignment-text font-bold alignment-text">
                    {item?.country}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="relative gradient-slate py-[94.5px] border border-[#292929] flex items-center justify-center flex-col gap-[12px] rounded-[12px] w-full">
              <p className="text-[16px] text-extrabold">
                There's no Bank Account
              </p>
              <Button
                className="text-[14px]  font-extrabold bg-[#00D059] text-[#030303] flex items-center h-auto justify-center gap-[6px] py-[10px] ps-[10px] pr-[16px] rounded-[100px] w-auto "
                onClick={() =>
                  router.push(
                    "/organizer-event/payout-detail/bankaccount/add-bank-account"
                  )
                }
              >
                <Image src={addicon} alt="add-icon" />
                Add Bank Account
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
    // </section>
  );
};
export default BankAccountPayoutDetail;
