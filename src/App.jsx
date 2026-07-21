import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";



import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Layout from "./Layout";

// Pages
import Home from "./pages/Home";
import Contact from "./pages/Contact";

import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Story from "./pages/Story";
import Shop from "./pages/Shop";
import Guides from "./pages/Guides";
import Faqs from "./pages/Faqs";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import { CartProvider } from "./Context/CartContext";

function App() {
  const location = useLocation();

  return (
    <>

      <ScrollToTop />

      <main>
        <AnimatePresence mode="wait">
          <CartProvider>
            <Header />
            <Toaster />
            <Routes location={location} key={location.pathname}>

              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/our-story" element={<Story />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/brew-guides" element={<Guides />} />
                <Route path="/faqs" element={<Faqs />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogDetail />} />
                <Route path="/contact" element={<Contact />} />

                <Route
                  path="/product/:slug"
                  element={<ProductDetail />}
                />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route
                  path="/order-success"
                  element={<OrderSuccess />}
                />

              </Route>
            </Routes>
          </CartProvider>
        </AnimatePresence>
      </main>

      <Footer />

    </>
  );
}

export default App;