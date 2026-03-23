import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Info from "./info/page";
import End from "./end/End"; 
import Record from "./record/page"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/info" element={<Info />} />
      <Route path="/end" element={<End />} /> 
      <Route path="/record" element={<Record />} /> 
    </Routes>
  );
}