import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ClockCounterClockwise,
  FolderStar,
  Image,
} from "@phosphor-icons/react/dist/ssr";
import PostGrid from "./PostGrid";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useState, useEffect } from "react";
import { getWalletCollectByUserID } from "@/lib/middleware/wallet";

const PostTabs = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const userid =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;

    dispatch(getWalletCollectByUserID(userid));
  }, []);
  const myWalletCollect = useAppSelector(
    (state) =>
      state?.getWalletCollectByUID?.myWalletCollectibles?.data?.userCollectibles
  );
  console.log("my wallet collectibles are ", myWalletCollect);
  return (
    <div className="mt-[32px] md:mt-[50px]">
      <Tabs defaultValue="recent" className="w-full">
        <TabsList className="w-full h-full p-[0px] pb-[24px] bg-transparent">
          <TabsTrigger
            value="recent"
            className="w-full pt-[8px] pb-[16px] sm:py-[20px]"
          >
            <ClockCounterClockwise size={24} />
          </TabsTrigger>
          <TabsTrigger
            value="saved"
            className="w-full pt-[8px] pb-[16px] sm:py-[20px]"
          >
            <FolderStar size={24} />
          </TabsTrigger>
          <TabsTrigger
            value="gallery"
            className="w-full pt-[8px] pb-[16px] sm:py-[20px]"
          >
            <Image size={24} />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="recent">
          <PostGrid />
        </TabsContent>
        <TabsContent value="saved">
          <PostGrid event={myWalletCollect} />
        </TabsContent>
        <TabsContent value="gallery">
          <PostGrid />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PostTabs;
