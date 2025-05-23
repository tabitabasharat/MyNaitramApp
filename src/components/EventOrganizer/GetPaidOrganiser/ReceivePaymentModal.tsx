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
import { useState, useEffect } from "react";
import Iconpop from "@/assets/payment.svg";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  getPayoutCryptoDetail,
  getPayoutBankDetail,
} from "@/lib/middleware/payout";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import NotPaidModal from "./NotPaidModal";
import { Button } from "@/components/ui/button";

interface ReceviePaymentModalProps {
  onClose: () => void;
  open: any;
  eventID: string;
  ticketSold: number;
  platformFee: number;
  payoutAvailable: number;
}

const ReceviePaymentModal = ({
  onClose,
  open,
  eventID,
  ticketSold,
  platformFee,
  payoutAvailable,
}: ReceviePaymentModalProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [isClaimOpen, setIsClaimOpen] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false);

  const handleToggleStripe = () => {
    setIsClaimOpen(!isClaimOpen);
  };

  const handleToggleWallet = () => {
    setIsWalletOpen(!isWalletOpen);
  };
  useEffect(() => {
    const userid =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    dispatch(getPayoutCryptoDetail(userid));
    dispatch(getPayoutBankDetail(userid));
  }, []);

  const myCryptoHistory = useAppSelector(
    (state) => state?.getPayoutCrypto?.myHistory?.data
  );
  console.log("my crypto payout history is", myCryptoHistory);

  const myBankDetail = useAppSelector(
    (state) => state?.getPayoutBankDetail?.myHistory?.data
  );
  console.log("my payout bank history is", myBankDetail);

  async function handleCrypto() {
    try {
      const userid =
        typeof window !== "undefined" ? localStorage.getItem("_id") : null;

      const res: any = await dispatch(getPayoutCryptoDetail(userid));
      if (res?.payload?.status === 200) {
        router.push(
          `/fund-rised/crypto-wallet/${eventID}?ticketSold=${ticketSold}&PlatformFee=${platformFee}&Payout=${payoutAvailable}`
        );
      } else {
        setIsWalletOpen(true);
        // setLoader(false);
        // ErrorToast(res?.payload?.message);
      }
    } catch (error) {
      console.error("Error:", error);
      // setLoader(false);
      // ErrorToast(error);
    }
  }
  async function handleBank() {
    try {
      const userid =
        typeof window !== "undefined" ? localStorage.getItem("_id") : null;

      const res: any = await dispatch(getPayoutBankDetail(userid));
      if (res?.payload?.status === 200) {
        router.push(
          `/fund-rised/bank-account/${eventID}?ticketSold=${ticketSold}&PlatformFee=${platformFee}&Payout=${payoutAvailable}`
        );
      } else {
        setIsWalletOpen(true);
        // setLoader(false);
        // ErrorToast(res?.payload?.message);
      }
    } catch (error) {
      console.error("Error:", error);
      // setLoader(false);
      // ErrorToast(error);
    }
  }
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
          className="sm:max-w-md lg:max-w-[500px] text-white py-[54px] px-[31px] lg:px-[48px] bg-[#0F0F0F] border-[0.86px] border-transparent"
        >
          <div className="flex items-center flex-col">
            <Image src={Iconpop} alt="Payment Icon" />
            <p className="mt-[16px] font-extrabold leading-[24px] whitelist-txt text-center">
              Receive Payment in:
            </p>
            <div className="flex items-center gap-[20px] mt-[32px]">
              {/* <Link
                href={`/fund-rised/crypto-wallet/${eventID}?ticketSold=${ticketSold}&PlatformFee=${platformFee}&Payout=${payoutAvailable}`}
              > */}
                <button
                  type="button"
                  onClick={handleCrypto}
                  className="gradient-border-btn p-[12px] text-[#00D059] text-sm font-extrabold"
                >
                  Crypto Wallet
                </button>
              {/* </Link> */}
              {/* <Link
                href={`/fund-rised/bank-account/${eventID}?ticketSold=${ticketSold}&PlatformFee=${platformFee}&Payout=${payoutAvailable}`}
              > */}
                <Button
                  type="button"
                  onClick={handleBank}
                  className="bg-[#00D059] text-[black] p-[12px] text-sm font-extrabold rounded-[100px]"
                >
                  Bank Account
                </Button>
              {/* </Link> */}
            </div>
            {isWalletOpen && (
              <NotPaidModal
                onClose={() => setIsWalletOpen(false)}
                open={() => setIsWalletOpen(true)}
              />
            )}
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default ReceviePaymentModal;
