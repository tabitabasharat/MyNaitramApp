import { shimmer, toBase64 } from '@/lib/utils';
import Image from 'next/image';

const PostCard = ({ img, title }: any) => {
  return (
    <div className="flex flex-col gap-2">
      <div className='w-full h-full'>
        <Image
          src={img}
          width={107}
          height={107}
          placeholder={`data:image/svg+xml;base64,${toBase64(
            shimmer(1200, 1800),
          )}`}
          className="rounded-lg xl:w-full xl:h-[300px] sm:w-[243px] sm:h-[215px] object-cover object-center w-[107px] h-[107px]"
          alt="img"
        />
      </div>
      <p className="text-[12px] font-normal sm:font-bold lg:text-base truncate overflow-hidden whitespace-nowrap">{title}</p>

    </div>
  );
};

export default PostCard;
