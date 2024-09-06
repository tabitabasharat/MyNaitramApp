import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PaperPlaneTilt } from "@phosphor-icons/react/dist/ssr";
import React, { useState, useEffect } from "react";
import Chat from "@/components/live-activity-page/live-actvity-chat/Chat";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  SuccessToast,
  ErrorToast,
} from "@/components/reusable-components/Toaster/Toaster";
import { createChat, getChat } from "@/lib/middleware/liveactivity";
import ScreenLoader from "@/components/loader/Screenloader";
import { socket } from "@/lib/socket";

// Utility function to format time
const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // 12-hour format with AM/PM
  });
};

const LiveActivityChat = ({ eventID }: any) => {
  const dispatch = useAppDispatch();
  const [userid, setUserid] = useState<string | null>(null);
  const [loader, setLoader] = useState(false);
  const [msgs, setmsgs] = useState<string>("");

  useEffect(() => {
    const userID =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    setUserid(userID);
    console.log("User ID logged in:", userID);
  }, []);

  useEffect(() => {
    if (eventID) {
      console.log("Fetching chat for eventID:", eventID);
      dispatch(getChat(eventID));
    }
  }, [eventID, dispatch]);

  const EventChat = useAppSelector(
    (state) => state?.getEventChat?.myEventChat?.data
  );
  console.log("My event chat is:", EventChat);

  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      e.preventDefault(); // Prevent default form submission behavior
      SendMsg();
    }
  };

  const GetMessengerHistory = () => {
    dispatch(getChat(eventID));
  };

  useEffect(() => {
    const userid = typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    socket.on("connect", () => {
      // audio.play();
      console.log("socket is connecting");
      socket.emit("join", userid);
    });
    if (userid && eventID) {
      socket.on("newChatMessage", GetMessengerHistory);

      socket.on("disconnect", (reason) => {});
      return () => {
        if (userid && eventID) {
          socket.off("newChatMessage", GetMessengerHistory);
        }
        socket.off("connect", (reason) => {});
        socket.off("disconnect", (reason) => {});
      };
    }
  }, []);

  const userLoading = useAppSelector((state) => state?.getEventChat);

  async function SendMsg() {
    try {
      const data = {
        msg: msgs,
        picture:
          "https://web3fund.s3.eu-central-1.amazonaws.com/social-img-2.svg",
        userId: userid,
        eventId: eventID,
      };

      dispatch(createChat(data)).then((res: any) => {
        if (res?.payload?.status === 201) {
          setLoader(false);
          console.log("Message sent successfully", res?.payload?.data);
          SuccessToast("Message sent successfully");
          setmsgs("");
          dispatch(getChat(eventID));
        } else {
          setLoader(false);
          ErrorToast(res?.payload?.message);
        }
      });
    } catch (error) {
      console.error("Error:", error);
      ErrorToast(error);
    }
  }

  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(/blur-green.png)",
        backgroundPosition: "right",
      }}
      className="w-full lg:w-[576px] h-[600px] md:border md:border-[#292929] rounded-xl bg-cover bg-no-repeat px-5 relative md:overflow-hidden mt-12 md:mt-0"
    >
      <ScrollArea className="h-full w-full mt-1 z-0 space-y-2 pb-[6rem]">
        {userLoading.loading && <ScreenLoader />}
        <div className="space-y-2">
          {EventChat?.length > 0 &&
            EventChat?.map((event: any) => (
              <Chat
                key={event?.id}
                msgtext={event?.msg}
                username={event?.user?.fullname}
                img={event?.picture}
                userimg={event?.user?.profilePicture}
                time={formatTime(event?.createdAt)}
              />
            ))}
        </div>
      </ScrollArea>

      <div className="flex absolute bottom-8 w-[90%] gap-4 z-[2]">
        <Input
          placeholder="Type here"
          className="rounded-full h-12 px-6"
          onChange={(e) => setmsgs(e.target.value)}
          value={msgs}
          onKeyDown={handleKeyDown}
        />
        <Button
          className="rounded-full w-[36px] h-[36px]"
          onClick={() => SendMsg()}
        >
          <PaperPlaneTilt size={16} className="h-full" weight="bold" />
        </Button>
      </div>
      <div className="absolute top-[-3rem] md:top-8 bg-[#0A0D0B] px-3 py-2 translate-x-1/2 right-1/2 rounded-full z-[2]">
        <p className="font-bold text-[13px] text-[#D9D9D9]">Tue, 14 March</p>
      </div>
      <div className="absolute bottom-0 inset-0 rounded-xl gradient-chat z-[1] pointer-events-none"></div>
    </div>
  );
};

export default LiveActivityChat;
