"use client";

import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState,useEffect } from "react";
import { useAppDispatch,useAppSelector } from "@/lib/hooks";
import { getUserSocialProfile } from "@/lib/middleware/profile";

const Backward = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  
  useEffect(() => {
    const userid = localStorage.getItem("_id");
    console.log("user id ", userid);
    dispatch(getUserSocialProfile(userid));
  }, []);


  
  const myProfile = useAppSelector(
    (state) => state?.getUserSocialProfile?.myProfile?.data
  );

  console.log("my Social Profile info is", myProfile);
  return (
        <div className="flex gap-[12px] md:gap-[16px] ">
          <button onClick={() => router.back()}>
            <ArrowLeft size={20} />
          </button>
          <p className="text-sm sm:text-base font-bold">Organizer Profile</p>
        </div>
  );
};

export default Backward;
