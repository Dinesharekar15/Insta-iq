import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";

const PaymentDetails = ({ orderData, onPrevious }) => {
  const { state, dispatch } = useAppContext();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [processing, setProcessing] = useState(false);

  const handleProceedToPayment = async () => {
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      // Clear cart after successful payment
      dispatch({ type: "CLEAR_CART" });
      setProcessing(false);
      
      // Show success message and redirect
      alert("Payment successful! You will be redirected to the homepage.");
      window.location.href = "/";
    }, 3000);
  };

  return (
    <div>
      <h2>Payment Details</h2>
      
             {/* Order Summary with Pricing */}
       <div style={{ marginBottom: "30px" }}>
         <h4 style={{ color: "#333", marginBottom: "15px" }}>Order Summary</h4>
         <div style={{ 
           padding: "20px", 
           backgroundColor: "#f8f9fa", 
           borderRadius: "8px",
           border: "1px solid #ddd"
         }}>
           <p style={{ margin: "8px 0", color: "#333", fontSize: "14px" }}>
             <strong style={{ color: "#4c1864" }}>Name:</strong> {orderData.billing?.name}
           </p>
           <p style={{ margin: "8px 0", color: "#333", fontSize: "14px" }}>
             <strong style={{ color: "#4c1864" }}>Email:</strong> {orderData.billing?.email}
           </p>
           <p style={{ margin: "8px 0", color: "#333", fontSize: "14px" }}>
             <strong style={{ color: "#4c1864" }}>Contact:</strong> {orderData.billing?.contactNumber}
           </p>
           <p style={{ margin: "8px 0", color: "#333", fontSize: "14px" }}>
             <strong style={{ color: "#4c1864" }}>Items:</strong> {orderData.items?.length || 0} course(s)
           </p>
           
                       {/* Pricing Breakdown */}
            <div style={{ marginTop: "15px", paddingTop: "15px", borderTop: "1px solid #ddd" }}>
              <p style={{ margin: "8px 0", color: "#333", fontSize: "14px" }}>
                <strong style={{ color: "#4c1864" }}>Cart Total:</strong> ₹{orderData.cartTotal?.toLocaleString() || 0}
              </p>
              {orderData.promoCode && (
                <>
                  <p style={{ margin: "8px 0", color: "#28a745", fontSize: "14px" }}>
                    <strong style={{ color: "#28a745" }}>Discount (10%):</strong> -₹{orderData.discount?.toLocaleString() || 0}
                  </p>
                  <p style={{ margin: "8px 0", color: "#4c1864", fontSize: "16px", fontWeight: "bold" }}>
                    <strong style={{ color: "#4c1864" }}>Final Total:</strong> ₹{orderData.finalTotal?.toLocaleString() || 0}
                  </p>
                  <p style={{ margin: "8px 0", color: "#666", fontSize: "12px" }}>
                    <em>Promo code applied: {orderData.promoCode}</em>
                  </p>
                </>
              )}
              {!orderData.promoCode && (
                <p style={{ margin: "8px 0", color: "#4c1864", fontSize: "16px", fontWeight: "bold" }}>
                  <strong style={{ color: "#4c1864" }}>Total Amount:</strong> ₹{orderData.cartTotal?.toLocaleString() || 0}
                </p>
              )}
            </div>
         </div>
       </div>

      {/* Payment Method Selection */}
      <div style={{ marginBottom: "30px" }}>
        <h4>Select Payment Method</h4>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
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
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
            <input
              type="radio"
              name="paymentMethod"
              value="upi"
              checked={paymentMethod === "upi"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              style={{ marginRight: "10px" }}
            />
            UPI Payment
          </label>
        </div>
        <div style={{ marginBottom: "15px" }}>
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

      {/* Navigation */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button
          onClick={onPrevious}
          style={{
            padding: "15px 30px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer"
          }}
        >
          Previous
        </button>
        <button
          onClick={handleProceedToPayment}
          disabled={processing}
          style={{
            padding: "15px 30px",
            backgroundColor: processing ? "#ccc" : "#4c1864",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: processing ? "not-allowed" : "pointer"
          }}
        >
          {processing ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
};

export default PaymentDetails;
