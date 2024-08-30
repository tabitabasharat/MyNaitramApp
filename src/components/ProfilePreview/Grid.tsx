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
      <h2 className="font-extrabold text-sm lg:text-[32px] lg:mb-[24px] mb-[16px] mt-[32px] lg:mt-[80px]">
        Upcoming Events
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[12px] lg:gap-[20px]">
        {myProfile?.data?.userEvents.map((post: any) => (
          <Cards key={post.id} img={post?.coverEventImage} title={post.name} />
        ))}
      </div>
    </>
  );
};

export default Grid;
