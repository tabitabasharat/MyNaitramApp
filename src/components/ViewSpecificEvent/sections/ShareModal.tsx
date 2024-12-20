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
import copyurl from "@/assets/Wallet/copyy-url.svg";
import arrowdown from "@/assets/arrow-down-drop.svg";
import copylinkicon from "@/assets/Wallet/copy-link-icon.svg";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Iconpop from "@/assets/launchprofileicon.svg";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useState, useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { deleteAccount } from "@/lib/middleware/profile";
import { Wall, Wallet } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import close from "@/assets/close12.svg";
import { TelegramLogo } from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";
import tick from "@/assets/fi-rr-check.svg";
import {
  SuccessToast,
  ErrorToast,
} from "@/components/reusable-components/Toaster/Toaster";
import ScreenLoader from "@/components/loader/Screenloader";

type LunchModalProps = {
  onClose: () => void; // Function to close the dialog
  open: () => void; // Boolean to control the dialog's visibility
};

const ShareModal = ({ onClose, open, eventUrl }: any) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [userid, setUserid] = useState<any>("");

  console.log("my all event data", eventUrl);

  useEffect(() => {
    const userID =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    setUserid(userID);
    console.log("user ID logged in is", userID);
  }, []);
  const urlRef = useRef<HTMLDivElement>(null);
  const handlelinkValue = () => {
    if (urlRef.current) {
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(urlRef.current);
      selection?.removeAllRanges();
      selection?.addRange(range);

      const textToCopy = urlRef.current.textContent || "";
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          SuccessToast("URL copied successfully");
          console.log("Placeholder copied to clipboard!");
        })
        .catch((err) => {
          ErrorToast("Failed to copy URL.");
          console.error("Failed to copy placeholder: ", err);
        });
    } else {
      ErrorToast("Failed to copy URL.");
    }
  };

  useEffect(() => {
    if (urlRef.current) {
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(urlRef.current);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }, []);

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
          className="flex flex-col w-[464px] text-white px-[0px] gap-[24px] pt-[32px] px-[24px]  pb-[32px] flex items-center justify-center bg-[#0F0F0F] border-[0.86px] border-transparent "
        >
          <div className="flex items-center justify-center w-full truncate overflow-hidden scrollbar-hide flex-col">
            <Image src={copylinkicon} alt="icon" />
            <p className="pb-[16px] pt-[32px] text-[16px] font-bold ">
              Copy link to this event
            </p>
            <div className="relative w-full md:w-[416px] scrollbar-hidden">
              {/* <div className="flex items-center gradient-slate-input gradient-slate text-white rounded-md w-full">
                <div
                  ref={urlRef}
                  className="flex-1 ps-[12px] pe-[35px] sm:pe-[16px] py-[12.5px] text-base text-[#757575] font-normal truncate"
                  style={{
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis"
                  }}
                  title={eventUrl}
                >
                  {eventUrl}
                </div>
              </div> */}
              <div className="flex items-center gradient-slate-input gradient-slate text-white rounded-md w-full">
                <div
                  ref={urlRef}
                  className="flex-1 ps-[12px] pe-[35px] sm:pe-[16px] py-[12.5px] text-base text-[#757575] font-normal truncate"
                  style={{
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                  title={eventUrl}
                >
                  {eventUrl}
                </div>
              </div>
              <Image
                src={copyurl}
                alt="copy-btn"
                className="absolute right-[8px] z-[120] top-[30%] cursor-pointer gradient-slate backdrop-blur-xl"
                onClick={handlelinkValue}
              />
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default ShareModal;
