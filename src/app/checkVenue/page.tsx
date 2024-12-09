import dynamic from "next/dynamic";

const AllVenueTickets = dynamic(() => import("@/components/VenueVerification/alltickets"), {
  ssr: false,
});

const page = () => {
  return <AllVenueTickets />;
};
export default page;
