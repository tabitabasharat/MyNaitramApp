import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";
import {
  CaretLeft,
  Clock,
  SealCheck,
  StripeLogo,
} from "@phosphor-icons/react/dist/ssr";
import { Input } from "../ui/input";
import Image from "next/image";
import { shimmer, toBase64 } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";
import axios from "axios";
import { API_URL } from "@/lib/client";
import { useState } from "react";
import ScreenLoader from "../loader/Screenloader";

const PaymentsModal = ({
  onNext,
  handleNext,
}: {
  onNext: () => void;
  handleNext: any;
}) => {
  const [loader, setLoader] = useState(false);
  async function OnclickSubmit() {
    setLoader(true);
    const data = await axios.post(`${API_URL}/create-checkout-session`);
    console.log(data?.data?.url);
    setLoader(false);
    if (data?.data?.url) {
      window.open(data?.data?.url, "_blank");
    } else {
      console.error("No URL received");
    }
  }
  return (
    <DialogContent className="sm:max-w-md lg:max-w-[650px]">
      {loader && <ScreenLoader />}
      <ScrollArea className="max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">
            <div className="flex items-center gap-4 pb-4">
              <button
                onClick={() => handleNext("CompleteYourProfile")}
                className="bg-white/10 p-2 w-fit rounded-full cursor-pointer"
              >
                <CaretLeft size={17} weight="bold" />
              </button>
              <p>Payments</p>
            </div>
          </DialogTitle>
          <Separator className="scale--[1.12] bg-[#292929]" />
        </DialogHeader>

        <div>
          <div className="flex justify-between mt-6">
            <p className="text-muted text-sm">YOUR PURCHASE</p>
            <p className="font-light flex space-x-1">
              <Clock size={20} className="text-primary" weight="fill" />
              <span className="font-bold text-primary pr-1">12:43 </span>{" "}
              <span className="hidden lg:block">left to finish the order</span>
              <span className="lg:hidden">left to order</span>
            </p>
          </div>
          <div className="flex flex-col gap-3 border border-muted rounded-lg pb-2 pt-4 px-4 mt-2">
            <div className="border border-muted p-3 rounded-lg">
              <div className="flex gap-4">
                <Image
                  src={"/event4.png"}
                  width={800}
                  height={800}
                  className="w-[60px] rounded-lg object-cover"
                  placeholder={`data:image/svg+xml;base64,${toBase64(
                    shimmer(1200, 1800)
                  )}`}
                  alt="event"
                />
                <div className="flex flex-col justify-between">
                  <div>
                    <p className="text-primary text-sm">
                      Saturday, 5th March 2024
                    </p>
                    <p className="font-bold leading-[1.2] my-1">
                      PIZDEZ Women's Day Party 2024
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <p className="font-light">Guest-list Admission</p>
              <p className="font-bold">FREE</p>
            </div>
            <div className="flex justify-between">
              <p className="font-light">Regular Package</p>
              <p className="font-bold">
                <span className="font-light opacity-50">2x </span>£15
              </p>
            </div>{" "}
            <div className="flex justify-between mb-2">
              <p className="font-light">Fees</p>
              <p className="font-bold">Include</p>
            </div>
            <Input placeholder="ENTER CODE" />
            <div className="flex justify-between">
              <p className="font-light">Discount</p>
              <div className="flex items-center gap-1 font-light text-sm">
                <SealCheck
                  className="text-white translate-y-[-0.1rem]"
                  size={15}
                  weight="fill"
                />
                <div className="text-[#BFBFBF] items-center flex gap-1">
                  <p className="line-through">£31.16</p>
                  <p>12%</p>
                </div>
              </div>
            </div>
            <Separator />
            <div className="flex justify-between mb-2 font-bold">
              <p>Total</p>
              <p>£30</p>
            </div>
          </div>
          <p className="text-sm mt-6">PAYMENT METHOD</p>
          <div className="flex justify-between items-center font-bold border border-muted rounded-lg p-3 mt-3">
            <p>Stripe</p>
            <StripeLogo size={18} weight="fill" />
          </div>
        </div>
        <DialogFooter className="w-full mt-4 pt-4 bg-[#101010] border-t border-muted">
          <Button onClick={OnclickSubmit} className="w-full">
            Pay: £30.00
          </Button>
        </DialogFooter>
      </ScrollArea>
    </DialogContent>
  );
};

export default PaymentsModal;
