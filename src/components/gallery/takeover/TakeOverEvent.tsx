import Image from "next/image";
import back from "../../../assets/naitramgallery/back.svg";
import takeImage1 from "../../../assets/naitramgallery/TAKEOVR/takeovr_set_1.webp";
import takeImage2 from "../../../assets/naitramgallery/TAKEOVR/takeovr_set_2.webp";
import takeImage3 from "../../../assets/naitramgallery/TAKEOVR/takeovr_set_3.webp";
import takeImage4 from "../../../assets/naitramgallery/TAKEOVR/takeovr_set_4.webp";

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
      <a href="/gallery">
        <div className="pb-[40px] flex items-center gap-[16px] cursor-pointer ">
          <Image src={back} alt="/" />
          <p className=" text-[16px] font-[700] pt-[4px] ">Gallery</p>
        </div>
      </a>
      <h1 className="md:text-start text-center text-[32px] font-[800] pb-[25px] ">
        TAKEOVR EVENT
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
              href="https://www.dropbox.com/scl/fo/khcnc1jlqzekr0lyazty3/AFNtY-BjAHzOik6cOE1W_F0/SET01?rlkey=y33f4akvxs55w6nztfl7cxkar&subfolder_nav_tracking=1&st=qc412jmu&dl=0"
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
              href="https://www.dropbox.com/scl/fo/khcnc1jlqzekr0lyazty3/ACUVOlFcx9UADMsgKe9EJ_c/SET02?rlkey=y33f4akvxs55w6nztfl7cxkar&subfolder_nav_tracking=1&st=3arr9svd&dl=0"
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
              href="https://www.dropbox.com/scl/fo/khcnc1jlqzekr0lyazty3/AGL_Rih41QajafB_Tixhjtw/SET03?rlkey=y33f4akvxs55w6nztfl7cxkar&subfolder_nav_tracking=1&st=ayfkd0e4&dl=0"
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
              href="https://www.dropbox.com/scl/fo/khcnc1jlqzekr0lyazty3/AF4_JTH0y4_hvc_MQzjE1Hk/SET04?rlkey=y33f4akvxs55w6nztfl7cxkar&subfolder_nav_tracking=1&st=fkk4llmq&dl=0"
              target="_blank"
            >
              <button className="absolute bottom-[20px] left-[27%] bg-[#FFFFFF1F] px-[10px] py-[6px] rounded-[100px] text-[14px] font-[700] border-none hover:bg-[#00D059] hover:text-black">
                View All
              </button>
            </a>
          </div>
          <p className="text-center font-[700] text-[16px] mt-[15px]">Set 4</p>
        </div>
      </div>
    </section>
  );
};
export default TakeOverEvent;
