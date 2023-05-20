import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Create from "./pages/create";
import View from "./pages/view";
import Practice from "./pages/practice";

function App() {
  return (
    <div>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/view" element={<View />} />
          <Route path="/practice" element={<Practice />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
