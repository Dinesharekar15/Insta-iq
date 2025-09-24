import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import BillingDetails from "./checkout/BillingDetails";
import PaymentDetails from "./checkout/PaymentDetails";

const Checkout = () => {
  const { cartItems, selectedCourse, currentStep, goToStep, selectCourse, removeFromCart } = useCart();
  const [error, setError] = useState(null);

  // Handle individual course "Buy Now" selection
  const handleSelectCourse = (course) => {
    selectCourse(course);
    goToStep('billing'); // Move to billing step after course selection
  };

  // Handle remove course from cart
  const handleRemoveCourse = (courseId) => {
    removeFromCart(courseId);
  };

  // Render cart step with individual course selection
  const renderCartStep = () => (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "30px", color: "#fff" }}>Select Course to Purchase</h2>
      
      {cartItems.length > 0 ? (
        <div>
          <p style={{ marginBottom: "20px", color: "#666" }}>
            Choose which course you want to purchase:
          </p>
          
          {cartItems.map((course, index) => (
            <div key={course._id || index} style={{ 
              display: "flex",
              padding: "20px", 
              border: "2px solid #e0e0e0", 
              marginBottom: "15px",
              borderRadius: "12px",
              backgroundColor: "#f9f9f9",
              position: "relative",
              alignItems: "center"
            }}>
              <img 
                src={course.imageUrl || course.img || "/assets/images/courses/course1.jpg"} 
                alt={course.title}
                style={{ 
                  width: "120px", 
                  height: "80px", 
                  objectFit: "cover", 
                  borderRadius: "8px",
                  marginRight: "20px"
                }}
                onError={(e) => {
                  e.target.src = "/assets/images/courses/course1.jpg";
                }}
              />
              
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: "0 0 8px 0", color: "#333", fontSize: "18px" }}>
                  {course.title}
                </h4>
                <p style={{ margin: "0 0 8px 0", color: "#666", fontSize: "14px" }}>
                  {course.instructor || course.provider || "Insta Education"}
                </p>
                <p style={{ margin: "0 0 15px 0", fontWeight: "bold", color: "#4c1864", fontSize: "16px" }}>
                  {course.price === 0 || course.price === "Free" ? "Free" : `₹${course.price}`}
                </p>
                
                {/* Buy Now Button */}
                <button
                  onClick={() => handleSelectCourse(course)}
                  style={{
                    background: "#4c1864",
                    color: "white",
                    border: "none",
                    padding: "12px 24px",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.3s ease"
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = "#3f189a";
                    e.target.style.transform = "translateY(-2px)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = "#4c1864";
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  Buy Now
                </button>
              </div>
              
              {/* Remove Button */}
              <button
                onClick={() => handleRemoveCourse(course._id)}
                style={{
                  position: "absolute",
                  top: "15px",
                  right: "15px",
                  background: "#e74c3c",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "30px",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "bold"
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#c0392b";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "#e74c3c";
                }}
                title="Remove from cart"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <h3 style={{ color: "#666" }}>Your cart is empty</h3>
          <p style={{ color: "#999", marginBottom: "20px" }}>Add some courses to get started!</p>
          <a 
            href="/courses" 
            style={{
              display: "inline-block",
              padding: "12px 24px",
              background: "#4c1864",
              color: "white",
              textDecoration: "none",
              borderRadius: "8px",
              fontWeight: "600"
            }}
          >
            Browse Courses
          </a>
        </div>
      )}
    </div>
  );

  // Step content with components
  const renderStepContent = () => {
    switch (currentStep) {
      case 'cart':
        return renderCartStep();
      case 'billing':
        return <BillingDetails />;
      case 'payment':
        return <PaymentDetails />;
      case 'confirmation':
        return (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <div style={{ fontSize: "48px", color: "#28a745", marginBottom: "20px" }}>✓</div>
            <h2 style={{ color: "#28a745", marginBottom: "15px" }}>Order Placed Successfully!</h2>
            <p style={{ color: "#666", marginBottom: "20px" }}>
              Thank you for your purchase. You will receive a confirmation email shortly.
            </p>
            <a 
              href="/profile" 
              style={{
                display: "inline-block",
                padding: "12px 24px",
                background: "#4c1864",
                color: "white",
                textDecoration: "none",
                borderRadius: "8px",
                fontWeight: "600",
                marginRight: "10px"
              }}
            >
              View My Orders
            </a>
            <a 
              href="/courses" 
              style={{
                display: "inline-block",
                padding: "12px 24px",
                background: "#28a745",
                color: "white",
                textDecoration: "none",
                borderRadius: "8px",
                fontWeight: "600"
              }}
            >
              Continue Shopping
            </a>
          </div>
        );
      default:
        return renderCartStep();
    }
  };

  // Progress steps for all 3 steps
  const getProgressSteps = () => {
    return [
      { id: 'cart', title: "Order Details", active: currentStep === 'cart', completed: currentStep !== 'cart' },
      { id: 'billing', title: "Billing Details", active: currentStep === 'billing', completed: ['payment', 'confirmation'].includes(currentStep) },
      { id: 'payment', title: "Payment Details", active: currentStep === 'payment', completed: currentStep === 'confirmation' }
    ];
  };

  return (
    <div className="page-content bg-white">
      <div className="container" style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px" }}>
        
        {/* Header */}
        <div style={{ marginBottom: "30px", textAlign: "center" }}>
          <h1 style={{ color: "#333", marginBottom: "10px" }}>
            {currentStep === 'cart' ? 'Step 1 - Order Details' : 
             currentStep === 'billing' ? 'Step 2 - Billing Details' :
             currentStep === 'payment' ? 'Step 3 - Payment Details' : 'Order Complete'}
          </h1>
          {selectedCourse && currentStep !== 'cart' && (
            <p style={{ color: "#666", fontSize: "16px" }}>
              Purchasing: <strong>{selectedCourse.title}</strong>
            </p>
          )}
        </div>

        {/* Progress Bar - Show for all steps */}
        {getProgressSteps().length > 0 && (
          <div style={{ marginBottom: "40px" }}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              {getProgressSteps().map((step, index) => (
                <div key={step.id} style={{ display: "flex", alignItems: "center" }}>
                  <div style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: step.completed ? "#28a745" : step.active ? "#4c1864" : "#f0f0f0",
                    color: (step.active || step.completed) ? "white" : "#666",
                    fontWeight: "bold",
                    fontSize: "14px"
                  }}>
                    {step.completed ? "✓" : index + 1}
                  </div>
                  <div style={{ marginLeft: "10px", marginRight: "20px" }}>
                    <div style={{
                      fontWeight: "bold",
                      color: step.completed ? "#28a745" : step.active ? "#4c1864" : "#666",
                      fontSize: "14px"
                    }}>
                      {step.title}
                    </div>
                  </div>
                  {index < getProgressSteps().length - 1 && (
                    <div style={{
                      width: "50px",
                      height: "2px",
                      backgroundColor: step.completed ? "#28a745" : "#f0f0f0",
                      marginRight: "20px"
                    }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step Content */}
        {renderStepContent()}
      </div>
    </div>
  );
};

export default Checkout; 