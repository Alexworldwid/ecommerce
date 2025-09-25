import Link from 'next/link';
import React from 'react';
import type { CartItem } from '../../types/cart';

interface OrderSummaryProps {
    cart: CartItem[];
}

const OrderSummary = ({cart}: OrderSummaryProps) => {
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.amount, 0);
    const roundedSubtotal = Math.round(subtotal * 100) / 100; // Round to two decimal places
    const tax = subtotal * 0.1;
    const roundedTax = Math.round(tax * 100) / 100; // Round to two decimal places
    const total = subtotal + tax;
    const roundedTotal = Math.round(total * 100) / 100; // Round to two decimal places


    return (
        <div className='w-full md:max-w-[340px] outline outline-1 outline-gray-200 rounded p-4 flex flex-col gap-6 h-fit'>
            <div>
                <h2 className='justify-start text-gray-900 text-base font-semibold font-Inter'>Order Summary</h2>
            </div>
            <div className='flex flex-col gap-4'>
                <div className='flex justify-between'>
                    <p className='justify-start text-gray-600 text-sm font-medium font-inter leading-normal'>Subtotal</p>
                    <p className='justify-start text-gray-900 text-sm font-medium font-inter leading-normal'>${roundedSubtotal}</p>
                </div>
                <div className='flex justify-between'>
                    <p className='justify-start text-gray-600 text-sm font-medium font-inter leading-normal'>Shipping</p>
                    <p className='justify-start text-gray-900 text-sm font-medium font-inter leading-normal'>Free</p>
                </div>
                <div className='flex justify-between'>
                    <p className='justify-start text-gray-600 text-sm font-medium font-inter leading-normal'>Tax</p>
                    <p className='justify-start text-gray-900 text-sm font-medium font-inter leading-normal'>${roundedTax}</p>
                </div>
                <div  className="md:w-72 h-px relative bg-gray-200"></div>
                <div className='flex justify-between'>
                    <p className='justify-start text-gray-600 text-sm font-medium font-inter leading-normal'>Total</p>
                    <p className='justify-start text-gray-900 text-sm font-medium font-inter leading-normal'>${roundedTotal}</p>
                </div>
                <div className='w-full flex justify-center'>
                    <Link href="/checkout" className='bg-black px-4 py-2 rounded w-full transition-all duration-150 ease-in hover:bg-black/90 ustify-start text-white text-sm font-medium font-inter leading-normal text-center'>Checkout</Link>
                </div>
                <div className='w-full flex justify-center'>
                    <Link className='underline' href="/">Continue Shopping</Link>
                </div>
            </div>
            
        </div>
    );
};

export default OrderSummary;