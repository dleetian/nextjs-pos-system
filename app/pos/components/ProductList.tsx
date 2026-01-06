"use client";

type Product = {
  id: number;
  name: string;
  price: number;
};

export default function ProductList({
  products,
  onAddToCart,
}: {
  products: Product[];
  onAddToCart: (product: Product) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {products.map((p) => (
        <button
          key={p.id}
          onClick={() => onAddToCart(p)}
          className="bg-white p-4 shadow rounded hover:bg-gray-100"
        >
          <div className="font-bold">{p.name}</div>
          <div>₱{p.price}</div>
        </button>
      ))}
    </div>
  );
}
