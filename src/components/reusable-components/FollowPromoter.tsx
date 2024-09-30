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
import { useRouter } from "next/navigation";
import { YoutubeLogo } from "@phosphor-icons/react";
import {
  FollowPromoter,
  getFollowingPromoters,
  UnFollowPromoter,
} from "@/lib/middleware/liveactivity";
import { SuccessToast, ErrorToast } from "./Toaster/Toaster";

const Followpromoter = ({ userId, eventName }: any) => {
  const [uId, setUid] = useState<any>("");
  const [loading, setLoading] = useState(false);
  const [followStatus, setFollowStatus] = useState(false);



  const dispatch = useAppDispatch();
  const router = useRouter();
  const [userToken, setUserToken] = useState<any>();
  useEffect(() => {
    const myuserid =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;

    // dispatch(getEventCount(userId));
    dispatch(getOrganizerByID(userId));
    dispatch(getOrganizerSocialProfile(userId));
    const data = {
      followId: userId,
      userId: myuserid,
    };
    dispatch(getFollowingPromoters(data));
  }, []);

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

  // const handleFollow = () => {
  //   router.push(
  //     `/events/event-detail/promoter-profile?eventname=${eventName}&userId=${userId}`,
  //     { scroll: false }
  //   );
  // };

  async function handleFollow() {
    setLoading(true);
    const userID =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    try {
      const data = {
        followId: userId,
        userId: userID,
      };
      dispatch(FollowPromoter(data)).then((res: any) => {
        if (res?.payload?.status === 200) {
          setLoading(false);
          setFollowStatus(true);
          console.log("org Activity res", res?.payload?.data);
          SuccessToast("You are now Following ");
          const datas = {
            followId: userId,
            userId: userID,
          };
          dispatch(getFollowingPromoters(datas));
          
        } else {
          setLoading(false);
          console.log(res?.payload?.message);
          ErrorToast(res?.payload?.message);
        }
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }
  async function handleUnFollow() {
    setLoading(true);
    const userID =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    try {
      const data = {
        followId: userId,
        userId: userID,
      };
      dispatch(UnFollowPromoter(data)).then((res: any) => {
        if (res?.payload?.status === 200) {
          setLoading(false);
          setFollowStatus(false);
          console.log("org Activity res", res?.payload?.data);
          // SuccessToast("You have unfollowed ");
          const datas = {
            followId: userId,
            userId: userID,
          };
          dispatch(getFollowingPromoters(datas));
        } else {
          setLoading(false);
          console.log(res?.payload?.message);
          ErrorToast(res?.payload?.message);
        }
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }
  const myFollowers = useAppSelector(
    (state) => state?.getFollowPromoters?.myFollowers?.data
  );

  console.log("my followers data", myFollowers);
  const isFollowing = myFollowers?.some(
    (item: any) => item?.followId == userId
  );
  return (
    <div className="mt-[32px] bg-white/10 rounded-xl p-[16px] w-full">
      <div className="flex gap-4">
        <Link href="/profile-perview">
          <Image
            style={{ width: "40px", height: "40px" }}
            src={imageUrl}
            width={40}
            height={40}
            className="rounded-xl border-2 border-[#D9D9D9] shadow-2xl"
            alt="promoter"
          />
        </Link>
        <div>
          <Link href="/profile-perview">
            <p className="font-bold text-[14px]  font-bold flex items-center gap-1 capitalize hover:underline">
              {myProfile?.userProfile?.fullname}
            </p>
          </Link>
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
        {
          <Button
            variant="secondary"
            className="text-[14px] font-bold px-[16px] py-[10px]"
            onClick={() => {
              if (followStatus) {
                handleUnFollow();
              } else {
                handleFollow();
              }
            }}
          >
            {followStatus ? "Following" : "FollowPromoter"}
          </Button>
        }
        <div className="flex gap-[8px] flex-wrap h-full">
          <div className="border border-white w-[36px] h-[36px] p-2 rounded-full">
            <InstagramLogo
              style={{ cursor: "pointer" }}
              onClick={() => {
                typeof window !== "undefined"
                  ? window.open(myEvents?.data?.data[0]?.instaUrl, "_blank")
                  : null;
              }}
              size={16}
              weight="fill"
            />
          </div>
          <div className="border border-white w-[36px] h-[36px] p-2 rounded-full">
            <TwitterLogo
              style={{ cursor: "pointer" }}
              onClick={() => {
                typeof window !== "undefined"
                  ? window.open(myProfile?.profile?.twitterUrl, "_blank")
                  : null;
              }}
              size={16}
              weight="fill"
            />
          </div>
          <div className="border border-white w-[36px] h-[36px] p-2 rounded-full">
            <FacebookLogo
              style={{ cursor: "pointer" }}
              onClick={() => {
                typeof window !== "undefined"
                  ? window.open(myProfile?.profile?.fbUrl, "_blank")
                  : null;
              }}
              size={16}
              weight="fill"
            />
          </div>
          <div className="border border-white w-[36px] h-[36px] p-2 rounded-full">
            <TiktokLogo
              style={{ cursor: "pointer" }}
              onClick={() => {
                typeof window !== "undefined"
                  ? window.open(myProfile?.profile?.tiktokUrl, "_blank")
                  : null;
              }}
              size={16}
              weight="fill"
            />
          </div>
          <div className="border border-white w-[36px] h-[36px] p-2 rounded-full">
            <LinkedinLogo
              style={{ cursor: "pointer" }}
              onClick={() => {
                typeof window !== "undefined"
                  ? window.open(myProfile?.profile?.linkedinUrl, "_blank")
                  : null;
              }}
              size={16}
              weight="fill"
            />
          </div>
          <div className="border border-white w-[36px] h-[36px] p-2 rounded-full">
            <YoutubeLogo
              style={{ cursor: "pointer" }}
              onClick={() => {
                typeof window !== "undefined"
                  ? window.open(myProfile?.profile?.youtubeUrl, "_blank")
                  : null;
              }}
              size={16}
              weight="fill"
            />
          </div>
          <div className="border border-white w-[36px] h-[36px] p-2 rounded-full">
            <TelegramLogo
              style={{ cursor: "pointer" }}
              onClick={() => {
                typeof window !== "undefined"
                  ? window.open(myProfile?.profile?.twitterUrl, "_blank")
                  : null;
              }}
              size={16}
              weight="fill"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Followpromoter;
