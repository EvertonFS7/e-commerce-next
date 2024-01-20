import { AddToCartButton } from '@/components/add-to-cart-button'
import { Product } from '@/data/@types/product'
import { api } from '@/data/api'
import { Metadata } from 'next'
import Image from 'next/image'
import React from 'react'

interface ProductProps {
  params: {
    slug: string
  }
}

async function getProduct(slug: string): Promise<Product> {
  const response = await api(`/products/${slug}`, {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  })
  const products = await response.json()

  return products
}

export async function generateMetadata({
  params,
}: ProductProps): Promise<Metadata> {
  const product = await getProduct(params.slug)
  return {
    title: product.title,
  }
}

export async function generateStaticParams() {
  const response = await api('/products/featured')
  const products: { featuredProducts: Product[] } = await response.json()

  return products.featuredProducts.map((product) => {
    return { slug: product.slug }
  })
}

export default async function ProductPage({ params }: ProductProps) {
  const products = await getProduct(params.slug)

  return (
    <div className="relative grid max-h-[860px] grid-cols-3">
      <div className="col-span-2 overflow-hidden">
        <Image
          src={products?.image}
          width={1000}
          height={1000}
          alt=""
          quality={100}
        />
      </div>

      <div className="flex flex-col justify-center px-12">
        <h1 className="text-3xl font-bold leading-tight">{products?.title}</h1>

        <p className="mt-2 leading-relaxed text-zinc-400">
          {products?.description}
        </p>

        <div className="mt-8 flex items-center gap-3">
          <span className="flex items-center justify-center rounded-full bg-violet-500 px-5 py-2.5 font-semibold">
            {products?.price.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </span>
          <span className="text-sm text-zinc-400">
            Em até 12x s/ juros de{' '}
            {(products?.price / 12).toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
        </div>

        <div className="mt-8 space-y-4">
          <span className="block font-semibold">Tamanhos</span>
          <button
            type="button"
            className="flex h-9 w-14 items-center justify-center 
          rounded-full border border-zinc-800 bg-zinc-800 text-sm font-semibold"
          >
            P
          </button>
          <button
            type="button"
            className="flex h-9 w-14 items-center justify-center 
          rounded-full border border-zinc-800 bg-zinc-800 text-sm font-semibold"
          >
            M
          </button>
          <button
            type="button"
            className="flex h-9 w-14 items-center justify-center 
          rounded-full border border-zinc-800 bg-zinc-800 text-sm font-semibold"
          >
            G
          </button>
          <button
            type="button"
            className="flex h-9 w-14 items-center justify-center 
          rounded-full border border-zinc-800 bg-zinc-800 text-sm font-semibold"
          >
            GG
          </button>
        </div>
        <AddToCartButton productId={products.id} />
      </div>
    </div>
  )
}
