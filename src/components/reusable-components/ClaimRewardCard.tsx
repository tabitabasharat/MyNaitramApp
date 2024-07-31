import { Button } from '../ui/button';

const ClaimRewardCard = ({ heading, desc, icon }: any) => {
  return (
    <div className="gradient-slate border border-muted flex gap-2 justify-between rounded-lg p-4">
      <div className="flex flex-col gap-1">
        <p className="uppercase text-primary text-[13px]">{heading}</p>
        <p className="w-[80%]">{desc}</p>
        <Button size="sm" variant="secondary" className="h-7 w-fit">
          Claim
        </Button>
      </div>
      <div className="text-primary">{icon}</div>
    </div>
  );
};

export default ClaimRewardCard;
