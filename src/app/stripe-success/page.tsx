
import dynamic from 'next/dynamic';
const StripeSuccess = dynamic(()=>import("@/components/StripeSuccess/StripeSuccess"),{
  ssr:false
})
const page =() =>{
    return(
        <StripeSuccess/>
    )
}
export default page