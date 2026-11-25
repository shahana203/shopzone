import { Routes, Route } from "react-router-dom";
import Checkout from "./pages/Checkout";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import OrderSuccess from "./pages/OrderSuccess";
import Offers from "./pages/Offers";
import NewArrivals from "./pages/NewArrivals";
import Contact from "./pages/Contact";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/product/:id" element={<ProductDetails />} />

      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order-success" element={<OrderSuccess />} />
      <Route path="/offers" element={<Offers />} />
      <Route path="/new-arrivals" element={<NewArrivals />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

export default App;
