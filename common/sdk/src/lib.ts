import Prisma from "../../../backend/node_modules/@prisma/client";

export type Category = {
  id: number;
  name: string;
};

export type ShippingAddress = {
  id: number;
  zipCode: number;
  city: string;
  street: string;
  country: string;
  number: string;
};

export type User = {
  id: string;
  firstname: string;
  lastname: string;
};

export type Rate = {
  votes: number;
  value: number;
};

export type Tag = {
  name: string;
};

export type Price = {
  current: number;
  raw: number;
  discount: number;
  discountType: "percentage" | "raw";
};

export type Product = {
  id: number;
  price: Price;
  dateAdded: Date;
  link: string;
  description: string;
  name: string;
  rate: Rate;
  tags: Tag[];
};

export type Store = {
  name: string;
  id: number;
};

export type ReturnPolicy = {
  fees: number;
  delayPeriodInDays: number;
  details: string;
  type: Prisma.ReturnPolicyType;
};

export type ProductDetails = Product & {
  inStock: number;
  longDescription: string;
  caracteristics: string[];
  technicalDescription: Record<string, string>;
  brand: string;
  store: Store;
  returnPolicy: ReturnPolicy;
};

export type BasketItem = {
  quantity: number;
  product: Pick<Product, "id" | "name" | "price">;
};

export type Basket = {
  refId: string;
  items: BasketItem[];
};

export type PageInfo = {
  idxStart: number;
  idxEnd: number;
  hasNext: boolean;
};

export type OffsetResponse<T> = {
  data: T[];
  total: number;
  pageInfo: PageInfo;
};

export function name() {
  return process.env.PKG_NAME;
}
