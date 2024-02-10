import { cn } from '@/lib/utils';

export type TitleProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Title({ children, className }: TitleProps) {
  return <h1 className={cn('py-2 text-3xl', className)}>{children}</h1>;
}
