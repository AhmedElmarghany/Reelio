import { NextResponse } from "next/server";

const BASE = process.env.PHP_API_BASE;
export async function POST(request: Request) {
  try {
    const token = request.headers.get("Authorization");
    
    if(token === "Bearer undefined"){
      return NextResponse.json({ error: "missing token" }, { status: 401 });
    }
    const res = await fetch(
      `${BASE}/logout.php`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
