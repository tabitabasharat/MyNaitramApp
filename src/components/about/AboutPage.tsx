import Image from "next/image";
import aboutTri from "@/assets/ticketpyramid.png";
import Journy from "./ourJourny/Journy";
import Vision from "./vision/Vision";
import Card from "./vision/card/Card";
import { Reveal } from "@/components/animations/Reveal";
import VideoPlayer from "./VedioPlayer/VedioPlayer";

export default function AboutPage ()  {
  return (
    <>
      <section
        style={{
          background: "#000000",
          backgroundImage: "url(/About/AboutEllipse.png)",
          backgroundPosition: " top center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          opacity: "1",
        }}
        className="pt-[150px] md:pt-[200px] pb-[60px] md:pb-[100px] md:px-0 px-[20px] "
      >
        <div style={{}} className="flex flex-col justify-center items-center">
          <Reveal y={100} width="100%">
            <div className="flex flex-col justify-center items-center">
              <h2 className="md:text-6xl text-[30px] font-[600] mb-[20px] text-center ">
                This is NAITRAM
              </h2>
              <p className="md:max-w-[44.569%] text-center pb-[55.6px] md:text-xl text-[17px] ">
                We are not just changing the game we’re redefining it. Born
                from a visionary idea to a revolutionary experience, we stands
                at the vanguard of the events and entertainment industry’s
                transformation.
              </p>
            </div>
          </Reveal>
          <VideoPlayer />

          {/* <div className="flex justify-center relative ">
            <video className="md:w-[60%] rounded-[50px] w-100% " controls>
              <source src="/About/ABOUT-VIDEO.mp4" type="video/mp4" />
            </video>
            <img src="" alt="/" className=" absolute top-[50%]" />
          </div> */}
        </div>
        <div className="flex flex-col items-center justify-center pb-[50px] md:pb-[100px] pt-[100px]">
          <Reveal y={100} width="100%">
            <div className="flex flex-col items-center justify-center lg:py-[100px] pb-[50px] md:pb-[100px]">
              <h2 className=" md:text-6xl text-[30px] font-[600] text-center text-white mb-[20px]">
                Why are we doing this?
              </h2>
              <p className=" md:max-w-[47.891%] text-center md:text-xl text-[16px] text-white md:mb-[1.6em]">
                We’re driven by the belief that live events are foundational to
                creating lasting memories and building communities. We’ve seen
                how ticket fraud and scalping can tarnish these experiences.{" "}
                <br />
                <br />
                Our mission is to tackle these issues head-on with blockchain
                technology, transforming tickets into secure digital assets.
                This ensures a fair, enjoyable, and accessible event experience
                for fans and artists alike. We’re doing this because we’re
                committed to preserving the magic of live events for everyone,
                without the hassles.
              </p>
            </div>
          </Reveal>

          <div className="max-w-[1140px] mx-auto flex flex-col md:flex-row items-center  p-10px flex-wrap">
            <button className="text-lg bg-[#61CE7000] py-[12px] px-[55px] color-[#009540] border-[#009540] rounded-[34px] w-auto border-2">
              Blockchain
            </button>
            <p className="text-[41px] mb-[2px] lg:mb-[0px] text-center text-[#009540] font-[600] px-[20px] text-center md:py-[12px] h-[50px] md:h-[73px]">
              +
            </p>
            <button className="text-lg bg-[#61CE7000] py-[12px] px-[55px] color-[#009540] border-[#009540] rounded-[34px] w-auto border-2">
              Events
            </button>
            <p className="text-[41px] mb-[2px] lg:mb-[0px] text-center text-[#009540] font-[600] px-[20px] md:py-[12px] h-[50px] md:h-[73px]">
              =
            </p>
            <button className="text-lg bg-[#61CE7000] py-[12px] px-[55px] color-[#009540] border-[#009540] rounded-[34px] w-auto border-2">
              Fan Rewards
            </button>
          </div>
        </div>
        <div>
          <Reveal y={100} width="100%">
            <h2 className="md:text-6xl text-[30px] font-[600] text-center text-white mb-[20px]">
              The revolution starts <br className="block sm:hidden"/> at the top
            </h2>
          </Reveal>
          <Reveal y={100} width="100%">
            <div className=" items-center  flex flex-col ">
              <p className=" md:max-w-[55.338%] text-[16px] text-center md:text-xl  text-white mb-[1.6em]">
                The ticketing industry’s structure often places fans at the
                bottom, undervaluing their importance and failing to incentivise
                their loyalty. To solve this, our structure prioritises fans at
                the top, recognising their significance.
              </p>
              <p className=" md:max-w-[55.338%] text-center md:text-xl text-[16px] text-white mb-[1.6em]">
                The ticketing system, positioned at the bottom, serves as a
                foundation for connecting fans, artists, and organisers,
                emphasising the importance of addressing fans needs and
                experiences while empowering all stakeholders above it.
              </p>
            </div>
          </Reveal>
          <div className=" mx-auto flex justify-center max-w-[85%]">
            <Image src={aboutTri} className="w-[100%]" alt="/" />
          </div>
        </div>
      </section>

      <Journy />
      <Vision />
      <Card />
    </>
  );
};


