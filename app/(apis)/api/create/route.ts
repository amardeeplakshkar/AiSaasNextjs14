import { prisma } from "@/lib/prismadb";
import { NextResponse } from "next/server";

// Create the userApiLimit for the user with initial count
export async function POST(request: Request) {
  const { userId } = await request.json();

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    // Check if the userApiLimit already exists for this userId
    const existingUserApiLimit = await prisma.userApiLimit.findUnique({
      where: { userId },
    });

    if (existingUserApiLimit) {
      return NextResponse.json({ error: "API limit already exists for this user" }, { status: 400 });
    }

    // Create a new userApiLimit record
    const newUserApiLimit = await prisma.userApiLimit.create({
      data: {
        userId,
        count: 0,  // Set the initial count (e.g., 1, or whatever default you'd like)
      },
    });

    return NextResponse.json({ message: "User API limit created successfully", userApiLimit: newUserApiLimit });

  } catch (error) {
    console.error("Error during user API limit creation:", error);
    return NextResponse.json({ error: "Failed to create user API limit" }, { status: 500 });
  }
}
