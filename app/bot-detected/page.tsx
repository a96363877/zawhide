import { ShieldAlert } from "lucide-react"

export default function BotDetectedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6 text-center">
      <ShieldAlert className="h-16 w-16 text-gray-400 mx-auto mb-4" />
      <h1 className="text-2xl font-bold text-gray-700 mb-2">صفحة غير متاحة</h1>
      <p className="text-gray-500">هذه الصفحة غير متاحة حالياً.</p>
    </div>
  )
}
