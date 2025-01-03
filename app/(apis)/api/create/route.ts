import { prisma } from "@/lib/prismadb";
import { NextResponse } from "next/server";

// Create or update the userApiLimit for the user
export async function POST(request: Request) {
  const { userId, username, email } = await request.json();

  if (!userId || !username || !email) {
    return NextResponse.json(
      { error: "User ID, username, and email are required" },
      { status: 400 }
    );
  }

  try {
    const existingUserApiLimit = await prisma.userApiLimit.findUnique({
      where: { userId },
    });

    if (existingUserApiLimit) {
      const updates: { username?: string; email?: string } = {};
      if (existingUserApiLimit.username !== username) {
        updates.username = username;
      }
      if (existingUserApiLimit.email !== email) {
        updates.email = email;
      }

      if (Object.keys(updates).length > 0) {
        const updatedUserApiLimit = await prisma.userApiLimit.update({
          where: { userId },
          data: updates,
        });

        return NextResponse.json({
          message: "User API limit updated successfully",
          userApiLimit: updatedUserApiLimit,
        });
      }

      return NextResponse.json({
        message: "User API limit already exists and is up-to-date",
        userApiLimit: existingUserApiLimit,
      });
    }

    // Create a new userApiLimit record
    const newUserApiLimit = await prisma.userApiLimit.create({
      data: {
        userId,
        username,
        email,
        count: 0,
      },
    });

    return NextResponse.json({
      message: "User API limit created successfully",
      userApiLimit: newUserApiLimit,
    });
  } catch (error) {
    console.error("Error during user API limit creation or update:", error);
    return NextResponse.json(
      { error: "Failed to create or update user API limit" },
      { status: 500 }
    );
  }
}
