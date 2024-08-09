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
} from "@phosphor-icons/react/dist/ssr";
import { TiktokLogo } from "@phosphor-icons/react/dist/ssr";
import NaitramLogo from "@/assets/N UFO TEXT LOGO.svg"

const Footer = () => {
  return (
    <footer className="gradient-slate">
      <div className="pxpx mx2xl  pt-16 pb-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col items-center lg:items-start">
            <Link href="/" className="">
              <div className="">
                <Image src={NaitramLogo}  alt="Naitram-Logo" />
              </div>
            </Link>
            <p className="italic mt-4 lg:whitespace-nowrap text-gradient">
              Revolutionize Your Experience
              
            </p>
            <Button className="flex items-center gap-[0.5rem] mt-8">
              <Link href="/download-app" className="flex items-center gap-[0.5rem]" >
                <DownloadSimple size={20} weight="bold" />
                Download App
              </Link>
            </Button>
          </div>
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 xl:gap-32 mt-16 lg:mt-0 px-4 lg:px-0 md:w-[60%] lg:w-full md:mx-auto lg:mx-0 lg:mr-0 lg:justify-end">
            <div className="flex justify-between lg:justify-start lg:gap-24 xl:gap-28">
              <div className="flex flex-col tems-start gap-6 lg:gap-8">
                <Link href={"/"}>Home</Link>
                <Link href={"/about"}>About</Link>
                <Link href={"/events"}>Event</Link>
              </div>
              <div className="flex items-end lg:items-start flex-col gap-6 lg:gap-8">
                <Link href={"/gallery"}>Gallery</Link>
                <Link href={"/contactus"}>Contact Us</Link>
                {/* <Link href={''}>FAQ</Link>
                <Link href={''}>Resource</Link> */}
              </div>
            </div>
            <div className="flex justify-between lg:justify-start gap-16 lg:gap-24 xl:gap-32">
              <div className="flex items-start flex-col gap-6 lg:gap-8">
                <Link href={'/privacypolicy'}>Privacy Policy</Link>
                <Link href={'/termsandcondition'}>Terms and Condition</Link>
               
              </div>
              {/* <div className="flex items-end lg:items-start flex-col gap-6 lg:gap-8">
                <Link href={''}>Help</Link>
                <Link href={''}>Support</Link>
                <Link href={''}>Terms of Service</Link>
                <Link href={''}>Privacy Policy</Link>
              </div> */}
            </div>
          </div>
        </div>
        <Separator className="mb-8 mt-28" />
        <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-start gap-8 lg:gap-0 pb-4 lg:pb-0">
          <div className=" flex gap-4">
            <Link target="_blank" href="https://www.linkedin.com/company/naitramlive/">
              <LinkedinLogo size={30} weight="fill" />
            </Link>
            <Link  target="_blank" href="https://www.instagram.com/naitram.live?igsh=MXhjcXI1bjlydG16Mw==">
              <InstagramLogo size={30} weight="fill" />
            </Link>
            <Link target="_blank" href="https://www.tiktok.com/@naitram.live?_t=8oczYiZWsN6&_r=1">
              <TiktokLogo size={30} weight="fill" />
            </Link>
          </div>
          <p>© Naitram {new Date().getFullYear()}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
