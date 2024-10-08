"use client";

import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
// import ProfileDetails from "./ProfileDetails";
// import PostTabs from "./PostTabs";
import { useRouter } from "next/navigation";
import { truncateString } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getUserSocialProfile } from "@/lib/middleware/profile";
import ProfilePreview from "./ProfilePreview";
import PostCard from "../social-profile-page/PostCard";
import Grid from "./Grid";
import { getOrganizerSocialProfile , getOrganizerLiveSocialProfile} from "@/lib/middleware/organizer";
const PersonalSocialProfile = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [userId, setUserId] = useState<any>("");

  // useEffect(() => {
  //   const userid = typeof window !== "undefined" ?  localStorage.getItem("_id") : null;
  //   console.log("user id ", userid);
  //   dispatch(getOrganizerSocialProfile(userid));
  // }, []);

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
    <div className="min-h-screen relative flex flex-col items-center lg:px-[100px] xl:px-[216px] overflow-hidden px-[0px] ">
      <Image
        style={{ filter: "blur(40px)" }}
        width={1000}
        height={1000}
        src={"/person1.png"}
        className="w-full object-cover absolute top-0 object-top z-0 opacity-[0.22]  h-screen"
        alt=""
      />
      <div className="pb-[72px] md:px-[75px] w-full px-[24px] lg:px-[0px] mx-2xl pt-[108px] pb-12 lg:pt-[132px] lg:pb-36 relative z-[2]" >
        <div className="flex gap-[12px] md:gap-[16px] sm:mb-[44px] mb-[52px] " onClick={() => router.back()}>
          <button onClick={() => router.back()}>
            <ArrowLeft size={20} />
          </button>
          <p className="text-sm sm:text-[24px] font-extrabold">Back</p>
        </div>

        <ProfilePreview />
        <Grid />
      </div>
    </div>
  );
};

export default PersonalSocialProfile;
