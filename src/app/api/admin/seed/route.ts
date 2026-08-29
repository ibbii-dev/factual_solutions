import { NextRequest, NextResponse } from "next/server";
import { seedDatabase } from "@/lib/seedDatabase";

export async function GET(request: NextRequest) {
  try {
    const result = await seedDatabase();
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Seed execution error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const result = await seedDatabase();
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Seed execution error" },
      { status: 500 }
    );
  }
}
