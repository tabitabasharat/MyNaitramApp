import dynamic from "next/dynamic";
const VenueVerification = dynamic(() => import("@/components/VenueVerification/VenueVerification"), {
  ssr: false,
});

const page = () => {
  return <VenueVerification />;
};
export default page;
