// import LiveAccntSetting from "@/components/profile-page/LiveAccntSetting";
// import ProfileSideInfo from "@/components/profile-page/ProfileSideInfo";


import dynamic from 'next/dynamic';
const Profile = dynamic(()=>import("@/components/profile-page/Prolife"),{
  ssr:false
})

export default function page ()  {
    return <Profile/>;
  };
  
