/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route, Routes } from "@solidjs/router";

import "./index.css";
import App from "./App";
import NavBar from "./components/NavBar";

const root = document.getElementById("root");

render(
  () => (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" component={App} />
      </Routes>
    </Router>
  ),
  root!,
);
