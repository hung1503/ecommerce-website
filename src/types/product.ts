import { CategoryType } from "./category";

export interface ProductType {
  id: number;
  title: string;
  price: number;
  description: string;
  category: CategoryType;
  images: string[];
}

// export interface SubProductType {
//   id: number;
//   title: string;
//   category: string;
//   description: string;
//   image: string;
// }
