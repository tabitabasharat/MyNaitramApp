import { X } from "@phosphor-icons/react/dist/ssr";
import GradientBorder from "../ui/gradient-border";
import EventNotificationCard from "./EventNotificationCard";
import MessgaeNotificationCard from "./MessgaeNotificationCard";
import { useState } from "react";

const NotificationPopUp = ({ setNotifPopupOpen }: any) => {
  const [activeTab, setActiveTab] = useState<"USER" | "ORGANISER">("USER");
  const [active, setActive] = useState<string>("today");

  // Function to handle clicks and set active state
  const handleClick = (period: string) => {
    setActive(period);
  };

  return (
    <div className="bg-black">
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
        {/* USER tab */}
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

        {/* ORGANISER tab */}
        <div className="w-full">
          <p
            className={`text-center text-sm font-bold pb-[16px] ${
              activeTab === "ORGANISER"
                ? "text-[white] border-[#00A849] border-b-2"
                : "border-b-1 text-[#757575] border-[#292929]"
            } cursor-pointer`}
            onClick={() => setActiveTab("ORGANISER")}
          >
            ORGANISER
          </p>
        </div>
      </div>

      {/* Time Period Buttons */}
      <div className="flex flex-wrap gap-2 mt-[20px]">
        {/* Today */}
        {/* <GradientBorder
          className={`rounded-full w-fit`}
        > */}
          <div
            onClick={() => handleClick("today")}
            className={`border border-[#3C3C3C] w-fit rounded-full flex flex-row lg:flex-col gap-1 px-[12px] py-[8px] gradient-slate ${
              active === "today" ? "gradient-border-notify text-primary" : "text-white"
            } items-center lg:items-start cursor-pointer`}
          >
            <p className="text-sm font-extrabold">Today</p>
          </div>
        {/* </GradientBorder> */}

        {/* This Week */}
        <div
          onClick={() => handleClick("week")}
          className={`border border-[#3C3C3C] w-fit rounded-full flex flex-row lg:flex-col gap-1 px-[12px] py-[8px] gradient-slate ${
            active === "week" ? "gradient-border-notify text-primary" : "text-white"
          } items-center lg:items-start cursor-pointer`}
        >
          <p className="text-sm font-extrabold">This Week</p>
        </div>

        {/* This Month */}
        <div
          onClick={() => handleClick("month")}
          className={`border border-[#3C3C3C] w-fit rounded-full flex flex-row lg:flex-col gap-1 px-[12px] py-[8px] gradient-slate ${
            active === "month" ? "gradient-border-notify text-primary" : "text-white"
          } items-center lg:items-start cursor-pointer`}
        >
          <p className="text-sm font-extrabold">This Month</p>
        </div>
      </div>

      {/* Notifications List */}
      <div className="mt-[24px] lg:mt-[28px] flex flex-col gap-2">
        <EventNotificationCard />
        <MessgaeNotificationCard />
        <EventNotificationCard />
        <MessgaeNotificationCard />
        <EventNotificationCard />
        <MessgaeNotificationCard />
      </div>
    </div>
  );
};

export default NotificationPopUp;
