import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login, Home, Register } from './Routes';
import Public from './components/Layout/Public';
import Checkout from './pages/Checkout/Checkout';
import Protected from './components/Layout/Protected';

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
        </Route>
        <Route element={<Protected />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
