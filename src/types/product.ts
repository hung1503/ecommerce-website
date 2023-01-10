import { CategoryType } from "./category";

export interface ProductType {
  id: number;
  title: string;
  price: number;
  description: string;
  category: CategoryType;
  images: string[];
}

export interface CreateProduct {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}

export interface UpdateProduct {
  id: number;
  update: Partial<ProductType>;
}

export interface CreateProductWithForm {
  images: FileList;
  product: CreateProduct;
}

export interface EditProductType {
  togglePopUp: () => void;
  product: ProductType;
}
