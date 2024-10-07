

import dynamic from 'next/dynamic';
const PersonalSocialProfile = dynamic(()=>import("@/components/social-profile-page/PersonalSocialProfile"),{
  ssr:false
})

export default function page ()  {
    return <PersonalSocialProfile/>
}
