import Image from "next/image";
import { useAppSelector } from "@/lib/hooks";
import Link from "next/link";
import { ErrorToast } from "@/components/reusable-components/Toaster/Toaster";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PrivateProfilePopUp from "@/components/reusable-components/PrivateProfilePopUp";
const Chat = ({
  img,
  msgtext,
  username,
  userimg,
  time,
  reactionimg,
  reactioncount,
  reactions,
  attendeename,
  userid,
  localUserId,
  isActive,
  onProfileClick,
}: any) => {
  console.log("my local userid ", localUserId);

  const router = useRouter();
  const [isClaimOpen, setisClaimOpen] = useState(false);

  // const handleProfileClick = (e: any) => {
  //   e.preventDefault();

  //   if (isActive) {
  //     router.push(`/social-profile/${userid}`);
  //   } else {
  //     ErrorToast("This User Profile is Private");
  //   }
  // };

  const handleProfileClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isActive) {
      onProfileClick(userid);
    } else {
      // ErrorToast("This User Profile is Private");
      setisClaimOpen(true);
    }
  };
  return (
    // <div className="z-[2] relative flex items-end gap-4 ">
    <div
      className={`z-[2] flex ${
        localUserId == true
          ? "flex-row-reverse pr-[37px] "
          : "flex-row me-[44px] sm:me-[55px]"
      } items-end gap-4`}
    >
      <div onClick={handleProfileClick} className="cursor-pointer">
        <Image
          src={userimg || "/person1.png"}
          width={200}
          height={200}
          className="size-[32px] object-cover object-top rounded-full max-w-fit cursor-pointer"
          alt="chat-profile-pic"
        />
      </div>
      {/* <div className="bg-[#151915]/40 py-2 px-3 border border-white/10 rounded-lg w-full me-[44px] sm:me-[55px] "> */}
      <div className="bg-[#151915]/40 py-2 px-3 border border-white/10 rounded-lg me-0 chat-wid ">
        <div className="flex flex-col gap-1 ">
          <p className="text-primary break-words overflow-hidden text-ellipsis">
            {attendeename == true ? username : ""}
          </p>

          {img && (
            <Image
              src={img}
              width={500}
              height={500}
              className="w-full h-[80px] object-cover rounded-lg"
              alt="message-img"
            />
          )}

          {/* <p className="mt-1">{msgtext}</p> */}
          <p className="mt-1 break-words overflow-hidden text-ellipsis">
            {msgtext}
          </p>
        </div>
        {reactions?.length > 0 && (
          <div className="flex items-center justify-between">
            <p className="text-[#D9D9D9]">{time}</p>
            <div
              style={{
                background: "#FFFFFF14",
              }}
              className="flex items-baseline justify-center  gap-[2px] px-[4.5px] py-[1px] rounded-full"
            >
              {reactions?.map((reaction: any, index: number) => (
                <div key={index} className="flex items-center">
                  <p>{reaction?.reactionType}</p>
                  <p className="text-[#D9D9D9] text-[12px] ml-1">
                    {reaction?.count}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {isClaimOpen && (
        <PrivateProfilePopUp
          onClose={() => setisClaimOpen(false)}
          open={() => setisClaimOpen(true)}
          msg={"This User's Profile is Private"}
        
         
        />
      )}
    </div>
  );
};

export default Chat;
