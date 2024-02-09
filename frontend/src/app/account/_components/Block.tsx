import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export type BlockProps = {
  icon: string;
  title: string;
  content: string;
  link: string;
};

const Block: React.FC<BlockProps> = ({ icon, title, content, link }) => {
  return (
    <Link href={link} className="rounded-lg border border-slate-300 p-2 hover:bg-slate-100">
      <div className="flex gap-4">
        <div className="flex flex-shrink-0 items-center justify-center ">
          <Image src={icon} alt={title} width={60} height={60} />
        </div>
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm">{content}</p>
        </div>
      </div>
    </Link>
  );
};

export default Block;
