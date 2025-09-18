import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/custom.css"; // Import custom CSS overrides
import { AdminProvider } from "./context/AdminContext";
import ScrollToTop from "./components/ScrollToTop";
// Import page components
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Blog from "./pages/Blog";
import About from "./pages/About";
import DigitalProducts from "./pages/DigitalProducts";
import Membership from "./pages/Membership";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import BlogDetails1 from "./pages/BlogDetails1";
import BlogDetails2 from "./pages/BlogDetails2";
import BlogDetails3 from "./pages/BlogDetails3";
import BlogDetails4 from "./pages/BlogDetails4";
import BlogDetails5 from "./pages/BlogDetails5";
import BlogDetails6 from "./pages/BlogDetails6";
import CourseDetails from "./pages/CourseDetails";
import Checkout from "./pages/Checkout";
import FAQ from "./pages/FAQ";
import Events from "./pages/Events";
import Profile from "./pages/profile"; // Import the Profile component
import AdminPanel from "./pages/AdminPanel";
import ForgetPassword from "./pages/ForgetPassword";
import Search from "./pages/Search";
// Import Outlet for nested routes
import { Outlet } from "react-router-dom";

// Main App component with routing
function App() {
  return (
    <AdminProvider>
      <Router>
        <ScrollToTop />
        <Routes>
        {/* Admin Panel route without Layout wrapper */}
        <Route path="/admin/*" element={<AdminPanel />} />
        
        {/* All other routes wrapped with Layout */}
        <Route path="/" element={<Layout><Outlet /></Layout>}>
          <Route index element={<Home />} />
          <Route path="courses" element={<Courses />} />
          <Route path="blog" element={<Blog />} />
          <Route path="about" element={<About />} />
          <Route path="digital-products" element={<DigitalProducts />} />
          <Route path="membership" element={<Membership />} />
          <Route path="login" element={<Login />} />
          <Route path="cart" element={<Cart />} />
          <Route path="register" element={<Register />} />
          <Route path="contact" element={<Contact />} />
          <Route path="blog-details1" element={<BlogDetails1 />} />
          <Route path="blog-details2" element={<BlogDetails2 />} />
          <Route path="blog-details3" element={<BlogDetails3 />} />
          <Route path="blog-details4" element={<BlogDetails4 />} />
          <Route path="blog-details5" element={<BlogDetails5 />} />
          <Route path="blog-details6" element={<BlogDetails6 />} />
          <Route path="course-details/:id" element={<CourseDetails />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="events" element={<Events />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="forget-password" element={<ForgetPassword />} />
          <Route path="profile" element={<Profile />} />
          <Route path="search" element={<Search />} />
          {/* 404 Not Found route */}
          <Route path="*" element={<NotFound />} />
        </Route>
        </Routes>
      </Router>
    </AdminProvider>
  );

}

export default App;
