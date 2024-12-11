// Nomi Branch code

"use client";

import React, { useState } from "react";
import "./NftOwner.css";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import blurbg from "@/assets/V2assets/Blur Green.svg"
import Image from "next/image"

interface StateDataItem {
  first: string;
  second?: string; // Optional, since some objects don't have `second`
  third: string;
}

interface StatesData {
  totalVolume: StateDataItem;
  floorPrice: StateDataItem;
  owners: StateDataItem;
  listed: StateDataItem;
}

const NftOwner = () => {
  const router = useRouter();
  const [statesData, setStatesData] = useState<StatesData>({
    totalVolume: {
      first: "15",
      second: "ETH",
      third: "Total Volume",
    },
    floorPrice: {
      first: "<0.01",
      second: "ETH",
      third: "Floor Price",
    },
    owners: {
      first: "1,483",
      second: "(25%)",
      third: "Owners (Unique)",
    },
    listed: {
      first: "2",
      third: "Listed",
    },
  });

  return (
    <>
      <div className="pt-20 animakid_Hero">
        <div
          className="Animakid_HeroBackground-img bg-cover bg-no-repeat h-[360px] w-full"
          // style={{ backgroundImage: "url('/Images/Nft_animakid_img/ImagePlaceHolder.png')" }}
        ></div>

        <div className=" mt-[-50px] px-[92px] Animakida_Container_LOgo">
          <Image className="ml-[5px] w-[98px] h-[98px] md:w-[123px] md:h-[123px] md:ml-0" width={123} height={123} src="/Images/Animkiad.svg" alt="Logo"/>
          <div className="flex justify-between items-center mt-[20px] md:mt-[40px] Animkaida_Btn_text_Container">
            <h2 className="text-[24px] font-extrabold leading-[26.6px] md:text-[37px] md:leading-[48.6px] lg:text-[55px] lg:leading-[61.6px]">
              Animakid
            </h2>
            <button className="bg-[#00D059] px-8 py-4 rounded-full text-[14px] font-extrabold leading-[19.6px] text-[#030303] Animkaid_Button hidden md:block hover:bg-opacity-[80%]">
              Go To Event
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-[40px] pl-[92px] pr-[92px] Animakid__HeroSection_container sm:gap-[55px]">
          <div className="flex flex-wrap justify-start items-center lg:gap-[50px] gap-[29px] Animakid__Container_small_TExt mt-[40px] md:mt-[55px]">
            {Object.keys(statesData).map((key) => {
              const data = statesData[key as keyof StatesData];
              return (
                <div className="flex flex-col gap-[0px] md:gap-[-20px] ">
                  <h3 className="text-[22px] md:text-[32px] font-bold leading-[10.8px] text-white text-left">
                    {data.first || ""}
                    <span className="text-[14px] md:text-[20px] font-bold leading-[28px] text-white text-left">{data.second || ""}</span>
                  </h3>
                  <p className="text-[14px] md:text-[24px] font-normal leading-[16.8px] md:leading-[60px] text-[#BFBFBF] text-left">
                    {data.third || ""}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-[18px] md:text-[24px] font-bold leading-[28.8px] md:leading-[38.4px] text-left text-[#00D059]">Description</h2>
            <div>
              <h3 className=" text-[16px] sm:text-[20px] mb-[8px]  font-bold leading-[21px] md:leading-[28px] text-left text-white">
                Join us for the PIZDEZ Women’s Day Party 2024
              </h3>
              <p className="text-[14px] md:text-[16px] font-normal leading-[21px] md:leading-[24px] text-left text-white Join_Us_Animakid">
                Join us for the PIZDEZ Women’s Day Party 2024, an unforgettable celebration of women's achievements and empowerment! Enjoy an
                electrifying night filled with live music, dancing, and entertainment. Mingle with amazing people in a vibrant atmosphere, and take
                part in special activities designed to honor and uplift women. Delicious food and drinks will be available, making it a perfect night
                out. Don’t miss this exciting event—come and celebrate with us!
              </p>
            </div>
            <div className="flex flex-col sm:gap-[12px]  md:mt-[0px] mt-[8px] gap-[12px]">
              <div className="flex items-start sm:items-center gap-2">
                <img src="/Images/Nft_animakid_img/Loctaion.svg" alt="Location Icon" />
                <p className="text-[16px] font-bold leading-6 text-[#FFFFFF] ">DOMA PUB Main floor, Light Street, London</p>
              </div>
              <div className="flex items-start sm:items-center gap-2">
                <img src="/Images/Nft_animakid_img/clendr.svg" alt="Calendar Icon" />
                <p className="text-[16px] font-bold leading-6 text-[#FFFFFF]">Saturday, 5th March 2024 - Sunday, 6th March 2024</p>
              </div>
              <div className="flex items-start sm:items-center gap-2">
                <img src="/Images/Nft_animakid_img/clock.svg" alt="Clock Icon" />
                <p>5 PM - 12 AM</p>
              </div>
            </div>
          </div>
          <div >
            <div className="flex items-center max-sm:gap-[6px] gap-[12px]">
              <img className="w-[36px] h-[36px] sm:w-[44px] sm:h-[44px] hover:bg-[#00D059] rounded-[200px]" src="/Images/Nft_animakid_img/facboklogo.svg" alt="Event Icon" />
              <img className="w-[36px] h-[36px] sm:w-[44px] sm:h-[44px] hover:bg-[#00D059] rounded-[200px]" src="/Images/Nft_animakid_img/camer.svg" alt="camera-img" />
              <img className="w-[36px] h-[36px] sm:w-[44px] sm:h-[44px] hover:bg-[#00D059] rounded-[200px]" src="/Images/Nft_animakid_img/twiterlogo.svg" alt="twitr-img" />
              <img className="w-[36px] h-[36px] sm:w-[44px] sm:h-[44px] hover:bg-[#00D059] rounded-[200px]" src="/Images/Nft_animakid_img/linked-in.svg" alt="linkedin-img" />
              <img className="w-[36px] h-[36px] sm:w-[44px] sm:h-[44px] hover:bg-[#00D059] rounded-[200px]" src="/Images/Nft_animakid_img/tiktok.svg" alt="tiktok-img" />
              <img className="w-[36px] h-[36px] sm:w-[44px] sm:h-[44px] hover:bg-[#00D059] rounded-[200px]" src="/Images/Nft_animakid_img/instalogo.svg" alt="insta-img" />
              <img className="w-[36px] h-[36px] sm:w-[44px] sm:h-[44px] hover:bg-[#00D059] rounded-[200px]" src="/Images/Nft_animakid_img/youtube.svg" alt="youtube-img" />
            </div>

            <Button className="bg-[#00D059] w-full py-4 rounded-full text-[14px] font-extrabold leading-[19.6px] text-[#030303] Animkaid_Button block md:hidden mt-[40px]">
              Go To Event
            </Button>
          </div>
        </div>
      </div>
      <div className="px-[24px] sm:pl-[35px] bg-imag md:pl-[92px] sm:pr-[35px] lg:pr-[163px]">
        <div className="flex items-center justify-end gap-[10px] mt-[60px] sm:mt-[100px] md:flex">
         <div className="flex  items-center relative justify-between rounded-lg border border-[#292929] gradient-slate py-[19px] px-[16px] w-[308px] max-[431px]:h-[54px] min-[348px]:w-[376px]">
            <input
              className="text-[16px] bg-transparent block font-normal leading-5 text-[#BFBFBF] placeholder:text-[#BFBFBF] w-[90%] outline-none pr-10"
              type="text"
              placeholder="Search NFT"
            />
            <img src="/Images/Nft_animakid_img/serchicon.svg" className="w-5 h-5 absolute right-[16px] top-1/2 transform -translate-y-1/2" />
          </div> 
          {/* <div className="relative w-full sm:w-[376px]">
            <input
              type="text"
              placeholder="Search NFT"
              className="w-full sm:w-[376px] h-[54px] px-[16px] pr-[40px] rounded-[8px] bg-gradient-to-b from-[#0F0F0F] to-[#1A1A1A] border border-transparent shadow-[inset_0px_3px_5px_#232323] placeholder:text-[#BFBFBF] placeholder:font-normal placeholder:text-[14px] placeholder:leading-[19.6px] placeholder:text-left focus:outline-none"
              style={{ textOverflow: "ellipsis" }}
            />
            <img
              src="/Images/Market/srchicon.svg"
              alt="Search Icon"
              className="absolute right-[16px] top-1/2 transform -translate-y-1/2 pointer-events-none"
            />
          </div> */}
{/* <div className="relative w-full max-[430px]:w-[54px]">
              <button className=" max-[430px]:w-[54px] w-full md:w-[143px] h-[54px] px-[16px] rounded-[8px] bg-gradient-to-b from-[#0F0F0F] to-[#1A1A1A] border border-transparent shadow-[inset_0px_3px_5px_#232323] flex items-center justify-between text-[#BFBFBF] text-[14px] leading-[19.6px] font-normal text-left focus:outline-none">
               <p className="text-[16px] max-[430px]:hidden">Filter</p>
                <img src="/Images/Market/filter.svg" alt="Filter Icon" />
              </button>
            </div> */}
          
          <div className="border border-[#292929] gradient-slate w-[143px] max-[431px]:w-[54px] max-[431px]:justify-center  max-[431px]:h-[54px]  py-[19px] px-[16px] rounded-lg min-[431px]:w-[143px] flex items-center justify-between ">
            <h2 className="text-[16px] font-normal max-[430px]:hidden leading-5 text-[#BFBFBF] ">Filter</h2>
            <img src="/Images/Nft_animakid_img/filtr.svg" className=" max-[430px]:h-[22px] filterImage " alt="Filter"/>

          </div>
        </div>
        <div className="flex flex-wrap gap-[20px] sm:gap-[35px] w-full w-full pt-[60px] md:pt-[30px] pb-[173px] justify-center mainCardss">

          {[...Array(15)].map((_, index) => (
            <div
              key={index}
              onClick={() => {
                router.push("/marketPlace/nft");
              }}
              className="cursor-pointer w-[270px] relative bg-gradient-to-t from-[#0F0F0F] to-[#1A1A1A] pt-[18.37px] pb-[19.05px] pr-[12.62px] pl-[11.82px] flex flex-col gap-[17px] rounded-[8px] overflow-hidden hover-gradient-border"
              // style={{ width: "270px" }}
            >

              <img src="/Images/Nft_animakid_img/Crads.svg" alt="Card" />
              <div className="px-[12px]">
                <h3 className="text-[18px] font-extrabold text-left text-white">The Orbitians</h3>
                <div className="flex justify-between items-center mt-[20px]">
                  <div >
                    <p className="text-[12px] font-normal text-white">Price</p>
                    <div className="flex items-center mt-[8px] gap-[6px]">
                      <img className="mb-[5px]" src="/Images/Nft_animakid_img/Price.svg" alt="Price Icon" />
                      <p className="flex items-center gap-[5px] text-[14px] font-bold text-left text-[#00D059]">

                        0.25 ETH
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[12px] font-normal text-right text-white">Highest Bid</p>
                    <p className="text-[14px] font-bold mt-[8px] text-white">0.33 wETH</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* <Image src={blurbg} alt="bg-blur" className="" /> */}
      </div>

    </>
  );
};

export default NftOwner;
