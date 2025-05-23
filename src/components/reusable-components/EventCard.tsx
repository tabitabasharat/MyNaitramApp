import Link from "next/link";
import HeartBadge from "../ui/heart-badge";
import Image from "next/image";
import { shimmer, toBase64 } from "@/lib/utils";
import { ScaleReveal } from "../animations/ScaleReveal";
import event12 from "../../../public/event12.png";
import { SuccessToast, ErrorToast } from "./Toaster/Toaster";
import { useAppDispatch } from "@/lib/hooks";
import { useEffect, useState } from "react";
import { LikeEvent, disLikeEvent } from "@/lib/middleware/event";
import { Heart } from "@phosphor-icons/react/dist/ssr";

const EventCard = ({
  img,
  title,
  eventId,
  eventType,
  likedEvents,
  price,
  height = "345px",
  width = "100%",
  showPrice = true,
}: {
  img: string;
  title: string;
  height?: string;
  width?: string;
  eventId: any;
  eventType: any;
  likedEvents: any;
  price: any;
  showPrice?: boolean;
}) => {
  // const imageUrl = img
  //   ? img.startsWith("http") || img.startsWith("https")
  //     ? img
  //     : img
  //   : event12;

  const imageUrl = img ? (img.startsWith("http") || img.startsWith("https") ? img : img.startsWith("/") ? img : `/${img}`) : event12.src;
  const dispatch = useAppDispatch();
  const [loader, setLoader] = useState(false);
  const [liked, setLiked] = useState(false);
  const [userToken, setUserToken] = useState<any>("");

  async function handleLikeEvent() {
    setLoader(true);
    const userID = typeof window !== "undefined" ? localStorage.getItem("_id") : null;

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
    const userID = typeof window !== "undefined" ? localStorage.getItem("_id") : null;

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
  // const Eventtype = encodeURIComponent(JSON.stringify(eventType));
  const Eventtype = encodeURIComponent(eventType);
  console.log("event card eventTYO", Eventtype);
  useEffect(() => {
    const userID = typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    setUserToken(userID);

    if (userID) {
      const userHasLiked = likedEvents?.some((likedEvent: any) => likedEvent?.userId == userID);
      console.log("user has", userHasLiked);
      setLiked(userHasLiked);
    } else {
      setLiked(false);
    }
  }, [likedEvents]);

  function setPriceIndications(price: string): string {
    if (price === "0") {
      return "FREE";
    } else {
      return `From £${price}`;
    }
  }

  return (
    <ScaleReveal extraStyle="w-full">
      <Link href={eventId ? `/event/${eventId}?EventType=${Eventtype}` : "/viewallevents"} className="w-full">
        <div style={{ height, width }} className="relative overflow-hidden rounded-lg w-full h-fit border border-[#424242] ">
          <Image
            src={imageUrl}
            width={1000}
            height={1000}
            className="w-full h-full rounded-lg object-cover relative mx-auto overflow-hidden"
            placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(1200, 1800))}`}
            alt="event-img"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

          <div className="absolute flex justify-between gap-[2rem] h-full items-end z-[2] p-4 top-0 w-full">
            <p className="font-bold text-white text-xl">{title}</p>
            {showPrice ? <p className="text-[#00D059]">{setPriceIndications(price)}</p> : <></>}
            {userToken && (
              <Link href="javascript:void(0)">
                {/* <div onClick={handleHeartClick} className="cursor-pointer">
                  <HeartBadge />
                </div> */}
                <div className="bg-white/20 p-[0.6rem] rounded-full backdrop-blur-lg webkit-header-blur" onClick={handleHeartClick}>
                  <Heart size={20} color="white" weight={liked ? "fill" : "regular"} />
                </div>
              </Link>
            )}
          </div>
        </div>
      </Link>
    </ScaleReveal>
  );
};

export default EventCard;
