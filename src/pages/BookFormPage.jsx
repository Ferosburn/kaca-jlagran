import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

export default function BookFormPage() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [redirect, setRedirect] = useState("");
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    axios.get("/books/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAuthor(data.author);
    });
  }, [id]);

  const onSave = async (e) => {
    e.preventDefault();
    if (id) {
      await axios.put("/books/" + id, {
        title,
        author,
      });
    } else {
      await axios.post("/books", {
        title,
        author,
      });
    }
    setRedirect("/books");
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <Link to={-1}>Kembali</Link>
      <h1 className="text-3xl font-semibold">Buku Baru</h1>
      <form onSubmit={onSave}>
        <h2>Judul</h2>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <h2>Penulis</h2>
        <input
          type="text"
          required
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button>Simpan</button>
      </form>
    </div>
  );
}
