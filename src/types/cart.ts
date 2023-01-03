import { ProductType } from "./product";

export interface CartType {
  product: ProductType;
  quantity: number;
  totalPrice: number;
}
