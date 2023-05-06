import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login, Home, Register } from './Routes';
import Public from './components/Layout/Public';
import Checkout from './pages/Checkout/Checkout';
import Protected from './components/Layout/Protected';
import Products from './pages/Products/Products';
import Categories from './pages/Categories/Categories';
import ProductPage from './pages/Products/component/ProductPage';

// Create a client

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Public />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/products" element={<Products />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="*" element={<Home />} />
        </Route>
        <Route element={<Protected />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
