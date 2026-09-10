import { NextRequest, NextResponse } from "next/server";
import { dbUpdateInquiryStatus, dbDeleteInquiry, dbGetInquiryById } from "@/lib/mongodb";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const inquiry = await dbGetInquiryById(id);

    if (!inquiry) {
      return NextResponse.json(
        { success: false, message: `Inquiry with ID ${id} not found.` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: inquiry
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to retrieve inquiry." },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json(
        { success: false, message: "Field 'status' is required for update." },
        { status: 400 }
      );
    }

    const updated = await dbUpdateInquiryStatus(id, status);

    if (!updated) {
      return NextResponse.json(
        { success: false, message: `Inquiry ${id} could not be updated.` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Inquiry ${id} updated successfully to status: ${status}`,
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
    const deleted = await dbDeleteInquiry(id);

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
