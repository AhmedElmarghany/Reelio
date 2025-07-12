import { NextResponse } from "next/server";
import { logout } from "@/lib/actions/logout.actions";

export async function POST() {
  try {
    const result = await logout(); // ← بتشغل server action
    return NextResponse.json({ success: true, result });
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
