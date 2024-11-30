import Link from "next/link";
import HeartBadge from "../ui/heart-badge";
import { Heart } from "@phosphor-icons/react/dist/ssr";
import ShareModal from "../ViewSpecificEvent/sections/ShareModal";
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
  price,
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
  price: any;
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
  const [sharemodal, setShareModal] = useState<any>(false);
  const [copiedUrl, setCopiedUrl] = useState<any>("");

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
      const userHasLiked = likedEvents.some((likedEvent: any) => likedEvent.userId == userID);
      console.log("user has", userHasLiked);
      setLiked(userHasLiked);
    } else {
      setLiked(false);
    }
  }, [likedEvents]);

  const ConvertDateold = (originalDateStr: string): string => {
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
  const ConvertDate = (originalDateStr: string | undefined): string => {
    // Ensure input is a valid string
    if (typeof originalDateStr !== "string") {
      console.error("Input must be a string");
      return "";
    }

    console.log("Converted UTC time:", originalDateStr);
    const isUTC = originalDateStr.endsWith("Z");
    const utcDate = new Date(isUTC ? originalDateStr : `${originalDateStr}Z`);

    // Check if the input already has a timezone indicator

    // Check if the date is valid
    if (isNaN(utcDate.getTime())) {
      console.error("Invalid date format");
      return "";
    }

    // Detect local time zone
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Extract local time parts using toLocaleDateString with time zone adjustment
    const dayOfWeek = utcDate.toLocaleDateString("en-US", {
      weekday: "long",
      timeZone: timeZone,
    });
    const dayOfMonth = utcDate.toLocaleDateString("en-US", {
      day: "numeric",
      timeZone: timeZone,
    });
    const month = utcDate.toLocaleDateString("en-US", {
      month: "long",
      timeZone: timeZone,
    });
    const year = utcDate.toLocaleDateString("en-US", {
      year: "numeric",
      timeZone: timeZone,
    });

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

    // Convert day string to a number and calculate ordinal suffix
    const numericDay = parseInt(dayOfMonth, 10); // Convert day string to number
    const ordinalSuffix = getOrdinalSuffix(numericDay);

    // Combine all parts into a properly formatted date string
    const formattedDate = `${dayOfWeek}, ${numericDay}${ordinalSuffix} ${month} ${year}`;

    return formattedDate;
  };
  const ConvertTime = (timeStr: string): string => {
    // Ensure input is a string
    if (typeof timeStr !== "string") {
      console.error("Input must be a string");
      return "";
    }
    const isUTC = timeStr.endsWith("Z");
    const utcDate = new Date(isUTC ? timeStr : `${timeStr}Z`);

    // Convert the input UTC time to a local time using the Date object

    // const utcDate = new Date(`${timeStr}Z`);
    // Appending 'Z' to ensure UTC parsing
    if (isNaN(utcDate.getTime())) {
      console.error("Invalid time format");
      return "";
    }

    // Detect local time zone
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Convert UTC date to local time string in "HH:MM" format
    const localTime = utcDate.toLocaleTimeString("en-GB", {
      timeZone: timeZone,
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });

    // Split the time into hours and minutes
    const [hoursStr, minutesStr] = localTime.split(":");
    const hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);

    // Ensure the hours and minutes are valid numbers
    if (isNaN(hours) || isNaN(minutes)) {
      console.error("Invalid time format");
      return "";
    }

    // Determine AM or PM
    const period = hours >= 12 ? "PM" : "AM";

    // Convert hours from 24-hour to 12-hour format
    const formattedHours = hours % 12 || 12; // Handle 0 as 12 for midnight

    // Format minutes with leading zero if necessary
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    // Combine hours, minutes, and period
    const formattedTime = `${formattedHours}:${formattedMinutes} ${period}`;

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
      const domainName = window.location.origin;
      const eventUrl = `${domainName}/event/${eventId}`;

      setCopiedUrl(eventUrl);
      console.log("Your event URL is", eventUrl);

      setShareModal(true);
    }
  };

  function formatTimeRange(startTime: string, endTime: string): string {
    const options: Intl.DateTimeFormatOptions = { hour: "numeric", minute: "numeric", hour12: true };

    // Convert strings to Date objects
    const start = new Date(startTime);
    const end = new Date(endTime);

    // Format start and end times
    const startFormatted = start.toLocaleTimeString("en-US", options);
    const endFormatted = end.toLocaleTimeString("en-US", options);

    return `- ${startFormatted} - ${endFormatted}`;
  }

  function setPriceIndications(price: string): string {
    if (price === "0") {
      return "FREE";
    } else {
      return `From £${price}`;
    }
  }

  return (
    <ScaleReveal extraStyle="sm:w-full w-auto">
      <Link href={eventId ? `/event/${eventId}?EventType=${Eventtype}` : "/viewallevents"} className="w-[100%] sm:w-full">
        <div style={{ height }} className="relative overflow-hidden rounded-lg  w-[100%] sm:w-full h-fit border border-[#424242] ">
          <Image
            src={imageUrl}
            width={1000}
            height={1000}
            className="w-full h-full rounded-lg object-cover relative mx-auto overflow-hidden"
            placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(1200, 1800))}`}
            alt="event-img"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

          <div className="absolute flex justify-between h-full items-end z-[2] p-4 top-0 sm:w-full w-[100%]">
            <div className="w-[80%]">
              <p className="font-bold text-white text-xl">{title}</p>
              <p className="font-bold text-[11px] text-[#FFFFFF]">
                {ConvertDate(eventDate)}
                <br /> {formatTimeRange(startTime, endTime)} {/* {ConvertTime(startTime)} - {ConvertTime(endTime)}{" "} */}
              </p>
              <p className="text-[#00D059]">{setPriceIndications(price)}</p>
            </div>
            {userToken && (
              <Link href="javascript:void(0)">
                <div className="flex gap-[10px] cursor-pointer">
                  <Image src={share} sizes="40px" alt="share" onClick={copyUrlToClipboard} />

                  <div className="bg-white/20 p-[0.6rem] rounded-full backdrop-blur-lg webkit-header-blur" onClick={handleHeartClick}>
                    <Heart size={20} color="white" weight={liked ? "fill" : "regular"} />
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </Link>
      {sharemodal && <ShareModal onClose={() => setShareModal(false)} open={() => setShareModal(true)} eventUrl={copiedUrl} />}
    </ScaleReveal>
  );
};

export default YourEvents;
