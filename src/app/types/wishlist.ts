export type WishlistItem = {
  id: string;
  user_id: string;
  product_id: string;
  products?: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
  created_at: string;
  size: string;
  color: string;
}