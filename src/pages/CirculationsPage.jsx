import axios from "axios";
import { differenceInHours, format } from "date-fns";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { id } from "date-fns/locale";

export default function CirculationsPage() {
  const [circulations, setCirculations] = useState([]);
  useEffect(() => {
    axios.get("/circulations").then((response) => {
      setCirculations(response.data);
    });
  }, []);

  const onReturn = (e, id) => {
    e.preventDefault();
    axios
      .patch("/circulations/return/" + id, {
        returnDate: Date.now(),
        isReturned: true,
      })
      .then(() => {
        axios.get("/circulations").then((response) => {
          setCirculations(response.data);
        });
      });
  };

  const onCancelReturn = (e, id) => {
    e.preventDefault();
    axios
      .patch("/circulations/return/" + id, {
        returnDate: null,
        isReturned: false,
      })
      .then(() => {
        axios.get("/circulations").then((response) => {
          setCirculations(response.data);
        });
      });
  };

  return (
    <div>
      <div className="flex gap-2">
        <Link to="..">Kembali</Link>
        <Link to="/circulations/checkout">Peminjaman</Link>
      </div>
      <h1 className="text-3xl font-semibold">Sirkulasi</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>No</th>
            <th>ID</th>
            <th>Nama</th>
            <th>Judul</th>
            <th>Tanggal Pinjam</th>
            <th>Kembali</th>
            <th>Tanggal Kembali</th>
          </tr>
        </thead>
        <tbody>
          {circulations?.map((transaction, index) => (
            <tr key={transaction._id}>
              <td>{index + 1}</td>
              <td>{transaction._id}</td>
              <td>{transaction.userId.name}</td>
              <td>{transaction.bookId?.title || "Buku tidak tersedia"}</td>
              <td>
                {format(
                  new Date(transaction.checkOutDate),
                  "eeee, dd MMMM yyyy",
                  { locale: id }
                )}
              </td>
              <td>{transaction.isReturned ? "Sudah" : "Belum"}</td>
              <td>
                {transaction.returnDate
                  ? format(
                      new Date(transaction.returnDate),
                      "eeee, dd MMMM yyyy",
                      { locale: id }
                    )
                  : "-"}
              </td>
              <td>
                {!transaction.isReturned && (
                  <Link onClick={(e) => onReturn(e, transaction._id)}>
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
                        d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                      />
                    </svg>
                  </Link>
                )}
                {transaction.isReturned &&
                  differenceInHours(
                    Date.now(),
                    new Date(transaction.returnDate)
                  ) < 2 && (
                    <Link onClick={(e) => onCancelReturn(e, transaction._id)}>
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </Link>
                  )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
