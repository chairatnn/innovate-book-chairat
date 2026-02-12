import { useEffect, useState } from "react";
import { AdminTable } from "../components/AdminTable";
import { BookTable } from "../components/BookTable";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

export default function Home() {
  const { user, authLoading, apiBase } = useOutletContext();
  const [view, setView] = useState(null);
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(apiBase);
      setUsers(res.data.data);
    } catch {
      alert("Failed to fetch users");
    }
  };
    const fetchBooks = async () => {
    try {
      const res = await axios.get(apiBase);
      setBooks(res.data.data);
    } catch {
      alert("Failed to fetch books");
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchBooks();
  }, []);

  const askAi = async (e) => {
    e.preventDefault();
    const q = String(question || "").trim();

    if (!q) return;

    try {
      const response = await axios.post(
        `${apiBase}/auth/ai/ask`,
        { question: q, topK: 5 },
        { withCredentials: true },
      );
      console.log(response.data);
      setAskResult(response.data?.data || null);
      console.log(askResult);
    } catch (error) {
      const message =
        error?.response.data?.message ||
        error?.response.data?.error ||
        error?.response.data?.details ||
        error?.message;
      setAskError(message || "Failed to ask AI");
    } finally {
      setAskLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 gap-y-6 flex flex-col justify-start w-full">
      <section className="mt-20 text-5xl font-bold text-center">
        <h1>Book Management</h1>
        <h3>Innovate AI</h3>
      </section>
      <section className="flex justify-center gap-x-3 font-bold">
        <button
          onClick={() => setView("book")}
          className=" p-5 bg-gray-100 flex rounded-2xl cursor-pointer border hover:bg-gray-200"
        >
          BOOK TABLE
        </button>
        <button
          onClick={() => setView("admin")}
          className=" p-5 bg-gray-100 flex rounded-2xl cursor-pointer border hover:bg-gray-200"
        >
          ADMIN TABLE
        </button>
      </section>

      <section className="w-full flex justify-center gap-x-3">
        {view === "book" ? (
          <section className=" p-5 flex">
            {authLoading ? (
              <div>Checking user auth...</div>
            ) : user ? (
              <BookTable
                books={books}
                setBooks={setBooks}
                fetchBooks={fetchBooks}
                API={apiBase}
              />
            ) : (
              <div>Log in to Book Management</div>
            )}
          </section>
        ) : null}
      </section>
      <section className="w-full flex justify-center gap-x-3">
        {view === "admin" ? (
          <section className=" p-5 flex">
            {authLoading ? (
              <div>Checking user auth...</div>
            ) : user ? (
              <AdminTable
                users={users}
                setUsers={setUsers}
                fetchUsers={fetchUsers}
                API={apiBase}
              />
            ) : (
              <div>Log in to Admin Management</div>
            )}
          </section>
        ) : null}
      </section>
    </div>
  );
}
