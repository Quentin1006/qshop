export type PriceProps = {
  value: number;
  symbol?: string;
};

export default function Price({ value, symbol }: PriceProps) {
  let priceStr;
  try {
    priceStr = value.toFixed(2);
  } catch (err) {
    throw new Error('price is not a number');
  }
  let [big, decimals] = priceStr.split(/[.,]/);
  if (!decimals) {
    decimals = '00';
  }
  if (parseInt(decimals) > 0 && parseInt(decimals) <= 9) {
    decimals = '0' + decimals;
  }

  if (!symbol) {
    symbol = '€';
  }
  return (
    <div className="flex items-start py-2">
      <div className="text-3xl">{big}</div>
      <div className="py-1 text-sm">{decimals}</div>
      <div className=" px-0.5 py-1 text-sm">{symbol}</div>
    </div>
  );
}
