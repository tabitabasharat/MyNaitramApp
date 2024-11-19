"use client";

import { CaretRight, Cross } from "@phosphor-icons/react/dist/ssr";
import { useState, useEffect } from "react";
import { photorolls } from "@/lib/dummyData";
import "./live-actvity-chat/Chat.css";
import Thumbnail from "../ui/thumbnail";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "../ui/separator";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import Thumbnillive from "../ui/Thumbnillive";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getPhotoRoll } from "@/lib/middleware/liveactivity";
import PhotoRollEnlargePopUp from "./PhotoRollEnlarge";
import Crossicon from "@/assets/Wallet/X.svg";
import Image from "next/image";

const PhotoRoll = () => {
  const [EventID, setEventID] = useState<any>("");
  const dispatch = useAppDispatch();
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);
  const [openEnlarge, setOpenEnlarge] = useState(false);
  useEffect(() => {
    const currentUrl: any =
      typeof window !== "undefined" ? window.location.href : null;

    if (currentUrl) {
      const parts = currentUrl.split("/");
      const lastPart = parts[parts.length - 1].split("?")[0];

      setEventID(lastPart);
      console.log("My event id is", lastPart);
      dispatch(getPhotoRoll(lastPart));
    }
  }, []);

  const photoRoll = useAppSelector(
    (state: any) => state?.getPhotoRollChat?.myData?.data
  );
  console.log("Chat photos are", photoRoll);

  const handlePhotoClick = (photo: any) => {
    setSelectedPhoto(photo);
    setOpenEnlarge(true);
  };
  const closeModal = () => {
    setSelectedPhoto(null);
  };
  return (
    <div>
      <Dialog>
        <div className="flex justify-between">
          <p className="lg:font-bold lg:text-[16px] font-extrabold text-sm">
            Photo Roll
          </p>
          <DialogTrigger asChild>
            <button className="text-[#8F8F8F] text-[14px] font-bold  flex  items-center hover:text-white duration-300">
              View All{" "}
              <CaretRight size={14} weight="bold" className="mb-[3px]" />
            </button>
          </DialogTrigger>
        </div>

        {/* LARGE SCREEN VIEW */}
        <div className="flex hidden md:flex flex-wrap  space-e-[16px]  gap-[16px] items-center mt-[16px] h-[200px] overflow-auto scrollbar-hide">
          {photoRoll?.length > 0 &&
            photoRoll.map((photoroll: any, index: any) => (
              <div
                key={index}
                onClick={() => handlePhotoClick(photoroll?.picture)}
                className="cursor-pointer"
              >
                <Thumbnillive key={index} img={photoroll?.picture} />
              </div>
            ))}
        </div>

        {/* SMALL SCREEN VIEW */}
        <ScrollArea className="block md:hidden w-full  whitespace-nowrap ">
          <div className="flex gap-[8px] mt-6">
            {photoRoll?.length > 0 &&
              photoRoll.map((photoroll: any, index: any) => (
                <div
                  key={index}
                  onClick={() => handlePhotoClick(photoroll?.picture)}
                  className="cursor-pointer"
                >
                  <Thumbnillive img={photoroll?.picture} key={index} />
                </div>
              ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <DialogContent className="sm:max-w-full md:max-w-[660px] pb-0 px-[24px] pt-[18px] ">
          <DialogHeader>
            <DialogTitle className="font-bold text-sm lg:text-[24px] pb-[18px]">
              Photo Roll
            </DialogTitle>
            <Separator className="scale-x-[1.09] bg-[#292929]" />
          </DialogHeader>

          <ScrollArea className="h-[402px] w-full mt-1 pb-1 overflow-auto  ">
            <div className=" gap-[14px] photo-container">
              {photoRoll?.length > 0 &&
                photoRoll.map((photoroll: any, index: any) => (
                  <div
                    key={index}
                    onClick={() => handlePhotoClick(photoroll?.picture)}
                    className="cursor-pointer"
                  >
                    <Thumbnillive
                      key={index}
                      img={photoroll.picture}
                      size="size-[168.5px]  md:size-[140px]"
                    />
                  </div>
                ))}
            </div>
          </ScrollArea>
        </DialogContent>
        {selectedPhoto && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-[100]"
            onClick={closeModal}
          >
            <img
              src={selectedPhoto}
              alt="Selected"
              className="max-w-full max-h-full h-[700px]"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute top-4 right-4 z-[101] bg-transparent border-none cursor-pointer"
              onClick={closeModal}
            >
              <Image
                src={Crossicon}
                alt="Close"
                className="w-full h-full"
              />
            </button>
          </div>
        )}

        {selectedPhoto && (
          <div
            className="fixed hidden inset-0 bg-black bg-opacity-90 flex justify-center items-center z-[100] relative "
            onClick={closeModal}
          >
            <img
              src={selectedPhoto}
              alt="Selected"
              className="max-w-full h-[700px]"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Close Icon */}
            {/* <button
              className="absolute top-4 right-4 z-[101] bg-transparent border-none cursor-pointer"
              onClick={closeModal}
            >
              <Image
                src={Crossicon}
                alt="Close"
                className="w-full h-full"
              />
            </button> */}
          </div>
        )}

        {/* {openEnlarge && (
          <PhotoRollEnlargePopUp
            onClose={() => setOpenEnlarge(false)}
            open={() => setOpenEnlarge(true)}
            photoRoll={selectedPhoto}
          />
        )} */}
      </Dialog>
    </div>
  );
};

export default PhotoRoll;
