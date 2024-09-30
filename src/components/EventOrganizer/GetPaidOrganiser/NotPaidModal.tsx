"use client";

import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogHeader,
  DialogTitle,
  DialogPortal,
} from "@/components/ui/newdialog";
import walletimg from "@/assets/Wallet/Wallet-not-paid.svg";
import Image from "next/image";
import Iconpop from "@/assets/payment.svg";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ReceviePaymentModalProps {
  onClose: () => void;
  open: any;
  
}

const NotPaidModal = ({
  onClose,
  open,
  
}: ReceviePaymentModalProps) => {
  



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
            <Image src={walletimg} alt="Payment Icon" />
            <p className="mt-[16px] font-extrabold leading-[24px] whitelist-txt text-center">
            Please update your Payout Details to Get Paid
            </p>
           
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default NotPaidModal;
