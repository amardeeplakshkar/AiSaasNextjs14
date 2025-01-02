import { prisma } from "@/lib/prismadb";
import { NextResponse } from "next/server";

// Create a new user with just the userId
export async function POST(request: Request) {
  const { userId } = await request.json();

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { userId },
    });

    if (existingUser) {
      return NextResponse.json({ error: "User with this ID already exists" }, { status: 400 });
    }

    // Create a new user
    const newUser = await prisma.user.create({
      data: {
        userId,
      },
    });

    return NextResponse.json({ message: "User created successfully", user: newUser });

  } catch (error) {
    console.error("Error during user creation:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
