import dynamic from 'next/dynamic';
const Friends = dynamic(()=>import("@/components/gallery/friends/Friends"),{
  ssr:false
})

export default function page ()  {
  return <Friends />;
};
