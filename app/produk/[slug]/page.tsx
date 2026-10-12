import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductDetailView } from '@/components/product/ProductDetailView';
import { PRODUCTS, getProductBySlug } from '@/lib/data/products';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Produk Tidak Ditemukan - PT Prima Dekorasi Group',
    };
  }

  return {
    title: `${product.name} - PT Prima Dekorasi Group`,
    description: product.short_description,
    openGraph: {
      title: `${product.name} - PT Prima Dekorasi Group`,
      description: product.short_description,
      images: product.images[0] ? [product.images[0]] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category_id === product.category_id && p.id !== product.id
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <ProductDetailView product={product} relatedProducts={relatedProducts} />
      </main>
      <Footer />
    </div>
  );
}
