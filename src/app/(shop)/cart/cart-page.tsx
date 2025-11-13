"use client";

import OrderSummary from '@/app/component/ui/orderSummary';
import PageIndicator from '@/app/component/ui/pageIndicator';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { AppDispatch, RootState } from '@/store/store';
import { removeFromCart, increaseAmount, decreaseAmount, fetchCart, loadLocalCart, syncCartOnLogin } from '@/store/cartslice';
import { createClient } from '@/utils/supabase/client';
import { getCachedData } from '@/utils/localCache';
import type { CartItem } from '@/app/types/cart';



const CartPage = () => {
    const cart = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch<AppDispatch>();


    const handleRemoveFromCart = (product_id: string, size: string, color: string, user_id: string) => {
        dispatch(removeFromCart({product_id, size, color, user_id}));
    }

    const handleIncreaseAmount = (product_id: string, size: string, color: string, user_id: string) => {
        dispatch(increaseAmount({product_id, size, color, user_id}));
    }

    const handleDecreaseAmount = (product_id: string, size: string, color: string, user_id: string) => {
        dispatch(decreaseAmount({product_id, size, color, user_id}));
    }


    useEffect(() => {
        const supabase = createClient();

        const fetchUserCart = async () => {
            const { data: { user } } = await supabase.auth.getUser();

            dispatch(loadLocalCart());

            if (user) {
                const localCart: CartItem[] = getCachedData("cartItems") || [];

                if (localCart.length > 0) {
                    // Wait for sync to finish
                    await dispatch(syncCartOnLogin({ userId: user.id, localItems: localCart }));
                }

                // Then load the merged cart
                await dispatch(fetchCart(user.id));
            }
        };

        fetchUserCart();
    }, [dispatch]);


    


    return (
        <section className='pt-[130px] w-full flex flex-col items-center'>
            <article className='bg-neutral-100 py-8 w-full flex flex-col items-center'>
                <div className='w-full max-w-[1113px] px-3'>
                    <h2 className='justify-start text-gray-900 text-2xl font-bold font-inter'>Cart</h2>
                    <PageIndicator pageTitle='Cart' />
                </div>
            </article>

            <article className='flex w-full max-w-[1113px] px-3 py-12 gap-10 md:flex-row flex-col'>
                <div className='w-full flex flex-col gap-4'>
                    <p className='justify-start text-gray-900 text-base font-semibold font-inter'>Your Cart</p>
                    <div className='h-[1px] w-full bg-neutral-100'></div>
                    {
                        cart.length === 0 ? (
                            <>
                                <div className='relative w-full h-[350px]'>
                                    <Image src="/images/HandsCart.png" alt='hands cart' className='object-center object-contain' fill />
                                </div>
                                <p className='text-gray-900 text-base font-semibold font-inter text-center'>Your cart is empty</p>
                            </>
                        ) : (
                            <div className='flex flex-col gap-4 w-full'>
                                {
                                    cart.map((c) => (
                                        <div key={`${c.id}-${c.color}-${c.product_id}-${c.size}`} className='flex items-center justify-between'>
                                            <div className='flex items-center gap-4'>
                                                <div className='relative w-20 h-20 bg-neutral-100 flex items-center justify-center rounded-md'>
                                                    <Image src={(c.products?.image || "")} alt={(c.products?.id || "products card")} fill />
                                                </div>
                                                <div className='flex flex-col gap-1'>
                                                    <p className='justify-start text-gray-900 text-sm font-medium font-inter leading-normal'>{c.products?.name}</p>
                                                    <span className='flex items-center gap-2'>Color: <div className={`bg-${c.color} w-4 h-4 rounded-full border border-1 border-neutral-100`} style={{backgroundColor: c.color }}></div> - Size: {c.size}</span>
                                                </div>
                                            </div>
                                            
                                            <div className='flex items-center gap-4 flex-col md:flex-row'>
                                                <div>
                                                    <p>${c.products?.price}</p>
                                                </div>
                                                <div className='w-full lg:min-w-[100px] lg:max-w-[100px] flex lg:flex-row '>
                                                    <div className='w-full px-2 py-2 rounded outline outline-1 outline-offset-[-1px] outline-gray-200 inline-flex justify-between flex-row-reverse items-center gap-4 overflow-hidden'>
                                                        <button className='justify-start text-gray-800 text-sm font-medium font-inter leading-normal' onClick={() => handleIncreaseAmount(c.product_id, c.size, c.color, c.user_id)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#3c3c39" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path></svg>
                                                        </button>
                                                        <p className='justify-start text-gray-800 text-sm font-medium font-inter leading-normal'>{c.amount}</p>
                                                        <button className='justify-start text-gray-800 text-sm font-medium font-inter leading-normal' onClick={() => handleDecreaseAmount(c.product_id, c.size, c.color, c.user_id)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#3c3c39" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128Z"></path></svg>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div onClick={() => handleRemoveFromCart(c.product_id, c.size, c.color, c.user_id)} className='cursor-pointer bg-neutral-100 hover:bg-neutral-200 transition-all duration-150 ease-in-out p-2 rounded-md'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#000000" viewBox="0 0 256 256"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        )
                    }
                </div>

                {
                    cart.length > 0 && <OrderSummary cart={cart} />
                }
                
            </article>
                {
                    cart.length === 0 &&
                        <div className='pb-8'>
                            <Link href="/" className='w-fit bg-black font-inter text-white rounded-md px-4 py-3 transition-all duration-150 ease-in hover:bg-black/90'>Continue Shopping</Link>
                        </div>
                }
        </section>
    );
};

export default CartPage;