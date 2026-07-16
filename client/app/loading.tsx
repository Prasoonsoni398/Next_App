export default function Loading() {
  return (
    <div className="flex min-h-[80vh] w-full items-center justify-center">
      <div className="relative flex flex-col items-center justify-center">
        {/* Outer glowing ring */}
        <div className="absolute h-32 w-32 animate-spin rounded-full border-b-4 border-t-4 border-blue-500/80 shadow-[0_0_20px_rgba(59,130,246,0.4)]"></div>
        
        {/* Middle reverse-spinning ring */}
        <div className="absolute h-24 w-24 animate-[spin_1.5s_linear_infinite_reverse] rounded-full border-l-4 border-r-4 border-purple-500/80 shadow-[0_0_15px_rgba(168,85,247,0.4)]"></div>
        
        {/* Inner solid pulsing core */}
        <div className="h-12 w-12 animate-pulse rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 shadow-[0_0_20px_rgba(168,85,247,0.7)]"></div>
        
        {/* Loading Text with animated dots */}
        <div className="mt-12 flex items-center gap-2">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-2xl font-black uppercase tracking-[0.2em] text-transparent">
            Loading
          </span>
          <div className="flex gap-1.5 pt-1">
            <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.3s]"></span>
            <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-purple-500 [animation-delay:-0.15s]"></span>
            <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-blue-500"></span>
          </div>
        </div>
        
        {/* Subtle subtext */}
        <p className="mt-3 animate-pulse text-sm font-medium text-gray-400">
          Preparing your experience...
        </p>
      </div>
    </div>
  );
}
