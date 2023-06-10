import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

export default function BookFormPage() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [redirect, setRedirect] = useState("");
  const [entryDate, setEntryDate] = useState("");
  const [classificationNumber, setClassificationNumber] = useState("");
  const [source, setSource] = useState("");
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    axios.get("/books/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAuthor(data.author);
      setEntryDate(format(new Date(data.entryDate), "yyyy-MM-dd"));
      setClassificationNumber(data.classificationNumber);
      setSource(data.source);
    });
  }, [id]);

  const onSave = async (e) => {
    e.preventDefault();
    if (id) {
      await axios.put("/books/" + id, {
        title,
        author,
        entryDate,
        classificationNumber,
        source,
      });
    } else {
      await axios.post("/books", {
        title,
        author,
        entryDate,
        classificationNumber,
        source,
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
        <h2>Tanggal Masuk</h2>
        <input
          type="date"
          required
          value={entryDate}
          onChange={(e) => setEntryDate(e.target.value)}
        />
        <h2>Nomor Klasifikasi (DDC)</h2>
        <input
          type="text"
          required
          value={classificationNumber}
          onChange={(e) => setClassificationNumber(e.target.value)}
        />
        <h2>Sumber</h2>
        <select
          value={source}
          onChange={(e) => setSource(e.target.value)}
          required
        >
          <option value="">Pilih Sumber</option>
          <option value="S">Sumbangan</option>
          <option value="P">Pembelian</option>
        </select>
        <button>Simpan</button>
      </form>
    </div>
  );
}
