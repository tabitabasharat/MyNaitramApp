// Nomi Branch code

"use client";

import React, { useState } from "react";
import "./NftOwner.css";

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
  const [statesData, setStatesData] = useState<StatesData>({
    totalVolume: {
      first: "15",
      second: "ETH",
      third: "Total Volume",
    },
    floorPrice: {
      first: "0.01",
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
          className="Animakid_HeroBackground bg-cover bg-no-repeat h-[360px] w-full"
          style={{ backgroundImage: "url('/Images/Nft_animakid_img/ImagePlaceHolder.png')" }}
        ></div>

        <div className="mt-[-76px] px-[60px] Animakida_Container_LOgo">
          <img className="ml-[5px] md:ml-0" src="/Images/Animkiad.svg" alt="Logo" />
          <div className="flex justify-between items-center mt-10 Animkaida_Btn_text_Container">
            <h2 className="text-[24px] font-extrabold leading-[26.6px] md:text-[37px] md:leading-[48.6px] lg:text-[56px] lg:leading-[61.6px]">
              Animakid
            </h2>
            <button className="bg-[#00D059] px-8 py-4 rounded-full text-[14px] font-extrabold leading-[19.6px] text-[#030303] Animkaid_Button hidden md:block">
              Go To Event
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-[55px] pl-[60px] pr-[92px] Animakid__HeroSection_container">
          <div className="flex flex-wrap justify-start items-center gap-[30px] Animakid__Container_small_TExt mt-[40px] md:mt-[65px]">
            {Object.keys(statesData).map((key) => {
              const data = statesData[key as keyof StatesData];
              return (
                <div className="flex flex-col gap-[0px] md:gap-[-20px]">
                  <h3 className="text-[22px] md:text-[32px] font-bold leading-[10.8px] text-white text-left">
                    {data.first || ""}
                    <span className="text-[14px] font-bold leading-[10px] text-white text-left">{data.second || ""}</span>
                  </h3>
                  <p className="text-[14px] md:text-[24px] font-normal leading-[38.4px] md:leading-[60px] text-[#BFBFBF] text-left">
                    {data.third || ""}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-[18px] md:text-[24px] font-bold leading-[28.8px] md:leading-[38.4px] text-left text-[#00D059]">Description</h2>
            <div>
              <h3 className="hidden md:block text-[14px] md:text-[20px] font-normal md:font-bold leading-[21px] md:leading-[28px] text-left text-white">
                Join us for the PIZDEZ Women’s Day Party 2024
              </h3>
              <p className="text-[14px] md:text-[16px] font-normal leading-[21px] md:leading-[24px] text-left text-white mt-2 Join_Us_Animakid">
                Join us for the PIZDEZ Women’s Day Party 2024, an unforgettable celebration of women's achievements and empowerment! Enjoy an
                electrifying night filled with live music, dancing, and entertainment. Mingle with amazing people in a vibrant atmosphere, and take
                part in special activities designed to honor and uplift women. Delicious food and drinks will be available, making it a perfect night
                out. Don’t miss this exciting event—come and celebrate with us!
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <img src="/Images/Nft_animakid_img/Loctaion.svg" alt="Location Icon" />
                <p>DOMA PUB Main floor, Light Street, London</p>
              </div>
              <div className="flex items-center gap-2">
                <img src="/Images/Nft_animakid_img/clendr.svg" alt="Calendar Icon" />
                <p>Saturday, 5th March 2024 - Sunday, 6th March 2024</p>
              </div>
              <div className="flex items-center gap-2">
                <img src="/Images/Nft_animakid_img/clock.svg" alt="Clock Icon" />
                <p>5 PM - 12 AM</p>
              </div>
            </div>
          </div>
          <div>
            <img src="/Images/Nft_animakid_img/Icons.svg" alt="Event Icon" />
            <button className="bg-[#00D059] w-full py-4 rounded-full text-[14px] font-extrabold leading-[19.6px] text-[#030303] Animkaid_Button block md:hidden mt-4">
              Go To Event
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-[35px] pl-[0px] md:pl-[60px] w-full pt-[33px] pb-[173px] justify-center md:justify-start">
        {[...Array(12)].map((_, index) => (
          <div
            key={index}
            className="relative bg-gradient-to-t from-[#0F0F0F] to-[#1A1A1A] p-[30px_11.5px] flex flex-col gap-[17px] rounded-[8px] overflow-hidden hover-gradient-border"
            style={{ width: "270px", height: "373px" }}
          >
            {/* <div
              className="absolute inset-0 rounded-[8px] pointer-events-none group-hover:border group-hover:border-transparent group-hover:border-[1px]"
              style={{ borderImage: "linear-gradient(135deg, #13FF7A 0.2%, #002B12 50.2%, #13FF7A 100.2%) 1" }}
            ></div> */}
            <img src="/Images/Nft_animakid_img/Crads.svg" alt="Card" />
            <div className="px-[12px]">
              <h3 className="text-[18px] font-extrabold leading-[24px] text-left text-white">The Orbitians</h3>
              <div className="flex justify-between items-center mt-[20px]">
                <div>
                  <p className="text-[12px] font-normal leading-[24px] text-white">Price</p>
                  <p className="flex items-center gap-[5px] text-[14px] font-bold leading-[24px] text-left text-[#00D059]">
                    <img src="/Images/Nft_animakid_img/Price.svg" alt="Price Icon" />
                    0.25 ETH
                  </p>
                </div>
                <div>
                  <p className="text-[12px] font-normal leading-[24px] text-white">Highest Bid</p>
                  <p className="text-[14px] font-bold leading-[24px] text-white">0.33 wETH</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default NftOwner;
