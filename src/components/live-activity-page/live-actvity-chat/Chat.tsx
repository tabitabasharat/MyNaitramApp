import Image from "next/image";

const Chat = ({ img, msgtext, username, userimg, time }: any) => {
  return (
    <div className="z-[2] relative flex items-end gap-4">
      <Image
        src={userimg || "/person1.png"}
        width={200}
        height={200}
        className="size-[40px] object-cover object-top rounded-full"
        alt="chat-profile-pic"
      />
      <div className="bg-[#151915]/40 py-2 px-3 border border-white/10 rounded-lg w-[75%] flex flex-col gap-1">
        <p className="text-primary">{username}</p>
        {img && (
          <Image
            src={img}
            width={500}
            height={500}
            className="w-full h-[80px] object-cover rounded-lg"
            alt="message-img"
          />
        )}
        <p className="mt-1">{msgtext}</p>
        <p className="text-[#D9D9D9]">{time}</p>
      </div>
    </div>
  );
};

export default Chat;
