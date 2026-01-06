"use client";

import { useState } from "react";
import ProductForm from "./components/ProductForm";
import ProductTable from "./components/ProductTable";

type Product = {
  id: number;
  name: string;
  price: number;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  // addProduct helper function
  function addProduct(product: Omit<Product, "id">) {
    setProducts((prev) => [...prev, { id: Date.now(), ...product }]);
  }

  function deleteProduct(id: number) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <ProductForm onAdd={addProduct} />
      <ProductTable products={products} onDelete={deleteProduct} />
    </div>
  );
}
