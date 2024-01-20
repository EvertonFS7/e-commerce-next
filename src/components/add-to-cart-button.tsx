'use client'
import { useCart } from '@/context/cart-context'
import React from 'react'

interface AddToCartButtonProps {
  productId: number
}

export function AddToCartButton({ productId }: AddToCartButtonProps) {
  const { addToCart } = useCart()

  function handleAddPorductToCart() {
    addToCart(productId)
  }
  return (
    <button
      type="button"
      className="mt-8 flex h-12 items-center justify-center rounded-full bg-emerald-600 font-semibold text-white"
      onClick={handleAddPorductToCart}
    >
      Adicionar ao carrinho
    </button>
  )
}
