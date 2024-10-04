
import dynamic from 'next/dynamic'
const AccountSettings = dynamic(() => import('@/components/profile-page/AccountSettings'))


export default function page ()  {
  return <AccountSettings />;
};


