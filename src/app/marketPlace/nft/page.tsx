import dynamic from "next/dynamic";
const NftDetails = dynamic(() => import("@/components/NFTmarketeplace/nftDetails"), {
  ssr: false,
});

export default function page() {
  return <NftDetails />;
}
