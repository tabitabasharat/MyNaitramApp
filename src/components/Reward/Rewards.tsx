"use client";
import Protectedroute from "@/lib/ProtectedRoute/Protectedroute";

import React from "react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { rewardposts } from "@/lib/dummyData";
import Thumbnail from "../ui/thumbnail";
import ClaimRewardCard from "../reusable-components/ClaimRewardCard";
import { Calendar, FlyingSaucer, Planet } from "@phosphor-icons/react/dist/ssr";
import Calendarnew from "@/assets/Wallet/Calendar-31.svg";
import "./Reward.css";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useState, useEffect } from "react";
import { getClaimStatus, getRewardCollectibles } from "@/lib/middleware/reward";
import Image from "next/image";
import ticket from "../../assets/Wallet/white-trophy.svg";
import ticketgreen from "../../assets/Wallet/rewarrd-trophy.svg";
import cards from "../../assets/Cards.svg";
import cardsgreen from "../../assets/Cards (1).svg";
import EventCards from "@/components/eventCards/EventCards";
import ScreenLoader from "../loader/Screenloader";
import { useSearchParams } from "next/navigation";
import { getWalletCollectByUserID } from "@/lib/middleware/wallet";
import { useRouter } from "next/navigation";
import Link from "next/link";

type SelectedOption = "rewards" | "rewardcollectables" | null;

function Rewards() {
  const [selected, setSelected] = useState<SelectedOption>("rewards");
  const router = useRouter();

  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();

  useEffect(() => {
    const userid =
    typeof window !== "undefined" ? localStorage.getItem("_id") : null;

    dispatch(getClaimStatus(userid));
    dispatch(getRewardCollectibles());
  }, []);

  useEffect(() => {
    const selectedOption = searchParams.get("option");
    if (selectedOption) {
      setSelected(selectedOption as SelectedOption);
    }
  }, [searchParams]);

  const ClaimStatusdata = useAppSelector(
    (state) => state?.getClaimStatus?.myClaim?.data
  );
  console.log("my claim status data", ClaimStatusdata);

  const myRewardCollectibles = useAppSelector(
    (state) => state?.getRewardCollectibles?.myCollectibles?.data?.collectibles
  );
  console.log("my Rewards Collectibles are ", myRewardCollectibles);

  const userLoading = useAppSelector((state) => state?.getRewardCollectibles);
  const claimstatusLoading = useAppSelector((state) => state?.getClaimStatus);

  const myWalletCollect = useAppSelector(
    (state) =>
      state?.getWalletCollectByUID?.myWalletCollectibles?.data?.userCollectibles
  );
  console.log("wallet collect", myWalletCollect);

  useEffect(() => {
    const userid =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;

    dispatch(getWalletCollectByUserID(userid));
  }, []);
  const handleOptionChange = (option: SelectedOption) => {
    setSelected(option);

    router.push(`?option=${option}`, { scroll: false });
  };

  return (
    <section
      className="min-h-screen py-[8rem] bg-cover bg-no-repeat px-[24px] lg:px-0 bg-reward bg-reward-outer"
    >
      {claimstatusLoading?.loading && <ScreenLoader />}
      {userLoading?.loading && <ScreenLoader />}

      <div className="bg-reward-outer2">
        <p className="font-extrabold lg:text-[32px] text-[20px] -tracking-[0.02em]">
          Your Rewards
        </p>
        <div className="lg:pt-[32px] pt-[52px]">
          <p className="text-[#E6E6E6] text-[16px] font-bold">My Items</p>
          {myWalletCollect ? (
            <ScrollArea className="w-full overflow-auto ">
              <div className="flex gap-[8px] lg:mt-[8px] mt-[16px] whitespace-nowrap min-w-[800px]">
                {myWalletCollect &&
                  myWalletCollect?.map((post: any, index: any) => (
                    <Link
                      href={`reward/reward-item/${post.collectibleId}`}
                      key={post.id}
                      className="flex items-start flex-col gap-[8px]"
                    >
                      <Thumbnail img={post?.Collectiblee?.image} />
                      <p className="text-[12px]">{post.Collectiblee?.name}</p>
                    </Link>
                  ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          ) : (
            <p className="text-extrabold">No Collectibles Exist </p>
          )}
        </div>
        <div className="h-full pt-[32px] w-full ">
          <p className="lg:mb-[8px] mb-[16px] text-[#E6E6E6] text-[16px] font-bold">
            Claimable
          </p>

          <div className="flex w-full pb-[16px] gap-[10px] lg:gap-[12px]">
            <div className="flex w-full lg:w-[331px] gap-[12px]">
              <div
               className={`gradient-slate md:rounded-lg rounded-[44px] px-[12px] w-full lg:w-[331px] flex md:items-start flex-col justify-center items-center  pt-[14px] pb-[10px] md:pt-[16px] md:pb-[12px] cursor-pointer ${
                selected === "rewards"
                  ? "gradient-border-rounded text-[#00A849]"
                  : ""
              }`}
                // onClick={() => setSelected("rewards")}
                onClick={() => handleOptionChange("rewards")}
              >
                {selected === "rewards" ? (
                  <Image
                    src={ticketgreen}
                    className="pb-[8px] hidden md:block"
                    alt="Green Ticket"
                  />
                ) : (
                  <Image
                    src={ticket}
                    className="pb-[8px] hidden md:block"
                    alt="Default Ticket"
                  />
                )}
                <p>Rewards</p>
              </div>
            </div>

            <div
              className={`gradient-slate md:rounded-lg rounded-[44px] px-[12px] lg:w-[331px] flex w-full md:items-start flex-col justify-center items-center pt-[14px] pb-[10px] md:pt-[16px] md:pb-[12px] cursor-pointer ${
                selected === "rewardcollectables"
                  ? "gradient-border-rounded text-[#00A849]"
                  : ""
              }`}
              // onClick={() => setSelected("rewardcollectables")}
              onClick={() => handleOptionChange("rewardcollectables")}
            >
              {selected === "rewardcollectables" ? (
                <Image
                  src={cards}
                  className="pb-[8px] hidden md:block"
                  alt="Green Collectibles"
                />
              ) : (
                <Image
                  src={cardsgreen}
                  className="pb-[8px] hidden md:block"
                  alt="Default Collectibles"
                />
              )}
              <p>Collectibles</p>
            </div>
          </div>
          {selected === "rewards" ? (
            ClaimStatusdata?.length &&
            ClaimStatusdata?.map((reward: any, index: any) => {
              if (index % 3 === 0) {
                return (
                  <div
                    key={index}
                    className="flex items-start gap-[12px] mb-4 claim-container"
                  >
                    {ClaimStatusdata.slice(index, index + 3).map(
                      (reward: any, i: any) => (
                        <ClaimRewardCard
                          key={reward?.id}
                          heading={reward?.claimType}
                          desc={reward?.claimText}
                          icon={Calendarnew}
                          claimID={reward?.id}
                          claimed={reward?.claimed}
                          claimedamount={reward?.claimAmount}
                        
                        />
                      )
                    )}
                  </div>
                );
              }
              return null;
            })
          ) : (
            <div>
              <EventCards eventType={selected} eventitems={""} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default  Protectedroute(Rewards);
