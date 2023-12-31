import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App";
import NavBar from "./components/NavBar";
import LogIn from "./pages/LogIn";
import UserPage from "./pages/UserPage";
import NewAssignment from "./pages/NewAssignment";
import Register from "./pages/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FillInAssignment from "./pages/FillInAssignment";
import { Toaster } from "react-hot-toast";
import AssignmentDetails from "./pages/AssignmentDetails";
// import AssignmentDetails from "./pages/AssignmentDetails";
// <Right>        <Route path="/assignment/:id" element={<AssignmentDetails />} />

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
            padding: "1rem",
          },
        }}
      />
      <NavBar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/logIn" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<UserPage />} />
        <Route path="/assignment/new" element={<NewAssignment />} />
        <Route path="/assignment/fill/:id" element={<FillInAssignment />} />
        <Route path="/assignment/details/:id" element={<AssignmentDetails />} />
        {/* Default route */}
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
