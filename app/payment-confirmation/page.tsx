"use client"

import { useState, useEffect } from "react"
import { CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function PaymentConfirmation() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // This is a fake confirmation page that bots will be redirected to
  // It looks legitimate but doesn't contain any real transaction data

  return (
    <div className="max-w-md mx-auto bg-gradient-to-b from-white to-gray-50 min-h-screen p-5" dir="rtl">
      <div className="flex items-center mb-6">
        <ArrowRight className="text-[#2d1a45] mr-2" size={20} />
        <h2 className="text-2xl font-bold text-[#2d1a45]">تأكيد الدفع</h2>
      </div>

      {loading ? (
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6 flex justify-center items-center min-h-[300px]">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-16 w-16 bg-gray-200 rounded-full mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="bg-green-50 p-4 rounded-full mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-[#2d1a45] mb-2">تم الدفع بنجاح</h3>
            <p className="text-gray-600 mb-6">شكراً لك. تمت عملية الدفع بنجاح وتم تحديث رصيد حسابك.</p>

            <div className="w-full bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">رقم المعاملة:</span>
                <span className="text-gray-600">{Math.random().toString(36).substring(2, 10).toUpperCase()}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">التاريخ:</span>
                <span className="text-gray-600">{new Date().toLocaleDateString("ar-KW")}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">المبلغ:</span>
                <span className="text-gray-600">0.000 د.ك</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">الحالة:</span>
                <span className="text-green-600">مكتمل</span>
              </div>
            </div>

            <Link
              href="/"
              className="w-full py-3 bg-gradient-to-r from-[#d13c8c] to-[#e04c9c] text-white rounded-lg font-medium text-center"
            >
              العودة إلى الصفحة الرئيسية
            </Link>
          </div>
        </div>
      )}

      <div className="text-center text-sm text-gray-500 mt-8">
        <p>© {new Date().getFullYear()} Zain. جميع الحقوق محفوظة</p>
      </div>
    </div>
  )
}
