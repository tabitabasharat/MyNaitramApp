import dynamic from "next/dynamic";
const Profile =  dynamic(() => import("@/components/NFTmarketeplace/Profile"), {
    ssr: false,
})

const page = () =>{
    return <Profile/>
}
export default page 