import React, { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";

const BillingDetails = () => {
  const { selectedCourse, billingDetails, updateBillingDetails, goToStep } = useCart();
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: '', email: '', phone: '' });

  // Get user info from localStorage if logged in
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    const token = userInfo.token;
    
    console.log('Debug - Raw userInfo from localStorage:', userInfo);
    
    if (token && userInfo) {
      const userData = {
        name: userInfo.name || '',
        email: userInfo.email || '',
        phone: userInfo.mobile || '' // Backend sends 'mobile', not 'phone'
      };
      
      console.log('Debug - Extracted userData:', userData);
      setUserInfo(userData);
      updateBillingDetails(userData);
    }
  }, [updateBillingDetails]);

  const handleNext = () => {
    // Check if user is logged in
    const storedUserInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    const token = storedUserInfo.token;
    if (!token) {
      alert('Please log in to continue with your purchase');
      return;
    }

    // Validate that user info is available (check component state, not localStorage)
    if (!userInfo.name || !userInfo.email || !userInfo.phone) {
      console.log('Debug - userInfo state:', userInfo);
      console.log('Debug - storedUserInfo:', storedUserInfo);
      alert('User information is incomplete. Please update your profile or contact support.');
      return;
    }

    goToStep('payment');
  };

  const handlePrevious = () => {
    goToStep('cart');
  };

  return (
    <div>
      {/* Course Summary */}
      {selectedCourse && (
        <div style={{ marginBottom: "30px" }}>
          <h3 style={{ color: "#333", marginBottom: "15px" }}>Course Summary</h3>
          <div style={{ 
            padding: "20px", 
            backgroundColor: "#f8f9fa", 
            borderRadius: "8px",
            border: "1px solid #ddd",
            display: "flex",
            alignItems: "center"
          }}>
            <img 
              src={selectedCourse.imageUrl || selectedCourse.img || "/assets/images/courses/course1.jpg"} 
              alt={selectedCourse.title}
              style={{ 
                width: "80px", 
                height: "60px", 
                objectFit: "cover", 
                borderRadius: "6px",
                marginRight: "15px"
              }}
            />
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: "0 0 5px 0", color: "#333" }}>{selectedCourse.title}</h4>
              <p style={{ margin: "0 0 5px 0", color: "#666", fontSize: "14px" }}>
                {selectedCourse.instructor || selectedCourse.provider || "Insta Education"}
              </p>
              <p style={{ margin: "0", fontWeight: "bold", color: "#4c1864", fontSize: "18px" }}>
                {selectedCourse.price === 0 || selectedCourse.price === "Free" ? "Free" : `₹${selectedCourse.price}`}
              </p>
            </div>
          </div>
        </div>
      )}

      <h2 style={{ marginBottom: "25px" }}>Billing Information</h2>
      
      {/* Debug Info - Remove after testing */}
      <div style={{ 
        backgroundColor: "#fff3cd", 
        border: "1px solid #ffeaa7", 
        borderRadius: "4px", 
        padding: "10px", 
        marginBottom: "20px", 
        fontSize: "12px" 
      }}>
        <strong>Debug Info:</strong><br/>
        Name: "{userInfo.name}" | Email: "{userInfo.email}" | Phone: "{userInfo.phone}"
      </div>
      
      {/* User Information Display */}
      <div style={{ 
        backgroundColor: "#f8f9fa", 
        border: "1px solid #e9ecef", 
        borderRadius: "8px", 
        padding: "20px", 
        marginBottom: "20px" 
      }}>
        {/* Name Field */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ 
            display: "block", 
            marginBottom: "8px", 
            fontWeight: "600",
            color: "#495057",
            fontSize: "14px",
            textTransform: "uppercase",
            letterSpacing: "0.5px"
          }}>
            Full Name
          </label>
          <div style={{
            background: "white",
            border: "1px solid #ced4da",
            borderRadius: "4px",
            padding: "12px 15px",
            fontSize: "16px",
            color: "#333",
            minHeight: "20px"
          }}>
            {userInfo.name || 'Not available'}
          </div>
        </div>

        {/* Email Field */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ 
            display: "block", 
            marginBottom: "8px", 
            fontWeight: "600",
            color: "#495057",
            fontSize: "14px",
            textTransform: "uppercase",
            letterSpacing: "0.5px"
          }}>
            Email Address
          </label>
          <div style={{
            background: "white",
            border: "1px solid #ced4da",
            borderRadius: "4px",
            padding: "12px 15px",
            fontSize: "16px",
            color: "#333",
            minHeight: "20px"
          }}>
            {userInfo.email || 'Not available'}
          </div>
        </div>

        {/* Phone Field */}
        <div style={{ marginBottom: "0" }}>
          <label style={{ 
            display: "block", 
            marginBottom: "8px", 
            fontWeight: "600",
            color: "#495057",
            fontSize: "14px",
            textTransform: "uppercase",
            letterSpacing: "0.5px"
          }}>
            Phone Number
          </label>
          <div style={{
            background: "white",
            border: "1px solid #ced4da",
            borderRadius: "4px",
            padding: "12px 15px",
            fontSize: "16px",
            color: "#333",
            minHeight: "20px"
          }}>
            {userInfo.phone || 'Not available'}
          </div>
        </div>
      </div>

      {/* Info Note */}
      <p style={{
        color: "#6c757d",
        fontSize: "14px",
        fontStyle: "italic",
        textAlign: "center",
        marginBottom: "30px",
        padding: "10px",
        background: "#e9ecef",
        borderRadius: "4px"
      }}>
        This information is from your profile. If you need to update it, please visit your profile page.
      </p>

      {/* Navigation Buttons */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "30px" }}>
        <button
          onClick={handlePrevious}
          style={{
            padding: "12px 24px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "background-color 0.3s"
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#5a6268"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#6c757d"}
        >
          Back to Cart
        </button>
        
        <button
          onClick={handleNext}
          disabled={loading || !userInfo.name || !userInfo.email || !userInfo.phone}
          style={{
            padding: "12px 24px",
            backgroundColor: (loading || !userInfo.name || !userInfo.email || !userInfo.phone) ? "#cccccc" : "#4c1864",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: (loading || !userInfo.name || !userInfo.email || !userInfo.phone) ? "not-allowed" : "pointer",
            transition: "background-color 0.3s"
          }}
          onMouseOver={(e) => {
            if (!loading && userInfo.name && userInfo.email && userInfo.phone) {
              e.target.style.backgroundColor = "#3f189a";
            }
          }}
          onMouseOut={(e) => {
            if (!loading && userInfo.name && userInfo.email && userInfo.phone) {
              e.target.style.backgroundColor = "#4c1864";
            }
          }}
        >
          {loading ? "Processing..." : "Continue to Payment"}
        </button>
      </div>
    </div>
  );
};

export default BillingDetails;