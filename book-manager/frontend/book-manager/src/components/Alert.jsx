export default function Alert({ type = "error", message }) {
  if (!message) return null;

  const styles =
    type === "success"
      ? "bg-emerald-50 text-emerald-800 border-emerald-200"
      : "bg-red-50 text-red-800 border-red-200";

  return (
    <p
      className={`mb-6 rounded-xl border px-4 py-3 text-sm sm:text-base ${styles}`}
      role="alert"
    >
      {message}
    </p>
  );
}
