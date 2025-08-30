import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { mobile, token } = body;

    const apiRes = await fetch("http://148.72.244.77:5003/api/paytm/sendotp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile, token }),
    });

    const apiData = await apiRes.json();

    return NextResponse.json(apiData, { status: apiRes.status });
  } catch (error) {
    console.error("Error sending Paytm OTP:", error);
    return NextResponse.json(
      { status: false, msg: "Internal Server Error" },
      { status: 500 }
    );
  }
}