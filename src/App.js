import "./App.css";
import Products from "./components/Products.jsx";

import { Routes, Route, HashRouter } from "react-router-dom";
function App() {
  return (
    <HashRouter>
      <Routes className="App">
        <Route path="/" element={<Products />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
