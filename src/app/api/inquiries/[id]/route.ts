import { NextRequest, NextResponse } from "next/server";
import { dbUpdateInquiryStatus, dbDeleteInquiry } from "@/lib/mongodb";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { status } = body;

    if (status) {
      await dbUpdateInquiryStatus(id, status);
    }

    return NextResponse.json({
      success: true,
      message: `Inquiry ${id} updated successfully.`,
      updatedFields: { status }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update inquiry." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    await dbDeleteInquiry(id);

    return NextResponse.json({
      success: true,
      message: `Inquiry ${id} deleted successfully.`
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to delete inquiry." },
      { status: 500 }
    );
  }
}
