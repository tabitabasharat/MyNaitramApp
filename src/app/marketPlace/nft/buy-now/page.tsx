import dynamic from "next/dynamic";
const BuyNow =  dynamic(() => import("@/components/NFTmarketeplace/BuyNow"), {
    ssr: false,
});

const page =() =>{
    return <BuyNow/>
}
export default page;
