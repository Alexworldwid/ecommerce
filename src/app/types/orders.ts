export type Order = {
    id: string;
    user_id: string;
    product_id: string;
    address_id: string;
    quantity: number;
    color: string;
    size: string;
    status: 'pending' | 'completed' | 'cancelled';
    products?: {
        id: string;
        name: string;
        price: number;
        image: string;
    };
    ordered_on: string;
};