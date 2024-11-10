import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterUser from "./pages/registerUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterUser />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
