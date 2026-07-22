import "./App.css";

// Admin 
import AdminLayout from "./admin/components/AdminLayout";
import ProtectedAdminRoute from "./admin/components/ProtectedAdminRoute";

import AdminLogin from "./admin/pages/AdminLogin";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminProducts from "./admin/pages/AdminProducts";
import AdminBlogs from "./admin/pages/AdminBlogs";
import AdminOrders from "./admin/pages/AdminOrders";

// React & Libraries
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";

// Context
import { CartProvider } from "./Context/CartContext";

// Layout
import Layout from "./Layout";

// Components
import Footer from "./components/Footer";
import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop";

// Pages
import Home from "./pages/Home";
import Story from "./pages/Story";
import Shop from "./pages/Shop";
import Shop2 from "./pages/Shop0";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Guides from "./pages/Guides";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Faqs from "./pages/Faqs";
import Contact from "./pages/Contact";

function App() {
  const location = useLocation();

  // Pages where Header & Footer should be hidden
  const hideLayout = ["/order-success", "/admin/login", "/admin", "/admin/products", "/admin/blogs", "/admin/orders",].includes(location.pathname);

  return (
    <>
      <ScrollToTop />

      <main>
        <AnimatePresence mode="wait">
          <CartProvider>
            {!hideLayout && <Header />}
            <Toaster />

            <Routes location={location} key={location.pathname}>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/our-story" element={<Story />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/shop-2" element={<Shop2 />} />
                <Route path="/brew-guides" element={<Guides />} />
                <Route path="/faqs" element={<Faqs />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/product/:slug" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-success" element={<OrderSuccess />} />

                {/* Admin login */}
                <Route path="/admin/login" element={<AdminLogin />} />

                {/* Protected admin routes */}
                <Route path="/admin" element={
                    <ProtectedAdminRoute>
                      <AdminLayout />
                    </ProtectedAdminRoute>
                  }
                >

                  <Route index element={<AdminDashboard />} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="blogs" element={<AdminBlogs />} />
                  <Route path="orders" element={<AdminOrders />} />
                </Route>
                
              </Route>
            </Routes>
          </CartProvider>
        </AnimatePresence>
      </main>

      {!hideLayout && <Footer />}
    </>
  );
}

export default App;