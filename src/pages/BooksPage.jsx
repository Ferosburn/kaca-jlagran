import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    axios.get("/books").then((response) => {
      setBooks(response.data);
    });
  }, []);

  return (
    <div>
      <div className="flex gap-2">
        <Link to="..">Kembali</Link>
        <Link to="/books/new">Buku Baru</Link>
      </div>
      <h1 className="text-3xl font-semibold">Buku</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>No</th>
            <th>ID</th>
            <th>Judul</th>
            <th>Penulis</th>
          </tr>
        </thead>
        <tbody>
          {books?.map((book, index) => (
            <tr key={book._id}>
              <td>{index + 1}</td>
              <td>{book._id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>
                <Link to={"/books/" + book._id}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
