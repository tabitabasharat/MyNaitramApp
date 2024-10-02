
import ProfilePreview from "@/components/ProfilePreview/ProfilePreview"

import dynamic from 'next/dynamic';
const PersonalSocialProfile = dynamic(()=>import("@/components/ProfilePreview/PersonalProfilePreview"),{
  ssr:false
})

export default function page ()  {
    return <PersonalSocialProfile/>
}
