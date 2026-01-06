// Takes an onAdd function
"use client";

import { useState } from "react";

type Product = {
  name: string;
  price: number;
};

export default function ProductForm({
  onAdd,
}: {
  onAdd: (product: Product) => void;
}) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // helper function
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name || !price) return;

    onAdd({ name, price: Number(price) });
    setName("");
    setPrice("");
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
      <h2 className="font-bold mb-2">Add Products</h2>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="border p-2 w-full mb-2"
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <button className="bg-black text-white px-4 py-2 rounded">Add</button>
    </form>
  );
}
