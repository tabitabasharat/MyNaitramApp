
import dynamic from 'next/dynamic';
const ClaimableRewards = dynamic(()=>import("@/components/Reward/ClaimableRewards/ClaimableRewards"),{
  ssr:false
})

export default function page ()  {
  return <ClaimableRewards />;
};


