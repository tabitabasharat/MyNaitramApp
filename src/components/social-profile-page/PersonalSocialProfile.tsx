"use client";

import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import ProfileDetails from "./ProfileDetails";
import PostTabs from "./PostTabs";
import { useRouter } from "next/navigation";
import { truncateString } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getUserSocialProfile } from "@/lib/middleware/profile";

const PersonalSocialProfile = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userid = typeof window !== "undefined" ?  localStorage.getItem("_id") : null;
    console.log("user id ", userid);
    dispatch(getUserSocialProfile(userid));
  }, []);

  const myProfile = useAppSelector(
    (state) => state?.getUserSocialProfile?.myProfile?.data
  );

  console.log("my Social Profile info is", myProfile);
  return (
    <div className="min-h-screen relative flex flex-col items-center overflow-hidden">
      <Image
        style={{ filter: "blur(40px)" }}
        width={1000}
        height={1000}
        src={myProfile?.profilePicture ? myProfile?.profilePicture : "/person3.jpg"}
        className="w-full object-cover absolute top-0 object-top z-0 opacity-[0.22] h-screen"
        alt="img"
      />
      <div className="pb-[72px] w-full md:px-[75px] px-[24px] lg:px-[0px]  mx-2xl  pt-[108px] pb-12 lg:pt-[132px] lg:pb-36 relative z-[2] lg:w-[80%]">
        <div className="flex gap-[12px] md:gap-[16px] sm:mb-[44px] mb-[52px] ">
          <button onClick={() => router.back()}>
            <ArrowLeft size={20} />
          </button>
          <p className="text-sm sm:text-base font-bold">
            Personal Social Profile
          </p>
        </div>
        

        <ProfileDetails />
      
        <PostTabs />
      </div>
    </div>
  );
};

export default PersonalSocialProfile;
