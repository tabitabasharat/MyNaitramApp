
import dynamic from 'next/dynamic';
const Bankaccount = dynamic(()=>import("@/components/EventOrganizer/payoutdetail/BankAccount"),{
  ssr:false
})
const page =() =>{
    return(
        <Bankaccount/>
    )
}
export default page