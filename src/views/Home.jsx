import { useEffect, useState, useCallback } from "react";
import { AdminTable } from "../components/AdminTable";
import { BookTable } from "../components/BookTable";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

export default function Home() {
  const { user, authLoading, apiBase, apiBase2 } = useOutletContext();
  const [view, setView] = useState(null);
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);

  // --- Pagination States ---
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(3); // จำนวนข้อมูลต่อ 1 หน้า

  const fetchUsers = async () => {
    if (!apiBase) return;
    try {
      const res = await axios.get(apiBase);
      setUsers(res.data.data);
    } catch {
      alert("Failed to fetch users");
    }
  };

  const fetchBooks = useCallback(async (page = 1) => {
    if (!apiBase2) return;
    try {
      // ส่ง query params: page และ limit ไปยัง backend
      const res2 = await axios.get(`${apiBase2}?page=${page}&limit=${pageSize}`);
      setBooks(res2.data.data || []);
      
      // อัปเดตข้อมูลจำนวนหน้าทั้งหมดจาก backend (ถ้ามีส่งกลับมา)
      if (res2.data.totalPages) {
        setTotalPages(res2.data.totalPages);
      }
      setCurrentPage(page);
    } catch {
      console.error("Failed to fetch books");
    }
  }, [apiBase2, pageSize]);

  useEffect(() => {
    fetchUsers();
    fetchBooks(1); // เริ่มต้นที่หน้า 1
  }, [fetchBooks]);

  return (
    <div className="min-h-screen p-6 gap-y-6 flex flex-col justify-start w-full bg-white">
      <section className="mt-20 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">Book Management</h1>
        <h3 className="text-3xl text-gray-400 mt-2">Innovate AI</h3>
      </section>

      <section className="flex justify-center gap-x-3 font-bold mt-8">
        <button
          onClick={() => setView("book")}
          className={`p-4 px-8 rounded-2xl cursor-pointer border transition-all ${
            view === "book" ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-600"
          }`}
        >
          BOOK TABLE
        </button>
        {/* <button
          onClick={() => setView("admin")}
          className={`p-4 px-8 rounded-2xl cursor-pointer border transition-all ${
            view === "admin" ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-600"
          }`}
        >
          ADMIN TABLE
        </button> */}
      </section>

      <section className="w-full flex flex-col items-center justify-center max-w-5xl mx-auto">
            {view === "book" ? (
          <div className="w-full flex flex-col items-center space-y-6">
            <section className="w-full p-5">
              {authLoading ? (
                <div className="text-center py-10">Checking user auth...</div>
              ) : user ? (
                <BookTable
                  books={books}
                  setBooks={setBooks}
                  fetchBooks={() => fetchBooks(currentPage)}
                  API={apiBase2}
                />
              ) : (
                <div className="text-center py-10 text-gray-400 font-medium">Log in to Book Management</div>
              )}
            </section>

            {/* --- Pagination Controls --- */}
            {user && books.length > 0 && (
              <div className="flex items-center gap-x-4 mb-10 py-4 border-t border-gray-50 w-full justify-center">
                <button
                  disabled={currentPage === 1}
                  onClick={() => fetchBooks(currentPage - 1)}
                  className="px-4 py-2 bg-gray-100 rounded-xl disabled:opacity-30 font-bold hover:bg-gray-200 transition-colors"
                >
                  Previous
                </button>
                <span className="text-sm font-bold text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => fetchBooks(currentPage + 1)}
                  className="px-4 py-2 bg-gray-100 rounded-xl disabled:opacity-30 font-bold hover:bg-gray-200 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        ) : view === "admin" ? (
          <section className="w-full p-5 flex">
            {authLoading ? (
              <div className="text-center py-10">Checking user auth...</div>
            ) : user ? (
              <AdminTable
                users={users}
                setUsers={setUsers}
                fetchUsers={fetchUsers}
                API={apiBase}
              />
            ) : (
              <div className="text-center py-10 text-gray-400 font-medium w-full">Log in to User Management</div>
            )}
          </section>
        ) : null}
      </section>

        <footer className="text-center py-10 mt-auto border-t border-gray-50">
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
          &copy; 2026 All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
