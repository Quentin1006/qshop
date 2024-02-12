import { cn } from '@/lib/utils';
import { CheckCircle2 } from 'lucide-react';

type NotificationProps = {
  children?: React.ReactNode;
  content?: React.ReactNode;
  className?: string;
};

export default function Notification({ children, content, className }: NotificationProps) {
  return (
    <div className={cn('flex rounded-md border-2 border-l-[10px] border-green-700 bg-slate-100 p-4', className)}>
      <div className="flex w-[50px] items-center justify-center ">
        <CheckCircle2 size={24} className="text-green-700" />
      </div>
      <div className="flex-1 text-lg font-bold">{children ?? content}</div>
    </div>
  );
}
