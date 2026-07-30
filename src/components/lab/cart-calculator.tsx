"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingCart, Minus, Plus, Check } from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
}

const products: Product[] = [
  { id: "roast", name: "House Roast, 250g", price: 18 },
  { id: "tee", name: "Club Tee", price: 45 },
]

export const CartCalculator: React.FC = () => {
  const [quantities, setQuantities] = useState<Record<string, number>>({ roast: 1, tee: 0 })
  const [justAdded, setJustAdded] = useState(false)

  const setQty = (id: string, delta: number) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(0, (prev[id] ?? 0) + delta) }))
  }

  const subtotal = products.reduce((sum, p) => sum + p.price * (quantities[p.id] ?? 0), 0)
  const itemCount = Object.values(quantities).reduce((a, b) => a + b, 0)

  const addToCart = () => {
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1200)
  }

  return (
    <div className="glass glow-border p-8 rounded-[32px] h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-bg-subtle/50 rounded-xl">
            <ShoppingCart size={20} className="text-teal-400" />
          </div>
          <h3 className="text-xl font-bold tracking-tight">Cart & Checkout</h3>
        </div>
        <span className="text-xs font-bold text-text-muted">{itemCount} item{itemCount === 1 ? "" : "s"}</span>
      </div>
      <p className="text-sm text-text-muted mb-6">
        Live quantity and pricing logic, the everyday plumbing behind Shopify and WooCommerce storefronts.
      </p>

      <div className="space-y-3 flex-1">
        {products.map((product) => (
          <div key={product.id} className="flex items-center justify-between p-4 rounded-2xl bg-bg-subtle/50 border border-border-subtle">
            <div>
              <div className="text-sm font-bold">{product.name}</div>
              <div className="text-xs text-text-muted">${product.price.toFixed(2)}</div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQty(product.id, -1)}
                className="w-7 h-7 rounded-full bg-bg-base border border-border-subtle flex items-center justify-center hover:border-primary/40 transition-colors"
                aria-label={`Decrease ${product.name} quantity`}
              >
                <Minus size={12} />
              </button>
              <span className="w-5 text-center text-sm font-mono">{quantities[product.id] ?? 0}</span>
              <button
                onClick={() => setQty(product.id, 1)}
                className="w-7 h-7 rounded-full bg-bg-base border border-border-subtle flex items-center justify-center hover:border-primary/40 transition-colors"
                aria-label={`Increase ${product.name} quantity`}
              >
                <Plus size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-border-subtle flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-widest text-text-muted">Subtotal</div>
          <div className="text-2xl font-extrabold font-mono">${subtotal.toFixed(2)}</div>
        </div>
        <button
          onClick={addToCart}
          disabled={itemCount === 0}
          className="px-5 py-3 bg-text-base text-bg-base font-bold rounded-full disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
        >
          <AnimatePresence mode="wait" initial={false}>
            {justAdded ? (
              <motion.span key="added" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                <Check size={16} /> Added
              </motion.span>
            ) : (
              <motion.span key="add" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                Add to cart
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  )
}
