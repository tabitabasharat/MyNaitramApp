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
import Iconpop from "@/assets/Wallet/claim-star.svg";
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
import { claimRewardCollectible } from "@/lib/middleware/reward";


const ClaimRewardModal = ({ onClose, open,collectibleID }: any) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loader, setLoader] = useState(false);


  const value= "rewards"

  // async function ClaimCollectible() {
  //   console.log("Collectible Claimed");
  //   const userID =
  //     typeof window !== "undefined" ? localStorage.getItem("_id") : null;
  //   console.log("my id is", userID);
  //   try {
  //     const data = {
  //       collectibleId: collectibleID,
  //       userId: userID,
  //     };
  //     dispatch(claimRewardCollectible(data)).then((res: any) => {
  //       if (res?.payload?.status === 201) {
  //         setLoader(false);
  //         SuccessToast("Collectible Claimed Successfully");
  //         const value= "rewardcollectables"
  //         router.push(`/reward?option=${value}`)
  //       } else {
  //         setLoader(false);
  //         ErrorToast(res?.payload?.message);
  //       }
  //     });
  //   } catch (error) {
  //     console.error("Error:", error);
  //     ErrorToast(error);
  //   }
  // }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      {/* <DialogTrigger>Open Dialog</DialogTrigger> */}
      <DialogPortal>
        <DialogOverlay />
        <DialogContent
          showCloseIcon={false}
          style={{
            background:
              "linear-gradient(#0F0F0F, #1A1A1A) padding-box,linear-gradient(272.78deg, rgba(15, 255, 119, 0.32) 0%, rgba(255, 255, 255, 0.06) 50%, rgba(15, 255, 119, 0.32) 100%) border-box",
          }}
          className="sm:max-w-md lg:max-w-[500px] text-white py-[92px] flex items-center justify-center bg-[#0F0F0F] border-[0.86px] border-transparent "
        >
          <div>
            <DialogHeader className="mb-5">
              <DialogTitle className="font-bold text-2xl mb-1"></DialogTitle>
            </DialogHeader>

            <div className="flex items-center flex-col">
              <Image src={Iconpop} alt="icon" />
              <p className="mt-[16px] font-extrabold leading-[24px] whitelist-txt text-center">
              
              You have claimed <span className="#FFC300">1 Naitram</span> Membership Collectible
              </p>
              
              <div className="flex items-center gap-[20px] mt-[32px] ">
                <Button
                  className=" py-[12px] px-[25px] text-[14px] font-extrabold leading-[19.6px]
                 text-center  w-full text-[#030303] "
                 onClick={()=>{router.push(`/reward?option=${value}`)}}
                // onClick={() => ClaimCollectible()}

                >
                  View My Collectible
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default ClaimRewardModal;
