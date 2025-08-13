import type { Products } from "@/app/types/product";

interface SortProductsProps {
    products: Products[];
    sortType: string;
}

const SortProducts = ({products, sortType}: SortProductsProps) => {
    switch (sortType) {
        case "highest-rated": 
            return [...products].sort((a, b) => {
                const aRating = a.reviews?.reduce((acc, review) => acc + review.rating, 0) || 0;
                const bRating = b.reviews?.reduce((acc, review) => acc + review.rating, 0) || 0;
                return bRating - aRating;
            });
        case "lowest-rated":
            return [...products].sort((a, b) => {
                const aRating = a.reviews?.reduce((acc, review) => acc + review.rating, 0) || 0;
                const bRating = b.reviews?.reduce((acc, review) => acc + review.rating, 0) || 0;
                return aRating - bRating;
            });
        case "lowest-price":
            return [...products].sort((a, b) => a.price - b.price);
        case "highest-price":
            return [...products].sort((a, b) => b.price - a.price);
        default: 
            return products;
    }
};

export default SortProducts;