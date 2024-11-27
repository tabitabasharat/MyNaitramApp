// jabbar branch

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const MpHome = () => {
  const router = useRouter();
  const images = [
    "/Images/Market/tradingnft-a-1.svg",
    "/Images/Market/tradingnft-a-2.svg",
    "/Images/Market/tradingnft-a-3.svg",
    "/Images/Market/tradingnft-a-4.svg",
    "/Images/Market/tradingnft-a-5.svg",
    "/Images/Market/tradingnft-a-6.svg",
    "/Images/Market/tradingnft-a-1.svg",
    "/Images/Market/tradingnft-a-2.svg",
    "/Images/Market/tradingnft-a-3.svg",
  ];
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between items-center px-6 lg:px-14 py-14 lg:py-36 space-y-10 lg:space-y-0 w-full ">
        {/* Left Section */}
        <div className="flex flex-col space-y-8 lg:space-y-10 lg:w-1/2">
          <div className="flex flex-col space-y-5 pt-8 md:pt-0">
            <h2 className="text-white text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mt-4 sm:mt-6">
              {/* Without <br> for small and medium screens */}
              <span className="block lg:hidden">Discover digital art & Collect NFTs</span>

              {/* With <br> for large screens */}
              <span className="hidden lg:block">
                Discover digital <br /> art & Collect <br /> NFTs
              </span>
            </h2>

            <p className="text-[rgba(255,255,255,1)]  text-sm capitalize  sm:text-lg md:text-xl leading-relaxed mt-4 sm:mt-6">
              {/* Without <br> for small and medium screens */}
              <span className="block lg:hidden text-[rgba(255,255,255,1)]">
                NFT Marketplace Collect, Buy And Sell Art From More Than 20k NFT Artists.
              </span>

              {/* With <br> for large screens */}
              <span className="hidden lg:block">
                NFT marketplace Collect, buy and sell art from more <br /> than 20k NFT artists.
              </span>
            </p>
          </div>

          {/* Get Started Button & Total Sale Section for Large Screens */}
          <button className="hidden lg:block w-40 h-12 bg-green-500 text-black font-extrabold text-base rounded-full py-2 px-6">Get Started</button>
          <div className="hidden lg:flex space-x-8">
            {[
              { value: "£240k+", description: "Total Sale" },
              { value: "£100k+", description: "Collections" },
              { value: "£10k+", description: "Creators" },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-start space-y-1">
                <h2 className="text-white text-xl font-extrabold">{item.value}</h2>
                <p className="text-gray-400 text-lg">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:w-1/2 flex flex-col items-center space-y-5">
          <img src="/Images/Market/Group 1597877996.png" alt="NFT Art" className="w-full lg:w-auto" />

          {/* Get Started Button & Total Sale Section for Small Screens */}
          <button className="lg:hidden w-full h-12 bg-green-500 text-black font-extrabold text-base rounded-full py-2 px-6">Get Started</button>
          <div className="lg:hidden flex space-x-8">
            {[
              { value: "£240k+", label: "Total Sale" },
              { value: "£100k+", label: "Collections" },
              { value: "£10k+", label: "Creators" },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-start space-y-1">
                <h2 className="text-white text-xl font-extrabold">{item.value}</h2>
                <p className="text-gray-400 text-[15px] font-[400] sm:text-base sm:font-normal">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative flex flex-col px-4 lg:px-14 pb-36 space-y-4 md:space-y-10">
        {/* Heading */}
        <div className="flex items-center justify-between">
          <h2 className="text-white text-2xl md:text-4xl font-extrabold leading-tight">Trending NFTs</h2>
          <div className="flex gap-[10px] lg:flex-row flex-col hidden lg:flex">
            {/* First Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search NFT"
                className="w-[376px] h-[54px] px-[16px] pr-[40px] rounded-[8px] bg-gradient-to-b from-[#0F0F0F] to-[#1A1A1A] border border-transparent shadow-[inset_0px_3px_5px_#232323] placeholder:text-[#BFBFBF] placeholder:font-normal placeholder:text-[14px] placeholder:leading-[19.6px] placeholder:text-left focus:outline-none"
                style={{ textOverflow: "ellipsis" }}
              />
              <img
                src="/Images/Market/srchicon.svg"
                alt="Search Icon"
                className="absolute right-[16px] top-1/2 transform -translate-y-1/2 pointer-events-none"
              />
            </div>

            {/* Second Input */}
            <div className="relative">
              <select className="appearance-none w-[175px] h-[54px] px-[16px] pr-[40px] rounded-[8px] bg-gradient-to-b from-[#0F0F0F] to-[#1A1A1A] border border-none shadow-[inset_0px_3px_5px_#232323] text-[#BFBFBF] text-[14px] leading-[19.6px] font-normal text-left focus:outline-none">
                <option>Category</option>
                <option>Art</option>
                <option>Music</option>
                <option>Gaming</option>
                <option>Photography</option>
                <option>Domain Names</option>
              </select>
              <img
                src="/Images/Market/arrd.svg"
                alt="Dropdown Icon"
                className="absolute right-[16px] top-1/2 transform -translate-y-1/2 pointer-events-none"
              />
            </div>

            {/* Third Input */}
            <div className="relative">
              <button className="w-[143px] h-[54px] px-[16px] rounded-[8px] bg-gradient-to-b from-[#0F0F0F] to-[#1A1A1A] border border-transparent shadow-[inset_0px_3px_5px_#232323] flex items-center justify-between text-[#BFBFBF] text-[14px] leading-[19.6px] font-normal text-left focus:outline-none">
                Filter
                <img src="/Images/Market/filter.svg" alt="Filter Icon" />
              </button>
            </div>
          </div>
        </div>

        {/* Image Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((src, index) => (
            <div
              onClick={() => {
                router.push("/marketPlace/owner");
              }}
              key={index}
              className="relative group overflow-hidden rounded-[8px] cursor-pointer"
            >
              {/* Image */}
              <img src={src} alt={`Trending NFT ${index + 1}`} className="w-full h-auto rounded-[8px]" />
              {/* Hover Effect */}
              <div
                className="absolute inset-0 rounded-[8px] bg-gradient-to-b from-[rgba(0,0,0,0.4)] via-[rgba(0,0,0,0.7)] to-[rgba(0,0,0,0.9)] 
        opacity-0 group-hover:opacity-100 transition-all duration-[300ms]"
              ></div>
              {/* Overlay Text */}
              <div className="absolute bottom-0 left-0 pl-[15px] pr-[15px] pb-[15px] w-full text-white z-20">
                <h2 className="text-[20px] sm:text-[24px] font-extrabold leading-[19.15px] text-left m-0">The Orbitians {index + 1}</h2>
                <p className="mt-[8px] text-[12px] sm:text-[16px] font-normal leading-[19.15px] text-left text-[#BFBFBF] m-0">
                  What’s New {index + 1}
                </p>
                {/* Additional Content (only visible on hover) */}
                <div className="hidden group-hover:block mt-[16px]">
                  <p className="text-[12px] sm:text-[14px] font-normal leading-[16.8px] text-left text-white">
                    Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
                  </p>

                  {/* Button */}
                  <button className="mt-[16px] w-full py-[10px] px-[15px] text-[12px] font-extrabold leading-[19.6px] text-center text-[#00D059] bg-gradient-to-b from-[#0F0F0F] to-[#1A1A1A] rounded-[100px] transition-all duration-300 relative overflow-hidden gradient-border-rounded-nft">
                    {/* Gradient Border with Outline */}
                    <span
                      className="absolute inset-0 rounded-[100px] bg-gradient-to-b from-[#13FF7A] to-[#002B12] opacity-0 group-hover:opacity-100 transition-all duration-[300ms]"
                      style={{
                        zIndex: -1, // Place it behind the button text
                        filter: "blur(4px)", // Optional: you can blur it if desired
                        transform: "scale(1.05)", // Optional: scale it to make the border appear more pronounced
                      }}
                    />
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Background Blur */}
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[#00D059] blur-[500px] rounded-[30%] -z-10" />
      </div>
    </>
  );
};

export default MpHome;
