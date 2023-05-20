import { Routes, Route } from "react-router-dom";
import Main from "./pages/home";
import Create from "./pages/create";
import View from "./pages/view";

function App() {
  return (
    <div>
      <div>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/create" element={<Create />} />
          <Route path="/view" element={<View />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
