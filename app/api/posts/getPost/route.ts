import { NextResponse } from "next/server";

const BASE = process.env.PHP_API_BASE;
export async function GET(request: Request) {
  
  const auth = request.headers.get("Authorization");

  const requestUrl = new URL(request.url as string);
  const params = requestUrl.searchParams;
  const post_id = params.get("post_id");
  
  if (auth === "Bearer undefined") {
    return NextResponse.json({ error: "missing token" }, { status: 401 });
  }
  // const body = await request.json();
  try {
    const res = await fetch(`${BASE}/posts/getPost.php?post_id=${post_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${auth}`,
      },
      // body: JSON.stringify(body),
    });
    const data = await res.json();
    // console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
