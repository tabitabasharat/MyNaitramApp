import Dashboard from "@/components/profile-page/Dashboard"
import React from "react"

const Walletbalancetable =()=>{
    return (
        <div>
            <h2 className=" text-base font-bold mb-[4px] md:mb-[8px]">Your Balance</h2>
            <div className="h-[360px] gradient-slate border rounded-lg border-muted">
            <Dashboard />
          </div>
        </div>
    )
}
export default Walletbalancetable