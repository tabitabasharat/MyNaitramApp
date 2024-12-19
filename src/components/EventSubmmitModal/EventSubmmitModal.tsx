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

import Image from "next/image";
import Iconpop from "@/assets/summit.svg";
import { Button } from "../ui/button";

import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import ScreenLoader from "../loader/Screenloader";
import { SuccessToast, ErrorToast } from "../reusable-components/Toaster/Toaster";
import { deleteAccount } from "@/lib/middleware/profile";
import { useRouter } from "next/navigation";
import { close } from "fs";
import { MdOutlinePendingActions, MdOutlineBlock } from "react-icons/md";

const EventSubmmitModal = ({ onClose, open }: any) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const myProfile = useAppSelector((state) => state?.getShowProfile?.myProfile?.data);
  const userLoading = useAppSelector((state) => state?.getShowProfile);

  const imageUrl =
    myProfile?.profilePicture?.startsWith("http") || myProfile?.profilePicture?.startsWith("https") ? myProfile?.profilePicture : "/person3.jpg";
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
          className="sm:max-w-md w-[345px] text-white px-[24px] py-[32px] flex items-center justify-center bg-[#0F0F0F] border-[0.86px] border-transparent "
        >
          <div>
            {/* <DialogHeader >
              <DialogTitle className="font-bold text-2xl mb-1"></DialogTitle>
            </DialogHeader> */}

            <div className="flex items-center flex-col">
              <Image src={Iconpop} alt="icon" />
              <p className="mt-[16px] font-extrabold text-base leading-[24px] whitelist-txt text-center">Event Submitted</p>
              <Button className="mt-[32px] text-[14px] font-extrabold w-full " onClick={() => router.push("/management")}>
                Let’s go 🎉
              </Button>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

const KycSubmmitModal = ({ onClose, open }: any) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const myProfile = useAppSelector((state) => state?.getShowProfile?.myProfile?.data);
  const userLoading = useAppSelector((state) => state?.getShowProfile);

  const imageUrl =
    myProfile?.profilePicture?.startsWith("http") || myProfile?.profilePicture?.startsWith("https") ? myProfile?.profilePicture : "/person3.jpg";
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
          className="sm:max-w-md w-[345px] text-white px-[24px] py-[32px] flex items-center justify-center bg-[#0F0F0F] border-[0.86px] border-transparent "
        >
          <div>
            {/* <DialogHeader >
              <DialogTitle className="font-bold text-2xl mb-1"></DialogTitle>
            </DialogHeader> */}

            <div className="flex items-center flex-col">
              <Image src={Iconpop} alt="icon" />
              <p className="mt-[16px] font-extrabold text-base leading-[24px] whitelist-txt text-center">KYC Already Submitted</p>
              <Button className="mt-[32px] text-[14px] font-extrabold w-full " onClick={() => router.back()}>
                Back😊
              </Button>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

const VenueVerifyIndicaionModel = ({ onClose, open, text, link, btnTXT }: any) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const myProfile = useAppSelector((state) => state?.getShowProfile?.myProfile?.data);
  const userLoading = useAppSelector((state) => state?.getShowProfile);

  const imageUrl =
    myProfile?.profilePicture?.startsWith("http") || myProfile?.profilePicture?.startsWith("https") ? myProfile?.profilePicture : "/person3.jpg";
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
          className="sm:max-w-md w-[345px] text-white px-[24px] py-[32px] flex items-center justify-center bg-[#0F0F0F] border-[0.86px] border-transparent "
        >
          <div className="z-50">
            {/* <DialogHeader >
              <DialogTitle className="font-bold text-2xl mb-1"></DialogTitle>
            </DialogHeader> */}

            <div className="flex items-center flex-col">
              <div className="bg-green-400 p-6 rounded-full">
                <MdOutlinePendingActions color="green" size={35} />
              </div>
              <p className="mt-[16px] font-extrabold text-base leading-[24px] whitelist-txt text-center">{text}</p>
              <Button className="mt-[32px] text-[14px] font-extrabold w-full border-none" onClick={() => router.push(link)}>
                {btnTXT}
              </Button>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

const SalesStartindicationModel = ({ onClose, open, text, link, btnTXT }: any) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const myProfile = useAppSelector((state) => state?.getShowProfile?.myProfile?.data);
  const userLoading = useAppSelector((state) => state?.getShowProfile);

  const imageUrl =
    myProfile?.profilePicture?.startsWith("http") || myProfile?.profilePicture?.startsWith("https") ? myProfile?.profilePicture : "/person3.jpg";
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
          className="sm:max-w-md w-[345px] text-white px-[24px] py-[32px] flex items-center justify-center bg-[#0F0F0F] border-[0.86px] border-transparent "
        >
          <div className="z-50">
            {/* <DialogHeader >
              <DialogTitle className="font-bold text-2xl mb-1"></DialogTitle>
            </DialogHeader> */}

            <div className="flex items-center flex-col">
              <div className="p-6 rounded-full" style={{ backgroundColor: "rgba(255, 0, 0, 0.5)" }}>
                <MdOutlineBlock color="red" size={35} />
              </div>
              <p className="mt-[16px] font-extrabold text-base leading-[24px] whitelist-txt text-center">{text}</p>
              <Button className="mt-[32px] text-[14px] font-extrabold w-full border-none" onClick={() => router.push(link)}>
                {btnTXT}
              </Button>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export { EventSubmmitModal, KycSubmmitModal, VenueVerifyIndicaionModel, SalesStartindicationModel };
