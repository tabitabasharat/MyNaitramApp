import { shimmer, toBase64 } from "@/lib/utils";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { getUserNotifications, getOrgNotifications, notificationStatus, notificationStatusOrg } from "@/lib/middleware/notification";
import { useState, useEffect } from "react";
import { SuccessToast, ErrorToast } from "../reusable-components/Toaster/Toaster";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const EventNotificationCard = ({ msg, heading, notifyTime, profileimg, readStatus, notificationId, notifyType }: any) => {
  const dispatch = useAppDispatch();
  const [loader, setLoader] = useState(false);
  const Notify = useAppSelector((state) => state?.getUserNotifications?.myNotifications?.data);

  console.log("All Notifications are", Notify);
  const formatTimeol = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // const formatTimeAGo = (isoString: string): string => {
  //   return dayjs(isoString).fromNow();
  // };

  const formatTime = (isoString: string): string => {
    const notificationTime = dayjs(isoString);
    const now = dayjs();

    // Check if the notification is today
    if (notificationTime.isSame(now, "day")) {
      return notificationTime.format("h:mm A"); // Format to show hours and minutes (e.g., 3:45 PM)
    } else if (notificationTime.isSame(now.subtract(1, "day"), "day")) {
      return "Yesterday";
    } else {
      return notificationTime.fromNow(); // Use relative time for older notifications
    }
  };
  async function readnotification(id: any) {
    console.log("my notify id is", id);
    const userid = typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    setLoader(true);

    try {
      const data = {
        notificationId: id,
      };
      dispatch(notificationStatus(data)).then((res: any) => {
        if (res?.payload?.status === 200) {
          setLoader(false);
          console.log("Notification Status Res", res?.payload?.data);
          // SuccessToast("Read Success");
          dispatch(getUserNotifications(userid));
        } else {
          setLoader(false);
          ErrorToast(res?.payload?.message);
        }
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function readOrgnotification(id: any) {
    console.log("my notify id is", id);
    const userid = typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    setLoader(true);

    try {
      const data = {
        notificationId: id,
      };
      dispatch(notificationStatusOrg(data)).then((res: any) => {
        if (res?.payload?.status === 200) {
          setLoader(false);
          console.log("Notification Status Res", res?.payload?.data);
          // SuccessToast("Read Success");
          dispatch(getOrgNotifications(userid));
        } else {
          setLoader(false);
          ErrorToast(res?.payload?.message);
        }
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }
  const handleRead = () => {
    if (notifyType == "user") {
      console.log("user");
      readnotification(notificationId);
    } else {
      console.log("organization");
      readOrgnotification(notificationId);
    }
  };

  return (
    <div className="gradient-slate border border-muted w-full rounded-lg p-3 flex gap-3">
      <div className="w-[56px] h-[48px] rounded-[30px] border border-white overflow-hidden">
        <Image
          src={profileimg !== null ? profileimg : "/person3TrnsBG.png"}
          width={500}
          height={500}
          className="object-cover size-[60px]"
          placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(1200, 1800))}`}
          alt=""
        />
      </div>
      {/* <div className="size-[50px] rounded-full border border-[#FF8A08] overflow-hidden">
        <Image
          src={'/person3.jpg'}
          width={500}
          height={500}
          className="object-cover size-[50px]"
          placeholder={`data:image/svg+xml;base64,${toBase64(
            shimmer(1200, 1800),
          )}`}
          alt=""
        />
      </div> */}
      <div className="w-full">
        <div className="flex justify-between w-full">
          <h3 className="font-bold break-words overflow-hidden text-ellipsis text-[14px] capitalize">{heading}</h3>
          <p className=" opacity-50 capitalize text-[12px]">{formatTime(notifyTime)}</p>
        </div>
        <p className="text-[#BFBFBF] mt-2 text-[12px]">
          {/* 🎉 Join us for an electrifying evening at the NAITRAM Launch Party,
          debuting our */}
          {msg}
        </p>
        {!readStatus && (
          <p className="text-[#00D059] text-end text-[12px] cursor-pointer hover:underline" onClick={handleRead}>
            Mark as read
          </p>
        )}
      </div>
    </div>
  );
};

export default EventNotificationCard;
