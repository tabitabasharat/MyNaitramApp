"use client";
import React from "react";
import LunchModal from "./LunchModal";
import { useAppDispatch } from "@/lib/hooks";
import { OrgProfileCheck } from "@/lib/middleware/organizer";
import { useState, useEffect } from "react";
import ScreenLoader from "../loader/Screenloader";
import {
  SuccessToast,
  ErrorToast,
} from "../reusable-components/Toaster/Toaster";
import { useRouter } from "next/navigation";

function LunchEvent() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [isCreateModalOpen, setisCreateModalOpen] = useState(false);
  const LunchModalhandler = () => {
    setisCreateModalOpen(true);
  };

  async function checkProfile() {
    setLoader(true);
    const userID =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;
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
  return (
    <div className="w-full flex justify-center flex-col items-center h-[90vh] md:h-[88vh] lg:h-[91%] mt-[45px] bg-lunchevent-img">
      <p className="font-extrabold text-[30px] text-center lg:text-[64px]">
        Let’s launch your event
      </p>
      <div
        className="flex justify-center cursor-pointer items-center rounded-[44px] gap-[6px] w-[151px] gradient-bg gradient-border-edit p-[12px]"
        onClick={() => checkProfile()}
      >
        <p className="text-[#00D059] text-sm font-extrabold cursor-pointer">Let’s Create</p>
      </div>
      {isCreateModalOpen && (
        <LunchModal
          onClose={() => setisCreateModalOpen(false)}
          open={() => setisCreateModalOpen(true)}
        />
      )}
    </div>
  );
}

export default LunchEvent;
