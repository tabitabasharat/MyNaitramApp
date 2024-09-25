"use client";

import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/newdialog";
import Image from "next/image";
import Iconpop from "@/assets/summit.svg";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";

const Addcryptopopup = ({ onClose, open }: any) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const myProfile = useAppSelector(
    (state) => state?.getShowProfile?.myProfile?.data
  );
  const userLoading = useAppSelector((state) => state?.getShowProfile);

  const imageUrl = myProfile?.profilePicture?.startsWith("http" || "https")
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
          className="sm:max-w-md w-[384px] text-white px-[24px] py-[32px] lg:py-[84px] flex items-center justify-center bg-[#0F0F0F] border-[0.86px] border-transparent "
        >
          <div>
            <div className="flex items-center flex-col">
              <Image src={Iconpop} alt="icon" className="size-[64px]" />
              <p className="mt-[32px] text-[16px] font-extrabold  leading-[24px] whitelist-txt text-center">
              Payout Successful
              </p>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default Addcryptopopup;
