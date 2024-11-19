import { shimmer, toBase64 } from "@/lib/utils";
import { Heart } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { ScaleReveal } from "../animations/ScaleReveal";
import fallbackImage from "../../assets/event-video.png";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { LikeEvent, disLikeEvent } from "@/lib/middleware/event";
import { ErrorToast, SuccessToast } from "./Toaster/Toaster";

const MobileEventCard = ({
  img,
  title,
  eventId,
  eventDate,
  ticketPrice,
  likedEvents,
}: {
  img: string;
  title: string;
  eventId: any;
  eventDate: any;
  ticketPrice: any;
  likedEvents:any;
}) => {
  const imageUrl = img?.startsWith("http") ? img : fallbackImage.src;
  console.log("image src is", imageUrl);

  const [liked, setLiked] = useState(false);
  const [loader, setLoader] = useState(false);
  const dispatch = useAppDispatch();
  const [userToken, setUserToken] = useState<any>("");
  async function handleLikeEvent() {
    setLoader(true);
    const userID =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;

    try {
      const data = {
        eventId: eventId,
        userId: userID,
      };
      dispatch(LikeEvent(data)).then((res: any) => {
        if (res?.payload?.status === 200) {
          setLoader(false);
          // SuccessToast("Event Liked Successfully");
        } else {
          setLoader(false);
          ErrorToast(res?.payload?.message);
        }
      });
    } catch (error) {
      setLoader(false);
      console.error("Error:", error);
    }
  }

  async function handleDisLikeEvent() {
    setLoader(true);
    const userID =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;

    try {
      const data = {
        eventId: eventId,
        userId: userID,
      };
      dispatch(disLikeEvent(data)).then((res: any) => {
        if (res?.payload?.status === 200) {
          setLoader(false);
          // SuccessToast("Event Disliked Successfully");
        } else {
          setLoader(false);
          ErrorToast(res?.payload?.message);
        }
      });
    } catch (error) {
      setLoader(false);
      console.error("Error:", error);
      ErrorToast(error);
    }
  }

  const handleHeartClick = (event: React.MouseEvent) => {
    console.log("liked va", liked);

    event.stopPropagation();
    if (liked) {
      setLiked(false);
      handleDisLikeEvent();
    } else {
      setLiked(true);
      handleLikeEvent();
    }
  };

  useEffect(() => {
    const userID =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    setUserToken(userID);

    if (userID) {
      const userHasLiked = likedEvents?.some(
        (likedEvent: any) => likedEvent?.userId == userID
      );
      console.log("user has", userHasLiked);
      setLiked(userHasLiked);
    } else {
      setLiked(false);
    }
  }, [likedEvents]);
  return (
    <ScaleReveal>
      <Link
        href={eventId ? `/event/${eventId}` : "/viewallevents"}
        className="w-full"
      >
        <div className="gradient-slate border-2 border-[#1F1F1F] rounded-lg p-4 flex justify-between w-full">
          <div className="flex gap-4">
            <Image
              src={imageUrl}
              width={800}
              height={800}
              className="w-[90px] rounded-lg object-cover"
              placeholder={`data:image/svg+xml;base64,${toBase64(
                shimmer(1200, 1800)
              )}`}
              alt="event"
            />
            <div className="flex flex-col justify-between">
              <div>
                <p className="text-primary text-sm"> {eventDate}</p>
                <p className="font-bold text-[18px] w-[90%] lg:w-full leading-[1.2] my-1">
                  {title}
                </p>
              </div>
              <div className="flex ">
                <p className="text-sm">From £{ticketPrice}</p>
              </div>
            </div>
          </div>
          <div className="flex items-end">

          <Link href="javascript:void(0)">
                <div
                  onClick={handleHeartClick}
                  className="flex gap-[10px] cursor-pointer me-[24px] items-end"
                >
                    <Heart
                      size={20}
                      color="white"
                      weight={liked ? "fill" : "regular"}
                    />
                 
                </div>
              </Link>
           

              </div>
          {/* <div className="flex items-end">
            <Heart size={20} weight="fill" />
          </div> */}
        </div>
      </Link>
    </ScaleReveal>
  );
};

export default MobileEventCard;
