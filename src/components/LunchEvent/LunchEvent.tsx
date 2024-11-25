"use client";
import React from "react";
import LunchModal from "./LunchModal";
import { OrgProfileCheck } from "@/lib/middleware/organizer";
import { useState, useEffect } from "react";
import { SuccessToast, ErrorToast } from "../reusable-components/Toaster/Toaster";
import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import ScreenLoader from "@/components/loader/Screenloader";
import { getUserInfoByUserId, createExpressAccountByUserId } from "@/lib/middleware/organizer";
import { useMeridiemMode } from "@mui/x-date-pickers/internals/hooks/date-helpers-hooks";

function LunchEvent() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [isCreateModalOpen, setisCreateModalOpen] = useState(false);

  const [isAccountCreated, setAccountCreated] = useState(false);
  const [islinkVrified, setLinkVerified] = useState(false);
  const [currentLink, setCurrentLink] = useState("");

  const LunchModalhandler = () => {
    setisCreateModalOpen(true);
  };

  // 1)
  // Check First strip Account setUp or not by getting user Info
  useEffect(() => {
    setLoader(true);
    const userID = typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    if (userID) {
      setLoader(false);
      dispatch(getUserInfoByUserId(userID));
    } else {
      setLoader(false);
    }
  }, []);

  // 2) Get the Data from get request of UserInfo
  const UserInfo = useAppSelector((state) => state?.getUserInfoById?.userInfoData?.data);
  // console.log("User Info is As===> ", UserInfo);
  const userLoading = useAppSelector((state) => state?.getUserInfoById);

  // 3) Hold the state of loader untill userInfo loads
  useEffect(() => {
    setLoader(userLoading?.loading);
  }, [userLoading]);

  // 4) Set the state to check weather the Strip Account created ot not
  useEffect(() => {
    if (UserInfo?.stripCreated) {
      setAccountCreated(true);
    }
    if (UserInfo?.stripVerified) {
      setLinkVerified(true);
    }
  }, [UserInfo]);

  // Last) check first Organizer Profile on clicking the Launch Event Btn
  async function checkProfile() {
    setLoader(true);
    const userID = typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    try {
      const data = {
        userId: userID,
      };
      dispatch(OrgProfileCheck(data)).then((res: any) => {
        if (res?.payload?.status === 200) {
          setLoader(false);
          console.log("Profile res", res?.payload);
          if (res?.payload?.data?.status == true) {
            console.log("status is", res?.payload?.data?.status);
            router.push("/organizer-create-event");
          } else {
            setisCreateModalOpen(true);
            // router.push("/organizer-event/profile");
          }
        } else {
          setLoader(false);
          console.log(res?.payload?.message);
          setisCreateModalOpen(true);
        }
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // If the Stripe Account is not Created then

  // 4) If Stripe Account is not created then Call this function
  const handleAaccountCreated = () => {
    // Check First strip Account setUp or not
    setLoader(true);
    const userID = typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    if (userID) {
      dispatch(createExpressAccountByUserId(userID));
    } else {
      setLoader(false);
    }
  };

  // 5) Get the Data from response of Express Account created for Strip Link
  const accountData = useAppSelector((state) => state?.createExpressAccount?.accountData?.data);
  const accountCreationStatus = useAppSelector((state) => state?.createExpressAccount?.accountData?.status);
  const accountCreationLoader = useAppSelector((state) => state?.createExpressAccount);

  // 6) After getting the strip account created set state data with response pf express Account created
  useEffect(() => {
    console.log("This is Link Statuds ===> ", accountData);
    if (accountCreationStatus === 200) {
      console.log("This is link Data ===> ", accountData?.stripLink);
      setLoader(accountCreationLoader?.loading);
      setCurrentLink(accountData?.stripLink);
    } else {
      setLoader(false);
    }
  }, [accountData, accountCreationStatus]);

  // 7) Send user to the Strip web Through this function
  const handleLinkVerification = (link: string) => {
    window.location.href = link;
  };

  return loader ? (
    <ScreenLoader />
  ) : isAccountCreated && islinkVrified ? (
    <div className="w-full flex justify-center flex-col items-center h-[90vh] md:h-[88vh] lg:h-[91%] mt-[45px] bg-lunchevent-img">
      <p className="font-extrabold text-[30px] text-center lg:text-[64px]">Let’s launch your event</p>
      <div
        className="flex justify-center cursor-pointer items-center rounded-[44px] gap-[6px] w-[151px] gradient-bg gradient-border-edit p-[12px]"
        onClick={() => checkProfile()}
      >
        <p className="text-[#00D059] text-sm font-extrabold cursor-pointer">Let’s Host</p>
      </div>
      {isCreateModalOpen && <LunchModal onClose={() => setisCreateModalOpen(false)} open={() => setisCreateModalOpen(true)} />}
    </div>
  ) : (
    <div className="w-full flex justify-start flex-col items-start h-[90vh] md:h-[88vh] lg:h-[91%] mt-[80px] lg:mt-[45px] pl-[24px] lg:pl-[144px] pr-[24px] lg:pr-0">
      <div className="mt-[58px] flex flex-col gap-[32px]">
        <p className="font-extrabold text-[24px] lg:text-[48px] leading-[24px] lg:leading-[55.68px] tracking-[-0.02em] text-left font-nexa">
          Host Event
        </p>
        {currentLink !=="" ? (
          // link Tags Here
          <>
            <div className="font-normal text-[14px] lg:text-[16px] leading-[19.5px] lg:leading-[24px] text-left font-nexa w-[100%] lg:w-[80%] flex flex-col gap-[20px] lg:gap-[16px] text-[#BFBFBF] lg:text-white">
              <p>Here is the link to your stripe account, Please click on this link to get redirected to Stripe and fill your information.</p>
            </div>
            <div className="w-full flex flex-col">
              {/* <p className="md:w-full text-center md:text-start md:ml-[3px] mb-[10px]">Go to Stripe</p> */}
              <div
                onClick={() => handleLinkVerification(currentLink)}
                className="w-[100%] md:w-fit truncate border-none py-[16px] px-[20px] bg-green-500 rounded-[30px] text-[16px] leading-[20px] font-extrabold cursor-pointer text-[#000000]"
              >
                Go to Stripe
                {/* {currentLink} */}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Account Create */}
            <div className="font-normal text-[14px] lg:text-[16px] leading-[19.5px] lg:leading-[24px] text-left font-nexa w-[100%] lg:w-[80%] flex flex-col gap-[20px] lg:gap-[16px] text-[#BFBFBF] lg:text-white">
              <p>
                Before you can host an event you must have an account on Stripe. This stripe account is where Naitram will send payment for the
                tickets bought for your event.
              </p>
              <p>Naitram holds the right to release payment after the event has completed.</p>
              <p>After creating an account on stripe, you will have to fill your personal and financial details on Stripe’s dashboard.</p>
            </div>
            <div
              onClick={() => handleAaccountCreated()}
              className="text-[#030303] font-extrabold text-[14px] leading-[19.6px] text-center font-nexa py-[13px] px-[29.5px] bg-[#00D059] rounded-full w-fit cursor-pointer"
            >
              Create Account
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default LunchEvent;
