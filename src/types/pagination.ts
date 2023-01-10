export interface PaginationType {
  totalProducts: number;
  productsPerPage: number;
  setCurrentPage: (page: number) => void;
  currentPage: number;
}
