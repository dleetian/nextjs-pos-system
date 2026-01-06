"use client";

type Product = {
  id: number;
  name: string;
  price: number;
};

export default function ProductTable({
  products,
  onDelete,
}: {
  products: Product[];
  onDelete: (id: number) => void;
}) {
  return (
    <table className="w-full bg-white shadow rounded">
      <thead>
        <tr className="border-b">
          <th className="p-2 text-left">Name</th>
          <th className="p-2 text-left">Price</th>
          <th className="p-2 text-left"></th>
        </tr>
      </thead>

      <tbody>
        {products.map((p) => (
          <tr key={p.id} className="border-b">
            <td className="p-2">{p.name}</td>
            <td className="p-2">{p.price}</td>
            <td className="p-2 text-right">
              <button onClick={() => onDelete(p.id)} className="text-red-500">
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
