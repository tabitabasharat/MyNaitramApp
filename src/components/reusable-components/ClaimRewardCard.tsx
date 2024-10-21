import { Button } from "../ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import ScreenLoader from "../loader/Screenloader";
import { SuccessToast, ErrorToast } from "./Toaster/Toaster";
import { useState, useEffect } from "react";
import { claimReward, getClaimStatus } from "@/lib/middleware/reward";
import ClaimRewardModal from "../Reward/ClaimRewardModal";
import ClaimReward24hrModal from "../Reward/ClaimReward24hrPopup";

const ClaimRewardCard = ({
  heading,
  desc,
  icon,
  claimID,
  claimed,
  claimedamount,
}: any) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loader, setLoader] = useState(false);
  const [isClaimOpen, setisClaimOpen] = useState(false);
  const [isClaimHourOpen, setisClaimHourOpen] = useState(false);

  async function ClaimReward() {
    console.log("REWARD CLAIMED");
    const userID =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    console.log("my id is", userID);
    try {
      const data = {
        claimId: claimID,
        userId: userID,
        ismobile: false,
      };
      dispatch(claimReward(data)).then((res: any) => {
        if (res?.payload?.status == 201) {
          setLoader(false);
          // SuccessToast("Reward Claimed Successfully");

          dispatch(getClaimStatus(userID));
          setisClaimOpen(true);
        } else {
          setLoader(false);
          // ErrorToast(res?.payload?.message);
          // setisClaimHourOpen(true);
          // dispatch(getClaimStatus(userID));
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
          <p className="text-[15px] font-extrabold">
            {desc}
            {claimed}
          </p>
        </div>

        <Button
          // disabled={claimed}
          disabled={claimID === 1 && claimed === true}
          size="sm"
          variant="secondary"
          className={`py-[6px] font-extrabold w-fit text-[#030303] text-[14px] disabled:opacity-50 ${claimed === true ? "opacity-50" : ""}`}
          // onClick={() => {
          //   router.push("/reward/claimable-reward");
          // }}
          // onClick={() => {
          //   if (claimed === true) {
          //     setisClaimHourOpen(true);
          //   } else {
          //     ClaimReward();
          //   }

          // }}
          onClick={() => {
            if (claimID === 1 && claimed === true) {
              console.log("Registration Claimed ONCE ONLY");
            } else if (claimID === 1 && claimed === false) {
              ClaimReward();
            } else if (claimed === false) {
              ClaimReward();
            } else if (claimed === true && claimID !== 1) {
              setisClaimHourOpen(true);
            }
          }}
        >
          {/* {claimID === 1 && claimed === true
            ? "Claimed"
            : claimID === 2 && claimed === true
            ? "Claimed"
            : "Claim"} */}
            {claimed === true ? "Claimed" : "Claim"}
        </Button>
      </div>
      <div className="text-primary">
        <Image src={icon} alt="icon" />
      </div>
      {isClaimOpen && (
        <ClaimRewardModal
          onClose={() => setisClaimOpen(false)}
          open={() => setisClaimOpen(true)}
          MRTamount={claimedamount}
          Name={heading}
        />
      )}
      {isClaimHourOpen && (
        <ClaimReward24hrModal
          onClose={() => setisClaimHourOpen(false)}
          open={() => setisClaimHourOpen(true)}
        />
      )}
    </div>
  );
};

export default ClaimRewardCard;
