import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

export default function UserFormPage() {
  const [name, setName] = useState("");
  const [redirect, setRedirect] = useState("");
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    axios.get("/users/" + id).then((response) => {
      const { data } = response;
      setName(data.name);
    });
  }, [id]);

  const onSave = async (e) => {
    e.preventDefault();
    if (id) {
      await axios.patch("/users/" + id, {
        name,
      });
    } else {
      await axios.post("/users", {
        name,
      });
    }
    setRedirect("/users");
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <Link to={-1}>Kembali</Link>
      <h1 className="text-3xl font-semibold">Peserta Baru</h1>
      <form onSubmit={onSave}>
        <h2>Nama</h2>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button>Simpan</button>
      </form>
    </div>
  );
}
