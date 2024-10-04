import { posts } from "@/lib/dummyData";
import Cards from "./Cards";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
const Grid = () => {
  const myProfile = useAppSelector(
    (state) => state?.getOrgSocialProfile?.mySocialData?.data
  );

  console.log("my Social Profile infooo is", myProfile);
  return (
    <>
      <h2 className="font-bold text-sm lg:text-[32px] lg:mb-[24px] mb-[16px] mt-[32px] lg:mt-[80px]">
        Upcoming Events
      </h2>
      {myProfile?.data?.events ? (
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
      ) : (
        <p>No Event Exist</p>
      )}
    </>
  );
};

export default Grid;
