import { NextResponse } from "next/server";

export async function POST() {
  // clear session token from cookies
  try {
    const response = NextResponse.json({ message: "Signed out successfully" });
    response.cookies.delete("token");
    return response;
  } catch (error) {
    console.error("Signout error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
