import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const posts = await prisma.post.findMany();
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  const { title, content } = await req.json();
  const newPost = await prisma.post.create({
    data: { title, content },
  });
  return NextResponse.json(newPost);
}

// PUT method to update a post
export async function PUT(req: Request) {
  const { id, title, content } = await req.json();
  const updatedPost = await prisma.post.update({
    where: { id },
    data: { title, content },
  });
  return NextResponse.json(updatedPost);
}

// DELETE method to remove a post
export async function DELETE(req: Request) {
  const { id } = await req.json();
  await prisma.post.delete({
    where: { id },
  });
  return NextResponse.json({ message: 'Post deleted successfully' });
}
