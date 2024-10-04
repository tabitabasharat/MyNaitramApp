
import dynamic from 'next/dynamic';
const CreateEventShow = dynamic(()=>import("@/components/Manageevent/EditEventonBack"),{
  ssr:false
})


export default function page ()  {
    return <CreateEventShow/>
}
