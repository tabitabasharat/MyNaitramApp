import Link from "next/link";
import HeartBadge from "../ui/heart-badge";
import { Heart } from "@phosphor-icons/react/dist/ssr";

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
  eventDate,
  endTime,
  startTime,
  likedEvents,
  height = "345px",
  width = "100%",
}: {
  img: string;
  title: string;
  height?: string;
  width?: string;
  eventId: any;
  eventType: any;
  eventDate: any;
  endTime: any;
  startTime: any;
  likedEvents: any;
}) => {
  // const imageUrl = img
  //   ? img.startsWith("http") || img.startsWith("https")
  //     ? img
  //     : img
  //   : event12;
    const imageUrl = img
    ? img.startsWith("http") || img.startsWith("https")
      ? img
      : img.startsWith("/") 
      ? img
      : `/${img}` 
    : event12.src;
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
  // const Eventtype = encodeURIComponent(JSON.stringify(eventType));
  const Eventtype = encodeURIComponent(eventType);
  console.log("event card eventTYO", Eventtype);
  useEffect(() => {
    const userID = typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    setUserToken(userID);
   
    if (userID ) {
      const userHasLiked = likedEvents.some(
        (likedEvent: any) =>  likedEvent.userId == userID
      );
      console.log("user has" , userHasLiked)
      setLiked(userHasLiked);
    }
    else{
      setLiked(false);
    }
  }, [likedEvents]);

  const ConvertDate = (originalDateStr: string): string => {
    const originalDate = new Date(originalDateStr);

    // Extract the day, date, month, and year
    const dayOfWeek = originalDate.toLocaleDateString("en-US", {
      weekday: "long",
    });
    const date = originalDate.getDate();
    const month = originalDate.toLocaleDateString("en-US", { month: "long" });
    const year = originalDate.getFullYear();

    // Function to get ordinal suffix
    const getOrdinalSuffix = (date: number) => {
      if (date > 3 && date < 21) return "th"; // covers 11th to 19th
      switch (date % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    const ordinalSuffix = getOrdinalSuffix(date);

    // Construct the formatted date string
    const formattedDate = `${dayOfWeek}, ${date}${ordinalSuffix} ${month} ${year}`;

    return formattedDate;
  };

  const ConvertTime = (timeStr: string): string => {
    // Ensure input is a string
    if (typeof timeStr !== "string") {
      console.error("Input must be a string");
      return "";
    }

    // Extract the time part if the input includes a date and time
    const timeOnly = timeStr.split("T")[1]?.split("Z")[0];

    if (!timeOnly) {
      console.error("Input must include a valid time");
      return "";
    }

    const parts = timeOnly.split(":");

    // Check if timeOnly is in HH:MM or HH:MM:SS format
    if (parts.length < 2) {
      console.error("Input time must be in HH:MM or HH:MM:SS format");
      return "";
    }

    const [hours, minutes] = parts.map(Number);

    // Ensure the hours and minutes are valid numbers
    if (isNaN(hours) || isNaN(minutes)) {
      console.error("Invalid time format");
      return "";
    }

    // Determine AM or PM
    const period = hours >= 12 ? "PM" : "AM";

    // Convert hours from 24-hour to 12-hour format
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for midnight

    // Combine hours and period
    const formattedTime = `${formattedHours}:${
      minutes < 10 ? "0" + minutes : minutes
    } ${period}`;

    return formattedTime;
  };
  // const copyUrlToClipboard = () => {
  //   if (typeof window !== "undefined") {
  //     const currentUrl = window.location.href;
  //     if (currentUrl) {
  //       SuccessToast("URL copied Successfully");
  //       console.log("Your url is", currentUrl);
  //     } else {
  //       ErrorToast("Failed to copy URL.");
  //     }
  //   }
  // };
  const copyUrlToClipboard = () => {
    if (typeof window !== "undefined") {
      const currentUrl = window.location.href;
      if (currentUrl) {
        navigator.clipboard.writeText(currentUrl)
          .then(() => {
            SuccessToast("URL copied successfully");
            console.log("Your URL is", currentUrl);
          })
          .catch(() => {
            ErrorToast("Failed to copy URL.");
          });
      } else {
        ErrorToast("Failed to copy URL.");
      }
    }
  };

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

          <div className="absolute flex justify-between h-full items-end z-[2] p-4 top-0 w-full ">
            <div>
              <p className="font-bold text-white text-xl">{title}</p>
              <p className="font-bold text-[11px] text-[#FFFFFF]">
                {ConvertDate(eventDate)}
                <br /> {ConvertTime(startTime)} - {ConvertTime(endTime)}{" "}
              </p>
            </div>
            {userToken && (
              <Link href="javascript:void(0)">
                <div
                  
                  className="flex gap-[10px] cursor-pointer"
                >
                  <Image src={share} sizes="40px" alt="share"     onClick={copyUrlToClipboard}/>

                  <div className="bg-white/20 p-[0.6rem] rounded-full backdrop-blur-lg webkit-header-blur" onClick={handleHeartClick}>
                    <Heart
                      size={20}
                   
                      color="white"
                      weight={liked ? "fill" : "regular"}
                    />
                  </div>
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
