import { shimmer, toBase64 } from '@/lib/utils';
import Image from 'next/image';

const PostCard = ({ img, title }: any) => {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <Image
          src={img}
          width={800}
          height={800}
          placeholder={`data:image/svg+xml;base64,${toBase64(
            shimmer(1200, 1800),
          )}`}
          className="rounded-lg object-cover object-center"
          alt=""
        />
      </div>
      <p className="text-sm lg:text-base">{title}</p>
    </div>
  );
};

export default PostCard;
