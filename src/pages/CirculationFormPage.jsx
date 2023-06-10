import axios from "axios";
import { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";

export default function CirculationFormPage() {
  const [userId, setUserId] = useState("");
  const [bookId, setBookId] = useState("");
  const [redirect, setRedirect] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/circulations/checkout", {
      userId,
      bookId,
    });
    setRedirect("/circulations");
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <Link to={-1}>Kembali</Link>
      <h1 className="text-3xl font-semibold">Peminjaman</h1>
      <form onSubmit={onSubmit}>
        <h2>ID Peserta</h2>
        <input
          type="text"
          required
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <h2>ID Buku</h2>
        <input
          type="text"
          required
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
        />
        <button>Proses</button>
      </form>
    </div>
  );
}

// 64805fa1f5c35ab2cdc27e77
// 64807f330a6bc1b413385d33

// 64806da60a6bc1b413385ca9
// 6480723e0a6bc1b413385cca
