import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Games from "./pages/Games";
import GameDetail from "./pages/GameDetail";
import About from "./pages/About";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/games/:slug" element={<GameDetail />} />
        <Route path="/tentang" element={<About />} />
        <Route path="*" element={<GameDetail />} />
      </Routes>
    </Layout>
  );
}
