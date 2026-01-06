import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("posdb");

  const sales = await db
    .collection("sales")
    .find()
    .sort({ createdAt: -1 })
    .toArray();

  return NextResponse.json(sales);
}

export async function POST(req: Request) {
  const { items } = await req.json();

  if (!items || items.length === 0) {
    return NextResponse.json(
      {
        error: "Cart is empty",
      },
      { status: 400 }
    );
  }

  const total = items.reduce(
    (sum: number, i: any) => sum + i.price * i.quantity
  );

  const client = await clientPromise;
  const db = client.db("posdb");

  const sale = {
    items,
    total,
    createdAt: new Date(),
  };

  await db.collection("sales").insertOne(sale);

  return NextResponse.json({ success: true });
}
