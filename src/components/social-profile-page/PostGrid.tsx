import { posts } from '@/lib/dummyData';
import PostCard from './PostCard';

const PostGrid = () => {
  return (
    <div className="grid grid-cols-3 lg:grid-cols-4 gap-4">
      {posts.map((post) => (
        <PostCard key={post.id} img={post.img} title={post.title} />
      ))}
    </div>
  );
};

export default PostGrid;
