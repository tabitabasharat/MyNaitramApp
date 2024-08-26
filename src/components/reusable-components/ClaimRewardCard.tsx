import { Button } from "../ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ClaimRewardCard = ({ heading, desc, icon }: any) => {
  const router = useRouter();
  return (
    <div className="gradient-slate border border-muted flex gap-4 justify-between rounded-lg p-4 w-full">
      <div className="flex flex-col gap-[8px]">
        <div className="flex flex-col gap-[6px]">
          <p className="uppercase text-[#00D059] text-[12px] font-normal">
            {heading}
          </p>
          <p className="text-[15px] font-extrabold">{desc}</p>
        </div>

        <Button size="sm" variant="secondary" className="py-[6px] w-fit text-[#030303] text-[14px]" onClick={()=>{router.push("/reward/claimable-reward")}}>
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
