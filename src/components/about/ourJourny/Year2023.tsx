import Image from "next/image";
import tick from "@/assets/tick.svg";
import Imagemain from "@/assets/Group 427321055.png";

const Nine = () => {
  return (
    <div className="p-[40px] max-w-[100%]">
      <div className="flex justify-start items-center pb-2 ">
        <Image src={tick} className="w-[24px] h-[24px]" alt="/" />
        <p className="pl-[5px] md:text-[16px] text-[14px] ">
          Begin coding and building the platform while conducting regular tests
          and refinements.
        </p>
      </div>
      <div className="flex justify-start items-center pb-2 ">
        <Image src={tick} className="w-[24px] h-[24px]" alt="/" />
        <p className="pl-[5px] md:text-[16px] text-[14px] ">
          Host an exclusive event to showcase the concept & demonstrate the BETA
          stage with partners and community members
        </p>
      </div>
      <div className="flex justify-start items-center pb-2 ">
        <Image src={tick} className="w-[24px] h-[24px]" alt="/" />
        <p className="pl-[5px] md:text-[16px] text-[14px] ">
        Secure the initial round of funding for product development and operational costs.
        </p>
      </div>
      <div>
        <Image src={Imagemain} alt="/" />
      </div>
      <h2 className="md:text-[60px] text-[25px] font-[600] text-center ">
        2023/2024
      </h2>
    </div>
  );
};
export default Nine;
