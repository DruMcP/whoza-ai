import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json(
    {
      status: "healthy",
      service: "whoza.ai",
      timestamp: new Date().toISOString(),
      version: "2026.06.25",
    },
    { status: 200 }
  )
}
