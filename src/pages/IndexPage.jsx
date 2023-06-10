import { Link } from "react-router-dom";

export default function IndexPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold">Kampung Baca Jlagran</h1>
      <div className="flex gap-2">
        <Link to="/books">Buku</Link>
        <Link to="/users">Peserta</Link>
        <Link to="/circulations">Sirkulasi</Link>
      </div>
    </div>
  );
}
