export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-t-[#d13c8c] border-r-[#d13c8c] border-b-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-[#2d1a45] font-medium">جاري التحميل...</p>
      </div>
    </div>
  )
}
