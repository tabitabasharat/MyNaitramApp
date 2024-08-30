import {
  FacebookLogo,
  InstagramLogo,
  SealCheck,
  TiktokLogo,
  XLogo,
  TwitterLogo,
  LinkedinLogo,
  TelegramLogo,
} from "@phosphor-icons/react/dist/ssr";
import GoldGradientBorder from "../ui/gold-gradient-border";
import { shimmer, toBase64 } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import JoinEventCard from "@/components/reusable-components/JoinEventCard";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getUserSocialProfile } from "@/lib/middleware/profile";

const ProfileDetails = () => {
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
    <div className="flex flex-col md:flex-row w-full items-center justify-between">
      <div className="flex flex-col w-[100%] md:flex-row gap-[24] md:gap-[32px] justify-center items-center md:justify-start md:items-start">
        <GoldGradientBorder className="w-fit rounded-full p-[3px] h-fit">
          <div className="bg-black rounded-full p-[7px]">
            <Image
              src={myProfile?.profilePicture}
              width={136}
              height={136}
              className="h-[128px] w-[128px] sm:h-[136px] sm:w-[136px] object-cover object-top rounded-full"
              placeholder={`data:image/svg+xml;base64,${toBase64(
                shimmer(1200, 1800)
              )}`}
              alt=""
            />
          </div>
        </GoldGradientBorder>
        <div className="w-full md:w-fit ">
          <p className="font-extrabold mt-[12px] flex justify-center md:justify-start items-center gap-1 text-[24px]">
            {myProfile?.fullname}{" "}
            <SealCheck
              className="text-[#FFC109] w-[16px] h-[16px] sm::w-[20px] sm:h-[20px] -translate-y-1"
              // size={20}
              weight="fill"
            />
          </p>
          <p className="text-primary font-extrabold text-sm md:pt-[6px] md:pb-[4px] sm:text-base text-center md:text-left">
            {myProfile?.email}
          </p>
          <p className="mt-1 font-bold text-center md:text-left hidden md:block">
            <span className="text-[24px] sm:text-base">
              {" "}
              {myProfile?.totalAttendees}{" "}
              <span className="text-[12px] sm:text-base sm:text-[white] text-[#A6A6A6]">
                {" "}
                Attended
              </span>
            </span>{" "}
            <span className="opacity-50 "> | </span>{" "}
            <span className="text-[24px] sm:text-base">
              {myProfile?.totalEvents}{" "}
              <span className="text-[12px] sm:text-base sm:text-[white] text-[#A6A6A6]">
                {" "}
                Events{" "}
              </span>
            </span>
          </p>

          <div className="md:hidden border border-[#0FFF7730] rounded-lg gradient-slate flex justify-evenly items-center w-full  mt-5">
            <div className="flexc flex-col items-center justify-center py-[16px] font-bold text-center">
              <p className="text-[18px]">32</p>
              <p className="text-[12px] opacity-50">ATTENDED</p>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div className="flexc flex-col items-center py-[16px] justify-center font-bold text-center">
              <p className="text-[18px]">251</p>
              <p className="text-[12px] opacity-50">EVENTS</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center md:justify-start md:mt-[0px] gap-[8px] sm:gap-3 h-full mt-6">
        <Link
          href={myProfile?.liveActivity?.instaUrl || "#"}
          passHref
          target="_blank"
        >
          <div className="border border-white w-fit h-fit sm:p-3 p-[10px] flex items-center justify-center rounded-full h-[36px] w-[36px] sm:h-[44px] sm:w-[44px] hover:bg-white hover:text-black duration-300">
            <InstagramLogo
              className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]"
              weight="fill"
            />
          </div>
        </Link>
        <Link
          href={myProfile?.liveActivity?.telegramUrl || "#"}
          target="_blank"
        >
          <div className="border border-white w-fit sm:p-3 p-[10px] h-fit flex items-center justify-center rounded-full h-[36px] w-[36px] sm:h-[44px] sm:w-[44px] hover:bg-white hover:text-black duration-300">
            <TelegramLogo
              className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]"
              weight="fill"
            />
          </div>
        </Link>
        <Link href={myProfile?.liveActivity?.fbUrl || "#"} target="_blank">
          <div className="border border-white w-fit sm:p-3 p-[10px] h-fit flex items-center justify-center rounded-full h-[36px] w-[36px] sm:h-[44px] sm:w-[44px] hover:bg-white hover:text-black duration-300">
            <FacebookLogo
              className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]"
              weight="fill"
            />
          </div>
        </Link>
        <Link
          href={myProfile?.liveActivity?.linkedinUrl || "#"}
          target="_blank"
        >
          <div className="border border-white w-fit sm:p-3 p-[10px] h-fit flex items-center justify-center rounded-full h-[36px] w-[36px] sm:h-[44px] sm:w-[44px] hover:bg-white hover:text-black duration-300">
            <LinkedinLogo
              className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]"
              weight="fill"
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProfileDetails;
