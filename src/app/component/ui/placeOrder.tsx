"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from "react-redux";
import { RootState } from '@/store/store';


interface PlaceOrderProps {
    submit?: () => void;
    Loading?: boolean;
}



const PlaceOrder = ({submit, Loading}: PlaceOrderProps) => {
    const cart = useSelector((state: RootState) => state.cart.items);
    const displayedItems = cart.slice(0, 3); // Display only the first 3 items

    const subtotal = cart.reduce((acc, item) => acc + (item.products?.price ?? 0) * (item.amount ?? 0), 0);
    const roundedSubtotal = Math.round(subtotal * 100) / 100; // Round to two decimal places
    const tax = subtotal * 0.1;
    const roundedTax = Math.round(tax * 100) / 100; // Round to two decimal places
    const total = subtotal + tax;
    const roundedTotal = Math.round(total * 100) / 100; // Round to two decimal places

    return (
        <div className='w-full md:max-w-[40%] lg:max-w-[380px] flex flex-col gap-8 pt-4'>
            <div>
                <h2 className='text-gray-900 text-base font-semibold font-inter'>Your Order</h2>
            </div>
            <div className='flex items-center justify-between w-full'>
                <div className='flex gap-2 items-center'>
                    {
                        displayedItems.map((item) => (
                            <div key={`${item.id}-${item.size}-${item.color}`} className='px-2.5 flex justify-between items-center relative w-10 h-10 bg-neutral-100 rounded-[100px]'>
                               <div className='relative w-8 h-8'>
                                 {item.products?.image ? (
                                   <Image src={item.products.image} alt={item.products?.name ?? 'Product image'} fill className='object-contain' />
                                 ) : (
                                   <div className='w-full h-full bg-gray-200 rounded' />
                                 )}
                               </div>
                            </div>
                        ))
                    }
                </div>
                <Link href="/cart" className='w-fit py-2 px-4 text-gray-600 text-sm font-medium font-inter rounded-md outline outline-1 outline-gray-600 transition-all duration-150 ease-in hover:bg-gray-600 hover:text-white'>Edit Cart</Link>
            </div>
            <div className='flex flex-col gap-4 w-full py-4 h-fit'>
                <div className='inline-flex justify-between items-center w-full'>
                    <p className='text-gray-600 text-sm font-medium font-inter leading-normal'>Subtotal:</p>
                    <p className='justify-start text-gray-900 text-sm font-medium font-inter leading-normal'>$ {roundedSubtotal}</p>
                </div>
                
                <div className='inline-flex justify-between items-center w-full'>
                    <p className='text-gray-600 text-sm font-medium font-inter leading-normal'>Shipping:</p>
                    <p className='justify-start text-gray-900 text-sm font-medium font-inter leading-normal'>Free</p>
                </div>

                <div className='inline-flex justify-between items-center w-full'>
                    <p className='text-gray-600 text-sm font-medium font-inter leading-normal'>Tax:</p>
                    <p className='justify-start text-gray-900 text-sm font-medium font-inter leading-normal'>$ {roundedTax}</p>
                </div>

                <div className='w-full h-[1px] bg-gray-200 my-4'></div>

                <div className='inline-flex justify-between items-center w-full'>
                    <p className='justify-start text-gray-900 text-sm font-medium font-inter leading-normal'>Total:</p>
                    <p className='justify-start text-gray-900 text-sm font-medium font-inter leading-normal'>$ {roundedTotal}</p>
                </div> 

                <button
                    type="button"
                    onClick={submit} 
                    className="px-6 py-3 bg-gray-900 rounded transition-all duration-150 ease-in text-white text-sm font-medium font-inter hover:bg-gray-800 w-full"
                    disabled={Loading}
                    >
                    {
                        Loading ? 'Placing Order...' : 'Place Order'
                    }
                </button>
            </div>
        </div>
    );
};

export default PlaceOrder;