"use client";

import { useState } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

type Product = {
  id: number;
  name: string;
  price: number;
};

type CartItem = Product & { quantity: number };

export default function POSPage() {
  const [products] = useState<Product[]>([
    { id: 1, name: "Coffee", price: 120 },
    { id: 2, name: "Bread", price: 60 },
    { id: 3, name: "Milk", price: 80 },
  ]);

  const [cart, setCart] = useState<CartItem[]>([]);

  function addToCart(product: Product) {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);

      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }

  function increase(id: number) {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  function decrease(id: number) {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  async function handleCheckout() {
    await fetch("api/sales", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cart }),
    });

    setCart([]);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="col-span-2">
        <ProductList products={products} onAddToCart={addToCart} />
      </div>

      <Cart
        items={cart}
        onIncrease={increase}
        onDecrease={decrease}
        onCheckout={handleCheckout}
      />
    </div>
  );
}
