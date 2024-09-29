"use client";

import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogHeader,
  DialogTitle,
  DialogPortal,
} from "@/components/ui/newdialog";

import Image from "next/image";
import Iconpop from "@/assets/payment.svg";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getRewardCollectibleByID } from "@/lib/middleware/reward";
import StripeAccount from "../Stripe Account/StripeAccount";
import Cryptowallet from "../cryptowallet/Cryptowallet";
import WalletChooseModal from "@/components/Walletchoose/WalletChooseModal";

const Receviepayment = ({ onClose, open, eventData }: any) => {
  const router = useRouter();
  const [isClaimOpen, setIsClaimOpen] = useState(false);
  const [iswalletOpen, setIsWalletOpen] = useState(false);
  const [cryptowalletID, setCryptowalletID] = useState("");
  const [collectID, setCollectID] = useState(""); // Assuming you'll use this for some logic
  const [loader, setLoader] = useState(false); // Assuming this is for some loader logic
  const dispatch = useAppDispatch(); // Redux dispatch

  // Handler to toggle the popup
  const handleTogglestripe = () => {
    setIsClaimOpen(!isClaimOpen); // Toggle isClaimOpen to control the popup
  };
  const handleTogglewallet = () => {
    setIsWalletOpen(!iswalletOpen); // Toggle isClaimOpen to control the popup
  };
  useEffect(() => {
    const currentUrl: any =
      typeof window !== "undefined" ? window.location.href : null;
    const parts = currentUrl.split("/");
    const value = parts[parts.length - 1];
    setCollectID(value);
    console.log("my event id is", value);
    // dispatch(getRewardCollectibleByID(value));
  }, []);
  useEffect(() => {
    const currentUrl: any =
      typeof window !== "undefined" ? window.location.href : null;
    const parts = currentUrl.split("/");
    const value = parts[parts.length - 1];
    setCryptowalletID(value);
    console.log("my event id is", value);
    // dispatch(getRewardCollectibleByID(value));
  }, []);
  const value = "pop ups";
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent
          showCloseIcon={false}
          style={{
            background:
              "linear-gradient(#0F0F0F, #1A1A1A) padding-box,linear-gradient(272.78deg, rgba(15, 255, 119, 0.32) 0%, rgba(255, 255, 255, 0.06) 50%, rgba(15, 255, 119, 0.32) 100%) border-box",
          }}
          className="sm:max-w-md lg:max-w-[500px] text-white py-[54px] px-[31px] lg:px-[48px] bg-[#0F0F0F] border-[0.86px] border-transparent "
        >
          <div>
            {/* <DialogHeader className="mb-5">
              <DialogTitle className="font-bold text-2xl mb-1"></DialogTitle>
            </DialogHeader> */}

            <div className="flex items-center flex-col">
              <Image src={Iconpop} alt="icon" />
              <p className="mt-[16px] font-extrabold leading-[24px] whitelist-txt text-center">
                Receive Payment in:
              </p>
              <div className="flex items-center gap-[20px] mt-[32px] ">
                <button
                  onClick={handleTogglewallet}
                  className="gradient-border-btn p-[12px] text-[#00D059] text-sm font-extrabold"
                >
                  Crypto Wallet
                </button>
                {iswalletOpen && (
                  // <Cryptowallet
                  //   onClose={() => setIsWalletOpen(false)} // This will close the popup
                  //   open={iswalletOpen} // Pass the current state to open the popup
                  //   cryptowalletID={cryptowalletID} // Pass collectible ID if needed
                  // />
                  <WalletChooseModal
                    onClose={() => setIsWalletOpen(false)}
                    open={iswalletOpen}
                    eventData={eventData}
                  />
                )}
                <div>
                  <button
                    onClick={handleTogglestripe}
                    className="bg-[#00D059] text-[black] p-[12px] text-sm font-extrabold rounded-[100px]"
                  >
                    Stripe Account
                  </button>
                  {/* Conditionally render the popup component */}
                  {isClaimOpen && (
                    <StripeAccount
                      onClose={() => setIsClaimOpen(false)} // This will close the popup
                      open={isClaimOpen} // Pass the current state to open the popup
                      collectibleID={collectID} 
                      eventData={eventData}// Pass collectible ID if needed
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default Receviepayment;
