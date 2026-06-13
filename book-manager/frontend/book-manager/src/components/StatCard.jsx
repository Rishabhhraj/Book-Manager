export default function StatCard({ label, value, emoji }) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-5 sm:p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-neutral-500 uppercase tracking-wide">
          {label}
        </p>
        <span className="text-2xl" aria-hidden="true">
          {emoji}
        </span>
      </div>
      <p className="mt-3 text-3xl sm:text-4xl font-bold text-[#0a0a0a]">
        {value}
      </p>
    </div>
  );
}
