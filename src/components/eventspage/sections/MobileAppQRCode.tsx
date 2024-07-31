import Image from 'next/image';
import ufo from '@/assets/ufo.png';
import qr from '@/assets/qrcode.png';
import { Button } from '@/components/ui/button';
import { DownloadSimple } from '@phosphor-icons/react/dist/ssr';

const MobileAppQRCode = () => {
  return (
    <div className="pxpx mx-2xl">
      <div
        style={{
          backgroundImage: 'url(/banner.png)',
          backgroundPosition: 'center',
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
          <Image
            src={qr}
            width={350}
            height={350}
            className="size-[230px] lg:size-[270px]"
            alt="qr-code"
          />
          <div className="md:w-[70%] w-full">
            <h3 className="text-[32px] font-bold leading-[1.1]">
              Explore events conveniently using your phone
            </h3>
            <p className="text-muted mt-4">
              Discover a world of local events right at your fingertips. Use
              your phone to effortlessly browse, find, and stay updated on the
              latest happenings around you, anytime and anywhere
            </p>
            <Button className="flex items-center gap-[0.5rem] rounded-lg mt-6 w-full lg:w-fit">
              <DownloadSimple size={20} weight="bold" />
              Download App
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileAppQRCode;
