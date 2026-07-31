import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.TWELVEDATA_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "API key not found" },
      { status: 500 }
    );
  }

  const response = await fetch(
  `https://api.twelvedata.com/price?symbol=XAU/USD&apikey=${apiKey}`,
  {
    next: {
      revalidate: 60,
    },
  }
);

  const data = await response.json();

  return NextResponse.json(data);
}