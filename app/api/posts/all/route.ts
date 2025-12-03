import { NextResponse } from "next/server";
  
const BASE = process.env.PHP_API_BASE;
export async function GET(request: Request) {
    const token = request.headers.get("Authorization") as string;
  try {
    const res = await fetch(`${BASE}/posts/Allposts.php`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
