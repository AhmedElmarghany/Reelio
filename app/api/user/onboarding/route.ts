import { NextResponse } from "next/server";

const BASE = process.env.PHP_API_BASE;
export async function POST(request: Request) {
  const auth = request.headers.get("Authorization");
  const body = await request.json();
  try {
    const res = await fetch(`${BASE}/onboarding.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${auth}`,
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
