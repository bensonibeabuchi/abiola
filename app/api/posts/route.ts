import  {prisma}  from "@/lib/prisma"
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { title } = await req.json();
  const post = await prisma.post.create({ data: { title } });
  return NextResponse.json(post);
}

export async function GET() {
  const posts = await prisma.post.findMany();
  return NextResponse.json(posts);
}
