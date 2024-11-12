import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterUser from "./pages/registerUser";
import LoginUser from "./pages/loginUser";
import PanelUser from "./pages/panelUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterUser />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/panel" element={<PanelUser />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
