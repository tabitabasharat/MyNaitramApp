import dynamic from "next/dynamic";
const MpHome = dynamic(() => import("@/components/NFTmarketeplace/MpHome"), {
  ssr: false,
});

export default function page() {
  return <MpHome />;
}
