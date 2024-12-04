import Backward from "../Backward/Backward"
import ufo from "@/assets/UFO_SVG.png";
import Image from "next/image"

function VenueVerification() {
    return (
        <div className="px-[24px] pt-[120px] md:pt-[132px] md:px-[180px]">
            <Backward />
            <h1 className="text-[30px] md:text-[48px] font-extrabold pb-[24px]">Event Venue Verification Form</h1>
            <div className="flex flex-col gap-[52px] md:gap-[32px]">
                <div className="gradient-slate w-full md:w-[1080px]">
                    <div className="flex h-[56px] bg-color">
                        <p className="text-[18px] w-full py-[16px] px-[24px] font-extrabold md:text-[24px]"><span className="text-[#13FF7A]">
                            Venue </span><span>Information</span></p>
                        <Image src={ufo} width={350} height={350} className="" alt="ufo" />
                    </div>
                    <div className="p-[24px] md:py-[32px] md:px-[60px]">
nbhhijbhj
                    </div>
                </div>
            </div>
        </div>
)}
export default VenueVerification