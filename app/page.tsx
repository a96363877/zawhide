import Link from "next/link"
import { ArrowRight, CreditCard, Phone } from "lucide-react"

export default function HomePage() {
  return (
    <div className="max-w-md mx-auto bg-gradient-to-b from-white to-gray-50 min-h-screen p-5" dir="rtl">
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-bold text-[#2d1a45]">زين - الصفحة الرئيسية</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-xl font-bold text-[#2d1a45] mb-4">خدمات الدفع</h2>

        <div className="space-y-4">
          <Link href="/pay" className="block">
            <div className="p-4 border border-gray-200 rounded-lg hover:border-[#d13c8c] hover:bg-pink-50/30 transition-all">
              <div className="flex items-center">
                <div className="bg-[#d13c8c]/10 p-3 rounded-full mr-3">
                  <CreditCard className="h-6 w-6 text-[#d13c8c]" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-[#2d1a45]">صفحة الدفع</p>
                  <p className="text-sm text-gray-500">دفع الفواتير وإعادة التعبئة</p>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </Link>

          <Link href="/zain-payment" className="block">
            <div className="p-4 border border-gray-200 rounded-lg hover:border-[#d13c8c] hover:bg-pink-50/30 transition-all">
              <div className="flex items-center">
                <div className="bg-[#d13c8c]/10 p-3 rounded-full mr-3">
                  <Phone className="h-6 w-6 text-[#d13c8c]" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-[#2d1a45]">الدفع السريع</p>
                  <p className="text-sm text-gray-500">دفع سريع للفواتير</p>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-8">
        <p>© {new Date().getFullYear()} Zain. جميع الحقوق محفوظة</p>
      </div>
    </div>
  )
}
