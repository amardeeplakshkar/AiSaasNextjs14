import { prisma } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    if (!userId) return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  
    const userApiLimit = await prisma.userApiLimit.findUnique({
      where: { userId },
    });
  
    return NextResponse.json({ count: userApiLimit ? userApiLimit.count : 0 });
  }
  