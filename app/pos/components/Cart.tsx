"use client";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export default function Cart({
  items,
  onIncrease,
  onDecrease,
}: {
  items: CartItem[];
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
}) {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="font-bold mb-2">Cart</h2>

      {items.length === 0 && <p className="text-gray-500">Cart is empty</p>}

      {items.map((item) => (
        <div key={item.id} className="flex justify-between mb-2">
          <div>
            {item.name} x {item.quantity}
          </div>
          <div className="flex gap-2">
            <button onClick={() => onDecrease(item.id)}>-</button>
            <button onClick={() => onIncrease(item.id)}>+</button>
          </div>
        </div>
      ))}

      <hr className="my-2" />

      <div className="font-bold">Total: ₱{total}</div>

      <button className="mt-4 w-full bg-black text-white py-2 rounded">
        Checkout
      </button>
    </div>
  );
}
