import Image from "next/image";
import promoter from "@/assets/promoter.png";
// import promoter from "@/assets/promoter-pic.svg"
import verifiedimg from "@/assets/tick-yello.svg";
import {
  InstagramLogo,
  SealCheck,
  TwitterLogo,
  FacebookLogo,
  LinkedinLogo,
  TiktokLogo,
  TelegramLogo,
} from "@phosphor-icons/react/dist/ssr";
import { Button } from "../ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getEventCount } from "@/lib/middleware/event";
import {
  getOrganizerByID,
  getOrganizerSocialProfile,
} from "@/lib/middleware/organizer";

const PreviewEventFollowPromoter = ({ userId, eventName,  eventDATA }: any) => {
  const dispatch = useAppDispatch();
  const [userToken, setUserToken] = useState<any>();
  useEffect(() => {
    // dispatch(getEventCount(userId));
    dispatch(getOrganizerByID(userId));
    dispatch(getOrganizerSocialProfile(userId));
  }, [userId]);

  const myEvents = useAppSelector(
    (state) => state?.getEventCount?.myEventsCount
  );

  console.log("my Events count", myEvents);

  const myProfile = useAppSelector(
    (state) => state?.getOrgSocialProfile?.mySocialData?.data?.data
  );

  console.log("my  infooo is", myProfile);

  const imageUrl = myProfile?.profile?.profilePicture?.startsWith(
    "http" || "https"
  )
    ? myProfile?.profile?.profilePicture
    : promoter;

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    setUserToken(token);
  }, []);

  return (
    <div className="mt-[32px] rounded-xl p-[16px] w-full">
      <div className="flex gap-4">
        <Image
          style={{ width: "40px", height: "40px" }}
          src={imageUrl}
          width={40}
          height={40}
          className="rounded-xl border-2 border-[#D9D9D9] shadow-2xl"
          alt="promoter"
        />
        <div>
         
            <p className="font-bold text-[14px]  font-bold flex items-center gap-1  capitalize">
              {myProfile?.userProfile?.fullname}
              {/* { myEvents?.data?.data[0]?.user?.fullname} */}
              {/* <Image src={verifiedimg} alt="img" width={10.5} height={10.5} /> */}
              {/* <SealCheck
                className="text-[#FFC109] -translate-y-1"
                size={17}
                weight="fill"
              /> */}
            </p>
      
          <p className="text-[#FFFFFF3D] text-[12px]">
            <span className="text-[11px] text-[#E6E6E6]">
              {myProfile?.profile?.totalEvents} Events
            </span>{" "}
            |{" "}
            <span className="text-[11px] text-[#E6E6E6]">
              {" "}
              {myProfile?.profile?.totalAttendees} Attendees
            </span>
          </p>
        </div>
      </div>
      <hr className="border-white/10 my-[16px]" />
      <div className="flex flex-col  gap-3 items-start justify-start wrapping-flex">
        {/* {
          userToken !=myEvents?.data?.data[0]?.id && 
        <Button variant="secondary" className="text-[14px] font-bold py-[10px]">
          Follow Promoter
        </Button>
        } */}
        <div className="flex gap-3 flex-wrap h-full">
          <div className="border border-white w-fit p-2 rounded-full">
            <InstagramLogo
              style={{ cursor: "pointer" }}
              onClick={() => {
                typeof window !== "undefined"
                  ? window.open(eventDATA?.instaurl, "_blank")
                  : null;
              }}
              size={25}
              weight="fill"
            />
          </div>
          {/* <div className="border border-white w-fit p-2 rounded-full">
            <TwitterLogo
              style={{ cursor: "pointer" }}
              onClick={() => {
                typeof window !== "undefined"
                  ? window.open(eventDATA?.telegramurl, "_blank")
                  : null;
              }}
              size={25}
              weight="fill"
            />
          </div> */}
          <div className="border border-white w-fit p-2 rounded-full">
            <FacebookLogo
              style={{ cursor: "pointer" }}
              onClick={() => {
                typeof window !== "undefined"
                  ? window.open(eventDATA?.fburl, "_blank")
                  : null;
              }}
              size={25}
              weight="fill"
            />
          </div>
          <div className="border border-white w-fit p-2 rounded-full">
            <TiktokLogo
              style={{ cursor: "pointer" }}
              onClick={() => {
                typeof window !== "undefined"
                  ? window.open(eventDATA?.tiktokurl, "_blank")
                  : null;
              }}
              size={25}
              weight="fill"
            />
          </div>
          <div className="border border-white w-fit p-2 rounded-full">
            <LinkedinLogo
              style={{ cursor: "pointer" }}
              onClick={() => {
                typeof window !== "undefined"
                  ? window.open(eventDATA?.linkedinurl, "_blank")
                  : null;
              }}
              size={25}
              weight="fill"
            />
          </div>
          <div className="border border-white w-fit p-2 rounded-full">
            <TelegramLogo
              style={{ cursor: "pointer" }}
              onClick={() => {
                typeof window !== "undefined"
                  ? window.open(eventDATA?.telegramurl, "_blank")
                  : null;
              }}
              size={25}
              weight="fill"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewEventFollowPromoter;
