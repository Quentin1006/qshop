export type StockDisplayProps = {
  sku: number;
};

export default function StockDisplay({ sku }: StockDisplayProps) {
  return sku > 0 ? (
    <p className="py-2 text-sm text-green-700">En stock</p>
  ) : (
    <p className="py-2 text-sm text-red-700">En rupture de stock</p>
  );
}
