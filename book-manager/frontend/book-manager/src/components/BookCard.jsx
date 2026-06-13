const STATUS_STYLES = {
  "Want To Read": "bg-amber-50 text-amber-800 border-amber-200",
  Reading: "bg-sky-50 text-sky-800 border-sky-200",
  Completed: "bg-emerald-50 text-emerald-800 border-emerald-200",
};

const BookCard = ({ book, onDelete, onEdit }) => {
  const statusClass =
    STATUS_STYLES[book.status] ||
    "bg-neutral-50 text-neutral-800 border-neutral-200";

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Delete "${book.title}" from your collection?`
    );

    if (confirmed) {
      onDelete(book._id);
    }
  };

  return (
    <article className="bg-white rounded-2xl border border-neutral-200 p-5 sm:p-6 hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="flex-1">
        <h3 className="text-lg font-bold text-[#0a0a0a] leading-snug">
          {book.title}
        </h3>

        <p className="text-neutral-500 mt-1">by {book.author}</p>

        <div className="mt-4">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${statusClass}`}
          >
            {book.status}
          </span>
        </div>

        {book.tags?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {book.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 bg-neutral-100 text-neutral-700 text-xs rounded-lg font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-5 pt-4 border-t border-neutral-100 flex gap-2">
        <button
          onClick={() => onEdit(book)}
          className="flex-1 py-2.5 rounded-xl border border-neutral-200 text-[#0a0a0a] text-sm font-semibold hover:bg-neutral-50 transition"
        >
          Edit
        </button>

        <button
          onClick={handleDelete}
          className="flex-1 py-2.5 rounded-xl bg-red-50 text-red-700 border border-red-200 text-sm font-semibold hover:bg-red-100 transition"
        >
          Delete
        </button>
      </div>
    </article>
  );
};

export default BookCard;
