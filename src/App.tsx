// Atlas-OS · foundation-v2 · widget canvas + Notion drill · nothing else
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthGate } from "./components/AuthGate";
import Home from "./pages/Home";
import Arm from "./pages/Arm";

export default function App() {
  return (
    <AuthGate>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/arm/:slug" element={<Arm />} />
        <Route path="/arm/:slug/:pageId" element={<Arm />} />
        <Route path="/manager" element={<Navigate to="/arm/manager" replace />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </AuthGate>
  );
}
