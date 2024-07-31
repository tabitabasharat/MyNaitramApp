'use client';

import { cn } from '@/lib/utils';
import { CaretRight } from '@phosphor-icons/react/dist/ssr';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const AccountSidebarLink = ({ leftElement, title, url, setPopupOpen }: any) => {
  const pathname = usePathname();
  return (
    <Link
      href={url}
      onClick={() => {
        if (setPopupOpen) {
          setPopupOpen(false);
        }
      }}
      className={cn(
        'gradient-slate border border-muted w-full flex justify-between rounded-lg items-center px-4 py-3 hover:border-[#13FF7A] duration-300',
        { 'border-[#13FF7A]': pathname.startsWith(url) },
      )}
    >
      <div className="flex gap-2">
        {leftElement} {title}
      </div>
      <CaretRight size={15} weight="bold" />
    </Link>
  );
};

export default AccountSidebarLink;
