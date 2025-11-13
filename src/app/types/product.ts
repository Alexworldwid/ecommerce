export type Products = {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  category?: string[];
  in_stock?: boolean;
  details: {
    detailsHead: string;
    detailsBody1: string;
    detailsBody2?: string;
    features: string[];
  };
  reviews?: {
    reviewId: string;
    reviewerName: string;
    rating: number;
    comment: string;
    date: string;
  }[];
  colors: {
    colorName: string;
    colorValue: string;
  }[];
  sizes: {
    sizeName: string;
    sizeValue: string;
  }[];
  tags?: string[];
}