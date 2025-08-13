import Image from 'next/image';
import React from 'react';
import type { Products } from '@/app/types/product';
import Link from 'next/link';

type ProductCardProps = {
  product: Products;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { name, image, price, inStock, id } = product;

  return (
    <Link key={id} href={`/products/${id}`} className="w-full min-w-64 px-2 py-4 rounded inline-flex flex-1 flex-col justify-start items-start gap-6 overflow-hidden">
      <div className='relative h-80 w-full bg-neutral-100 rounded overflow-hidden'>
        <Image
          src={image}
          alt={name}
          fill
          className='object-contain object-center'
        />
      </div>
      
      <div className='flex flex-col justify-start items-start gap-2 w-full'>
        <h3 className="text-gray-900 text-sm font-medium font-inter leading-normal h-[32px]">{name}</h3>
        <div className='flex items-center gap-2'>
          <p className="">
            {inStock ? (
              <span className="px-4 py-0.5 rounded-[100px] outline outline-1 outline-offset-[-1px] outline-gray-200 inline-flex justify-start items-start gap-2 overflow-hidden text-gray-900 text-xs font-medium font-inter capitalize leading-normal">In Stock</span>
            ) : (
              <span className="px-4 py-0.5 rounded-[100px] outline outline-1 outline-offset-[-1px] outline-gray-200 inline-flex justify-start items-start gap-2 overflow-hidden text-red-600 text-xs font-medium font-inter capitalize leading-normal">Out of Stock</span>
            )}
          </p>
          <p className="text-center justify-start text-zinc-600 text-sm font-normal font-inter leading-normal">₦{price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
