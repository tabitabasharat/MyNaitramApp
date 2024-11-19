// import ScannerCredentials from "@/components/EventOrganizer/ScannerCredentials/ScannerCredentials"
import dynamic from 'next/dynamic';
const ScannerCredentials = dynamic(()=>import("@/components/EventOrganizer/ScannerCredentials/ScannerCredentials"),{
    ssr:false
  })
const page = () =>{
    return <ScannerCredentials/>
}
export default page