import React from "react";
import "./DownloadAppPage.css";
import Image from "next/image";
import mobileimg from "../../assets/Group-17.png";
import appstore from "../../assets/image-1-e1711464803461.png"
import googleplay from "../../assets/googleapp.png";
import natriam from "../../assets/Group-1.png"

function DownloadAppPage() {
  return (
    <div className="main-div-download-app">
      <div>
        <Image src={mobileimg} />
      </div>
      <div>
        <div className="flex items-center flex-col text-center">
          <h2 className="text-4xl mb-5 font-bold">Download</h2>
       <Image src={natriam} className="mb-5 "/>
          <h3 className="coming-soon">Coming Soon</h3>
        </div>
        <div className="flex">
          <Image src={appstore} className="p-2"/>
          <Image src={googleplay} className="ps-5" />
        </div>
      </div>
    </div>
  );
}

export default DownloadAppPage;
