

import dynamic from 'next/dynamic';
const Transition = dynamic(()=>import("@/components/animations/Transition"),{
  ssr:false
})

export default function Template({ children }: { children: React.ReactNode }) {
  return <Transition>{children}</Transition>;
}
