import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

export type SelectQuantityProps = {
  initialQty: number;
  prefix?: string;
  disabled?: boolean;
  onQtyChange?: (qty: number) => void;
  className?: string;
};

const SelectQuantity = ({ initialQty, prefix, disabled, className, onQtyChange }: SelectQuantityProps) => {
  const [quantity, setQuantity] = useState(String(initialQty) ?? '1');
  const handleQuantityChange = (value: string) => {
    console.log({ value });
    setQuantity(value);
    onQtyChange?.(Number(value));
  };

  return (
    <Select onValueChange={handleQuantityChange} defaultValue={quantity}>
      <SelectTrigger disabled={disabled} className={cn('mt-2 h-fit rounded-md py-1 shadow-md', className)}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Array.from({ length: 20 })
          .map((val, idx) => idx + 1)
          .map((val) => (
            <SelectItem key={val} value={`${val}`} className="truncate">
              {`${prefix ?? 'Quantité'} : ${val}`}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default SelectQuantity;
