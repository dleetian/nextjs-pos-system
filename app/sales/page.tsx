"use client";

import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [sales, setSales] = useState<any[]>([]);

  useEffect(() => {
    fetch("api/sales")
      .then((res) => res.json())
      .then(setSales);
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Sales History</h1>

      {sales.map((sale) => (
        <div key={sale._id} className="bg-white p-4 shadow rounded mb-4">
          <div className="font-bold">Total: ₱{sale.total}</div>

          <div className="text-sm text-gray-500">
            {new Date(sale.createdAt).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}
