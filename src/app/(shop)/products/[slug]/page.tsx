import { createClient } from "@/utils/supabase/server";
import Product from "./products";
import type { Metadata } from "next";

type Props = {
  params: { slug: string };
};

// ✅ Dynamic metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001";

  const supabase = await createClient();
  const { data: products, error } = await supabase.from("products").select("*");

  if (error) {
    console.error("Supabase error fetching products:", error.message);
    return { title: "Error Loading Product" };
  }

  const product = products?.find((prod) => String(prod.id) === slug);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The product you're looking for doesn't exist.",
    };
  }

  return {
    title: product.name,
    description: product.description ?? "Check out this product.",
    openGraph: {
      title: product.name,
      description: product.description ?? "Check out this product.",
      images: product.image ? [`${baseUrl}${product.image}`] : [],
    },
  };
}

// ✅ Page component
const ProductPage = () => {
  return <Product />;
};

export default ProductPage;
