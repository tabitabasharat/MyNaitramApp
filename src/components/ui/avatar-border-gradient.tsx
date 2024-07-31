import React from 'react';
import { cn } from '@/lib/utils';

const AvatarGradientBorder = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('p-px border-avatar overflow-hidden w-full', className)}>
      {children}
    </div>
  );
};

export default AvatarGradientBorder;
