import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

// Navbar component with proper styling
const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { state } = useAppContext();
  
  // Get cart item count
  const cartItemCount = state.cart ? state.cart.length : 0;

  // Effect to check login status from localStorage
  useEffect(() => {
    const checkLoginStatus = () => {
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo) {
        try {
          const parsedUserInfo = JSON.parse(userInfo);
          setIsLoggedIn(true);
          setUserName(parsedUserInfo.name || parsedUserInfo.email);
        } catch (e) {
          console.error("Failed to parse userInfo from localStorage", e);
          setIsLoggedIn(false);
          setUserName("");
          localStorage.removeItem('userInfo');
        }
      } else {
        setIsLoggedIn(false);
        setUserName("");
      }
    };

    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setIsLoggedIn(false);
    setUserName("");
    navigate('/');
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results page or implement search functionality
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setShowSearch(false);
    }
  };

  // Toggle search bar
  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (showSearch) {
      setSearchQuery("");
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Navigation handler with scroll to top
  const handleNavigation = (path) => {
    scrollToTop();
    navigate(path);
  };

  return (
    <header className="header rs-nav" style={{ 
      background: '#1e1e1e !important', 
      backgroundColor: '#1e1e1e !important',
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0, 
      zIndex: 1000,
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      height: '72px'
    }}>
      {/* Main Navbar */}
              <div className="sticky-header navbar-expand-lg" style={{ background: '#1e1e1e !important' }}>
          <div className="menu-bar clearfix" style={{ background: '#1e1e1e !important' }}>
                        <div className="container clearfix" style={{ 
              maxWidth: '1200px', 
              margin: '0 auto', 
              padding: '0 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '72px',
              background: '#1e1e1e !important'
            }}>
              {/* Header Logo */}
              <div className="menu-logo" style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                <button onClick={() => handleNavigation('/')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', height: '100%' }}>
                  <img src="assets/images/logo-white.png" alt="Logo" style={{ maxHeight: '50px', width: 'auto', objectFit: 'contain' }} />
                </button>
              </div>
              {/* Mobile Nav Button */}
              <button className="navbar-toggler collapsed menuicon justify-content-end" type="button">
                <span></span>
                <span></span>
                <span></span>
              </button>
              {/* Navigation Menu - Left Side */}
              <nav className="menu-links navbar-collapse collapse justify-content-start" id="menuDropdown">
                <ul className="nav navbar-nav" style={{ display: 'flex', alignItems: 'center', margin: 0, padding: 0, listStyle: 'none' }}>
                                  <li style={{ margin: '0 8px' }}><button onClick={() => handleNavigation('/courses')} style={{ color: '#fff', textDecoration: 'none', fontWeight: '500', fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer' }}>COURSES</button></li>
                <li style={{ margin: '0 8px' }}><button onClick={() => handleNavigation('/blog')} style={{ color: '#fff', textDecoration: 'none', fontWeight: '500', fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer' }}>BLOG</button></li>
                <li style={{ margin: '0 8px' }}><button onClick={() => handleNavigation('/about')} style={{ color: '#fff', textDecoration: 'none', fontWeight: '500', fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer' }}>ABOUT US</button></li>
                <li style={{ margin: '0 8px' }}><button onClick={() => handleNavigation('/events')} style={{ color: '#fff', textDecoration: 'none', fontWeight: '500', fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer' }}>EVENTS</button></li>
                <li style={{ margin: '0 8px' }}><button onClick={() => handleNavigation('/faq')} style={{ color: '#fff', textDecoration: 'none', fontWeight: '500', fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer' }}>FAQ</button></li>
                </ul>
              </nav>
              {/* Search Bar - Right Side */}
              <div className="search-section" style={{ display: 'flex', alignItems: 'center', marginRight: '15px' }}>
                {showSearch ? (
                  <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search courses, events, blogs..."
                      style={{
                        padding: '8px 12px',
                        borderRadius: '20px',
                        border: 'none',
                        outline: 'none',
                        fontSize: '14px',
                        width: '250px',
                        backgroundColor: '#fff',
                        color: '#333'
                      }}
                      autoFocus
                    />
                    <button
                      type="submit"
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#fff',
                        marginLeft: '8px',
                        cursor: 'pointer'
                      }}
                    >
                      <i className="fa fa-search"></i>
                    </button>
                    <button
                      type="button"
                      onClick={toggleSearch}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#fff',
                        marginLeft: '8px',
                        cursor: 'pointer'
                      }}
                    >
                      <i className="fa fa-times"></i>
                    </button>
                  </form>
                ) : (
                  <button
                    onClick={toggleSearch}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#fff',
                      cursor: 'pointer',
                      fontSize: '16px'
                    }}
                  >
                    <i className="fa fa-search"></i>
                  </button>
                )}
              </div>

              {/* Login/Register Links - Right Side */}
              <div className="auth-links" style={{ display: 'flex', alignItems: 'center' }}>
                {isLoggedIn ? (
                  <>
                                    <button onClick={() => handleNavigation('/profile')} style={{ color: '#fff', textDecoration: 'none', fontWeight: '500', fontSize: '14px', margin: '0 8px', background: 'none', border: 'none', cursor: 'pointer' }}>Hi, {userName}</button>
                <button onClick={() => { handleLogout(); handleNavigation('/'); }} style={{ color: '#fff', textDecoration: 'none', fontWeight: '500', fontSize: '14px', margin: '0 8px', background: 'none', border: 'none', cursor: 'pointer' }}>Logout</button>
                  </>
                ) : (
                  <>
                                      <button onClick={() => handleNavigation('/login')} style={{ color: '#fff', textDecoration: 'none', fontWeight: '500', fontSize: '14px', margin: '0 8px', background: 'none', border: 'none', cursor: 'pointer' }}>LOGIN</button>
                  <button onClick={() => handleNavigation('/register')} style={{ color: '#fff', textDecoration: 'none', fontWeight: '500', fontSize: '14px', margin: '0 8px', background: 'none', border: 'none', cursor: 'pointer' }}>REGISTER</button>
                  </>
                )}
                {/* Cart Icon with Badge */}
                <button onClick={() => handleNavigation('/checkout')} style={{ color: '#fff', marginLeft: '15px', position: 'relative', textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer' }}>
                  <i className="fa fa-shopping-cart" style={{ fontSize: '18px' }}></i>
                  {cartItemCount > 0 && (
                    <span style={{
                      position: 'absolute',
                      top: '-8px',
                      right: '-8px',
                      background: '#e74c3c',
                      color: '#fff',
                      borderRadius: '50%',
                      width: '18px',
                      height: '18px',
                      fontSize: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold'
                    }}>
                      {cartItemCount}
                    </span>
                  )}
                </button>
              </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
