
import dynamic from 'next/dynamic';
const Rewarditem = dynamic(()=>import("@/components/Reward/RewardItem/Rewarditem"),{
  ssr:false
})

export default function page ()  {
  return <Rewarditem />;
};


