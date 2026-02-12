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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      console.error("Error creating book:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this book?")) return;
    await axios.delete(`${API}/${id}`, { withCredentials: true });
    setBooks(books.filter((book) => book._id !== id));
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
    try {
      await axios.patch(`${API}/${id}`, editForm, { withCredentials: true });
      await fetchBooks();
      setEditId(null);
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const handleEditCancel = () => {
    setEditId(null);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-3xl bg-white border rounded-2xl p-5">
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
          className="cursor-pointer bg-sky-500 hover:bg-sky-600 text-white px-3 py-2 mx-1 rounded-4xl"
        >
          Save new book
        </button>
      </form>
      <table className="w-full border-separate">
        <thead>
          <tr className="text-center font-bold bg-gray-200">
            <th className="border rounded-tl-lg p-2">Title</th>
            <th className="border p-2">Author</th>
            <th className="border p-2">Year</th>
             <th className="border p-2">Genre</th>
            <th className="border rounded-tr-lg p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id} className="bg-white">
              {editId === book._id ? (
                <>
                  <td className="border p-2 ">
                    <input
                      value={editForm.title}
                      onChange={handleEditChange}
                      name="title"
                      className="bg-white w-24 px-2 rounded border"
                    />
                  </td>
                  <td className="border p-2 ">
                    <input
                      value={editForm.author}
                      onChange={handleEditChange}
                      name="author"
                      className="bg-white w-24 px-2 rounded border"
                    />
                  </td>
                  <td className="border p-2 ">
                    <input
                      value={editForm.year}
                      onChange={handleEditChange}
                      name="year"
                      className="bg-white w-24 px-2 rounded border"
                    />
                  </td>
                     <td className="border p-2 ">
                    <input
                      value={editForm.genre}
                      onChange={handleEditChange}
                      name="genre"
                      className="bg-white w-24 px-2 rounded border"
                    />
                  </td>
                  <td className="border p-2 ">
                    <button
                      onClick={() => handleEditSave(user._id)}
                      className="cursor-pointer bg-teal-400 hover:bg-teal-500 text-white px-2 rounded-xl"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleEditCancel}
                      className="cursor-pointer bg-gray-400 hover:bg-gray-500 text-white px-2 rounded-xl"
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="border p-2 ">{book.title}</td>
                  <td className="border p-2 ">{book.author}</td>
                  <td className="border p-2 ">{book.year}</td>
                  <td className="border p-2 ">{book.genre}</td>
                  <td className="border p-2 flex justify-center gap-4">
                    <button
                      onClick={() => handleEdit(book)}
                      className="cursor-pointer bg-teal-400 hover:bg-teal-500 text-white px-5 rounded-xl"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(book._id)}
                      className="cursor-pointer bg-rose-400 hover:bg-rose-500 text-white px-2 rounded-xl"
                    >
                      Delete
                    </button>
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
