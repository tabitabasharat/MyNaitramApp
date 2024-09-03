import { posts } from '@/lib/dummyData';
import PostCard from './PostCard';

const PostGrid = ({ event }: any) => {
  return (
    <div className="grid grid-cols-3 lg:grid-cols-4 gap-[12px]">
      {event?.length > 0 ? (
        event?.map((post: any) => (
          <PostCard key={post.id} img={post?.Collectiblee?.image} title={post?.Collectiblee?.name} />
        ))
      ) : (
        <p>No Data Found</p>
      )}
    </div>
  );
};

export default PostGrid;
