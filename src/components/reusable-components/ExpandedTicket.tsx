import Image from 'next/image';
import qr from '@/assets/tktqr.png';
import { Button } from '../ui/button';
import { CubeTransparent, Info } from '@phosphor-icons/react/dist/ssr';

const ExpandedTicket = () => {
  return (
    <div className="bg-[#00A849] w-[300px] lg:w-[370px] rounded-xl py-10 px-6 relative">
      <div className="absolute size-[25px] rounded-full z-[5] bg-black right-0 bottom-[8.7rem] translate-x-1/2"></div>
      <div className="absolute size-[25px] rounded-full z-[5] bg-black left-0 bottom-[8.7rem] -translate-x-1/2"></div>
      <Info
        size={28}
        weight="fill"
        className="absolute top-4 right-4 text-[#292929]"
      />
      <div className="flex flex-col justify-center items-center gap-4">
        <Image src={qr} width={180} height={180} className="mx-auto" alt="" />
        <Button className="mx-auto shadow-sm">Enlarge Code</Button>
      </div>

      <div className="mt-6">
        <p className="font-light">Event Name</p>
        <p className="font-bold mt-1">NAITRAM Launch Party 2024</p>
        <hr className="border-dashed border-[#00D059] mt-4" />
      </div>

      <div className="mt-6">
        <p className="font-light">Ticket Type</p>
        <p className="font-bold mt-1">Guest-list Admission</p>
        <hr className="border-dashed border-[#00D059] mt-4" />
      </div>

      <div className="bg-[#007A35] w-full flex justify-between items-center mt-8 px-3 py-4 rounded-lg">
        <div>
          <p className="font-light">Transaction ID</p>
          <p className="font-bold">Simple_1708531039717</p>
        </div>
        <CubeTransparent size={30} />
      </div>
    </div>
  );
};

export default ExpandedTicket;
