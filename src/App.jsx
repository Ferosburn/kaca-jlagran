import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import BooksPage from "./pages/BooksPage";
import UsersPage from "./pages/UsersPage";
import CirculationsPage from "./pages/CirculationsPage";
import axios from "axios";
import BookFormPage from "./pages/BookFormPage";
import UserFormPage from "./pages/UserFormPage";
import CirculationFormPage from "./pages/CirculationFormPage";

// axios.defaults.baseURL =
//   "http://127.0.0.1:5001/kaca-jlagran-api/asia-southeast2/api/";
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/books" element={<BooksPage />} />
      <Route path="/books/new" element={<BookFormPage />} />
      <Route path="/books/:id" element={<BookFormPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/users/new" element={<UserFormPage />} />
      <Route path="/users/:id" element={<UserFormPage />} />
      <Route path="/circulations" element={<CirculationsPage />} />
      <Route path="/circulations/checkout" element={<CirculationFormPage />} />
    </Routes>
  );
}

export default App;
