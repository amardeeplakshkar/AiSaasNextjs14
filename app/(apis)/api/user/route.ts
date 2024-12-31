import { prisma } from "@/lib/prismadb";
import { MAX_FREE_COUNTS } from "@/constants";
import { NextResponse } from "next/server";

// Increment the API limit for a user
export async function POST(request: Request) {
  const { userId } = await request.json();
  if (!userId) return NextResponse.json({ error: "User ID is required" }, { status: 400 });

  await prisma.userApiLimit.upsert({
    where: { userId },
    create: {
      userId,
      count: 1,
    },
    update: {
      count: {
        increment: 1,
      },
    },
  });

  return NextResponse.json({ message: "API limit incremented successfully" });
}

// Check if the user has exceeded their free API limit
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) return NextResponse.json({ error: "User ID is required" }, { status: 400 });

  const userApiLimit = await prisma.userApiLimit.findUnique({
    where: { userId },
  });

  const hasExceededLimit = !userApiLimit || userApiLimit.count >= MAX_FREE_COUNTS;
  
  return NextResponse.json({ hasExceededLimit: hasExceededLimit || false });
}
