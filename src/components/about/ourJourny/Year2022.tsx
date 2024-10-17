import Image from "next/image";
import tick from "@/assets/tick.svg";
import Imagemain from "@/assets/Group 427321055.png";

const Nine = () => {
  return (
    <div className="p-[40px] max-w-[100%]">
      <div className="flex justify-start items-center pb-2">
        <Image src={tick} className="w-[24px] h-[24px]" alt="/" />
        <p className="pl-[5px] md:text-[16px] text-[14px] ">
          Attend Dubai Binance Blockchain Week to meet industry experts
        </p>
      </div>
      <div className="flex justify-start items-center pb-2">
        <Image src={tick} className="w-[24px] h-[24px]" alt="/" />
        <p className="pl-[5px] md:text-[16px] text-[14px] ">
          Speak at NFTUK about our revolutionary solution
        </p>
      </div>
      <div className="flex justify-start items-center pb-2">
        <Image src={tick} className="w-[24px] h-[24px]" alt="/" />
        <p className="pl-[5px] md:text-[16px] text-[14px] ">
          House Of Parliament talk about Blockchain and NFTs
        </p>
      </div>
      <div className="flex justify-start items-center pb-2">
        <Image src={tick} className="w-[24px] h-[24px]" alt="/" />
        <p className="pl-[5px] md:text-[16px] text-[14px] ">
          Global Advertisement (Times Square Billboards)
        </p>
      </div>
      <div>
        <Image src={Imagemain} alt="/" />
      </div>
      <h2 className="md:text-[60px] text-[25px] font-[600] text-center ">
        2022
      </h2>
    </div>
  );
};
export default Nine;
