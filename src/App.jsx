import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Info from "./info/page";
import End from "./end/End"; 

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/info" element={<Info />} />
        <Route path="/end" element={<End />} /> 
      </Routes>
    </BrowserRouter>
  );
}