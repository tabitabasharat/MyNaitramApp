"use client"
import dynamic from 'next/dynamic'
const YourRewards = dynamic(() => import('../../../components/profile-page/YourRewards'))
// import YourRewards from '@/components/profile-page/YourRewards';


export default function page ()  {
  return <YourRewards />;
};


