import React from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BackToTop from "./BackToTop";
import FloatingChatbot from "./FloatingChatbot";

// Layout component wraps all pages with navbar and footer
const Layout = ({ children }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {/* Navbar on every page */}
      <Navbar />
      {/* Main content */}
      <main style={{ 
        paddingTop: isAuthPage ? '0' : '70px',
        marginTop: isAuthPage ? '0' : '0'
      }}>
        {children}
      </main>
      {/* Footer on every page */}
      {!isAuthPage && <Footer />}
      {/* Back to Top button on every page */}
      {!isAuthPage && <BackToTop />}
      {/* Floating Chatbot on every page */}
      <FloatingChatbot />
    </>
  );
};

export default Layout; 