import dynamic from "next/dynamic";
const StopSales = dynamic(() => import("@/components/Manageevent/stopsales"), {
  ssr: false,
});

export default function page() {
  return <StopSales />;
}
