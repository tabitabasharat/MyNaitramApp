import {
  FacebookLogo,
  InstagramLogo,
  SealCheck,
  TiktokLogo,
  XLogo,
} from '@phosphor-icons/react/dist/ssr';
import GoldGradientBorder from '../ui/gold-gradient-border';
import { shimmer, toBase64 } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import JoinEventCard from '@/components/reusable-components/JoinEventCard';

const ProfileDetails = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between mt-16">
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 justify-center items-center md:justify-start md:items-start">
        <GoldGradientBorder className="w-fit rounded-full p-[3px] h-fit">
          <div className="bg-black rounded-full p-[7px]">
            <Image
              src="/person1.png"
              width={500}
              height={500}
              className="h-[120px] w-[120px] lg:h-[150px] lg:w-[150px] object-cover object-top rounded-full"
              placeholder={`data:image/svg+xml;base64,${toBase64(
                shimmer(1200, 1800),
              )}`}
              alt=""
            />
          </div>
        </GoldGradientBorder>
        <div className="w-full md:w-fit">
          <p className="font-bold flex justify-center md:justify-start items-center gap-1 text-[24px]">
            Evelyn Lynn{' '}
            <SealCheck
              className="text-[#FFC109] -translate-y-1"
              size={18}
              weight="fill"
            />
          </p>
          <p className="text-primary font-bold text-[17px] text-center md:text-left">
            @evelynn_
          </p>
          <p className="mt-1 text-center md:text-left hidden md:block">
            <span>32 Attended</span> <span className="opacity-50"> | </span>{' '}
            <span className="text-muted">251 Events</span>
          </p>

          <div className="md:hidden border border-[#0FFF7730] rounded-lg gradient-slate flex justify-evenly items-center w-full p-3 mt-5">
            <div className="flexc flex-col items-center justify-center font-bold text-center">
              <p className="text-[18px]">32</p>
              <p className="text-[12px] opacity-50">ATTENDED</p>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div className="flexc flex-col items-center justify-center font-bold text-center">
              <p className="text-[18px]">251</p>
              <p className="text-[12px] opacity-50">EVENTS</p>
            </div>
          </div>

          <div className="flex justify-center md:justify-start gap-3 h-full mt-6">
            <Link href={''}>
              <div className="border border-white w-fit h-fit p-3 rounded-full hover:bg-white hover:text-black duration-300">
                <InstagramLogo size={20} weight="fill" />
              </div>
            </Link>
            <Link href={''}>
              <div className="border border-white w-fit h-fit p-3 rounded-full hover:bg-white hover:text-black duration-300">
                <XLogo size={20} weight="fill" />
              </div>
            </Link>
            <Link href={''}>
              <div className="border border-white w-fit h-fit p-3 rounded-full hover:bg-white hover:text-black duration-300">
                <FacebookLogo size={20} weight="fill" />
              </div>
            </Link>
            <Link href={''}>
              <div className="border border-white w-fit h-fit p-3 rounded-full hover:bg-white hover:text-black duration-300">
                <TiktokLogo size={20} weight="fill" />
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full md:w-fit mt-6 md:mt-0">
        <JoinEventCard img="/event2.png" title="NAITRAM Launch Party 2024" />
      </div>
    </div>
  );
};

export default ProfileDetails;
