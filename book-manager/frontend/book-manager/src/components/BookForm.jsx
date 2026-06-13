import { useState, useEffect } from "react";

const STATUS_OPTIONS = ["Want To Read", "Reading", "Completed"];

const fieldClass =
  "w-full border border-neutral-200 rounded-xl py-3 px-4 outline-none focus:border-[#0a0a0a] focus:ring-1 focus:ring-[#0a0a0a] transition bg-white text-[#0a0a0a] placeholder:text-neutral-400";

const BookForm = ({ onSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    tags: "",
    status: "Want To Read",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        title: "",
        author: "",
        tags: "",
        status: "Want To Read",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.title.trim() || !formData.author.trim()) {
      setError("Title and author are required.");
      return;
    }

    onSubmit({
      title: formData.title.trim(),
      author: formData.author.trim(),
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      status: formData.status,
    });

    if (!initialData) {
      setFormData({
        title: "",
        author: "",
        tags: "",
        status: "Want To Read",
      });
    }
  };

  return (
    <section className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-[#0a0a0a]">
          {initialData ? "Edit book" : "Add a book"}
        </h3>
        <p className="text-neutral-500 text-sm mt-1">
          {initialData
            ? "Update details or change reading status."
            : "Log a new title to your personal collection."}
        </p>
      </div>

      {error && (
        <p className="mb-4 text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm">
          {error}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid gap-5 sm:grid-cols-2"
      >
        <div>
          <label className="block text-sm font-semibold mb-2">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Book title"
            value={formData.title}
            onChange={handleChange}
            className={fieldClass}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Author</label>
          <input
            type="text"
            name="author"
            placeholder="Author name"
            value={formData.author}
            onChange={handleChange}
            className={fieldClass}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Tags</label>
          <input
            type="text"
            name="tags"
            placeholder="fiction, classic"
            value={formData.tags}
            onChange={handleChange}
            className={fieldClass}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Reading status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={fieldClass}
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2 flex flex-wrap gap-3 pt-1">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-[#0a0a0a] text-white font-semibold hover:bg-neutral-800 transition"
          >
            {initialData ? "Update book" : "Save book"}
          </button>

          {initialData && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 rounded-xl border border-neutral-200 text-[#0a0a0a] font-medium hover:bg-neutral-50 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
};

export default BookForm;
