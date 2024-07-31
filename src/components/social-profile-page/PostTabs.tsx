import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ClockCounterClockwise,
  FolderStar,
  Image,
} from '@phosphor-icons/react/dist/ssr';
import PostGrid from './PostGrid';

const PostTabs = () => {
  return (
    <div className="mt-12 md:mt-24">
      <Tabs defaultValue="recent" className="w-full">
        <TabsList className="w-full h-full bg-transparent">
          <TabsTrigger value="recent" className="w-full">
            <ClockCounterClockwise size={25} />
          </TabsTrigger>
          <TabsTrigger value="saved" className="w-full">
            <FolderStar size={25} />
          </TabsTrigger>
          <TabsTrigger value="gallery" className="w-full">
            <Image size={25} />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="recent">
          <PostGrid />
        </TabsContent>
        <TabsContent value="saved">
          <PostGrid />
        </TabsContent>
        <TabsContent value="gallery">
          <PostGrid />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PostTabs;
