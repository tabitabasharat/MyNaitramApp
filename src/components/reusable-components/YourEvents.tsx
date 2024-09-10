import Link from "next/link";
import HeartBadge from "../ui/heart-badge";
import Image from "next/image";
import { shimmer, toBase64 } from "@/lib/utils";
import share from "@/assets/share.svg";
import { ScaleReveal } from "../animations/ScaleReveal";
import event12 from "../../../public/event12.png";
import { SuccessToast, ErrorToast } from "./Toaster/Toaster";
import { useAppDispatch } from "@/lib/hooks";
import { useEffect, useState } from "react";
import { LikeEvent, disLikeEvent } from "@/lib/middleware/event";

const YourEvents = ({
  img,
  title,
  eventId,
  eventType,
  height = "345px",
  width = "100%",
}: {
  img: string;
  title: string;
  height?: string;
  width?: string;
  eventId: any;
  eventType: any;
}) => {
  const imageUrl = img
    ? img.startsWith("http") || img.startsWith("https")
      ? img
      : img
    : event12;
  const dispatch = useAppDispatch();
  const [loader, setLoader] = useState(false);
  const [liked, setLiked] = useState(false);
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
          SuccessToast("Event Liked Successfully");
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
          SuccessToast("Event Disliked Successfully");
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
    if (!liked) {
      setLiked(true);
      handleLikeEvent();
    } else {
      setLiked(false);
      handleDisLikeEvent();
    }
  };
  // const Eventtype = encodeURIComponent(JSON.stringify(eventType));
  const Eventtype = encodeURIComponent(eventType);
  console.log("event card eventTYO", Eventtype);
  useEffect(() => {
    const userID =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    setUserToken(userID);
  }, []);

  return (
    <ScaleReveal extraStyle="w-full">
      <Link
        href={
          eventId
            ? `/specific-event/${eventId}?EventType=${Eventtype}`
            : "/viewallevents"
        }
        className="w-full"
      >
        <div
          style={{ height, width }}
          className="relative overflow-hidden rounded-lg w-full h-fit border border-[#424242] "
        >
          <Image
            src={imageUrl}
            width={1000}
            height={1000}
            className="w-full h-full rounded-lg object-cover relative mx-auto overflow-hidden"
            placeholder={`data:image/svg+xml;base64,${toBase64(
              shimmer(1200, 1800)
            )}`}
            alt="event-img"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

          <div className="absolute flex justify-between h-full items-end z-[2] p-4 top-0 w-full">
            <div>
              <p className="font-bold text-white text-xl">{title}</p>
              <p className="font-bold text-[11px] text-[#FFFFFF]">
                Saturday, 5th March 2024 <br/> - 5 PM - 12 AM
              </p>
            </div>
            {userToken && (
              <Link href="javascript:void(0)">
                <div
                  onClick={handleHeartClick}
                  className="flex gap-[10px] cursor-pointer"
                >
                  <Image src={share} sizes="40px" alt="share" />
                  <HeartBadge  />
                </div>
              </Link>
            )}
          </div>
        </div>
      </Link>
    </ScaleReveal>
  );
};

export default YourEvents;
