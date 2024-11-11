import dynamic from "next/dynamic";
const Deletevent = dynamic(() => import("@/components/Manageevent/Deleteevent"), {
  ssr: false,
});

export default function page() {
  return <Deletevent />;
}
