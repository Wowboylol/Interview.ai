import { Routes, Route } from "react-router-dom";
import Main from "./pages/home";
import Create from "./pages/create";

function App() {
  return (
    <div>
      <div>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
