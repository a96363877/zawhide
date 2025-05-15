import { NextResponse } from "next/server"
import { fetchBalance } from "@/lib/api"
import { detectBot } from "@/lib/server/security"

export async function POST(request: Request) {
  try {
    // Check if the request is from a bot
    if (await detectBot(request as any)) {
      // Instead of returning an error, return fake data
      // This makes it harder for bots to detect they're being blocked
      return new NextResponse(
        JSON.stringify({
          dueAmount: "0.000",
          dueDate: new Date().toISOString().split("T")[0],
          accountStatus: "active",
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
    }

    // Parse the request body
    const { phoneNumber } = await request.json()

    // Validate the phone number
    if (!phoneNumber || typeof phoneNumber !== "string" || phoneNumber.length !== 8) {
      return new NextResponse(JSON.stringify({ error: "Invalid phone number" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      })
    }

    // Fetch the balance data
    const balanceData = await fetchBalance(phoneNumber)

    // Return the balance data
    return new NextResponse(JSON.stringify(balanceData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error("Error fetching balance:", error)
    return new NextResponse(JSON.stringify({ error: "Failed to fetch balance" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}
