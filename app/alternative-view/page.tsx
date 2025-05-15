"use client"

import { useState, useEffect } from "react"
import { Heart, Menu, ShoppingCart, Phone, CreditCard, ArrowRight, Info, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"
import { useSearchParams } from "next/navigation"

export default function AlternativeView() {
  const [selectedTab, setSelectedTab] = useState("bill")
  const [loading, setLoading] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const searchParams = useSearchParams()
  const source = searchParams.get("source") || "/"
  const reason = searchParams.get("reason")

  // This is a fake component that looks like the real site
  // but doesn't contain any actual functionality

  useEffect(() => {
    // After a delay, show a maintenance message
    const timer = setTimeout(() => {
      setShowMessage(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="max-w-md mx-auto bg-gradient-to-b from-white to-gray-50 min-h-screen" dir="rtl">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-gradient-to-r from-[#2d1a45] to-[#3a2259] shadow-md">
        <div className="flex items-center space-x-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-full p-2 hover:bg-white/20 transition-colors">
            <Heart className="text-white" size={20} />
          </div>
          <div className="bg-white rounded-full p-2 hover:bg-gray-100 transition-colors">
            <ShoppingCart className="text-[#2d1a45]" size={20} />
          </div>
        </div>

        <div className="flex items-center">
          <img src="/next.svg" alt="Zain Logo" className="h-12 ml-2" />
          <Menu className="text-white hover:text-gray-200 transition-colors cursor-pointer" size={24} />
        </div>
      </header>

      {/* Main Content */}
      <div className="p-5">
        <div className="flex items-center mb-6">
          <ArrowRight className="text-[#2d1a45] mr-2" size={20} />
          <h2 className="text-2xl font-bold text-[#2d1a45]">{source === "/" ? "الدفع السريع" : "صفحة غير متاحة"}</h2>
        </div>

        {/* Tabs - Only show if on payment page */}
        {source === "/" && (
          <div className="flex border-b mb-8 bg-white rounded-t-lg shadow-sm">
            <button
              className={cn(
                "flex-1 py-4 text-center font-medium transition-all duration-200",
                selectedTab === "bill"
                  ? "border-b-4 border-[#d13c8c] text-[#d13c8c] bg-pink-50/50"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50",
              )}
              onClick={() => setSelectedTab("bill")}
            >
              <div className="flex items-center justify-center">
                <CreditCard className="mr-2" size={18} />
                دفع الفاتورة
              </div>
            </button>
            <button
              className={cn(
                "flex-1 py-4 text-center font-medium transition-all duration-200",
                selectedTab === "recharge"
                  ? "border-b-4 border-[#d13c8c] text-[#d13c8c] bg-pink-50/50"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50",
              )}
              onClick={() => setSelectedTab("recharge")}
            >
              <div className="flex items-center justify-center">
                <Phone className="mr-2" size={18} />
                إعادة تعبئة eeZee
              </div>
            </button>
          </div>
        )}

        {/* Maintenance Message */}
        {showMessage ? (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="bg-yellow-50 p-4 rounded-full mb-4">
                {reason === "rate-limited" ? (
                  <AlertTriangle className="h-12 w-12 text-yellow-500" />
                ) : (
                  <Info className="h-12 w-12 text-yellow-500" />
                )}
              </div>
              <h3 className="text-xl font-bold text-[#2d1a45] mb-2">
                {reason === "rate-limited" ? "تم تجاوز الحد المسموح من الطلبات" : "نعتذر عن الإزعاج"}
              </h3>
              <p className="text-gray-600 mb-4">
                {reason === "rate-limited"
                  ? "لقد قمت بإرسال الكثير من الطلبات في وقت قصير. يرجى المحاولة مرة أخرى بعد دقيقة."
                  : "النظام غير متاح حالياً بسبب أعمال الصيانة الدورية. يرجى المحاولة مرة أخرى لاحقاً أو زيارة أحد فروعنا."}
              </p>
              <div className="w-full max-w-xs">
                <img
                  src="/placeholder.svg?height=200&width=300"
                  alt="Maintenance"
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <p className="text-sm text-gray-500 mt-4">نقدر تفهمكم ونعتذر عن أي إزعاج قد يسببه ذلك.</p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6 flex justify-center items-center min-h-[300px]">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-12 w-12 bg-gray-200 rounded-full mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        )}

        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-bold text-[#2d1a45] mb-4">تواصل معنا</h3>

          <div className="space-y-4">
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-[#d13c8c] ml-3" />
              <div>
                <p className="font-medium">خدمة العملاء</p>
                <p className="text-gray-600">107</p>
              </div>
            </div>

            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-[#d13c8c] ml-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <div>
                <p className="font-medium">البريد الإلكتروني</p>
                <p className="text-gray-600">info@zain.com</p>
              </div>
            </div>

            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-[#d13c8c] ml-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <div>
                <p className="font-medium">الفروع</p>
                <p className="text-gray-600">ابحث عن أقرب فرع</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 mt-8 mb-4">
          <p>© {new Date().getFullYear()} Zain. جميع الحقوق محفوظة</p>
        </div>
      </div>
    </div>
  )
}
