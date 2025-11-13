'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { Products } from '@/app/types/product';
import PageIndicator from '@/app/component/ui/pageIndicator';
import ProductCart from '@/app/component/ui/productCart';
import SimilarProduct from '@/app/component/layout/similarProduct';
import ProductAbout from '@/app/component/layout/productAbout';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '@/store/productslice';
import { AppDispatch, RootState } from '@/store/store';






export default function Products() {
  const { slug } = useParams();
  const [product, setProduct] = useState<Products | null>(null);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const dispatch = useDispatch<AppDispatch>()
  const {items, loading} = useSelector((state: RootState) => state.products)


  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length]);




  useEffect(() => {
    async function fetchProduct() {
      try {
        const matched = items.find((p) => p.id === slug);
        setProduct(matched || null);
      } catch (error) {
        console.error('Error fetching product:', error);
        setProduct(null);
      } 
    }

    if (slug) fetchProduct();

  }, [slug, items]);

  if (loading) return <div className="py-40">Loading...</div>;
  if (!product) return <div className="py-40">Product not found</div>;


  return (
    <section className='pt-40 w-full flex flex-col items-center justify-center gap-6'>
        <article className=" w-full max-w-[1116px] px-4 flex flex-col gap-8">
            <PageIndicator pageTitle={product.name} />
        </article>

        <ProductCart products={product} currentUrl={currentUrl} />

        <ProductAbout product={product} />

        <SimilarProduct product={product} />

    </section>
  );
}
