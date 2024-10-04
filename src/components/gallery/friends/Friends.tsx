import Image from "next/image";
import back from "../../../assets/naitramgallery/back.svg";
import takeImage1 from "../../../assets/naitramgallery/set 1.webp";

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
        NAITRAM VERIFIED FAMIL AND FRIENDS PARTY
      </h1>
      <div className="flex gap-[25px] flex-wrap justify-center md:justify-start ">
        <div className="flex flex-col">
          <div className="relative  ">
            <Image
              src={takeImage1}
              alt="/"
              className="relative md:w-[240px] w-[100%] "
            />
            <a
              href="https://www.dropbox.com/scl/fo/ohhz2bul4h3nb8g4gaa3d/AEqjcYXwG_m8bHcd-xRnmyk?rlkey=g7gst1gs162a3efzsuq4wq0wu&st=5mpi33lw&dl=0"
              target="_blank"
            >
              <button className="absolute bottom-[20px] left-[27%] bg-[#FFFFFF1F] px-[10px] py-[6px] rounded-[100px] text-[14px] font-[700] border-none hover:bg-[#00D059] hover:text-black">
                View All
              </button>
            </a>
          </div>
          {/* <p className="text-center font-[700] text-[16px] mt-[15px] ">Set 1</p> */}
        </div>
      </div>
    </section>
  );
};
export default NaitramLaunch;
