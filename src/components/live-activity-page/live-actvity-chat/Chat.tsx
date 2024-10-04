import Image from "next/image";
import { useAppSelector } from "@/lib/hooks";
const Chat = ({
  img,
  msgtext,
  username,
  userimg,
  time,
  reactionimg,
  reactioncount,
  reactions,
  attendeename
}: any) => {
  
  return (
    <div className="z-[2] relative flex items-end gap-4 ">
      <Image
        src={userimg || "/person1.png"}
        width={200}
        height={200}
        className="size-[40px] object-cover object-top rounded-full"
        alt="chat-profile-pic"
      />
      <div className="bg-[#151915]/40 py-2 px-3 border border-white/10 rounded-lg w-[248px] md:w-[420px] lg:w-[420px] ">
        <div className="flex flex-col gap-1 ">
          <p className="text-primary">{attendeename == true ? username : ""}</p>
         
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
    </div>
  );
};

export default Chat;
