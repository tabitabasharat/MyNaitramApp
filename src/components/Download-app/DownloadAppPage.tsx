import React from "react";
import "./DownloadAppPage.css";
import Image from "next/image";
import mobileimg from "../../assets/Group-17.png";
import appstore from "@/assets/App Store .svg";
import googleplay from "@/assets/Google Play .svg";
import natriam from "../../assets/Group-1.png";
import { FadeReveal } from "@/components/animations/FadeReveal";
import { Reveal } from "@/components/animations/Reveal";
import elips from "../../assets/Group-16.png";
import Link from "next/link";

function DownloadAppPage() {
  return (
    <>
      <div className="main-div-download-app">
        <Image alt="" src={elips} className="elips" />
        <div className="mobile-img">
          <Image alt="" src={mobileimg} />
        </div>
        <div className="sceond-div md:w-[75%] lg:w-[50%]">
          <Reveal y={100} width="100%">
            <div>


            <div className="flex items-center flex-col text-center">
              <Reveal y={100} width="100%">
                <h2 className=" mb-5 download-text">Download</h2>
              </Reveal>
              <Image alt="" src={natriam} className="mb-5 green-natiram " />
              <h3 className="coming-soon">Coming Soon</h3>
            </div>
            <div className="flex items-center w-full h-full justify-center">
            <Link href="https://apps.apple.com/pk/app/naitram-fan-centric-tickets/id6736828037">
              <Image alt="" src={appstore} sizes="30px" className="appstroe h-full w-[130px] sm:w-[160px] lg:w-[200px] xl:w-[280px] " />
              </Link>
              <Link href="https://play.google.com/store/apps/details?id=com.naitram">
              <Image alt="" src={googleplay} className="ps-5 w-[130px] h-full sm:w-[160px] lg:w-[200px] xl:w-[280px]" />
              </Link>
            </div>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}

export default DownloadAppPage;
