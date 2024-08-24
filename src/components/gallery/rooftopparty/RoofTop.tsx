import Image from "next/image";
import takeImage1 from "../../../assets/roof1.svg";
import takeImage2 from "../../../assets/roof2.svg";
import takeImage3 from "../../../assets/roof3.svg";
import takeImage4 from "../../../assets/roof4.svg";
import takeImage5 from "../../../assets/roof5.svg";

const TakeOverEvent = () => {
  return (
    <section
      className="md:px-[112px] px-[25px] py-[220px] "
      style={{
        backgroundImage: "url(/About/Blur.png)",
        // backgroundPosition: "bottom center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        opacity: "1",
      }}
    >
      <h1 className="md:text-start text-center text-[32px] font-[800] pb-[25px] ">
        NAITRAM ROOFTOP PARTY
      </h1>
      <div className="flex gap-[25px] flex-wrap justify-center md:justify-start ">
        <div className="flex flex-col">
          <div className="relative  ">
            <Image
              src={takeImage1}
              alt="/"
              className="relative md:w-unset w-[100%] "
            />
            <a href="https://drive.google.com/drive/folders/1cSFDy1Soflcjv4dnbxPKsIZNpHNhDYpu?usp=drive_link" target="_blank">
              <button className="absolute bottom-[20px] left-[27%] bg-[#FFFFFF1F] px-[10px] py-[6px] rounded-[100px] text-[14px] font-[700] border-none hover:bg-[#00D059] hover:text-black ">
                View All
              </button>
            </a>
          </div>
          <p className="text-center font-[700] text-[16px] mt-[15px] ">Set 1</p>
        </div>
        <div className="flex flex-col">
          <div className="relative  ">
            <Image src={takeImage2} alt="/" className="relative" />
            <a href="https://drive.google.com/drive/folders/1NZmjjwpY4_wXxJzgQb8q22p1TxWW8oMm?usp=drive_link" target="_blank">
              <button className="absolute bottom-[20px] left-[27%] bg-[#FFFFFF1F] px-[10px] py-[6px] rounded-[100px] text-[14px] font-[700] border-none hover:bg-[#00D059] hover:text-black ">
                View All
              </button>
            </a>
          </div>
          <p className="text-center font-[700] text-[16px] mt-[15px]">Set 2</p>
        </div>
        <div className="flex flex-col">
          <div className="relative  ">
            <Image src={takeImage3} alt="/" className="relative" />
            <a href="https://drive.google.com/drive/folders/1qIp8R8v4Yx6yzdBfLkShP-Sjx44VwIxd?usp=drive_link" target="_blank">
              <button className="absolute bottom-[20px] left-[27%] bg-[#FFFFFF1F] px-[10px] py-[6px] rounded-[100px] text-[14px] font-[700] border-none hover:bg-[#00D059] hover:text-black">
                View All
              </button>
            </a>
          </div>
          <p className="text-center font-[700] text-[16px] mt-[15px]">Set 3</p>
        </div>
        <div className="flex flex-col">
          <div className="relative ">
            <Image src={takeImage4} alt="/" className="relative" />
            <a href="https://drive.google.com/drive/folders/1WY3jG_a8HpKh7agKxEdk0cbCiRa9GldQ?usp=drive_link" target="_blank">
              <button className="absolute bottom-[20px] left-[27%] bg-[#FFFFFF1F] px-[10px] py-[6px] rounded-[100px] text-[14px] font-[700] border-none hover:bg-[#00D059] hover:text-black">
                View All
              </button>
            </a>
          </div>
          <p className="text-center font-[700] text-[16px] mt-[15px]">Set 4</p>
        </div>
        <div className="flex flex-col">
          <div className="relative ">
            <Image src={takeImage5} alt="/" className="relative" />
            <a href="https://drive.google.com/drive/folders/1LTQdz4JGfdrfNBgsBSQ9UXtm2dKjFGMV?usp=drive_link" target="_blank">
              <button className="absolute bottom-[20px] left-[27%] bg-[#FFFFFF1F] px-[10px] py-[6px] rounded-[100px] text-[14px] font-[700] border-none hover:bg-[#00D059] hover:text-black">
                View All
              </button>
            </a>
          </div>
          <p className="text-center font-[700] text-[16px] mt-[15px]">Set 5</p>
        </div>
      </div>
    </section>
  );
};
export default TakeOverEvent;
