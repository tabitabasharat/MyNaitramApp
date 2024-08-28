import { posts } from "@/lib/dummyData";
import Cards from "./Cards";

const Grid = () => {
  return (
    <>
      <h2 className="font-extrabold text-sm lg:text-[32px] lg:mb-[24px] mb-[16px] mt-[32px] lg:mt-[80px]">Upcoming Events</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[12px] lg:gap-[20px]">
        {posts.map((post) => (
          <Cards key={post.id} img={post.img} title={post.title} />
        ))}
      </div>
    </>
  );
};

export default Grid;
