import axios from "axios";
import { useState } from "react";

export function BookTable({ books, setBooks, fetchBooks, API }) {
  const [form, setForm] = useState({
    title: "",
    author: "",
    year: "",
    genre: "",
  });

  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    author: "",
    year: "",
    genre: "",
  });

  // --- ส่วนที่เพิ่มใหม่: ฟังก์ชันสำหรับเช็คเงื่อนไขปี ---
  const validateYear = (year) => {
    const currentYear = new Date().getFullYear();
    const numYear = parseInt(year);

    if (numYear <= 0) {
      alert("ปีที่พิมพ์ต้องเป็นค่าบวกเท่านั้น");
      return false;
    }
    if (numYear > currentYear) {
      alert(`ปีที่พิมพ์ (${numYear}) ต้องไม่เกินปีปัจจุบัน (${currentYear})`);
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. ตรวจสอบเงื่อนไขที่ Frontend ก่อน
    if (!validateYear(form.year)) return;

    try {
      await axios.post(API, form, { withCredentials: true });
      await fetchBooks();
      // Reset the form
      setForm({
        title: "",
        author: "",
        year: "",
        genre: "",
      });
    } catch (error) {
      // 2. ถ้าหลุดไปถึง Backend แล้ว Error ให้แสดง Alert จากข้อความที่ Mongoose ส่งมา
      const serverError = error.response?.data?.message || error.message;
      alert(`ไม่สามารถบันทึกได้: ${serverError}`);
      console.error("Error creating book:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this book?")) return;
    try {
      await axios.delete(`${API}/${id}`, { withCredentials: true });
      setBooks(books.filter((book) => book._id !== id));
    } catch (error) {
      alert("Error deleting book:");
      console.error("Error deleting book:", error);
    }
  };

  const handleEdit = (book) => {
    setEditId(book._id);
    setEditForm({
      title: book.title,
      author: book.author,
      year: book.year,
      genre: book.genre,
    });
  };

  const handleEditSave = async (id) => {
    // 1. ตรวจสอบเงื่อนไขปีในโหมดแก้ไขด้วย
    if (!validateYear(editForm.year)) return;

    try {
      await axios.patch(`${API}/${id}`, editForm, { withCredentials: true });
      await fetchBooks();
      setEditId(null);
    } catch (error) {
      // 2. ดัก Error จาก Backend กรณีการแก้ไข
      const serverError = error.response?.data?.message || error.message;
      alert(`ไม่สามารถแก้ไขได้: ${serverError}`);
      console.error("Error updating book:", error);
    }
  };

  const handleEditCancel = () => {
    setEditId(null);
  };

  return (
    <div className="w-full md:max-w-4xl md:mx-auto overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
      <form onSubmit={handleSubmit} className="pb-3">
        <input
          onChange={handleChange}
          value={form.title}
          name="title"
          className="bg-white mx-1 w-32 px-2 rounded border"
          placeholder="Title"
        />
        <input
          onChange={handleChange}
          value={form.author}
          name="author"
          className="bg-white mx-1 w-32 px-2 rounded border"
          placeholder="Author"
        />
        <input
          onChange={handleChange}
          value={form.year}
          name="year"
          className="bg-white mx-1 w-32 px-2 rounded border"
          placeholder="Year"
        />
        <input
          onChange={handleChange}
          value={form.genre}
          name="genre"
          className="bg-white mx-1 w-32 px-2 rounded border"
          placeholder="Genre"
        />
        <button
          type="submit"
          className="cursor-pointer bg-sky-500 hover:bg-sky-600 text-white px-3 py-1 mx-1 rounded-4xl"
        >
          Save Book
        </button>
      </form>
      <table className="w-full border-collapse min-w-[600px] md:min-w-full text-sm md:text-base">
        <thead>
          <tr className="text-center font-bold bg-gray-50 text-gray-700">
            <th className="border-b p-3 md:p-4 text-left">Title</th>
            <th className="border-b p-3 md:p-4 text-left">Author</th>
            <th className="border-b p-3 md:p-4 text-center">Year</th>
            <th className="border-b p-3 md:p-4 text-center">Genre</th>
            <th className="border-b p-3 md:p-4 text-center">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {books.map((book) => (
            <tr key={book._id} className="hover:bg-gray-50 transition-colors">
              {editId === book._id ? (
                <>
                  <td className="p-2 ">
                    <input
                      value={editForm.title}
                      onChange={handleEditChange}
                      name="title"
                      className="w-full bg-white px-2 py-1 rounded border border-blue-300 outline-none focus:ring-2 focus:ring-blue-100"
                    />
                  </td>
                  <td className="p-2 ">
                    <input
                      value={editForm.author}
                      onChange={handleEditChange}
                      name="author"
                      className="w-full bg-white px-2 py-1 rounded border border-blue-300 outline-none focus:ring-2 focus:ring-blue-100"
                    />
                  </td>
                  <td className="p-2 text-center">
                    <input
                      value={editForm.year}
                      onChange={handleEditChange}
                      name="year"
                      className="w-16 bg-white px-1 py-1 rounded border border-blue-300 text-center"
                    />
                  </td>
                  <td className="p-2 text-center">
                    <input
                      value={editForm.genre}
                      onChange={handleEditChange}
                      name="genre"
                      className="w-20 bg-white px-1 py-1 rounded border border-blue-300 text-center"
                    />
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => handleEditSave(book._id)}
                      className="cursor-pointer bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded-lg text-xs font-bold transition-all"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleEditCancel}
                      className="cursor-pointer bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded-lg text-xs font-bold transition-all"
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="p-3 md:p-4 font-medium text-gray-800">
                    {book.title}
                  </td>
                  <td className="p-3 md:p-4 text-gray-600">{book.author}</td>
                  <td className="p-3 md:p-4 text-center text-gray-600">
                    {book.year}
                  </td>
                  <td className="p-3 md:p-4 text-center">
                    <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-md text-xs font-semibold">
                      {book.genre}
                    </span>
                  </td>
                  <td className="p-3 md:p-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(book)}
                        className="cursor-pointer bg-teal-500 hover:bg-teal-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm active:scale-95"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(book._id)}
                        className="cursor-pointer bg-rose-500 hover:bg-rose-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm active:scale-95"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
