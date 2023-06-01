import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Create from "./pages/create";
import View from "./pages/view";
import Practice from "./pages/practice";
import Results from "./pages/results";
import Login from "./pages/login";
import Edit from "./pages/edit";

function App() {
  return (
    <div>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/view" element={<View />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/results" element={<Results />} />
          <Route path="/login" element={<Login />} />
          <Route path="/edit" element={<Edit />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
