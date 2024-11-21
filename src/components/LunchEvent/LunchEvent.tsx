"use client";
import React from "react";
import LunchModal from "./LunchModal";
import { useAppDispatch } from "@/lib/hooks";
import { OrgProfileCheck } from "@/lib/middleware/organizer";
import { useState, useEffect } from "react";
import ScreenLoader from "../loader/Screenloader";
import { SuccessToast, ErrorToast } from "../reusable-components/Toaster/Toaster";
import { useRouter } from "next/navigation";

function LunchEvent() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [isCreateModalOpen, setisCreateModalOpen] = useState(false);

  const [isStripeAccntSetUp, setStripAccountSetUp] = useState(false);
  const [isAcoountCtreated, setAccountCreated] = useState(false);
  const [islinkVrified, setLinkVerified] = useState(false);

  const LunchModalhandler = () => {
    setisCreateModalOpen(true);
  };

  useEffect(() => {
    // Check First strip Account setUp or not
  }, []);

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

  const handleAaccountCreated = () => {
    setAccountCreated(true);
  };

  const handleLinkVerification = () => {
    setLinkVerified(true);
  };

  const handleStripeAaccountSetup = () => {
    setStripAccountSetUp(true);
  };

  return isStripeAccntSetUp ? (
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
        {isAcoountCtreated ? (
          islinkVrified ? (
            <>
              <div className="font-normal text-[14px] lg:text-[16px] leading-[19.5px] lg:leading-[24px] text-left font-nexa w-[100%] lg:w-[80%] flex flex-col gap-[20px] lg:gap-[16px] text-[#BFBFBF] lg:text-white">
                <p>
                  Before you can host an event you must have an account on Stripe. This stripe account is where Naitram will send payment for the
                  tickets bought for your event.
                </p>
              </div>
              <div
                onClick={() => handleStripeAaccountSetup()}
                className="text-[#030303] font-extrabold text-[14px] leading-[19.6px] text-center font-nexa py-[13px] px-[29.5px] bg-[#00D059] rounded-full w-fit cursor-pointer"
              >
                Host Event
              </div>
            </>
          ) : (
            <>
              <div className="font-normal text-[14px] lg:text-[16px] leading-[19.5px] lg:leading-[24px] text-left font-nexa w-[100%] lg:w-[80%] flex flex-col gap-[20px] lg:gap-[16px] text-[#BFBFBF] lg:text-white">
                <p>Here is the link to your stripe account, Please click on this link to get redirected to Stripe and fill your information.</p>
              </div>
              <div className="w-full">
                <div
                  onClick={() => handleLinkVerification()}
                  className="w-[100%] lg:w-[60%] gradient-slate py-[16px] px-[12px] border-[#FFFFFF0F] border-[1px] rounded-md text-[16px] leading-[20px] font-extrabold cursor-pointer"
                >
                  www.stripe.com
                </div>
              </div>
            </>
          )
        ) : (
          <>
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
