import { Button } from "../ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import ScreenLoader from "../loader/Screenloader";
import { SuccessToast, ErrorToast } from "./Toaster/Toaster";
import { useState, useEffect } from "react";
import { claimReward } from "@/lib/middleware/reward";



const ClaimRewardCard = ({ heading, desc, icon, claimID }: any) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loader, setLoader] = useState(false);


  async function ClaimReward() {
    console.log("REWARD CLAIMED");
    const userID = localStorage.getItem("_id");
    console.log("my id is", userID);
    try {
      const data = {
        claimId: claimID,
        userId: userID,
      };
      dispatch(claimReward(data)).then((res: any) => {
        if (res?.payload?.status === 201) {
          setLoader(false);
          SuccessToast("Reward Claimed Successfully");
          
        } else {
          setLoader(false);
          ErrorToast(res?.payload?.message);
        }
      });
    } catch (error) {
      console.error("Error:", error);
      ErrorToast(error);
    }
  }
  return (
    <div className="gradient-slate border border-muted flex gap-4 justify-between rounded-lg p-4 w-full">
      <div className="flex flex-col gap-[8px]">
        <div className="flex flex-col gap-[6px]">
          <p className="uppercase text-[#00D059] text-[12px] font-normal">
            {heading}
          </p>
          <p className="text-[15px] font-extrabold">{desc}</p>
        </div>

        <Button
          size="sm"
          variant="secondary"
          className="py-[6px] w-fit text-[#030303] text-[14px]"
          // onClick={() => {
          //   router.push("/reward/claimable-reward");
          // }}
          onClick ={() => ClaimReward()}
        >
          Claim
        </Button>
      </div>
      <div className="text-primary">
        <Image src={icon} alt="icon" />
      </div>
    </div>
  );
};

export default ClaimRewardCard;
