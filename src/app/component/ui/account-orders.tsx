"use client";

import { createClient } from '@/utils/supabase/client';
import React, { useEffect, useState } from 'react';
import type {Order} from "../../types/orders.ts"
import Image from 'next/image.js';
import Link from 'next/link.js';




const AccountOrders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const supabase = createClient();

        const fetchOrders = async () => {
            const {data: 
                {user}
            } = await supabase.auth.getUser();


             if (!user) {
                setLoading(false);
                return;
            }

            const { data, error } = await supabase
                .from('orders')
                .select('*, products(id, name, price, image)')
                .eq('user_id', user.id)
                .order('ordered_on', { ascending: false });

            if (error) {
                console.error('Error fetching orders:', error);
            } else {
                setOrders(data || []);
            }

            setLoading(false);
        }

        fetchOrders();

    }, [])


    if (loading) {
        return <div className='py-8'>Loading orders...</div>;
    }


    return (
        <div className='divide-y divide-y-gray-200 w-full max-w-[620px] flex flex-col py-8'>
           {
            orders.length === 0 ? (
                <div className='py-8'>No orders found.</div>
            ) : (
                orders.map((order) => (
                    <div className='flex gap-8 py-4 items-center justify-between flex-col md:flex-row' key={order.id}>
                        <div className='flex items-center gap-8 w-full'>
                            <div className='relative bg-neutral-100 rounded-md'>
                                <Image src={order.products?.image ?? ""} alt={order.products?.name ?? ""} width={80} height={80} />
                            </div>
                            <div>
                                <p className='justify-start text-gray-900 text-sm font-medium font-inter leading-6'>{order.products?.name} ({order.size})</p>
                                <p className=' justify-start text-gray-600 text-xs font-medium font-inter capitalize leading-6'>Ordered on: {new Date(order.ordered_on).toLocaleDateString('en-us', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric'
                                }) }</p>
                                <p className='justify-start text-gray-900 text-xs font-medium font-inter capitalize leading-6'>${order.products?.price}.00</p>
                            </div>
                        </div>
                        <div className='flex flex-col md:flex-row md:items-end gap-4 w-full'>
                            <div className='w-fit flex flex-col gap-1 '>
                                <p>{order.status}</p>
                                <span className={`h-0.5 w-full ${order.status === "pending" ? "bg-gray-600" : order.status === "completed" ? "bg-green-600" : order.status === "cancelled" ? "bg-red-600" : "bg-gray-600"}`}></span>
                            </div>
                            <Link className=' px-6 py-3 bg-white rounded outline outline-1 outline-offset-[-1px] outline-gray-900 inline-flex justify-center md:justify-start items-center gap-1.5 overflow-hidden' href={`/products/${order.product_id}`}>
                                <p className='text-gray-900 text-sm font-medium font-inter leading-6 text-center'>View item</p>
                            </Link>
                        </div>
                    </div>
                ))
            ) 
           }
        </div>
    );
};

export default AccountOrders;