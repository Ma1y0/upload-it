import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./pages/App";
import NavBar from "./components/NavBar";
import LogIn from "./pages/LogIn";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/logIn" element={<LogIn />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
