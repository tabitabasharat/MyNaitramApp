import { posts } from "@/lib/dummyData";
import Cards from "./Cards";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Pagination from "../reusable-components/pagination/Pagination";
import { getOrganizerLiveSocialProfile } from "@/lib/middleware/organizer";
import rocket from "@/assets/Wallet/rocket-empty.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Grid = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  // const myProfile = useAppSelector(
  //   (state) => state?.getOrgSocialProfile?.mySocialData?.data
  // );

  const myProfile = useAppSelector(
    (state) => state?.getOrgLiveSocialProfile?.mySocialData?.data
  );
  console.log("my Social Profile infooo is", myProfile);

  const currentDate = new Date(); // Get the current date

  const handlePageChange = (page: number) => {
    const data = {
      page: page,
    };

    dispatch(getOrganizerLiveSocialProfile(data));
  };
  return (
    <>
      <h2 className="font-bold text-sm lg:text-[32px] lg:mb-[24px] mb-[16px] mt-[32px] lg:mt-[80px]">
        Upcoming Events
      </h2>
      {myProfile?.data?.events?.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-[12px] lg:gap-[20px]">
            {myProfile?.data?.events &&
              myProfile?.data?.events.map((post: any) => (
                <Cards
                  eventId={post?.id}
                  key={post.id}
                  img={post?.coverEventImage}
                  title={post.name}
                />
              ))}
          </div>
          <div className="container p-0 mt-[30px]">
            <Pagination
              currentPage={myProfile?.data?.pagination?.currentPage}
              totalPages={myProfile?.data?.pagination?.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      ) : (
        <div className="relative gradient-slate py-[94.5px] border border-[#292929] flex items-center justify-center flex-col gap-[12px] rounded-[12px] w-full">
          <p className="text-base font-extrabold">There’s No upcoming Event</p>
          <Link href="/viewallevents">
          <button
            className="text-[16px]  font-extrabold bg-[#00D059] text-[#030303] flex items-center h-auto justify-center gap-[6px] py-[10px] ps-[10px] pr-[16px] rounded-[100px] w-auto "
            // onClick={() =>
            //   router.push(
            //     "/organizer-event/payout-detail/cryptowallet/addCryptowallet"
            //   )
            // }
          >
            <Image src={rocket} alt="add-icon" />
            See What's On
          </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Grid;
