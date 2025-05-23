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
import { SuccessToast, ErrorToast, WarningToast } from "./Toaster/Toaster";
import { FollowPromoterStatus } from "@/lib/middleware/event";
import PrivateProfilePopUp from "./PrivateProfilePopUp";

const Followpromoter = ({ userId, eventName, EventData }: any) => {
  const [uId, setUid] = useState<any>("");
  const [loading, setLoading] = useState(false);
  const [followStatus, setFollowStatus] = useState(false);
  const [isClaimOpen, setisClaimOpen] = useState(false);
    const [profilePic, setProfilePic] = useState<string>("/person3.jpg");


  console.log("my follow status", followStatus);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const [userToken, setUserToken] = useState<any>();
  useEffect(() => {
    const myuserid =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    setUid(myuserid);
    // dispatch(getEventCount(userId));
    dispatch(getOrganizerByID(userId));

    const data = {
      followId: userId,
      userId: myuserid,
    };
    dispatch(getFollowingPromoters(data));
    dispatch(FollowPromoterStatus(data));

    // dispatch(getOrganizerSocialProfile(userId));
  }, []);

  const myEvents = useAppSelector(
    (state) => state?.getEventCount?.myEventsCount
  );

  console.log("my Events count", myEvents);

  const myProfile = useAppSelector(
    (state) => state?.getOrgSocialProfile?.mySocialData?.data?.data
  );

  console.log("my  infooo is", myProfile);

  const myFollowStatus = useAppSelector(
    (state) => state?.getFollowStatus?.myStatus?.data
  );
  console.log("my  status is", myFollowStatus);

  const imageUrl =
    myProfile?.profile?.profilePicture?.startsWith("http") ||
    myProfile?.profile?.profilePicture?.startsWith("https")
      ? myProfile?.profile?.profilePicture
      : promoter?? "/person3.jpg";

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
          dispatch(FollowPromoterStatus(datas));
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
          WarningToast("Unfollowed Successfully");
          const datas = {
            followId: userId,
            userId: userID,
          };
          dispatch(getFollowingPromoters(datas));
          dispatch(FollowPromoterStatus(datas));
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

  // async function handleStatus() {
  //   setLoading(true);
  //   const userID =
  //     typeof window !== "undefined" ? localStorage.getItem("_id") : null;
  //   try {
  //     const data = {
  //       followId: userId,
  //       userId: userID,
  //     };
  //     dispatch(FollowPromoterStatus(data)).then((res: any) => {
  //       if (res?.payload?.status === 200) {
  //         setLoading(false);

  //         setFollowStatus(res?.payload?.data?.status);

  //         const datas = {
  //           followId: userId,
  //           userId: userID,
  //         };
  //         // dispatch(getFollowingPromoters(datas));

  //       } else {
  //         setLoading(false);
  //         console.log(res?.payload?.message);
  //         ErrorToast(res?.payload?.message);
  //       }
  //     });
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // }
  const myFollowers = useAppSelector(
    (state) => state?.getFollowPromoters?.myFollowers?.data
  );

  console.log("my followers data", myFollowers);
  const isFollowing = myFollowers?.some(
    (item: any) => item?.followId == userId
  );

  console.log("my follow statys ,", myProfile?.profile?.public);

  const handleProfileClick = (e: any) => {
    e.preventDefault();

    if (myProfile?.profile?.public ) {
      router.push(`/profile-perview/${userId}`);
    } else {
      // ErrorToast("This Organiser's Profile is Private");
      setisClaimOpen(true);
    }
  };

  return (
    <div className="mt-[32px] bg-white/10 rounded-xl p-[16px] w-full">
      <div className="flex gap-4">
        <div onClick={handleProfileClick} className="cursor-pointer">
          <Image
            style={{ width: "40px", height: "40px" }}
            src={imageUrl}
            width={40}
            height={40}
            className="rounded-xl border-2 border-[#D9D9D9] shadow-2xl cursor-pointer"
            alt="promoter"
          />
        </div>
        <div style={{display:"flex",justifyContent:"center"}}>
          <p
            className="font-bold text-[14px]  font-bold flex items-center gap-1 capitalize hover:underline cursor-pointer"
            onClick={handleProfileClick}
          >
            {myProfile?.userProfile?.fullname}
          </p>
        </div>
      </div>
      <hr className="border-white/10 my-[16px]" />
      <div className="flex flex-col  gap-3 items-start justify-start wrapping-flex">
        {
          <Button
            disabled={uId == userId}
            variant="secondary"
            className="text-[14px] font-bold px-[16px] py-[10px] disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => {
              if (followStatus || myFollowStatus?.status) {
                handleUnFollow();
              } else {
                handleFollow();
              }
            }}
          >
            {followStatus || myFollowStatus?.status
              ? "Unfollow Organiser"
              : "Follow Organiser"}
          </Button>
        }
        <div className="flex gap-[8px] flex-wrap h-full">
          {EventData?.instaUrl && EventData?.instaUrl !== "https://instagram.com/" && (
            <div className="border border-white w-[36px] h-[36px] cursor-pointer p-2 rounded-full">
              <InstagramLogo
                // style={{ cursor: "pointer" }}
                // onClick={() => {
                //   typeof window !== "undefined"
                //     ? window.open(myEvents?.data?.data[0]?.instaUrl, "_blank")
                //     : null;
                // }}
                onClick={() => {
                  typeof window !== "undefined"
                    ? window.open(EventData?.instaUrl, "_blank")
                    : null;
                }}
                size={16}
                weight="fill"
              />
            </div>
          )}
          {EventData?.twitterUrl && EventData?.twitterUrl !== "https://www.x.com/" && (
            <div className="border border-white w-[36px] h-[36px] cursor-pointer p-2 rounded-full">
              <TwitterLogo
                // style={{ cursor: "pointer" }}
                onClick={() => {
                  typeof window !== "undefined"
                    ? window.open(EventData?.twitterUrl, "_blank")
                    : null;
                }}
                size={16}
                weight="fill"
              />
            </div>
          )}
          {EventData?.fbUrl && EventData?.fbUrl !== "https://www.facebook.com/" && (
            <div className="border border-white w-[36px] cursor-pointer h-[36px] p-2 rounded-full">
              <FacebookLogo
                // style={{ cursor: "pointer" }}
                onClick={() => {
                  typeof window !== "undefined"
                    ? window.open(EventData?.fbUrl, "_blank")
                    : null;
                }}
                size={16}
                weight="fill"
              />
            </div>
          )}
          {/* <div className="border border-white w-[36px] h-[36px] p-2 rounded-full">
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
          </div> */}
          {EventData?.tiktokUrl && EventData?.tiktokUrl !== "https://www.tiktok.com/@" && (
            <div className="border border-white w-[36px] cursor-pointer h-[36px] p-2 rounded-full">
              <TiktokLogo
                // style={{ cursor: "pointer" }}
                onClick={() => {
                  typeof window !== "undefined"
                    ? window.open(EventData?.tiktokUrl, "_blank")
                    : null;
                }}
                size={16}
                weight="fill"
              />
            </div>
          )}

          {EventData?.linkedinUrl && EventData?.linkedinUrl !== "https://linkedin.com/in/" && (
            <div className="border border-white w-[36px] cursor-pointer h-[36px] p-2 rounded-full">
              <LinkedinLogo
                // style={{ cursor: "pointer" }}
                onClick={() => {
                  typeof window !== "undefined"
                    ? window.open(EventData?.linkedinUrl, "_blank")
                    : null;
                }}
                size={16}
                weight="fill"
              />
            </div>
          )}
          {EventData?.youtubeUrl && EventData?.youtubeUrl !== "https://www.youtube.com/" && (
            <div className="border border-white w-[36px] cursor-pointer h-[36px] p-2 rounded-full">
              <YoutubeLogo
                // style={{ cursor: "pointer" }}
                onClick={() => {
                  typeof window !== "undefined"
                    ? window.open(EventData?.youtubeUrl, "_blank")
                    : null;
                }}
                size={16}
                weight="fill"
              />
            </div>
          )}

          {EventData?.telegramUrl && EventData?.telegramUrl !== "https://t.me/" && (
            <div className="border border-white w-[36px] cursor-pointer h-[36px] p-2 rounded-full">
              <TelegramLogo
                // style={{ cursor: "pointer" }}
                onClick={() => {
                  typeof window !== "undefined"
                    ? window.open(EventData?.telegramUrl, "_blank")
                    : null;
                }}
                size={16}
                weight="fill"
              />
            </div>
          )}
        </div>
        {isClaimOpen && (
        <PrivateProfilePopUp
          onClose={() => setisClaimOpen(false)}
          open={() => setisClaimOpen(true)}
          msg={"This Organizer's Profile is Private"}
        
         
        />
      )}
      </div>
    </div>
  );
};

export default Followpromoter;
