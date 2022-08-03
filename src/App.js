import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import PlanHome from "./container/PlanHome";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact={true} element={<PlanHome />} />
      </Routes>
    </Router>
  );
}

export default App;
