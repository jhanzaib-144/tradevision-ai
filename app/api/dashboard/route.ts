import { NextResponse } from "next/server";
import { getDashboard } from "@/app/services/dashboardService";

export async function GET() {
  try {
    const dashboard = await getDashboard();

    return NextResponse.json(dashboard);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to load dashboard",
      },
      {
        status: 500,
      }
    );
  }
}