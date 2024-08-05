import React from "react";
import "./DownloadAppPage.css";
import Image from "next/image";
import mobileimg from "../../assets/Group-17.png";
import appstore from "../../assets/image-1-e1711464803461.png";
import googleplay from "../../assets/googleapp.png";
import natriam from "../../assets/Group-1.png";
import { FadeReveal } from "@/components/animations/FadeReveal";
import { Reveal } from "@/components/animations/Reveal";
import elips from "../../assets/Group-16.png";

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
            <div className="flex items-center justify-center">
              <Image alt="" src={appstore} className="appstroe" />
              <Image alt="" src={googleplay} className="ps-5" />
            </div>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}

export default DownloadAppPage;
