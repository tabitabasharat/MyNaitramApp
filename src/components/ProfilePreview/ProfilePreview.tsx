"use client";
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
import sealnew from "@/assets/Wallet/Sealnew.svg";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getUserSocialProfile } from "@/lib/middleware/profile";
import {
  getOrganizerSocialProfile,
  getOrganizerLiveSocialProfile,
} from "@/lib/middleware/organizer";
import { YoutubeLogo } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

const ProfilePreview = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<any>("");
  const [userName, setUsername] = useState<any>("");
  const [userId, setUserId] = useState<any>("");

  useEffect(() => {
    const userid =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    const useremail =
      typeof window !== "undefined" ? localStorage.getItem("email") : null;
    setUserEmail(useremail);
    const username =
      typeof window !== "undefined" ? localStorage.getItem("name") : null;

    setUsername(username);

    console.log("user id ", userid);
  }, []);

  useEffect(() => {
    const currentUrl: any =
      typeof window !== "undefined" ? window.location.href : null;
    const parts = currentUrl.split("/");
    const value = parts[parts.length - 1];
    setUserId(value);
    console.log("my user id is", value);
    // dispatch(getOrganizerSocialProfile(value));
    dispatch(getOrganizerLiveSocialProfile(value));

    // dispatch(getEventById(value));
  }, []);

  // const myProfile = useAppSelector(
  //   (state) => state?.getOrgSocialProfile?.mySocialData?.data
  // );

  const myProfile = useAppSelector(
    (state) => state?.getOrgLiveSocialProfile?.mySocialData?.data
  );
  console.log("my Social Profile infooo is", myProfile);

  return (
    <div className="flex flex-col w-full md:flex-row w-full items-center justify-between">
      <div className="flex flex-col w-[100%] md:flex-row gap-[24] md:gap-[32px] justify-center items-center md:justify-start md:items-start">
        <GoldGradientBorder className="w-fit sm:w-[136px] md:w-[136px] lg:w-[136px] rounded-full p-[3px] h-fit">
          <div className="bg-black h-[136px] rounded-full p-[7px]">
            <Image
              src={
                myProfile?.data?.profile?.profilePicture
                  ? myProfile?.data?.profile?.profilePicture
                  : "/person3.jpg"
              }
              width={136}
              height={136}
              className="h-[128px] w-[128px] sm:h-[120px] sm:w-[120px] object-cover object-top rounded-full cursor-pointer"
              placeholder={`data:image/svg+xml;base64,${toBase64(
                shimmer(1200, 1800)
              )}`}
              alt=""
              onClick={()=> router.push("/organizer-event/profile")}
            />
          </div>
        </GoldGradientBorder>
        <div className="w-full md:w-fit ">
          <p className="font-extrabold mt-[24px] mb-[8px] flex justify-center md:justify-start  gap-1 text-[24px]">
            {myProfile?.data?.userProfile?.fullname}{" "}
            {/* <Image src={sealnew} alt="verified" /> */}
            {/* <SealCheck
              className="text-[#FFC109] w-[20px] h-[20px] sm::w-[20px] sm:h-[20px]  "
              
              weight="fill"
            /> */}
          </p>
          <p className="text-primary font-extrabold text-sm sm:text-base text-center md:text-left">
            {myProfile?.data?.userProfile?.email}
          </p>
          <p className="mt-1 font-bold text-center md:text-left hidden md:block">
            <span className="text-[24px] sm:text-base">
              {myProfile?.data?.profile?.totalEvents}{" "}
              <span className="text-[12px] sm:text-base sm:text-[white] text-[#A6A6A6]">
                {" "}
                Events{" "}
              </span>
            </span>
            <span className="opacity-50 "> | </span>{" "}
            <span className="text-[24px] sm:text-base">
              {" "}
              {myProfile?.data?.profile?.totalAttendees}{" "}
              <span className="text-[12px] sm:text-base sm:text-[white] text-[#A6A6A6]">
                {" "}
                Attendees
              </span>
            </span>{" "}
          </p>

          <div className="md:hidden border border-[#0FFF7730] rounded-lg gradient-slate flex justify-evenly items-center w-full  mt-[20px]">
            <div className="flex flex-col items-center py-[16px] justify-center font-bold text-center">
              <p className="text-[18px]">
                {myProfile?.data?.profile?.totalEvents}
              </p>
              <p className="text-[12px] opacity-50">EVENTS</p>
            </div>
            <div className="w-px h-8 bg-white/20"></div>

            <div className="flexc flex-col items-center justify-center py-[16px] font-bold text-center">
              <p className="text-[18px]">
                {" "}
                {myProfile?.data?.profile?.totalAttendees}
              </p>
              <p className="text-[12px] opacity-50">ATTENDEES</p>
            </div>
          </div>
          {myProfile?.data?.profile?.bio && (
            <p className="font-normal text-center md:text-start break-words overflow-hidden w-full lg:w-[70%] text-sm mt-[24px] lg:mt-[8px] mb-[16px] lg:mb-[24px]">
              {myProfile?.data?.profile?.bio}
            </p>
          )}
          <div className="flex flex-wrap justify-center md:justify-start mt-6 gap-[8px] sm:gap-3 h-full ">
            {myProfile?.data?.profile?.instaUrl &&
              myProfile?.data?.profile?.instaUrl !==
                "https://instagram.com/" && (
                <Link
                  href={myProfile?.data?.profile?.instaUrl || "#"}
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
              )}

            {myProfile?.data?.profile?.telegramUrl &&
              myProfile?.data?.profile?.telegramUrl !== "https://t.me/" && (
                <Link
                  href={myProfile?.data?.profile?.telegramUrl || "#"}
                  target="_blank"
                >
                  <div className="border border-white w-fit sm:p-3 p-[10px] h-fit flex items-center justify-center rounded-full h-[36px] w-[36px] sm:h-[44px] sm:w-[44px] hover:bg-white hover:text-black duration-300">
                    <TelegramLogo
                      className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]"
                      weight="fill"
                    />
                  </div>
                </Link>
              )}

            {myProfile?.data?.profile?.fbUrl &&
              myProfile?.data?.profile?.fbUrl !==
                "https://www.facebook.com/" && (
                <Link
                  href={myProfile?.data?.profile?.fbUrl || "#"}
                  target="_blank"
                >
                  <div className="border border-white w-fit sm:p-3 p-[10px] h-fit flex items-center justify-center rounded-full h-[36px] w-[36px] h-[36px] sm:h-[44px] sm:w-[44px] hover:bg-white hover:text-black duration-300">
                    <FacebookLogo
                      className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]"
                      weight="fill"
                    />
                  </div>
                </Link>
              )}
            {myProfile?.data?.profile?.twitterUrl &&
              myProfile?.data?.profile?.twitterUrl !== "https://www.x.com/" && (
                <Link
                  href={myProfile?.data?.profile?.twitterUrl || "#"}
                  target="_blank"
                >
                  <div className="border border-white w-fit sm:p-3 p-[10px] h-fit flex items-center justify-center rounded-full h-[36px] w-[36px] sm:h-[44px] sm:w-[44px] hover:bg-white hover:text-black duration-300">
                    <TwitterLogo
                      className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]"
                      weight="fill"
                    />
                  </div>
                </Link>
              )}

            {myProfile?.data?.profile?.youtubeUrl &&
              myProfile?.data?.profile?.youtubeUrl !==
                "https://www.youtube.com/" && (
                <Link
                  href={myProfile?.data?.profile?.youtubeUrl || "#"}
                  target="_blank"
                >
                  <div className="border border-white w-fit sm:p-3 p-[10px] h-fit flex items-center justify-center rounded-full h-[36px] w-[36px] sm:h-[44px] sm:w-[44px] hover:bg-white hover:text-black duration-300">
                    <YoutubeLogo
                      className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]"
                      weight="fill"
                    />
                  </div>
                </Link>
              )}

            {myProfile?.data?.profile?.tiktokUrl &&
              myProfile?.data?.profile?.tiktokUrl !==
                "https://www.tiktok.com/@" && (
                <Link
                  href={myProfile?.data?.profile?.tiktokUrl || "#"}
                  target="_blank"
                >
                  <div className="border border-white w-fit sm:p-3 p-[10px] h-fit flex items-center justify-center rounded-full h-[36px] w-[36px] sm:h-[44px] sm:w-[44px] hover:bg-white hover:text-black duration-300">
                    <TiktokLogo
                      className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]"
                      weight="fill"
                    />
                  </div>
                </Link>
              )}

            {myProfile?.data?.profile?.linkedinUrl &&
              myProfile?.data?.profile?.linkedinUrl !==
                "https://linkedin.com/in/" && (
                <Link
                  href={myProfile?.data?.profile?.linkedinUrl || "#"}
                  target="_blank"
                >
                  <div className="border border-white w-fit sm:p-3 p-[10px] h-fit flex items-center justify-center rounded-full h-[36px] w-[36px] sm:h-[44px] sm:w-[44px] hover:bg-white hover:text-black duration-300">
                    <LinkedinLogo
                      className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]"
                      weight="fill"
                    />
                  </div>
                </Link>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePreview;
