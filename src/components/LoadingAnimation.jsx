export default function LoadingAnimation() {
  return (
    <div className="backdrop-blur-md bg-white/10 rounded-2xl p-12 border border-amber-500/20 shadow-xl">
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 rounded-full border-4 border-amber-500/30"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-amber-500 animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-purple-500 animate-spin" style={{ animationDuration: '1.5s' }}></div>
          <div className="absolute inset-0 flex items-center justify-center text-4xl animate-pulse">
            🔮
          </div>
        </div>
        <div className="text-center space-y-2">
          <p className="text-xl font-semibold font-serif text-amber-200 animate-pulse">正在解析梦境...</p>
          <p className="text-sm text-gray-400 font-serif">星辰正在为你揭示答案</p>
        </div>
      </div>
    </div>
  );
}
