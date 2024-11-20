// jabbar branch

"use client";

import Link from "next/link";

const MpHome = () => {
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
              <span className="block lg:hidden">
                Discover digital art & Collect NFTs
              </span>

              {/* With <br> for large screens */}
              <span className="hidden lg:block">
                Discover digital <br /> art & Collect <br /> NFTs
              </span>
            </h2>

            <p className="text-[rgba(255,255,255,1)]  text-sm capitalize  sm:text-lg md:text-xl leading-relaxed mt-4 sm:mt-6">
              {/* Without <br> for small and medium screens */}
              <span className="block lg:hidden text-[rgba(255,255,255,1)]">
                NFT Marketplace Collect, Buy And Sell Art From More Than 20k NFT
                Artists.
              </span>

              {/* With <br> for large screens */}
              <span className="hidden lg:block">
                NFT marketplace Collect, buy and sell art from more <br /> than
                20k NFT artists.
              </span>
            </p>
          </div>

          {/* Get Started Button & Total Sale Section for Large Screens */}
          <button className="hidden lg:block w-40 h-12 bg-green-500 text-black font-extrabold text-base rounded-full py-2 px-6">
            Get Started
          </button>
          <div className="hidden lg:flex space-x-8">
            {["£240k+", "£240k+", "£240k+"].map((value, index) => (
              <div key={index} className="flex flex-col items-start space-y-1">
                <h2 className="text-white text-xl font-extrabold">{value}</h2>
                <p className="text-gray-400 text-lg">Total Sale</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:w-1/2 flex flex-col items-center space-y-5">
          <img
            src="/Images/Market/Group 1597877996.png"
            alt="NFT Art"
            className="w-full lg:w-auto"
          />

          {/* Get Started Button & Total Sale Section for Small Screens */}
          <button className="lg:hidden w-full h-12 bg-green-500 text-black font-extrabold text-base rounded-full py-2 px-6">
            Get Started
          </button>
          <div className="lg:hidden flex space-x-8">
            {[
              { value: "£240k+", label: "Total Sale" },
              { value: "£300k+", label: "Collections" },
              { value: "£500k+", label: "Creators" },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-start space-y-1">
                <h2 className="text-white text-xl font-extrabold">
                  {item.value}
                </h2>
                <p className="text-gray-400 text-[15px] font-[400] sm:text-base sm:font-normal">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative flex flex-col px-4 lg:px-14 pb-36 space-y-4 md:space-y-10">
        {/* Heading */}
        <h2 className="text-white text-2xl md:text-4xl font-extrabold leading-tight">
          Trending NFTs
        </h2>

        {/* Image Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((src, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-[8px] bg-gradient-to-b from-transparent via-black/70 to-black/90"
            >
              {/* Image */}
              <img
                src={src}
                alt={`Trending NFT ${index + 1}`}
                className="w-full h-auto rounded-[8px] relative z-10"
              />
              {/* Custom border and background using ::before */}
              <div className="absolute inset-0 rounded-[8px] before:absolute before:inset-0 before:rounded-[8px] before:border before:border-white/[0.06] before:bg-gradient-to-b before:from-black/0 before:via-black/70 before:to-black/90 before:z-0"></div>
              {/* Overlay Text */}
              <div className="absolute bottom-0 left-0 pl-[25px] pb-[25px] w-full text-white z-20">
                <h2 className="text-[22px] sm:text-[24px] font-extrabold leading-[19.15px] text-left underline-offset-auto decoration-clone m-0">
                  The Orbitians {index + 1}
                </h2>
                <p className="mt-[11px] text-[14px] sm:text-[16px] font-normal sm:font-[400] leading-[19.15px] text-left text-[#BFBFBF] underline-offset-auto decoration-clone m-0">
                  What’s New {index + 1}
                </p>
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
