import React, { useState } from "react";
import { useCart } from "../../context/CartContext";

const PaymentDetails = () => {
  const { selectedCourse, billingDetails, paymentDetails, updatePaymentDetails, goToStep, clearCart, resetCheckout } = useCart();
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const handleInputChange = (field, value) => {
    updatePaymentDetails({ [field]: value });
  };

  const handlePrevious = () => {
    goToStep('billing');
  };

  const createOrder = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
      const token = userInfo.token;
      if (!token) {
        alert('Please log in to complete your purchase');
        return false;
      }

      // Calculate amount properly - ensure it's a number
      let amount = 0;
      if (selectedCourse.price === "Free" || selectedCourse.price === 0) {
        amount = 0;
      } else {
        // Remove ₹ symbol and convert to number if needed
        amount = typeof selectedCourse.price === 'string' 
          ? parseFloat(selectedCourse.price.replace('₹', '').replace(',', ''))
          : parseFloat(selectedCourse.price);
      }

      const orderData = {
        courseId: selectedCourse._id,
        amount: amount
      };

      console.log('Creating order with data:', orderData);

      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      const data = await response.json();
      console.log('Order response:', data);

      if (response.ok) {
        return data.order;
      } else {
        throw new Error(data.message || 'Failed to create order');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Error creating order: ' + error.message);
      return false;
    }
  };

  const handlePayNow = async () => {
    setProcessing(true);

    try {
      // Create order in database
      const order = await createOrder();
      
      if (order) {
        // Simulate payment processing delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Clear cart and show success
        clearCart();
        goToStep('confirmation');
        
        // Optional: You could update the order status to completed here
        // await updateOrderStatus(order._id, 'completed');
        
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div>
      {/* Course and Billing Summary */}
      {selectedCourse && (
        <div style={{ marginBottom: "30px" }}>
          <h3 style={{ color: "#333", marginBottom: "15px" }}>Order Summary</h3>
          <div style={{ 
            padding: "20px", 
            backgroundColor: "#f8f9fa", 
            borderRadius: "8px",
            border: "1px solid #ddd"
          }}>
            {/* Course Info */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: "15px", paddingBottom: "15px", borderBottom: "1px solid #ddd" }}>
              <img 
                src={selectedCourse.imageUrl || selectedCourse.img || "/assets/images/courses/course1.jpg"} 
                alt={selectedCourse.title}
                style={{ 
                  width: "60px", 
                  height: "45px", 
                  objectFit: "cover", 
                  borderRadius: "6px",
                  marginRight: "15px"
                }}
              />
              <div style={{ flex: 1 }}>
                <h5 style={{ margin: "0 0 5px 0", color: "#333" }}>{selectedCourse.title}</h5>
                <p style={{ margin: "0", color: "#666", fontSize: "14px" }}>
                  {selectedCourse.instructor || selectedCourse.provider || "Insta Education"}
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ margin: "0", fontWeight: "bold", color: "#4c1864", fontSize: "18px" }}>
                  {selectedCourse.price === 0 || selectedCourse.price === "Free" ? "Free" : `₹${selectedCourse.price}`}
                </p>
              </div>
            </div>

            {/* Billing Info */}
            <div>
              <h5 style={{ margin: "0 0 10px 0", color: "#333" }}>Billing Information</h5>
              <p style={{ margin: "3px 0", color: "#666", fontSize: "14px" }}>
                <strong>Name:</strong> {billingDetails.name}
              </p>
              <p style={{ margin: "3px 0", color: "#666", fontSize: "14px" }}>
                <strong>Email:</strong> {billingDetails.email}
              </p>
              <p style={{ margin: "3px 0", color: "#666", fontSize: "14px" }}>
                <strong>Phone:</strong> {billingDetails.phone}
              </p>
            </div>
          </div>
        </div>
      )}

      <h2 style={{ marginBottom: "25px" }}>Payment Details</h2>

      {/* Only show payment form for paid courses */}
      {selectedCourse.price !== "Free" && selectedCourse.price !== 0 ? (
        <div>
          {/* Payment Method Selection */}
          <div style={{ marginBottom: "25px" }}>
            <h4 style={{ marginBottom: "15px", color: "#333" }}>Select Payment Method</h4>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "flex", alignItems: "center", cursor: "pointer", marginBottom: "10px" }}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  style={{ marginRight: "10px" }}
                />
                Credit/Debit Card
              </label>
              <label style={{ display: "flex", alignItems: "center", cursor: "pointer", marginBottom: "10px" }}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={paymentMethod === "upi"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  style={{ marginRight: "10px" }}
                />
                UPI
              </label>
              <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="netbanking"
                  checked={paymentMethod === "netbanking"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  style={{ marginRight: "10px" }}
                />
                Net Banking
              </label>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ marginBottom: "25px" }}>
          <div style={{ 
            padding: "20px", 
            backgroundColor: "#d4edda", 
            borderRadius: "8px",
            border: "1px solid #c3e6cb",
            textAlign: "center"
          }}>
            <h4 style={{ color: "#155724", margin: "0 0 10px 0" }}>🎉 Free Course!</h4>
            <p style={{ color: "#155724", margin: "0", fontSize: "14px" }}>
              This course is completely free. Click "Enroll Now" to get started!
            </p>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "30px" }}>
        <button
          onClick={handlePrevious}
          disabled={processing}
          style={{
            padding: "12px 24px",
            backgroundColor: processing ? "#cccccc" : "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: processing ? "not-allowed" : "pointer"
          }}
        >
          Back to Billing
        </button>
        
        <button
          onClick={handlePayNow}
          disabled={processing}
          style={{
            padding: "15px 30px",
            backgroundColor: processing ? "#cccccc" : "#28a745",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "18px",
            fontWeight: "700",
            cursor: processing ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}
        >
          {processing ? (
            <>
              <span>⏳</span>
              Creating Order...
            </>
          ) : (
            <>
              <span>💳</span>
              {selectedCourse.price === "Free" || selectedCourse.price === 0 ? "Enroll Now" : `Pay ₹${selectedCourse.price}`}
            </>
          )}
        </button>
      </div>

      {/* Disclaimer for demo */}
      <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#fff3cd", borderRadius: "6px", border: "1px solid #ffeaa7" }}>
        <p style={{ margin: "0", fontSize: "12px", color: "#856404" }}>
          <strong>Note:</strong> This is a demo application. No real payment will be processed. 
          The order will be created in the database for testing purposes.
        </p>
      </div>
    </div>
  );
};

export default PaymentDetails;