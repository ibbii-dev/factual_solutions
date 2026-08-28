import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { status, priority } = body;

    return NextResponse.json({
      success: true,
      message: `Inquiry ${id} updated successfully.`,
      updatedFields: { status, priority }
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
