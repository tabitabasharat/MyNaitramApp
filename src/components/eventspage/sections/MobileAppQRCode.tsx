import Image from "next/image";
import ufo from "@/assets/ufo.png";
import qr from "@/assets/qrcode.png";
import { Button } from "@/components/ui/button";
import { DownloadSimple } from "@phosphor-icons/react/dist/ssr";
import { Badge } from "@/components/ui/badge";

const MobileAppQRCode = () => {
  return (
    <div className="pxpx mx-2xl">
      <div
        style={{
          backgroundImage: "url(/banner.png)",
          backgroundPosition: "center",
        }}
        className="bg-cover bg-no-repeat w-full rounded-lg mb-16 relative overflow-hidden px-6 py-6 lg:py-[5rem] lg:px-[8rem]"
      >
        <Image
          src={ufo}
          width={350}
          height={350}
          className="absolute right-[-10%] bottom-0"
          alt="ufo"
        />
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
          <div className="md:w-[70%] w-full">
            <div className="flex gap-[0.35rem] mt-4">
              <Badge className="lg:text-[12px] font-extrabold sm:text-[11px]">Party</Badge>
              <Badge className="lg:text-[12px] font-extrabold sm:text-[11px]">Invitation</Badge>
              <Badge className="lg:text-[12px] font-extrabold sm:text-[11px]">Women Day</Badge>
            </div>
            <h3 className="text-[48px] sm:text-[32px] font-extrabold leading-[1.1] mt-3">
              TAKEOVER BOAT PARTY
            </h3>
            {/* <p className="text-muted mt-4">
              Discover a world of local events right at your fingertips. Use
              your phone to effortlessly browse, find, and stay updated on the
              latest happenings around you, anytime and anywhere
            </p> */}
            <p className="text-muted mt-4 font-normal text-[16px] sm:text-[14px]">Location: Royal docks</p>
            <p className="text-muted mt-1 font-normal text-[16px] sm:text-[14px]">
              Saturday, August 24th, 4 PM - 11 PM
            </p>
            {/* <Button className="flex items-center gap-[0.5rem] rounded-lg mt-6 w-full lg:w-fit">
              <DownloadSimple size={20} weight="bold" />
              Download App
            </Button> */}
          </div>
          <Image
            src={qr}
            width={350}
            height={350}
            className="size-[230px] lg:size-[270px]"
            alt="qr-code"
          />
        </div>
      </div>
    </div>
  );
};

export default MobileAppQRCode;
