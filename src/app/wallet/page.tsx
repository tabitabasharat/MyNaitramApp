"use client";
// import Wallet from "@/components/Wallet/Wallet";

import Wallet from "../../components/Wallet/Wallet";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default function page() {
  return <Wallet />;
}
