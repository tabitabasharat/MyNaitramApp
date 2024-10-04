"use client";

// import { ArrowLeft } from "@/assets/Wallet/back-btn-event.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState,useEffect } from "react";
import { useAppDispatch,useAppSelector } from "@/lib/hooks";
import { getUserSocialProfile } from "@/lib/middleware/profile";
import backbtn from "@/assets/Wallet/back-btn-create.svg"

const Backward = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  
  useEffect(() => {
    if (typeof window !== "undefined") {

      const userid = localStorage.getItem("_id");
      console.log("user id ", userid);
      dispatch(getUserSocialProfile(userid));
    }
  }, []);


  
  const myProfile = useAppSelector(
    (state) => state?.getUserSocialProfile?.myProfile?.data
  );

  console.log("my Social Profile info is", myProfile);
  return (
        <div className="flex items-center gap-[12px] md:gap-[16px] ">
          <button onClick={() => router.back()}>
          <Image
                src={backbtn}
                width={44}
                height={44}
                alt="back btn"
                className="lg:w-[44px] lg:h-[44px] w-[40px] h-[40px]"
              />
          </button>
          <p className="text-sm sm:text-[24px] font-extrabold">Back</p>
        </div>
  );
};

export default Backward;
