"use client";
import SalesChart from "@/components/profile-page/SalesChart";
import React from "react";
import { useAppSelector } from "@/lib/hooks";
const SalesGraph = () => {
  
 
  return (
    <div>
      <div className="h-[360px] gradient-slate border rounded-lg border-muted">
     
        <SalesChart />
      </div>
    </div>
  );
};
export default SalesGraph;
