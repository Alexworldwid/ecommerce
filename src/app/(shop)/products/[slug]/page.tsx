'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { Products } from '@/app/types/product';
import PageIndicator from '@/app/component/ui/pageIndicator';
import ProductCart from '@/app/component/ui/productCart';
import SimilarProduct from '@/app/component/ui/similarProduct';
import ProductDetails from '@/app/component/ui/productDetails';





export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<Products | null>(null);
  const [loading, setLoading] = useState(true);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch('/data/products.json'); // from /public/products.json
        const data: Products[] = await res.json();

        const matched = data.find((p) => p.id === slug);
        setProduct(matched || null);
      } catch (error) {
        console.error('Error fetching product:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }

    if (slug) fetchProduct();

  }, [slug]);

  if (loading) return <div className="py-40">Loading...</div>;
  if (!product) return <div className="py-40">Product not found</div>;


  return (
    <section className='py-36 w-full flex flex-col items-center justify-center gap-6'>
        <article className=" w-full max-w-[1116px] px-4 flex flex-col gap-8">
            <PageIndicator pageTitle={product.name} />
        </article>

        <ProductCart products={product} currentUrl={currentUrl} />

        <article>
          <div></div>
          <div>
            <ProductDetails product={product} />
          </div>
        </article>

        <SimilarProduct product={product} />

    </section>
  );
}
