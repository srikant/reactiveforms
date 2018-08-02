/* Defines the product entity */
export interface IProduct {
  id: number;
  productName: string;
  productCode: string;
  releaseDate: string;
  description: string;
  price: number;
  starRating: number;
  imageUrl: string;
  category: string;
  tags?: string[];
}
