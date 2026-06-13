export default function AuthLayout({
  title,
  subtitle,
  heroTitle,
  heroText,
  heroEmoji = "📚",
  children,
}) {
  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.08)] overflow-hidden grid md:grid-cols-2 border border-neutral-200">
        <div className="hidden md:flex flex-col justify-between bg-[#0a0a0a] text-white p-10 lg:p-12">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-8">
              Personal Book Manager
            </p>

            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
              {heroTitle}
            </h1>

            <p className="text-neutral-400 text-lg leading-relaxed max-w-sm">
              {heroText}
            </p>
          </div>

          <div className="text-7xl opacity-90">{heroEmoji}</div>
        </div>

        <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0a0a0a] mb-2">
              {title}
            </h2>
            <p className="text-neutral-500 text-base sm:text-lg">{subtitle}</p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
