import { useEffect, useState } from "react";

import API from "../services/api";
import Navbar from "../components/Navbar";
import BookForm from "../components/BookForm";
import BookCard from "../components/BookCard";
import StatCard from "../components/StatCard";
import Alert from "../components/Alert";

const STATUS_OPTIONS = ["All", "Want To Read", "Reading", "Completed"];

const selectClass =
  "w-full sm:w-auto min-w-[180px] border border-neutral-200 bg-white rounded-xl py-3 px-4 outline-none focus:border-[#0a0a0a] focus:ring-1 focus:ring-[#0a0a0a] text-sm font-medium";

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [tagFilter, setTagFilter] = useState("All");
  const [editingBook, setEditingBook] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      setError("");
      const res = await API.get("/books");
      setBooks(res.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load your books. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const addBook = async (bookData) => {
    try {
      setError("");
      await API.post("/books", bookData);
      await fetchBooks();
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to add book. Please try again."
      );
    }
  };

  const deleteBook = async (id) => {
    try {
      setError("");
      await API.delete(`/books/${id}`);
      await fetchBooks();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to delete book. Please try again."
      );
    }
  };

  const updateBook = async (bookData) => {
    try {
      setError("");
      await API.put(`/books/${editingBook._id}`, bookData);
      setEditingBook(null);
      await fetchBooks();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to update book. Please try again."
      );
    }
  };

  const totalBooks = books.length;
  const readingBooks = books.filter((b) => b.status === "Reading").length;
  const completedBooks = books.filter((b) => b.status === "Completed").length;
  const wantToReadBooks = books.filter(
    (b) => b.status === "Want To Read"
  ).length;

  const uniqueTags = [
    ...new Set(books.flatMap((book) => book.tags || [])),
  ].filter(Boolean);

  const filteredBooks = books.filter((book) => {
    const statusMatch =
      statusFilter === "All" ? true : book.status === statusFilter;

    const tagMatch =
      tagFilter === "All" ? true : book.tags?.includes(tagFilter);

    return statusMatch && tagMatch;
  });

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
        <Navbar />

        <section>
          <p className="text-xs uppercase tracking-[0.18em] text-neutral-400 mb-2">
            Dashboard
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0a0a0a]">
            Surface insight, not noise
          </h2>
          <p className="text-neutral-500 mt-2 max-w-2xl">
            Let your reading data speak gently — total books, status breakdown,
            and a collection you can filter with clarity.
          </p>
        </section>

        <Alert message={error} />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total books" value={totalBooks} emoji="📚" />
          <StatCard label="Reading" value={readingBooks} emoji="📘" />
          <StatCard label="Completed" value={completedBooks} emoji="✅" />
          <StatCard label="Want to read" value={wantToReadBooks} emoji="📖" />
        </div>

        {editingBook ? (
          <BookForm
            initialData={{
              ...editingBook,
              tags: editingBook.tags?.join(", ") || "",
            }}
            onSubmit={updateBook}
            onCancel={() => setEditingBook(null)}
          />
        ) : (
          <BookForm onSubmit={addBook} />
        )}

        <section className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-[#0a0a0a]">My books</h3>
              <p className="text-neutral-500 text-sm mt-1">
                Filter by status or tag to find what matters.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={selectClass}
              >
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status === "All" ? "All statuses" : status}
                  </option>
                ))}
              </select>

              <select
                value={tagFilter}
                onChange={(e) => setTagFilter(e.target.value)}
                className={selectClass}
              >
                <option value="All">All tags</option>
                {uniqueTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center">
              <p className="text-neutral-500">Loading your collection...</p>
            </div>
          ) : filteredBooks.length === 0 ? (
            <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center">
              <p className="text-5xl mb-4">📭</p>
              <p className="text-[#0a0a0a] font-semibold text-lg">
                {books.length === 0
                  ? "Your shelf is empty"
                  : "No books match these filters"}
              </p>
              <p className="text-neutral-500 mt-2 max-w-md mx-auto">
                {books.length === 0
                  ? "Add your first book above to start building your personal library."
                  : "Try adjusting your status or tag filters."}
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredBooks.map((book) => (
                <BookCard
                  key={book._id}
                  book={book}
                  onDelete={deleteBook}
                  onEdit={setEditingBook}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
