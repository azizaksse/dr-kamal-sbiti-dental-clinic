import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const data = await request.json();
    // In MVP, just echo back success. Integration with email/CRM can be added later.
    return NextResponse.json({ ok: true, received: data }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}


