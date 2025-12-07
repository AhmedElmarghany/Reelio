import { NextResponse } from "next/server";

const BASE = process.env.PHP_API_BASE;
export async function GET(request: Request) {
  const auth = request.headers.get("Authorization");
  console.log("this is auth");
  console.log(auth);
  if (auth === "Bearer undefined") {
    return NextResponse.json({ error: "missing token" }, { status: 401 });
  }
  try {
    const res = await fetch(`${BASE}/posts/getBookmarkes.php`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${auth}`,
      },
    });
    const data = await res.json();
    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
