import Image from "next/image";
import triImage from '@/assets/triVision.png'

export default function Vision ()  {
  return (
    <div
      style={{
        backgroundImage: "url(/About/BANNERVision.png)",
        backgroundPosition: " bottom right",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        opacity: "1",
      }}
      className="flex flex-col justify-center items-center pt-0 md:py-[50px] px-[20px] md:px-0"
    >
      <h2 className="md:text-6xl text-[30px] font-normal text-center text-white mb-[20px]">
        Our Vision
      </h2>
      <p className="md:max-w-[55.338%] text-center md:text-xl text-[17px] text-white mb-[1.6em]">
        A future where events harness the power of blockchain technology to
        significantly diminish fraudulent activity, ensuring a secure and
        transparent ticketing process for all. Additionally, we foresee a
        paradigm shift in the event industry, where fans and attendees are
        valued and incentivised like never before.
      </p>
      <Image src={triImage} alt="/"  className="max-w-[100%] md:h-[500px]  md:w-[33%] w-[100%] "  />
    </div>
  );
};


