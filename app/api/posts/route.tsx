import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const posts = await prisma.post.findMany();
    return new NextResponse(JSON.stringify({
      code: 0,
      guid: 0,
      data: posts,
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return new NextResponse(JSON.stringify({
      code: 1,
      guid: 1,
      message: 'Internal server error',
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } finally {
    await prisma.$disconnect(); // Ensure Prisma disconnect
  }
}

// ADD DATA 
export async function POST(req: Request) {
  try {
    const { title, content } = await req.json();
    const newPost = await prisma.post.create({
      data: { title, content },
    });
    return new NextResponse(JSON.stringify(newPost), { status: 201 });
  } catch (error) {
    console.error('Error adding post:', error);
    return new NextResponse(JSON.stringify({ message: 'Failed to add post' }), { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// PUT method to update a post
export async function PUT(req: Request) {
  try {
    const { id, title, content } = await req.json();
    const updatedPost = await prisma.post.update({
      where: { id },
      data: { title, content },
    });
    return new NextResponse(JSON.stringify(updatedPost), { status: 200 });
  } catch (error) {
    console.error('Error updating post:', error);
    return new NextResponse(JSON.stringify({ message: 'Failed to update post' }), { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// DELETE method to remove a post
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await prisma.post.delete({
      where: { id },
    });
    return new NextResponse(JSON.stringify({ message: 'Post deleted successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error deleting post:', error);
    return new NextResponse(JSON.stringify({ message: 'Failed to delete post' }), { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
