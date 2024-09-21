import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../../ui/button";
import CheckOutModal from "@/components/checkout/CheckOutModal";
import "./browser.css";
import { events } from "@/lib/dummyData";
import Image from "next/image";

function Browserexplore() {
  const initalEvent = events[2];
  return (
    <>

      <Dialog>
        <div className="w-full lg:w-[100%] bg-white/10 rounded-xl flex flex-col lg:flex-row items-center justify-center lg:items-center lg:justify-between px-5 py-4 gap-4">
          <div>
            <p className="font-bold text-[24px] text-center lg:text-left">
              £15 <span className="box-2x-stlying text-[#BFBFBF]">2x</span>
            </p>
            <p className="text-[#D9D9D9] text-sm md:text-base mt-1 text-center lg:text-left">
              Regular Package
            </p>
          </div>
          <DialogTrigger asChild>
            <Button className="text-black p-3 font-bold w-full lg:w-fit">
              Browse Other Events
            </Button>
          </DialogTrigger>

          <CheckOutModal />
        </div>
      </Dialog>
    </>
  );
}

export default Browserexplore;
