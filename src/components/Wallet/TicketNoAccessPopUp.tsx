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
import blurqrcode from "@/assets/Wallet/Blur-enlarge-code.svg";

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

const TicketNoAccessPopUp = ({ onClose, open }: any) => {
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

  const handleLogout = () => {
    localStorage.clear();

    dispatch({ type: "LOGOUT" });
    router.push("/");
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent
          showCloseIcon={false}
          //   style={{
          //     background:
          //       "linear-gradient(#0F0F0F, #1A1A1A) padding-box,linear-gradient(272.78deg, rgba(15, 255, 119, 0.32) 0%, rgba(255, 255, 255, 0.06) 50%, rgba(15, 255, 119, 0.32) 100%) border-box",
          //   }}
          className="sm:max-w-md w-[650px] text-white px-[20px] py-[32px] flex items-center justify-center bg-[#0F0F0F] border-[0.86px] border-transparent "
          style={{
            background:
              "linear-gradient(360deg, #0F0F0F 72%, #1A1A1A 100%) padding-box," +
              "linear-gradient(272.78deg, rgba(15, 255, 119, 0.32) 0%, rgba(255, 255, 255, 0.06) 50%, rgba(15, 255, 119, 0.32) 100%) border-box",
          }}
        >
          <div className="w-full flex flex-col items-center">
            {/* <Image
              style={{ borderRadius: "12px" }}
              width={320}
              height={320}
        
              src={blurqrcode}
              alt="rhs"
              className="pt-[0px]"
            /> */}
            <div className="flex items-center flex-col">
              {/* <Image src={Iconpop} alt="icon" /> */}
              <p className="mt-[16px] font-extrabold leading-[24px] whitelist-txt text-center">
              You are not authorized to view this ticket. <br className="md:block hidden"></br>
               Please Log in with your own account to see the details of your purchased tickets.
              </p>

              <div className="flex items-center gap-[20px] mt-[28px] ">
                <Button
                  className=" py-[12px] px-[35px] text-[14px] font-extrabold leading-[19.6px]
                 text-center  w-full text-[#030303] "
                onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default TicketNoAccessPopUp;
