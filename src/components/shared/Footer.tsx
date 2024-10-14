import Image from "next/image";
import { Separator } from "../ui/separator";
import logo from "@/assets/logo.svg";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  DownloadSimple,
  LinkedinLogo,
  InstagramLogo,
  FacebookLogo,
  TiktokLogo,
  TwitterLogo,
  TelegramLogo,
} from "@phosphor-icons/react/dist/ssr";
import twitter from "@/assets/prime_twitter.svg";
import NaitramLogo from "@/assets/N UFO TEXT LOGO.svg";
import { YoutubeLogo } from "@phosphor-icons/react";

const Footer = () => {
  return (
    <footer className="gradient-slate">
      <div className="pxpx mx2xl lg:pt-16 md:pt-10 pt-8 pb-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col items-center lg:items-start">
            <Link href="/" className="">
              <div className="">
                <Image src={NaitramLogo} alt="Naitram-Logo" />
              </div>
            </Link>
            <p className="italic mt-4 lg:whitespace-nowrap text-gradient">
              Revolutionize Your Experience
            </p>
            <Button className="flex items-center justify-center gap-[0.5rem] mt-4">
              <Link
                href="/download-app"
                className="flex items-center gap-[0.5rem]"
              >
                <DownloadSimple size={20} weight="bold" />
           <p className="pt-[8px]">     Download App</p>
              </Link>
            </Button>
          </div>
          <div className="flex flex-col lg:flex-row gap-3 lg:gap-24 xl:gap-32 mt-6 lg:mt-0 px-4 lg:px-0 md:w-[60%] lg:w-full md:mx-auto lg:mx-0 lg:mr-0 lg:justify-end">
            <div className="flex flex-col items-center lg:flex-row lg:justify-start lg:gap-24 xl:gap-28">
              <div className="flex flex-col tems-start gap-3 lg:gap-8">
                <Link href={"/"} className="hover:underline">Home</Link>
                <Link href={"/viewallevents"} className="hover:underline">Event</Link>
                <Link href={"/about"} className="hover:underline">About</Link>
              </div>
              <div className="flex items-center mt-3 lg:mt-0 lg:items-start flex-col gap-3 lg:gap-8">
                <Link href={"/wallet"} className="hover:underline">Wallet</Link>
                <Link href={"/reward"} className="hover:underline">Rewards</Link>
                <Link href={"/get-sponsor"} className="hover:underline">Get Sponsored</Link>
                {/* <Link href={''}>FAQ</Link>
                <Link href={''}>Resource</Link> */}
              </div>
            </div>
            <div className="flex justify-center text-center lg:justify-start gap-16 lg:gap-24 xl:gap-32">
              <div className="flex items-start flex-col gap-3 lg:gap-8">
                <Link href={"/about"} className="text-center w-full hover:underline lg:text-start">FAQ</Link>
                <Link href={"/organizer-event/helpcenter"} className="text-center w-full hover:underline lg:text-start">Help Center</Link>

                <Link href={"/privacypolicy"} className="text-center w-full hover:underline lg:text-start">Terms and Conditions</Link>
              </div>
            </div>
          </div>
        </div>
        <Separator className="mb-8 mt-16 lg:mt-28" />
        <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-start gap-8 lg:gap-0 pb-4 lg:pb-0">
          <div className=" flex flex-wrap gap-4">
            <Link
              target="_blank"
              href="https://www.linkedin.com/company/naitramlive/"
            >
              <LinkedinLogo className="w-[32px] h-[32px]" weight="fill" />
            </Link>
            <Link
              target="_blank"
              href="https://www.instagram.com/naitram.live/"
            >
              <InstagramLogo className="w-[32px] h-[32px]" weight="fill" />
            </Link>
            {/* <Link
              target="_blank"
              href="https://www.instagram.com/naitram.live?igsh=MXh0amo4YWFyemF4aA=="
            >
              <InstagramLogo className="w-[32px] h-[32px]" weight="fill" />
            </Link> */}
            {/* <Link target="_blank" href="">
              <FacebookLogo  className="w-[32px] h-[32px]" weight="fill" />
            </Link> */}
            <Link
              target="_blank"
              href="https://www.tiktok.com/@naitram.verified?_t=8qCgj42cequ&_r=1"
            >
              <TiktokLogo className="w-[32px] h-[32px]" weight="fill" />
            </Link>
            {/* <Link
              target="_blank"
              href="https://www.instagram.com/naitram.live/"
            >
              <TiktokLogo className="w-[32px] h-[32px]" weight="fill" />
            </Link> */}

            <Link
              target="_blank"
              href="https://x.com/naitramlive"
            >
              {/* <TwitterLogo size={30} weight="fill" /> */}
              <Image
                src={twitter}
                className="w-[30px] h-[30px]"
                alt="twitter"
              />
            </Link>
            {/* <Link target="_blank" href="">
              <TelegramLogo className="w-[32px] h-[32px]" weight="fill" />
            </Link> */}
            <Link target="_blank" href="https://www.youtube.com/@naitramlive">
              <YoutubeLogo className="w-[32px] h-[32px]" weight="fill" />
            </Link> 
           {/*  <Link target="_blank" href="https://youtube.com/@naitram.entertainment?si=rYyYuGCajrn2v3TM">
              <YoutubeLogo className="w-[32px] h-[32px]" weight="fill" />
            </Link>  */}
          </div>
          <p>© Naitram {new Date().getFullYear()}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
