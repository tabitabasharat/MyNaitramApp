import { cn, shimmer, toBase64 } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

const Thumbnail = ({ img, size }: any) => {
  return (
    <Image
      src={img}
      width={500}
      height={500}
      className={cn('size-[90px] object-cover object-top rounded-lg', size)}
      placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(1200, 1800))}`}
      alt=""
    />
  );
};

export default Thumbnail;
