import "./MarketPlace.css";
const page = () => {
  const images = [
    "/Images/Market/tradingnft.svg",
    "/Images/Market/trading2.svg",
    "/Images/Market/trading3.svg",
    "/Images/Market/trading4.svg",
    "/Images/Market/trading5.svg",
    "/Images/Market/trading6.svg",
    "/Images/Market/tradingnft.svg",
    "/Images/Market/trading2.svg",
    "/Images/Market/trading3.svg",
  ];
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between items-center px-6 lg:px-14 py-14 lg:py-36 space-y-10 lg:space-y-0 w-full ">
        {/* Left Section */}
        <div className="flex flex-col space-y-8 lg:space-y-10 lg:w-1/2">
          <div className="flex flex-col space-y-5 pt-8 md:pt-0">
            <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Discover Digital <br /> Art & Collect <br /> NFTs
            </h2>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
              NFT marketplace Collect, buy and sell art from more <br /> than 20k NFT artists.
            </p>
          </div>

          {/* Get Started Button & Total Sale Section for Large Screens */}
          <button className="hidden lg:block w-40 h-12 bg-green-500 text-black font-extrabold text-base rounded-full py-2 px-6">Get Started</button>
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
          <img src="/Images/Market/Group 1597877996.png" alt="NFT Art" className="w-full lg:w-auto" />

          {/* Get Started Button & Total Sale Section for Small Screens */}
          <button className="lg:hidden w-full h-12 bg-green-500 text-black font-extrabold text-base rounded-full py-2 px-6">Get Started</button>
          <div className="lg:hidden flex space-x-8">
            {["£240k+", "300k+", "500k+"].map((value, index) => (
              <div key={index} className="flex flex-col items-start space-y-1">
                <h2 className="text-white text-xl font-extrabold">{value}</h2>
                <p className="text-gray-400 text-lg sm:text-base sm:font-normal">Total Sale</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative flex flex-col px-4 lg:px-14 pb-36 space-y-10">
        {/* Heading */}
        <h2 className="text-white text-3xl md:text-4xl font-extrabold leading-tight">Trending NFTs</h2>

        {/* Image Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((src, index) => (
            <img key={index} src={src} alt={`Trending NFT ${index + 1}`} className="w-full h-auto" />
          ))}
        </div>

        {/* Background Blur */}
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[#00D059] blur-[500px] rounded-[30%] -z-10" />
      </div>
    </>
  );
};

export default page;
