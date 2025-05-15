"use client"

import { Phone } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function DesktopDetectedPage() {
  const searchParams = useSearchParams()
  const source = searchParams.get("source") || "/"
  const [qrValue, setQrValue] = useState("")

  useEffect(() => {
    // Generate a QR code URL for the current site
    // In a real implementation, you would use the actual site URL
    const siteUrl = window.location.origin + source
    setQrValue(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(siteUrl)}`)
  }, [source])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#2d1a45] to-[#3a2259] p-6 text-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
        <Phone className="h-16 w-16 text-[#d13c8c] mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-[#2d1a45] mb-4">هذه الصفحة متاحة فقط على الهواتف المحمولة</h1>
        <p className="text-gray-600 mb-6">يرجى فتح هذه الصفحة على هاتفك المحمول للوصول إلى خدمة الدفع.</p>

        {qrValue && (
          <div className="mb-6">
            <p className="text-gray-600 mb-3">امسح رمز QR لفتح هذه الصفحة على هاتفك:</p>
            <div className="flex justify-center">
              <img src={qrValue || "/placeholder.svg"} alt="QR Code" className="h-48 w-48" />
            </div>
          </div>
        )}

        <div className="flex justify-center">
          <img src="/placeholder.svg?height=200&width=200" alt="Mobile Phone" className="h-32 w-auto" />
        </div>
      </div>
    </div>
  )
}
