import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App";
import NavBar from "./components/NavBar";
import LogIn from "./pages/LogIn";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import UserPage from "./pages/UserPage";
import NewAssignment from "./pages/NewAssignment";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/logIn" element={<LogIn />} />
        <Route path="/profile" element={<UserPage />} />
        <Route path="/assignment/new" element={<NewAssignment />} />
        {/* Default route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
