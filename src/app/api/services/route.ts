import { NextRequest, NextResponse } from "next/server";
import { allServices } from "@/data/servicesData";
import { getDatabase } from "@/lib/mongodb";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const tag = searchParams.get("tag");

    let services = allServices;

    // Try fetching synced services from MongoDB
    try {
      const db = await getDatabase();
      if (db) {
        const dbServices = await db.collection("services").find({}).toArray();
        if (dbServices && dbServices.length > 0) {
          services = dbServices as any;
        }
      }
    } catch (dbErr) {
      // Fallback to static catalog
    }

    if (category) {
      services = services.filter((s) => s.category.toLowerCase() === category.toLowerCase());
    }

    if (tag) {
      services = services.filter((s) => s.tags?.some((t) => t.toLowerCase() === tag.toLowerCase()));
    }

    return NextResponse.json({
      success: true,
      count: services.length,
      data: services
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to retrieve consulting practices." },
      { status: 500 }
    );
  }
}
