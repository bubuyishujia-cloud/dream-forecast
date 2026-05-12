export default function LoadingAnimation() {
  return (
    <div className="py-32">
      <div className="flex flex-col items-center justify-center space-y-8">
        <div className="w-16 h-16 border border-gray-300 relative">
          <div className="absolute inset-0 border-t border-gray-900 animate-spin"></div>
        </div>
        <p className="text-sm font-light text-gray-400 tracking-widest">
          ANALYZING
        </p>
      </div>
    </div>
  );
}
