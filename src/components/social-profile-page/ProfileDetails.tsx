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
import { showProfile } from "@/lib/middleware/profile";
import JoinEventCard from "@/components/reusable-components/JoinEventCard";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getUserSocialProfile } from "@/lib/middleware/profile";
import { YoutubeLogo } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

const ProfileDetails = () => {
  const dispatch = useAppDispatch();
  const [userId, setUserId] = useState<any>("");
  const router = useRouter();

  useEffect(() => {
    const userid =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;

    const currentUrl: any =
      typeof window !== "undefined" ? window.location.href : null;
    const parts = currentUrl.split("/");
    const value = parts[parts.length - 1];
    setUserId(value);
    console.log("user id ", userid);
    dispatch(showProfile(value));
  }, []);

  const myProfile = useAppSelector(
    (state) => state?.getShowProfile?.myProfile?.data
  );

  console.log("my Social Profile info is", myProfile);
  const userLoading = useAppSelector((state) => state?.getShowProfile);

  return (
    <div className="flex flex-col md:flex-row w-full items-center justify-between  gap-[0px] md:gap-[100px]">
      <div className="flex flex-col w-[100%] md:flex-row gap-[24] md:gap-[32px] justify-center items-center md:justify-start md:items-start">
        <GoldGradientBorder className="w-fit rounded-full p-[3px] h-fit">
          <div className="bg-black rounded-full p-[7px]">
            <Image
                      src={
                        myProfile?.profilePicture
                          ? myProfile?.profilePicture
                          : "/person3.jpg"
                      }
              width={136}
              height={136}
              className="h-[128px] w-[128px] sm:h-[136px] sm:w-[136px] object-cover object-top rounded-full cursor-pointer"
              placeholder={`data:image/svg+xml;base64,${toBase64(
                shimmer(1200, 1800)
              )}`}
              alt=""
              onClick ={()=> router.push("/profile/account-settings")}
            />
          </div>
        </GoldGradientBorder>
        <div className="w-full md:w-fit ">
          <p className="font-extrabold mt-[12px] flex justify-center md:justify-start items-center gap-1 text-[24px]">
            {myProfile?.fullname ? myProfile?.fullname : ""}{" "}
            </p>
          <p className="text-primary font-extrabold text-sm md:pt-[6px] md:pb-[4px] sm:text-base text-center md:text-left">
            {myProfile?.email ? myProfile?.email : ""}
          </p>
          <p className="mt-1 font-bold text-center md:text-left hidden md:block">
            <span className="text-[24px] sm:text-base">
              {/* {myProfile?.totalEvents ? myProfile?.totalEvents : 0}{" "} */}
              {myProfile?.eventsCount !== null
                        ? myProfile?.eventsCount
                        : "0"}

              <span className="text-[12px] sm:text-base sm:text-[white] text-[#A6A6A6]">
                {" "}
                Events{" "}
              </span>
            </span>
            <span className="opacity-50 "> | </span>{" "}
            <span className="text-[24px] sm:text-base">
              {" "}
              {/* {myProfile?.totalAttendees ? myProfile?.totalAttendees : 0}{" "} */}
              {myProfile?.attendees !== null
                        ? myProfile?.attendees
                        : "0"}

              <span className="text-[12px] sm:text-base sm:text-[white] text-[#A6A6A6]">
                {" "}
                Attended
              </span>
            </span>{" "}
          </p>

          <div className="md:hidden border border-[#0FFF7730] rounded-lg gradient-slate flex justify-evenly items-center w-full  mt-5">
            <div className="flexc flex-col items-center py-[16px] justify-center font-bold text-center">
              <p className="text-[18px]">
                {/* {myProfile?.totalEvents ? myProfile?.totalEvents : 0} */}
                {myProfile?.personalEvents ? myProfile?.personalEvents : 0}

              </p>
              <p className="text-[12px] opacity-50">EVENTS</p>
            </div>
            <div className="w-px h-8 bg-white/20"></div>

            <div className="flexc flex-col items-center justify-center py-[16px] font-bold text-center">
              <p className="text-[18px]">
                {" "}
                {/* {myProfile?.totalAttendees ? myProfile?.totalAttendees : 0}{" "} */}
                {myProfile?.tattendedEvents? myProfile?.attendedEvents : 0}{" "}

              </p>
              <p className="text-[12px] opacity-50">ATTENDED</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center flex-wrap lg:flex-nowrap md:justify-start md:mt-[0px] gap-[8px] sm:gap-3 h-full mt-6">
        {myProfile?.liveActivity?.instaUrl &&
          myProfile?.liveActivity?.instaUrl !== "https://instagram.com/" && (
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
          )}
        {myProfile?.liveActivity?.telegramUrl &&
          myProfile?.liveActivity?.telegramUrl !== "https://t.me/" && (
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
          )}
        {myProfile?.liveActivity?.fbUrl &&
          myProfile?.liveActivity?.fbUrl !== "https://www.facebook.com/" && (
            <Link href={myProfile?.liveActivity?.fbUrl || "#"} target="_blank">
              <div className="border border-white w-fit sm:p-3 p-[10px] h-fit flex items-center justify-center rounded-full h-[36px] w-[36px] sm:h-[44px] sm:w-[44px] hover:bg-white hover:text-black duration-300">
                <FacebookLogo
                  className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]"
                  weight="fill"
                />
              </div>
            </Link>
          )}
        {myProfile?.liveActivity?.linkedinUrl &&
          myProfile?.liveActivity?.linkedinUrl !==
            "https://linkedin.com/in/" && (
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
          )}
        {myProfile?.liveActivity?.tiktokUrl &&
          myProfile?.liveActivity?.tiktokrl !== "https://www.tiktok.com/@" && (
            <Link
              href={myProfile?.liveActivity?.tiktokUrl || "#"}
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
        {myProfile?.liveActivity?.youtubeUrl &&
          myProfile?.liveActivity?.youtubeUrl !==
            "https://www.youtube.com/" && (
            <Link
              href={myProfile?.liveActivity?.youtubeUrl || "#"}
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
        {myProfile?.liveActivity?.twitterUrl &&
          myProfile?.liveActivity?.twitterUrl !== "https://www.x.com/" && (
            <Link
              href={myProfile?.liveActivity?.twitterUrl || "#"}
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
      </div>
    </div>
  );
};

export default ProfileDetails;
