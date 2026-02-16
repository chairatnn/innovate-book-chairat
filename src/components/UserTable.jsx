export function UserTable({ books }) {
  return (
    <div className="w-full md:max-w-4xl md:mx-auto overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
      <table className="w-full border-collapse min-w-[600px] md:min-w-full text-sm md:text-base">
        <thead>
          <tr className="text-center font-bold bg-gray-50 text-gray-700">
            <th className="border-b p-3 md:p-4 text-left">Title</th>
            <th className="border-b p-3 md:p-4 text-left">Author</th>
            <th className="border-b p-3 md:p-4 text-center">Year</th>
            <th className="border-b p-3 md:p-4 text-center">Genre</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {books.map((book) => (
            <tr key={book._id} className="hover:bg-gray-50 transition-colors">
              <td className="p-3 md:p-4 font-medium text-gray-800">{book.title}</td>
              <td className="p-3 md:p-4 text-gray-600">{book.author}</td>
              <td className="p-3 md:p-4 text-center text-gray-600">{book.year}</td>
              <td className="p-3 md:p-4 text-center">{book.genre}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
