import { prisma } from "@/lib/prismadb";
import { MAX_FREE_COUNTS } from "@/constants";
import { NextResponse } from "next/server";

// Increment the API limit for a user
export async function POST(request: Request) {
  const { userId } = await request.json();
  if (!userId) return NextResponse.json({ error: "User ID is required" }, { status: 400 });

  try {
    // Check if user exists
    const userApiLimit = await prisma.userApiLimit.findUnique({
      where: { userId },
    });

    if (userApiLimit) {
      // User exists, update the count
      await prisma.userApiLimit.update({
        where: { userId },
        data: {
          count: {
            increment: 1,
          },
        },
      });
    } else {
      // User doesn't exist, create a new user with count set to 1
      await prisma.userApiLimit.create({
        data: {
          userId,
          count: 1,
        },
      });
    }

    return NextResponse.json({ message: "API limit incremented successfully" });

  } catch (error) {
    console.error("Error during user API limit operation:", error);
    return NextResponse.json({ error: "Failed to increment API limit" }, { status: 500 });
  }
}

// Check if the user has exceeded their free API limit
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) return NextResponse.json({ error: "User ID is required" }, { status: 400 });

  try {
    const userApiLimit = await prisma.userApiLimit.findUnique({
      where: { userId },
    });

    const hasExceededLimit = userApiLimit.count >= MAX_FREE_COUNTS;

    return NextResponse.json({ hasExceededLimit });
  } catch (error) {
    console.error("Error during checking API limit:", error);
    return NextResponse.json({ error: "Failed to check API limit" }, { status: 500 });
  }
}
