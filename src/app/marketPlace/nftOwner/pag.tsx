import dynamic from "next/dynamic";
const NftOwner = dynamic(() => import("@/components/NFTmarketeplace/nftOwner"), {
  ssr: false,
});

export default function page() {
  return <NftOwner />;
}
