import { Routes, Route, Navigate } from "react-router-dom";
import Vault from "./pages/Vault.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Account from "./pages/Account.jsx";
import CreateCredentials from "./pages/CreateCredentials.jsx";
import Navbar from "./components/Navbar.jsx";
import { Toaster } from "react-hot-toast";

export default function App() {
  const hideNavbar = ["/login", "/register"];
  return (
    <main>
      {/*
      {!hideNavbar.includes(location.pathname) && <Navbar />}
      */}
      <Routes>
        <Route path="/" element={<Vault />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/credentials/create" element={<CreateCredentials />} />
        <Route path="/account" element={<Account />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
    </main>
  );
}
