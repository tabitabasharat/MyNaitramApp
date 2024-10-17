import { Button } from "@/components/ui/button";
import "./Chat.css";
import { Input } from "@/components/ui/input";
import { PaperPlaneTilt, Smiley } from "@phosphor-icons/react/dist/ssr";
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
import bendarrow from "@/assets/Wallet/Arrow Bend Up Left.svg";
import closecirecle from "@/assets/Wallet/close-circle.svg";
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
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

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

  // const handleEmojiClick = (emojiData: any) => {
  //   const emoji = emojiData.emoji;
  //   setmsgs((prevMsgs) => prevMsgs + emoji);
  //   if (activeMessage !== null) {
  //     setMessageReaction(activeMessage, emoji);
  //     setMoreEmoji(false);
  //   }
  // };

  const handleEmojiClick = (emojiData: any) => {
    const emoji = emojiData.emoji;

    if (activeMessage !== null) {
      setMessageReaction(activeMessage, emoji);
      setMoreEmoji(false);
    } else {
      setmsgs((prevMsgs) => prevMsgs + emoji);
      setShowEmojiPicker(false);
    }
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
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
          setActiveMessage(null);
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
    setActiveMessage(null);
    // setmsgs(`Replying to: ${message.msg}`);
  };

  console.log("any img", imgSrc)
  console.log("Selected msg", replyToMessage)
  async function SendMsg() {
    try {
      const data = {
        msg: msgs ? msgs : " ",
        picture: imgSrc,
        userId: userid,
        eventId: eventID,
        //  replyId: replyToMessage ? String(replyToMessage.userId) : null,
        replyId: replyToMessage ? replyToMessage.id : null,
        ismobile: false,
      };

      dispatch(createChat(data)).then((res: any) => {
        if (res?.payload?.status === 201) {
          console.log("Message sent successfully", res?.payload?.data);
          setmsgs("");
          setReplyToMessage(null);
          setImageSrc("");
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

  const handleSingleFileChangeOld = async (
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

  const handleSingleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    console.log("Selected image is:", file);
  
    if (file) {
      // Check image dimensions
      const imgUrl = URL.createObjectURL(file);
      const img = new window.Image();
      
      img.onload = async () => {
        const { width, height } = img;
  
        // Check if dimensions are at least 800x800
        if (width < 800 || height < 800) {
          ErrorToast("Upload an image with at least 800 x 800 pixels for better quality.");
          return;
        }
  
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
          setLoader(false);
        }
      };
  
      // Set the src of the img to trigger the onload
      img.src = imgUrl; // Use imgUrl to load the image
    }
  };
  
  
  const userIDlocal =
    typeof window !== "undefined" ? localStorage.getItem("_id") : null;

  const handleProfileClick = (userid: number) => {
    // Navigate to the user's profile
    router.push(`/social-profile/${userid}`);
  };
  const getUserActiveStatus = (userId: string) => {
    const userChat = EventChat.find((event: any) => event.userId === userId);
    return userChat ? userChat.user?.liveActivity?.isActive : false;
  };
  const handleCloseReply = () => {
    setReplyToMessage(null);
  };

  return (
    <div
      className="md:w-[576px] h-[600px] md:border md:border-[#292929] md:rounded-xl bg-cover bg-no-repeat px-5 relative md:overflow-hidden mt-12 md:mt-0 
  bg-effect2 bg-effect"
    >
      <ScrollArea className="h-full relative w-full mt-1 z-0 space-y-2 pb-[9rem] md:h-[600px]">
        <div className="space-y-2 block ">
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
                      msgReplyId={event?.replyId}
                      previousMsg={event?.replyMsg}
                      replyingUser={event?.replyUser?.fullname}
                      replyingUserID={event?.replyUser?.id}
                      msguserId={event?.user?.id}
                      replyPic={event?.replyPicture}
                      replyUserActive={event?.replyUser?.liveActivity?.isActive}
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
                      <Image
                        src={bendarrow}
                        alt="img"
                        sizes="16px"
                        onClick={() => handleReplyClick(event)}
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

      {/* <div className="flex absolute bottom-8 w-[90%] gap-[12px] z-[2]">
        <label
          htmlFor="upload"
          className="flex gap-2 items-center justify-between w-full cursor-pointer"
        >
          <Input
            placeholder="Type here"
            className="rounded-full relative h-12 ps-6 pr-[50px]"
            onChange={(e) => setmsgs(e.target.value)}
            value={msgs}
            onKeyDown={handleKeyDown}
          />
          {userID === userIDlocal && (
            <Image
              src={link}
              alt="link-img"
              sizes="18px"
              className="absolute top-[17px] right-[60px] "
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
          onClick={toggleEmojiPicker}
          className="absolute p-0 bg-transparent z-10 emoji-btn"
        >
          <Smiley size={18} color="white" />
        </Button>
        <Button
          className="rounded-full w-[36px] p-[0px] mt-[6px] px-[10px] h-[36px]"
          onClick={() => SendMsg()}
        >
          <PaperPlaneTilt size={16} className="h-full  " weight="bold" />
        </Button>
      </div> */}

      <div className="flex absolute bottom-8 w-[90%] gap-[12px] z-[2]">
        <label
          htmlFor="upload"
          className="flex gap-2 items-center justify-between w-full cursor-pointer"
        >
          <Input
            placeholder="Type here"
            className="rounded-full relative h-12 ps-6 pr-[58px]"
            onChange={(e) => setmsgs(e.target.value)}
            value={msgs}
            onKeyDown={handleKeyDown}
          />
          <div className="flex items-center">
          {userID === userIDlocal && (
            <Image
              src={link}
              alt="link-img"
              sizes="18px"
              className="absolute top-[17px] right-[68px]"
            />
          )}
          <Button
            onClick={toggleEmojiPicker}
            className="absolute right-[88px] top-1/2 transform -translate-y-1/2 p-0 bg-transparent z-10 cursor-pointer"
          >
            <Smiley size={18} color="white" />
          </Button>
          </div>
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
          <PaperPlaneTilt size={16} className="h-full" weight="bold" />
        </Button>
      </div>

      {showEmojiPicker && (
        <div className="absolute bottom-[5rem] emoji-picker-outer transform -translate-x-1/2 z-20 ">
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            theme={Theme.DARK}
            height={400}
            lazyLoadEmojis={true}
            className="emoji-picker-container"
          />
        </div>
      )}

      {replyToMessage && (
        <div className="absolute right-0 bottom-[12%] w-full bg-effect2 bg-effect px-[60px] py-[60px] pt-[115px]  ">
          {/* <hr className="my-2 border-t border-[#FFFFFF1A] absolute bottom-[30%] w-[100%] z-4 px-0" /> */}

          <div className="z-[2] flex-row items-end gap-4 absolute bottom-[17%] right-[10%] border-l border-l-[#13FF7A] rounded-lg  ">
            <Image
              src={closecirecle}
              alt="close"
              className="absolute top-[6px] right-[6px] cursor-pointer "
              onClick={handleCloseReply}
            />
            <div className="gradient-slate  pb-2 pt-[20px] px-4 rounded-lg me-0 chat-wid  ">
              <div className="flex flex-col gap-1">
                {getUserActiveStatus(replyToMessage.userId) && (
                  <p className="text-primary break-words overflow-hidden text-ellipsis">
                    {replyToMessage.user?.fullname}
                  </p>
                )}
                {replyToMessage?.replyPicture && (
                  <Image
                    src={replyToMessage?.replyPicture}
                    alt="img"
                    width={500}
                    height={500}
                    className="w-full h-[80px] object-cover rounded-lg"
                  />
                )}
                <p className="mt-1 break-words overflow-hidden text-ellipsis">
                  {replyToMessage.msg}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* <div className="absolute top-[-3rem] md:top-8 bg-[#0A0D0B] px-3 py-2 translate-x-1/2 right-1/2 rounded-full z-[2]">
        <p className="font-bold text-[13px] text-[#D9D9D9]">Tue, 14 March</p>
      </div> */}
      <div className="absolute bottom-0 inset-0 rounded-xl gradient-chat z-[1] pointer-events-none"></div>
    </div>
  );
};

export default LiveActivityChat;
