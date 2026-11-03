import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

// GET: Fetch all studio listings
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    const client = await clientPromise;
    const db = client.db('studiospace');
    
    let query = {};
    if (category && category !== 'All') {
      query = { category };
    }

    const studios = await db.collection('studios').find(query).toArray();
    return NextResponse.json({ success: true, data: studios }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST: Create a new studio listing
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db('studiospace');

    const newStudio = {
      ...body,
      createdAt: new Date(),
    };

    const result = await db.collection('studios').insertOne(newStudio);
    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}