import { useEffect, useState } from "react";
import { AdminTable } from "../components/AdminTable";
import { BookTable } from "../components/BookTable";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

export default function Home() {
  const { user, authLoading, apiBase, apiBase2 } = useOutletContext();
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
      const res2 = await axios.get(apiBase2);
      setBooks(res2.data.data);
    } catch {
      alert("Failed to fetch books");
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchBooks();
  }, []);

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
                API={apiBase2}
              />
            ) : (
              <div>Log in to Book Management</div>
            )}
          </section>
        ) : view === "admin" ? (
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
              <div>Log in to User Management</div>
            )}
          </section>
        ) : null}
      </section>
      <footer className="bg-dark text-center py-4 mt-5">
        <p className="mb-0">&copy; 2026 Book Management. All Rights Reserved.</p>
    </footer>
    </div>
  );
}
