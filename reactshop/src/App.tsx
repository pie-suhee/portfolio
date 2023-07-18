import { FC } from 'react';
import Layout from './layout';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from "./components/index";
import ProductDetail from "./components/productDetail";
import Category from "./components/category";
import Cart from "./components/Cart/index";
import NotFound from "./components/notFound";
import './App.scss';

const App: FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/fashion" element={<Category />} />
          <Route path="/accessory" element={<Category />} />
          <Route path="/digital" element={<Category />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="grocery" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
