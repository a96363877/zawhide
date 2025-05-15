import { NextResponse } from "next/server"

// This is a simple health check endpoint that will always be accessible
// It can be used by monitoring services to check if the site is up
export async function GET() {
  return NextResponse.json({ status: "ok", timestamp: new Date().toISOString() })
}
