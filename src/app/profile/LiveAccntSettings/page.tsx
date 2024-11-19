
import dynamic from 'next/dynamic';
const LiveAccntSetting = dynamic(()=>import("@/components/profile-page/LiveAccntSetting"),{
  ssr:false
})

export default function page ()  {
    return <LiveAccntSetting/>;
  };
  
