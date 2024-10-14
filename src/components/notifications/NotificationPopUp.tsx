import { X } from "@phosphor-icons/react/dist/ssr";
import GradientBorder from "../ui/gradient-border";
import { socket } from "@/lib/socket";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { API_URL } from "@/lib/client";
import api from "@/lib/apiInterceptor";
import EventNotificationCard from "./EventNotificationCard";
import MessgaeNotificationCard from "./MessgaeNotificationCard";
import { useState, useEffect } from "react";
import {
  getUserNotifications,
  getOrgNotifications,
  getUserReadNotifications,
  getOrgReadNotifications,
} from "@/lib/middleware/notification";
import profileimg from "@/assets/Avatar-1.svg";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);
const NotificationPopUp = ({ setNotifPopupOpen }: any) => {
  const dispatch = useAppDispatch();

  const [activeTab, setActiveTab] = useState<"USER" | "ORGANISER">("USER");
  const [active, setActive] = useState<string>("today");

  useEffect(() => {
    const userid =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    console.log("user id ", userid);
    dispatch(getUserNotifications(userid));
    dispatch(getOrgNotifications(userid));
  }, []);
  const handleClick = (period: string) => {
    setActive(period);
  };

  const Notify = useAppSelector(
    (state) => state?.getUserNotifications?.myNotifications?.data
  );

  console.log("All User Notifications are", Notify);
  const NotifyOrg = useAppSelector(
    (state) => state?.getOrgNotifications?.myNotifications?.data
  );
  console.log("All Org Notifications are", NotifyOrg);

  const getAllNotifications = () => {
    const userid =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    console.log("user id ", userid);
    dispatch(getUserNotifications(userid));
  };

  useEffect(() => {
    const userid =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    console.log("user id ", userid);
    const handleDisconnect = (reason: any) => {
      console.log("Socket disconnected:", reason);
    };

    const handleConnect = () => {
      console.log("Socket is connecting");
      if (userid) {
        socket.emit("join", userid);
      }
    };
    socket.on("connect", () => {
      console.log("socket is connecting");
      socket.emit("join", userid);
    });
    if (userid) {
      socket.on("userLoggedIn", getAllNotifications);
      socket.on("userSignedUp", getAllNotifications);
      socket.on("rewardClaimed", getAllNotifications);
      socket.on("eventCreated", getAllNotifications);

      socket.on("eventDisliked", getAllNotifications);
      socket.on("eventLiked", getAllNotifications);
      socket.on("eventUpdated", getAllNotifications);
      socket.on("profileUpdated", getAllNotifications);
      socket.on("ticketBought", getAllNotifications);

      // socket.on("disconnect", (reason) => {});
      socket.on("disconnect", handleDisconnect);

      return () => {
        if (userid) {
          socket.off("userLoggedIn", getAllNotifications);
          socket.off("userSignedUp", getAllNotifications);
          socket.off("rewardClaimed", getAllNotifications);
          socket.off("eventDisliked", getAllNotifications);
          socket.off("eventLiked", getAllNotifications);
          socket.off("eventUpdated", getAllNotifications);
          socket.off("eventCreated", getAllNotifications);
          socket.off("profileUpdated", getAllNotifications);
          socket.off("ticketBought", getAllNotifications);
        }

        socket.off("connect", handleConnect);
        socket.off("disconnect", handleDisconnect);
      };
    }
  }, []);

  const Unreadnotification =
    Notify && Notify?.some((item: any) => item && item?.NotifyRead === false);

  const filterNotifications = (notifications: any) => {
    const now = dayjs();
    console.log("All notifications:", notifications); // Log all notifications

    let filteredNotifications;
    switch (active) {
      case "today":
        filteredNotifications = notifications.filter((notification: any) =>
          dayjs(notification.createdAt).isSame(now, "day")
        );
        break;
      case "This Week": // Updated case for "This Week"
        filteredNotifications = notifications.filter((notification: any) =>
          dayjs(notification.createdAt).isBetween(
            now.startOf("week"),
            now.endOf("week"),
            null,
            "[]" // Inclusive
          )
        );
        break;
      case "This Month": // Updated case for "This Month"
        filteredNotifications = notifications.filter((notification: any) =>
          dayjs(notification.createdAt).isBetween(
            now.startOf("month"),
            now.endOf("month"),
            null,
            "[]" // Inclusive
          )
        );
        break;
      default:
        filteredNotifications = notifications;
    }

    console.log(`Filtered notifications for ${active}:`, filteredNotifications); // Log filtered notifications
    return filteredNotifications;
  };

  return (
    <div className="bg-black relative z-[1400]">
      <div className="flex justify-between">
        <p className="text-[22px] font-bold">Notifications</p>
        <X
          className="cursor-pointer"
          onClick={() => {
            setNotifPopupOpen(false);
          }}
          size={20}
        />
      </div>
      <div className="flex mt-[16px]">
        <div className="w-full">
          <p
            className={`text-center text-sm font-bold pb-[16px]  ${
              activeTab === "USER"
                ? "text-[white] border-[#00A849] border-b-2"
                : "border-b text-[#757575] border-[#292929]"
            } cursor-pointer`}
            onClick={() => setActiveTab("USER")}
          >
            USER
          </p>
        </div>
        <div className="w-full">
          <p
            className={`text-center text-sm font-bold pb-[16px] ${
              activeTab === "ORGANISER"
                ? "text-[white] border-[#00A849] border-b-2"
                : "border-b text-[#757575] border-solid border-[#292929]"
            } cursor-pointer`}
            onClick={() => setActiveTab("ORGANISER")}
          >
            ORGANISER
          </p>
        </div>
      </div>

      {/* Time Period Buttons */}
      <div className="flex flex-wrap gap-2 mt-[20px]">
        {["today", "This Week", "This Month"].map((period) => (
          <div
            key={period}
            onClick={() => setActive(period)} // Set the active state to match button labels
            className={`border border-[#3C3C3C] w-fit rounded-full flex flex-row lg:flex-col gap-1 px-[12px] py-[8px] gradient-slate ${
              active === period
                ? "gradient-border-notify text-primary"
                : "text-white"
            } items-center lg:items-start cursor-pointer`}
          >
            <p className="text-sm font-extrabold">
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </p>
          </div>
        ))}
      </div>
      {/* <div className="flex flex-wrap gap-2 mt-[20px]">
       
        <div
          onClick={() => handleClick("today")}
          className={`border border-[#3C3C3C] w-fit rounded-full flex flex-row lg:flex-col gap-1 px-[12px] py-[8px] gradient-slate ${
            active === "today"
              ? "gradient-border-notify text-primary"
              : "text-white"
          } items-center lg:items-start cursor-pointer`}
        >
          <p className="text-sm font-extrabold">Today</p>
        </div>

        <div
          onClick={() => handleClick("week")}
          className={`border border-[#3C3C3C] w-fit rounded-full flex flex-row lg:flex-col gap-1 px-[12px] py-[8px] gradient-slate ${
            active === "week"
              ? "gradient-border-notify text-primary"
              : "text-white"
          } items-center lg:items-start cursor-pointer`}
        >
          <p className="text-sm font-extrabold">This Week</p>
        </div>

        <div
          onClick={() => handleClick("month")}
          className={`border border-[#3C3C3C] w-fit rounded-full flex flex-row lg:flex-col gap-1 px-[12px] py-[8px] gradient-slate ${
            active === "month"
              ? "gradient-border-notify text-primary"
              : "text-white"
          } items-center lg:items-start cursor-pointer`}
        >
          <p className="text-sm font-extrabold">This Month</p>
        </div>
      </div> */}

      {/* Notifications List */}

      {/* {activeTab === "USER" && (
        <div className="mt-[24px] lg:mt-[28px] flex flex-col gap-2">
          {Notify?.length > 0 &&
            Notify?.map((item: any, index: any) => {
              
              if (
                item?.action !== "Event created" &&
                item?.action !== "Event updated" &&
                item?.action !== "Ticket Purchase"
              ) {
                return (
                  <EventNotificationCard
                    key={index}
                    msg={item?.msg}
                    heading={item?.action}
                    notifyTime={item?.createdAt}
                    
                  />
                  
                );
              }
              return null;
            })}
        </div>
      )} */}
      {/* {activeTab === "USER" && (
        <div className="mt-[24px] lg:mt-[28px] flex flex-col gap-2">
          {Notify?.length > 0 &&
            Notify?.map((item: any, index: any) => {
              return (
                <EventNotificationCard
                  key={index}
                  msg={item?.msg}
                  heading={item?.action}
                  notifyTime={item?.createdAt}
                  readStatus={item?.NotifyRead}
                  notificationId={item?.id}
                  notifyType={"user"}
                 profileimg={item?.picture}
                />
              );
            })}
        </div>
      )} */}

      {activeTab === "USER" && (
        <div className="mt-[24px] lg:mt-[28px] flex flex-col gap-2">
          {filterNotifications(Notify)?.length > 0 &&
            filterNotifications(Notify).map((item: any, index: any) => (
              <EventNotificationCard
                key={index}
                msg={item?.msg}
                heading={item?.action}
                notifyTime={item?.createdAt}
                readStatus={item?.NotifyRead}
                notificationId={item?.id}
                notifyType={"user"}
                profileimg={item?.picture}
              />
            ))}
        </div>
      )}

      {/* {activeTab === "ORGANISER" && (
        <div className="mt-[24px] lg:mt-[28px] flex flex-col gap-2">
          {Notify?.length > 0 &&
            Notify?.map((item: any, index: any) => {
              if (
                item?.action === "Event created" ||
                item?.action === "Event updated" ||
                item?.action === "Ticket Purchase"
              ) {
                return (
                  <EventNotificationCard
                    key={index}
                    msg={item?.msg}
                    heading={item?.action}
                    notifyTime={item?.createdAt}
                    profileimg={profileimg}
                  />
                );
              }
              return null;
            })}
        </div>
      )} */}
      {/* {activeTab === "ORGANISER" && (
        <div className="mt-[24px] lg:mt-[28px] flex flex-col gap-2">
          {NotifyOrg?.length > 0 &&
            NotifyOrg?.map((item: any, index: any) => {
              return (
                <EventNotificationCard
                  key={index}
                  msg={item?.msg}
                  heading={item?.action}
                  notifyTime={item?.createdAt}
                  
                  readStatus={item?.NotifyRead}
                  notificationId={item?.id}
                  notifyType={"organization"}
                  profileimg={item?.picture}
                />
              );
            })}
        </div>
      )} */}

      {activeTab === "ORGANISER" && (
        <div className="mt-[24px] lg:mt-[28px] flex flex-col gap-2">
          {filterNotifications(NotifyOrg)?.length > 0 &&
            filterNotifications(NotifyOrg).map((item: any, index: any) => (
              <EventNotificationCard
                key={index}
                msg={item?.msg}
                heading={item?.action}
                notifyTime={item?.createdAt}
                readStatus={item?.NotifyRead}
                notificationId={item?.id}
                notifyType={"organization"}
                profileimg={item?.picture}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default NotificationPopUp;
