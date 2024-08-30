"use client";
// import Wallet from "@/components/Wallet/Wallet";
import dynamic from 'next/dynamic'
const Wallet = dynamic(() => import('../../components/Wallet/Wallet'))


export default function page() {

  return <Wallet />;
}
