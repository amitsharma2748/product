import "./App.css";
import Products from "./components/Products.jsx";
import ProductDetails from "./components/ProductDetails.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes className="App">
        <Route path="/" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
