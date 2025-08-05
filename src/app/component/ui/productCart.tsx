"use client";

import React, { useState } from 'react';
import type { Products } from '@/app/types/product';
import Image from 'next/image';
import { useCart } from '@/app/context/cartContext';
import { useWishlist } from '@/app/context/wishlistContext';
import toast from 'react-hot-toast';
import Share from './share';



type ProductCartProps = {
  products: Products;
  currentUrl: string;
};

const ProductCart = ({ products, currentUrl }: ProductCartProps) => {
    const [color, setColor] = useState(products.color?.[0] || null);
    const [size, setSize] = useState(products.size?.[0] || null);
    const [amount, setAmount] = useState<number>(1);
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const [wishListState, setWishListState] = useState(isInWishlist({
        id: products.id,
        size: size?.sizeName || '',
        color: color?.colorValue || '',
        name: products.name,
        price: products.price,
        image: products.image,
    }));
    const [openShareMenu, setOpenShareMenu] = useState(false);


    const totalReviews = products.reviews?.reduce((acc, review) => acc + review.rating, 0) || 0;
    const averageRating = totalReviews / (products.reviews?.length || 1);
    const roundedRating = Math.round(averageRating * 10) / 10;


    const increaseAmount = () => {
        setAmount(prevAmount => prevAmount + 1);
    }

    const decreaseAmount = () => {
        if (amount === 1) {
            setAmount(amount);
        } else {
            setAmount(prevAmount => prevAmount - 1);
        }
    }

    const handleAddToCart = () => {
        if (color && size) {
            addToCart({
                id: products.id,
                name: products.name,
                price: products.price,
                image: products.image,
                color: color.colorValue,
                size: size.sizeName,
                amount: amount,
            });

            setAmount(1); // Reset amount after adding to cart
            setColor(products.color?.[0] || null); // Reset color to first available color
            setSize(products.size?.[0] || null); // Reset size to first available size

            toast.success(`${products.name} added to cart!`, {
                duration: 3000,
                position: 'top-center',
                style: {
                    background: '#fff',
                    color: '#000',
                    borderRadius: '8px',
                    padding: '16px',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                },
            });
        } else {
            alert('Please select a color and size before adding to cart.');
        }
    };




    const handleToggleWishlist = () => {
        setWishListState(!wishListState);
        toggleWishlist({
            id: products.id,
            size: size?.sizeName || '',
            color: color?.colorValue || '',
            name: products.name,
            price: products.price,
            image: products.image,
        });
    }


    const handleColorClick = (c: {colorValue: string, colorName: string}) => {
         setColor(c);
    };
    
    const handleShareClick = () => {
        setOpenShareMenu(!openShareMenu);
    }
    
    


  return (
    <article className='w-full max-w-[1116px] px-4 flex gap-8'>
        <div className='w-1/2 h-[534px] bg-neutral-100 rounded-[5px] flex items-center justify-center'>
            <div className='relative w-72 h-96'>
                <Image src={products.image} alt={products.name} fill />
            </div>
        </div>

        <div className='w-1/2 flex flex-col gap-4 items-end'>
            <div className='w-full max-w-96 flex-1 gap-4 flex flex-col'>
                <div className='flex items-start justify-between relative'>
                    <h2 className=' text-gray-900 text-xl font-bold font-inter'>{products.name}</h2>
                    <div onClick={handleShareClick} className=''>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#000000" viewBox="0 0 256 256"><path d="M176,160a39.89,39.89,0,0,0-28.62,12.09l-46.1-29.63a39.8,39.8,0,0,0,0-28.92l46.1-29.63a40,40,0,1,0-8.66-13.45l-46.1,29.63a40,40,0,1,0,0,55.82l46.1,29.63A40,40,0,1,0,176,160Zm0-128a24,24,0,1,1-24,24A24,24,0,0,1,176,32ZM64,152a24,24,0,1,1,24-24A24,24,0,0,1,64,152Zm112,72a24,24,0,1,1,24-24A24,24,0,0,1,176,224Z"></path></svg>
                    </div>
                    {
                        openShareMenu && <Share currentUrl={currentUrl} setOpenShareMenu={setOpenShareMenu} />
                    }
                </div>

                <div className='flex items-center gap-2'>
                    <div className='px-4 py-0.5 bg-neutral-100 rounded-[100px] outline outline-1 outline-offset-[-1px] outline-neutral-100 flex justify-start items-center gap-2 overflow-hidden'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className='fill-gray-500' viewBox="0 0 256 256"><path d="M234.29,114.85l-45,38.83L203,211.75a16.4,16.4,0,0,1-24.5,17.82L128,198.49,77.47,229.57A16.4,16.4,0,0,1,53,211.75l13.76-58.07-45-38.83A16.46,16.46,0,0,1,31.08,86l59-4.76,22.76-55.08a16.36,16.36,0,0,1,30.27,0l22.75,55.08,59,4.76a16.46,16.46,0,0,1,9.37,28.86Z"></path></svg>
                        <p className='text-gray-600 text-xs font-medium font-inter capitalize leading-normal align-middle flex items-center justify-center'>{roundedRating} - {products.reviews?.length} reviews</p>
                    </div>
                    <div className='px-4 py-0.5 bg-neutral-100 rounded-[100px] outline outline-1 outline-offset-[-1px] outline-gray-200 inline-flex justify-start items-start gap-2 overflow-hidden'>
                        <p className={`${products.inStock ? "text-green-500" : "text-red-500"} text-xs font-medium font-inter capitalize leading-normal`}>{products.inStock? "IN STOCK": "OUT OF STOCK"}</p>
                    </div>
                </div>

                <div>
                    <p className='justify-start text-gray-900 text-lg font-semibold font-inter'>${products.price}</p>
                </div>

                <div className='flex flex-col justify-between flex-1'>

                    {/* color selection */}
                    <div className='flex flex-col gap-4'>
                        <p className='justify-start text-gray-600 text-xs font-medium font-inter uppercase leading-normal tracking-wide'>Available colors:</p>
                        <div className='flex items-center justify-start gap-2'>
                            {
                                products.color?.map((c, index) => {
                                    return (
                                        <div className={`${c === color ? 'outline outline-1 outline-offset-[-1px] outline-gray-900' : ''} flex items-center justify-center h-8 w-8 rounded-full`}  key={index} >
                                            <button 
                                                className={`w-6 h-6 rounded-full ${c === color ? 'animate-press' : ''}`} 
                                                onClick={() => handleColorClick(c)} 
                                                style={{ backgroundColor: c.colorValue }}
                                            />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className='flex flex-col gap-4'>
                        <p className='justify-start text-gray-600 text-xs font-medium font-inter uppercase leading-normal tracking-wide'>SELECT SIZE:</p>

                        <div className='flex items-center justify-start gap-2'>
                            {
                                products.size?.map((s, index) => (
                                    <button 
                                        key={index} 
                                        className={`h-10 min-w-10  inline-flex flex-col justify-center items-center overflow-hidden rounded outline outline-1 outline-offset-[-1px] ${s === size ? ' outline-gray-900' : 'outline-gray-200'}`} 
                                        onClick={() => setSize(s)}
                                    >
                                        {s.sizeValue}
                                    </button>
                                ))
                            }
                        </div>
                    </div>

                    <div>
                        <div>
                            <p className='justify-start text-gray-600 text-xs font-medium font-inter uppercase leading-normal tracking-wide'>Quantity</p>
                        </div>
                        <div className='w-full max-w-40 h-11 min-w-10 px-4 rounded outline outline-1 outline-offset-[-1px] outline-gray-200 inline-flex justify-between flex-row-reverse items-center overflow-hidden'>
                            <button className='justify-start text-gray-800 text-sm font-medium font-inter leading-normal' onClick={increaseAmount}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#3c3c39" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path></svg>
                            </button>
                            <p className='justify-start text-gray-800 text-sm font-medium font-inter leading-normal'>{amount}</p>
                            <button className='justify-start text-gray-800 text-sm font-medium font-inter leading-normal' onClick={decreaseAmount}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#3c3c39" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128Z"></path></svg>
                            </button>
                        </div>
                    </div>

                    <div>
                        <div className='flex items-center justify-between gap-2 mt-4'>
                            <button className='w-full h-11 px-6 py-3 bg-gray-900 rounded inline-flex justify-center items-center gap-1.5 overflow-hidden' onClick={handleAddToCart} >
                                <p className='text-white text-sm font-medium font-inter leading-normal'>Add To Cart</p>
                            </button>
                            <button onClick={handleToggleWishlist} className='w-11 h-11 rounded outline outline-1 outline-offset-[-1px] outline-gray-200 inline-flex justify-center items-center gap-2.5 overflow-hidden'>
                                {
                                    (wishListState ? 
                                        <svg  className='animate-wish' xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#dada0b" viewBox="0 0 256 256"><path d="M240,102c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,228.66,16,172,16,102A62.07,62.07,0,0,1,78,40c20.65,0,38.73,8.88,50,23.89C139.27,48.88,157.35,40,178,40A62.07,62.07,0,0,1,240,102Z"></path></svg>:
                                        <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#3c3c39" viewBox="0 0 256 256"><path d="M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,155.61,146.24,204.15,128,214.8Z"></path></svg>
                                    )
                                }
                                
                            </button>
                        </div>
                        <div>
                            <p className='justify-start text-gray-600 text-xs font-medium font-inter uppercase leading-normal tracking-wide'>— Free shipping on orders $100+</p>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    </article>
  );
};

export default ProductCart;
