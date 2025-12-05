import { NextResponse } from "next/server";

const BASE = process.env.PHP_API_BASE;
export async function POST(request: Request) {
  const auth = request.headers.get("Authorization");
  // console.log("this is auth");
  // console.log(auth);
  if (auth === "Bearer undefined") {
    return NextResponse.json({ error: "missing token" }, { status: 401 });
  }
  const body = await request.json();
  try {
    const res = await fetch(`${BASE}/posts/postLikeInsert.delete.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${auth}`,
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
