import Image from 'next/image';

const Chat = ({ img }: any) => {
  return (
    <div className="z-[2] relative flex items-end gap-4">
      <Image
        src="/person1.png"
        width={200}
        height={200}
        className="size-[40px] object-cover object-top rounded-full"
        alt="chat-profile-pic"
      />
      <div className="bg-[#151915]/40 py-2 px-3 border border-white/10 rounded-lg w-[75%] flex flex-col gap-1">
        <p className="text-primary">Evelyn Lynn</p>
        {img && (
          <Image
            src={img}
            width={500}
            height={500}
            className="w-full h-[80px] object-cover rounded-lg"
            alt="message-img"
          />
        )}
        <p className="mt-1">
          Diam fermentum adipiscing diam venenatis aliquet blandit eget.
        </p>
        <p className="text-[#D9D9D9]">02:45 PM</p>
      </div>
    </div>
  );
};

export default Chat;
