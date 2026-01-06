import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("posdb");

  const products = await db.collection("products").find().toArray();

  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name, price } = body;

  if (!name || !price) {
    return NextResponse.json({ error: " Missing Fields" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db("posdb");

  const result = await db.collection("products").insertOne({
    name,
    price,
    createdAt: new Date(),
  });

  return NextResponse.json({
    _id: result.insertedId,
    name,
    price,
  });
}
