"use client";
import SubmitSucessModal from "../../GetPaidOrganiser/SubmitSuccessModal";
import Image from "next/image";
import backward from "@/assets/Back - Button.svg";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import trash from "@/assets/trash.svg";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import add from "@/assets/Plus.svg";
import Link from "next/link";
import rocket from "@/assets/Wallet/rocket-empty.svg";
import addicon from "@/assets/Wallet/plus-black.svg"

import ScreenLoader from "@/components/loader/Screenloader";
import {
  getPayoutCryptoDetail,
  deleteCryptoAccount,
} from "@/lib/middleware/payout";
import {
  SuccessToast,
  ErrorToast,
} from "@/components/reusable-components/Toaster/Toaster";

const Cryptowallet = () => {
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const dispatch = useAppDispatch();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [deletedID, setDeletedID] = useState<number | null>(null);

  const handleClick = (index: number, id: number) => {
    setActiveIndex(index);
    setDeletedID(id);
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

  async function deleteBank() {
    setLoader(true);
    const userID =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    console.log("my deleted id", deletedID);

    try {
      dispatch(deleteCryptoAccount(deletedID)).then((res: any) => {
        if (res?.payload?.status === 200) {
          setLoader(false);

          SuccessToast("Account Deleted Successfully");
          dispatch(getPayoutCryptoDetail(userID));
          // localStorage.clear();
          // router.push("/");
        } else {
          setLoader(false);
          console.log(res?.payload?.message);

          ErrorToast(
            res?.payload?.message || "An error occurred during deletion."
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
  return (
    <div className="pt-[42px] pb-[59.12px] lg:pb-[26.25p] px-[24px] lg:px-[100px] xl:px-[216px] md:pt-[90px] mx-auto">
      {userloading.loading && <ScreenLoader />}

      <div
        className={`w-full  ${
          myCryptoHistory?.length == null ? "w-full" : "md:w-[676px]"
        }`}
      >
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
        {myCryptoHistory?.length > 0 && (
          <div className="flex md:gap-[12px] gap-[10px] btons-wrap-adjustment mb-[32px] w-full md:justify-end">
            <Link
              href="/organizer-event/payout-detail/cryptowallet/addCryptowallet"
              className="w-full md:w-fit"
            >
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

            <button
              className="bg-[#FF1717B2] text-[11px] font-extrabold w-full 
          md:w-fit py-[10px] px-[0px] text-[white] md:p-[20px]
           rounded-[100px] flex items-center justify-center gap-[8px]"
              onClick={() => deleteBank()}
            >
              {" "}
              <Image
                src={trash}
                alt="trash-icon"
                className=" lg:h-[12px] lg:w-[12px] w-[16px] h-[16px]"
              />{" "}
              <p> Delete Crypto Account </p>
            </button>
          </div>
        )}

        <div className="flex gap-[32px] lg:gap-[24px] flex-col h-[500px] overflow-y-auto w-full scrollbar-hide">
          {myCryptoHistory?.length > 0 ? (
            myCryptoHistory?.map((item: any, index: any) => (
              <div
                key={index}
                className={`w-full gap-[16px] gradient-slate md:w-[676px] p-[16px] rounded-[12px] flex flex-col  ${
                  activeIndex === index ? "gradient-border" : ""
                }`}
                onClick={() => handleClick(index, item?.id)}
              >
                <div className="flex justify-between lg:items-center items-start wallet-div-content">
                  <p className="text-sm font-normal text-[#A6A6A6] ">
                    Wallet Name
                  </p>
                  <p className="text-[#E6E6E6] text-base font-bold alignment-text">
                    {item?.walletName}
                  </p>
                </div>
                <div className="flex justify-between lg:items-center items-start wallet-div-content">
                  <p className="text-sm font-normal text-[#A6A6A6]  ">
                    Wallet Address
                  </p>
                  <p className="text-[#E6E6E6] text-base font-bold lg:text-end alignment-text truncate w-full lg:w-auto">
                    {item?.walletAddress}
                  </p>
                </div>
                <div className="flex justify-between lg:items-center items-start wallet-div-content">
                  <p className="text-sm font-normal text-[#A6A6A6]">Chain</p>
                  <p className="text-[#E6E6E6] text-base font-bold alignment-text">
                    {item?.chain}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="relative gradient-slate py-[94.5px] border border-[#292929] flex items-center justify-center flex-col gap-[12px] rounded-[12px] w-full">
              <p className="text-[16px] text-extrabold">There's no Crypto Wallet</p>
              <button
                className="text-[16px]  font-extrabold bg-[#00D059] text-[#030303] flex items-center h-auto justify-center gap-[6px] py-[10px] ps-[10px] pr-[16px] rounded-[100px] w-auto "
                onClick={() => router.push("/organizer-event/payout-detail/cryptowallet/addCryptowallet")}
              >
                <Image src={addicon} alt="add-icon" />
               Add Crypto Wallet
              </button>
            </div>
          )}
        </div>

        {/* <div
          onClick={() => setOpenModal(true)}
          className="flex lg:mb-[158px] mb-[32px] mt-[39px] md:mt-[32px] w-full mt-[20px] lg:mt-[32px] md:w-[676px]"
        >
          <button className="text-sm w-full lg:text-base font-extrabold bg-[#00D059] text-[black] rounded-[200px] md:px-[62px] md:py-[12px] py-[16px]">
            Payout
          </button>
          {openModal && (
          <SubmitSucessModal
            onClose={() => setOpenModal(false)}
            open={() => setOpenModal(true)}
          />
        )}
        </div> */}
      </div>
    </div>
  );
};
export default Cryptowallet;
