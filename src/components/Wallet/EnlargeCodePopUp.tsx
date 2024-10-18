"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogOverlay,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogPortal,
} from "@/components/ui/newdialog";
import blurqrcode from "@/assets/Wallet/BlurQrGreen.svg";

import Image from "next/image";
import Iconpop from "@/assets/summit.svg";
import { Button } from "../ui/button";

import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import ScreenLoader from "../loader/Screenloader";
import {
  SuccessToast,
  ErrorToast,
} from "../reusable-components/Toaster/Toaster";
import { deleteAccount } from "@/lib/middleware/profile";
import { useRouter } from "next/navigation";
import { close } from "fs";

const EnlargeCodePopUp = ({ onClose, open }: any) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const myProfile = useAppSelector(
    (state) => state?.getShowProfile?.myProfile?.data
  );
  const userLoading = useAppSelector((state) => state?.getShowProfile);

  const imageUrl =
    myProfile?.profilePicture?.startsWith("http") ||
    myProfile?.profilePicture?.startsWith("https")
      ? myProfile?.profilePicture
      : "/person3.jpg";
  console.log("image src is", imageUrl);

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
          className="sm:max-w-md w-[390px] text-white px-[20px] py-[32px] flex items-center justify-center bg-[#0F0F0F] border-[0.86px] border-transparent "
        >
          <div className="w-full flex flex-col items-center">
            <Image
              style={{ borderRadius: "12px" }}
              width={320}
              height={320}
              // src={TicketData?.qrCode}
              src={blurqrcode}
              alt="rhs"
              className="pt-[0px]"
            />
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default EnlargeCodePopUp;
