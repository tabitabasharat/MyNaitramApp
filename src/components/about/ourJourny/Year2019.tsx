import Image from "next/image";
import tick from '@/assets/tick.svg'
import Imagemain from '@/assets/Group 427321055.png'

const Nine = () => {
  return (
    <div className="p-[40px] max-w-[100%]">
      <div className="flex justify-start items-center ">
        <Image src={tick}  className="w-[24px] h-[24px]" alt="/" />
        <p className="pl-[5px] md:text-[16px] text-[14px] ">Conceptualise the idea of NAITRAM, a revolutionary web3 ticketing solution.</p>
      </div>
      <Image src={Imagemain} alt="/" />
      <h2 className="md:text-[60px] text-[25px] font-[600] text-center">2019</h2>
    </div>
  );
};
export default Nine;
