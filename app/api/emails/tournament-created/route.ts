import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ res: "HALLO" });
}

export async function POST(request: Request) {
  const res = await request.json();
  console.log(res);
  return NextResponse.json({ res });
}
