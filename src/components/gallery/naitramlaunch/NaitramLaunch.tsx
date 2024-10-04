import Image from "next/image";
import back from "../../../assets/naitramgallery/back.svg"
import takeImage1 from "../../../assets/naitramgallery/launch party/launch_party_set_1.webp";
import takeImage2 from "../../../assets/naitramgallery/launch party/launch_party_set_2.webp";
import takeImage3 from "../../../assets/naitramgallery/launch party/launch_party_set_3.webp";
import takeImage4 from "../../../assets/naitramgallery/launch party/launch_party_set_4.webp";
import takeImage5 from "../../../assets/naitramgallery/launch party/launch_party_set_5.webp";
import takeImage7 from "../../../assets/naitramgallery/launch party/launch_party_set_7.webp";
import takeImage6 from "../../../assets/naitramgallery/launch party/launch_party_set_6.webp";

const NaitramLaunch = () => {
  
  return (
    <section
      className="md:px-[112px] px-[25px] py-[220px] "
      style={{
        backgroundImage: "url(/About/Blur.png)",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        opacity: "1",
      }}
    >
      <a
        href="/gallery"
      >
        <div className="pb-[40px] flex items-center gap-[16px] cursor-pointer ">
          <Image src={back} alt="/" />
          <p className=" text-[16px] font-[700] pt-[4px] ">Gallery</p>
        </div>
      </a>

      <h1 className="md:text-start text-center text-[32px] font-[800] pb-[25px] ">
        NAITRAM LAUNCH PARTY
      </h1>
      <div className="flex gap-[25px] flex-wrap justify-center md:justify-start ">
        <div className="flex flex-col">
          <div className="relative  ">
            <Image
              src={takeImage1}
              alt="/"
              className="relative md:w-unset w-[100%] "
            />
            <a
              href="https://drive.google.com/drive/folders/1zDJHaJvl4WIK3fJaGImCxVdYkHs0lfsV?usp=drive_link"
              target="_blank"
            >
              <button className="absolute bottom-[20px] left-[27%] bg-[#FFFFFF1F] px-[10px] py-[6px] rounded-[100px] text-[14px] font-[700] border-none hover:bg-[#00D059] hover:text-black">
                View All
              </button>
            </a>
          </div>
          <p className="text-center font-[700] text-[16px] mt-[15px] ">Set 1</p>
        </div>
        <div className="flex flex-col">
          <div className="relative  ">
            <Image src={takeImage2} alt="/" className="relative" />
            <a
              href="https://drive.google.com/drive/folders/1m2JjGwPqFTT-KiIt3RD1AeAdZLK5YVMj?usp=drive_link"
              target="_blank"
            >
              <button className="absolute bottom-[20px] left-[27%] bg-[#FFFFFF1F] px-[10px] py-[6px] rounded-[100px] text-[14px] font-[700] border-none hover:bg-[#00D059] hover:text-black">
                View All
              </button>
            </a>
          </div>
          <p className="text-center font-[700] text-[16px] mt-[15px]">Set 2</p>
        </div>
        <div className="flex flex-col">
          <div className="relative  ">
            <Image src={takeImage3} alt="/" className="relative" />
            <a
              href="https://drive.google.com/drive/folders/1Ur5naQaBFNwBDeQDi22dMu8FK_PW_0Jy?usp=drive_link"
              target="_blank"
            >
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
            <a
              href="https://drive.google.com/drive/folders/1fXSq3l3niVPCr4gUV3nrERlGs0uIEQTd?usp=drive_link"
              target="_blank"
            >
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
            <a
              href="https://drive.google.com/drive/folders/1SByyHjydZVU-UPq7GBnkML-Xz5_B3rjs?usp=drive_link"
              target="_blank"
            >
              <button className="absolute bottom-[20px] left-[27%] bg-[#FFFFFF1F] px-[10px] py-[6px] rounded-[100px] text-[14px] font-[700] border-none hover:bg-[#00D059] hover:text-black">
                View All
              </button>
            </a>
          </div>
          <p className="text-center font-[700] text-[16px] mt-[15px]">Set 5</p>
        </div>
        <div className="flex flex-col">
          <div className="relative ">
            <Image src={takeImage6} alt="/" className="relative" />
            <a
              href="https://drive.google.com/drive/folders/10qtNET8fwR9oN-HJnsoCoWZL3BiTaDCg?usp=drive_link"
              target="_blank"
            >
              <button className="absolute bottom-[20px] left-[27%] bg-[#FFFFFF1F] px-[10px] py-[6px] rounded-[100px] text-[14px] font-[700] border-none hover:bg-[#00D059] hover:text-black">
                View All
              </button>
            </a>
          </div>
          <p className="text-center font-[700] text-[16px] mt-[15px]">Set 6</p>
        </div>
        <div className="flex flex-col">
          <div className="relative ">
            <Image src={takeImage7} alt="/" className="relative" />
            <a
              href="https://drive.google.com/drive/folders/1eCOa9aWu5UXLMZUwBMJu3ZyJR0tIXwR-?usp=drive_link"
              target="_blank"
            >
              <button className="absolute bottom-[20px] left-[27%] bg-[#FFFFFF1F] px-[10px] py-[6px] rounded-[100px] text-[14px] font-[700] border-none hover:bg-[#00D059] hover:text-black ">
                View All
              </button>
            </a>
          </div>
          <p className="text-center font-[700] text-[16px] mt-[15px]">Set 7</p>
        </div>
      </div>
    </section>
  );
};
export default NaitramLaunch;
