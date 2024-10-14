import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PaperPlaneTilt } from "@phosphor-icons/react/dist/ssr";
import React, { useState, useEffect, useRef } from "react";
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
import Image from "next/image";
import addmore from "@/assets/Button (3).svg";
import link from "@/assets/Link Simple.svg";
import { API_URL } from "@/lib/client";
import api from "@/lib/apiInterceptor";
import { msgReaction } from "@/lib/middleware/liveactivity";
import EmojiPicker from "emoji-picker-react";
import { Theme } from "emoji-picker-react";
import { EmojiStyle } from "emoji-picker-react";
import { SkinTones } from "emoji-picker-react";
import { SkinTonePickerLocation } from "emoji-picker-react";
import { useRouter } from "next/navigation";
// Utility function to format time
const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // 12-hour format with AM/PM
  });
};

const LiveActivityChat = ({ eventID, userID }: any) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [replyToMessage, setReplyToMessage] = useState<any>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [userid, setUserid] = useState<string | null>(null);
  const [loader, setLoader] = useState(false);
  const [msgs, setmsgs] = useState<string>("");
  const [activeIndex, setActiveIndex] = useState<number | null>(null); // State to track active emoji/image
  const [imgSrc, setImageSrc] = useState<any>("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [moreEmoji, setMoreEmoji] = useState<any>(false);

  const [activeMessage, setActiveMessage] = useState<number | null>(null);
  const [messageReactions, setMessageReactions] = useState<{
    [key: number]: string;
  }>({}); // State to store emoji reactions
  const emojis = ["😂", "🤩", "🔥", "😍"];

  const handleMoreEmoji = () => {
    setMoreEmoji(!moreEmoji);
  };

  console.log("active state", activeMessage);
  console.log("active reactio", messageReactions);
  const handleMessagePress = (messageId: number) => {
    console.log("Clicked message ID:", messageId);
    if (activeMessage == messageId) {
      setActiveMessage(null); // If same message is pressed again, close reactions
    } else {
      setActiveMessage(messageId); // Open reactions for the selected message
    }
    // setActiveMessage((prevActiveMessage) =>
    //   prevActiveMessage === messageId ? null : messageId
    // );
  };

  // const setMessageReaction = (messageId: number, emoji: string) => {
  //   console.log(`Setting reaction for message ${messageId}: ${emoji}`); // Debugging log
  //   setMessageReactions((prevReactions) => ({
  //     ...prevReactions,
  //     [messageId]: emoji, // Store emoji for the message
  //   }));
  // };

  const handleEmojiClick = (emojiData: any) => {
    const emoji = emojiData.emoji;
    if (activeMessage !== null) {
      setMessageReaction(activeMessage, emoji);
      setMoreEmoji(false);
    }
  };
  async function setMessageReaction(messageId: number, emoji: string) {
    try {
      console.log(`Setting reaction for message ${messageId}: ${emoji}`);

      const data = {
        chatId: messageId,
        reactionType: emoji,
        userId: userid,
        eventId: eventID,
      };

      dispatch(msgReaction(data)).then((res: any) => {
        if (res?.payload?.status === 201) {
          console.log("Message reaction", res?.payload?.data);

          // setmsgs("");
          dispatch(getChat(eventID));
        } else {
          console.log(res?.payload?.message);
        }
      });
    } catch (error) {
      console.error("Error:", error);
      ErrorToast(error);
    }
  }

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
  const myAttendees = useAppSelector(
    (state) => state?.getAllAttend?.attend?.data
  );

  console.log("filtered attendees new", myAttendees);

  useEffect(() => {
    const userid =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;

    const handleDisconnect = (reason: any) => {
      console.log("Socket disconnected:", reason);
    };

    const handleConnect = () => {
      console.log("Socket is connecting");
      if (userid) {
        socket.emit("join", userid);
      }
    };

    // Only proceed if userid is available
    if (userid) {
      socket.on("connect", handleConnect);
      socket.on("disconnect", handleDisconnect);

      // Handle new chat message if eventID is provided
      if (eventID) {
        socket.on("newChatMessage", GetMessengerHistory);
      }

      // Handle reaction updates if activeMessage is provided
      if (activeMessage) {
        socket.on("reactionUpdated", GetMessengerHistory);
      }

      // Cleanup on unmount or when dependencies change
      return () => {
        socket.off("connect", handleConnect);
        socket.off("disconnect", handleDisconnect);

        // Remove listeners for eventID and activeMessage
        if (eventID) {
          socket.off("newChatMessage", GetMessengerHistory);
        }
        if (activeMessage) {
          socket.off("reactionUpdated", GetMessengerHistory);
        }
      };
    }
  }, [eventID, activeMessage]);

  const userLoading = useAppSelector((state) => state?.getEventChat);

  const handleReplyClick = (message: any) => {
    setReplyToMessage(message);
    setmsgs(`Replying to: ${message.msg}`); // Pre-fill the input
  };

  async function SendMsg() {
    try {
      const data = {
        msg: msgs,
        picture: imgSrc,
        userId: userid,
        eventId: eventID,
      };

      dispatch(createChat(data)).then((res: any) => {
        if (res?.payload?.status === 201) {
          console.log("Message sent successfully", res?.payload?.data);
          setmsgs("");
          dispatch(getChat(eventID));
        } else {
          ErrorToast(res?.payload?.message);
        }
      });
    } catch (error) {
      console.error("Error:", error);
      ErrorToast(error);
    }
  }
  // const scrollToBottom = () => {
  //   chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  // };
  const scrollToBottom = () => {
    const chatArea = chatEndRef.current;
    if (chatArea) {
      const { scrollHeight, clientHeight } = chatArea;
      const isAtBottom =
        Math.abs(scrollHeight - clientHeight - chatArea.scrollTop) < 50; // Adjust threshold as needed
      if (isAtBottom) {
        chatEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [EventChat]);

  const handleSingleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    console.log("Selected r img is:", file);

    if (file) {
      setLoader(true);

      try {
        const formData = new FormData();
        formData.append("file", file);
        const filename = file?.name;
        console.log("file name", filename);
        const res: any = await api.post(
          `${API_URL}/upload/uploadimage`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (res.status === 200) {
          setLoader(false);

          console.log("File uploaded", res);
          setImageSrc(res?.data?.data);
          console.log(res?.data?.data, "this is the file url");
          SuccessToast("File Uploaded Successfully");
        } else {
          setLoader(false);
          ErrorToast(res?.payload?.message || "Error uploading image");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const userIDlocal =
    typeof window !== "undefined" ? localStorage.getItem("_id") : null;

  const handleProfileClick = (userid: number) => {
    // Navigate to the user's profile
    router.push(`/social-profile/${userid}`);
  };
  return (
    <div
      className="md:w-[576px] h-[600px] md:border md:border-[#292929] md:rounded-xl bg-cover bg-no-repeat px-5 relative md:overflow-hidden mt-12 md:mt-0 
  bg-effect2 bg-effect"
    >
      <ScrollArea className="h-full relative w-full mt-1 z-0 space-y-2 pb-[6rem]">
        <div className="space-y-2 block">
          {EventChat?.length > 0 &&
            EventChat?.map((event: any, index: any) => {
              const attendee = myAttendees?.find(
                (attendee: any) => attendee?.attendeeId === event?.userId
              );
              const isLocalUser = event?.userId === userIDlocal;
              console.log("my event user id", event?.userId);
              return (
                <div key={event?.id} className="relative">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMessagePress(event?.id);
                      // handleReplyClick(event);
                    }}
                  >
                    <Chat
                      key={event?.id}
                      msgtext={event?.msg}
                      username={event?.user?.fullname}
                      img={event?.picture}
                      userimg={event?.user?.profilePicture}
                      time={formatTime(event?.createdAt)}
                      reactions={event?.reactions}
                      // attendeename={attendee?.isActive}
                      attendeename={event?.user?.liveActivity?.isActive}
                      userid={event?.userId}
                      localUserId={event?.userId == userIDlocal ? true : false}
                      isActive={event?.user?.liveActivity?.isActive}
                      onProfileClick={handleProfileClick}
                    />
                  </div>
                  {activeMessage === event?.id && (
                    <div className="absolute top-0 right-0 flex flex-col items-center space-y-2 z-10">
                      {emojis.map((emoji, index) => (
                        <p
                          key={index}
                          onClick={() => setMessageReaction(event?.id, emoji)}
                          className={`cursor-pointer bg-[#FFFFFF0F] h-[32px] w-[32px] pt-[7px] pb-[4px] pe-[3.5px] ps-[5.5px] rounded-full flex items-center justify-center text-xl ${
                            messageReactions[event?.id] === emoji
                              ? "border border-solid border-[#FFFFFF]"
                              : ""
                          }`}
                        >
                          {emoji}
                        </p>
                      ))}
                      <Image
                        src={addmore}
                        alt="img"
                        sizes="16px"
                        onClick={() => handleMoreEmoji()}
                        className="cursor-pointer"
                      />
                      {activeMessage === event?.id && moreEmoji && (
                        <div className="absolute top-0 right-[35px] p-2 gradient-slate rounded cursor-pointer">
                          <EmojiPicker
                            onEmojiClick={handleEmojiClick}
                            theme={"dark" as Theme}
                            height={"350px"}
                            width={"100%"}
                            lazyLoadEmojis={true}
                            style={{
                              background: "transparent",
                            }}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
        </div>

        <div ref={chatEndRef} />
      </ScrollArea>
      <div className="flex absolute bottom-8 w-[90%] gap-[12px] z-[2]">
        <label
          htmlFor="upload"
          className="flex gap-2 items-center justify-between w-full cursor-pointer"
        >
          <Input
            placeholder="Type here"
            className="rounded-full relative h-12 px-6"
            onChange={(e) => setmsgs(e.target.value)}
            value={msgs}
            onKeyDown={handleKeyDown}
          />
          {userID === userIDlocal && (
            <Image
              src={link}
              alt="link-img"
              sizes="16px"
              className="absolute top-[16px] right-[60px]"
            />
          )}
        </label>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          id="upload"
          onChange={handleSingleFileChange}
        />
        <Button
          className="rounded-full w-[36px] p-[0px] mt-[6px] px-[10px] h-[36px]"
          onClick={() => SendMsg()}
        >
          <PaperPlaneTilt size={16} className="h-full " weight="bold" />
        </Button>
      </div>
      {/* {replyToMessage && (
  <div className="absolute top-[-60px] left-0 w-full bg-[#f0f0f0] p-2 rounded-md shadow-md">
    <p className="text-sm text-gray-600">Replying to:</p>
    <p className="font-semibold">{replyToMessage.user?.fullname}</p>
    <p className="text-gray-800">{replyToMessage.msg}</p>
  </div>
)} */}
      {/* <div className="absolute top-[-3rem] md:top-8 bg-[#0A0D0B] px-3 py-2 translate-x-1/2 right-1/2 rounded-full z-[2]">
        <p className="font-bold text-[13px] text-[#D9D9D9]">Tue, 14 March</p>
      </div> */}
      <div className="absolute bottom-0 inset-0 rounded-xl gradient-chat z-[1] pointer-events-none"></div>
    </div>
  );
};

export default LiveActivityChat;
