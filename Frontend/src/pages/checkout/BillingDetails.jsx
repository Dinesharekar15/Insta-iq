import React, { useState } from "react";

const BillingDetails = ({ orderData, onNext, onPrevious }) => {
  const [billingData, setBillingData] = useState({
    name: orderData.billing?.name || "Yadnyavalkya Kailas Dakhore",
    contactNumber: orderData.billing?.contactNumber || "9359882005",
    email: orderData.billing?.email || "yadnyavalkyakd.a04@gmail.com"
  });
  
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoMessage, setPromoMessage] = useState("");

  const handleInputChange = (field, value) => {
    setBillingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    onNext({ billing: billingData });
  };

  return (
    <div>
      <h2>Billing Details</h2>
      
      {/* Name Field */}
      <div style={{ marginBottom: "25px" }}>
        <label style={{ 
          display: "block", 
          marginBottom: "8px", 
          fontWeight: "600",
          color: "#333"
        }}>
          Name
        </label>
        <input
          type="text"
          value={billingData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            fontSize: "14px",
            backgroundColor: "#fff"
          }}
          placeholder="Enter your full name"
        />
      </div>

      {/* Contact Number Field */}
      <div style={{ marginBottom: "25px" }}>
        <label style={{ 
          display: "block", 
          marginBottom: "8px", 
          fontWeight: "600",
          color: "#333"
        }}>
          Contact Number
        </label>
        <input
          type="tel"
          value={billingData.contactNumber}
          onChange={(e) => handleInputChange("contactNumber", e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            fontSize: "14px",
            backgroundColor: "#fff"
          }}
          placeholder="Enter your contact number"
        />
      </div>

      {/* Email Field */}
      <div style={{ marginBottom: "30px" }}>
        <label style={{ 
          display: "block", 
          marginBottom: "8px", 
          fontWeight: "600",
          color: "#333"
        }}>
          Email Address
        </label>
        <input
          type="email"
          value={billingData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            fontSize: "14px",
            backgroundColor: "#fff"
          }}
          placeholder="Enter your email address"
        />
      </div>

                   {/* Promo Code Section */}
             <div style={{ marginBottom: "30px" }}>
               <h4 style={{ color: "#333", marginBottom: "15px" }}>Have a Promo Code?</h4>
               <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                 <input
                   type="text"
                   placeholder="Enter promo code (e.g., WELCOME10)"
                   value={promoCode}
                   onChange={(e) => setPromoCode(e.target.value)}
                   style={{
                     flex: 1,
                     padding: "12px",
                     border: "1px solid #ddd",
                     borderRadius: "6px",
                     fontSize: "14px"
                   }}
                 />
                 <button
                   onClick={() => {
                     if (promoCode.toLowerCase() === "welcome10") {
                       setPromoApplied(true);
                       setPromoMessage("Promo code applied! 10% discount added.");
                     } else {
                       setPromoApplied(false);
                       setPromoMessage("Invalid promo code. Try 'WELCOME10' for 10% off.");
                     }
                   }}
                   style={{
                     padding: "12px 20px",
                     backgroundColor: "#4c1864",
                     color: "white",
                     border: "none",
                     borderRadius: "6px",
                     cursor: "pointer",
                     fontWeight: "600",
                     fontSize: "14px"
                   }}
                 >
                   Apply
                 </button>
               </div>
               {promoMessage && (
                 <div style={{ 
                   padding: "10px", 
                   backgroundColor: promoApplied ? "#d4edda" : "#f8d7da", 
                   color: promoApplied ? "#155724" : "#721c24",
                   borderRadius: "6px",
                   fontSize: "14px"
                 }}>
                   {promoMessage}
                 </div>
               )}
             </div>

             {/* Price Summary */}
             <div style={{ marginBottom: "30px" }}>
               <div style={{
                 padding: "20px",
                 backgroundColor: "#f8f9fa",
                 borderRadius: "8px",
                 border: "1px solid #ddd"
               }}>
                 <h4 style={{ color: "#333", marginBottom: "15px" }}>Price Summary</h4>
                 <p style={{ margin: "8px 0", color: "#333", fontSize: "14px" }}>
                   <strong>Cart Total:</strong> ₹{orderData.cartTotal?.toLocaleString() || 0}
                 </p>
                                                     {promoApplied && (
                    <p style={{ margin: "8px 0", color: "#28a745", fontSize: "14px" }}>
                      <strong>Discount (10%):</strong> -₹{Math.round((orderData.cartTotal || 0) * 0.1).toLocaleString()}
                    </p>
                  )}
                  <p style={{ margin: "8px 0", color: "#4c1864", fontSize: "16px", fontWeight: "bold" }}>
                    <strong>Final Total:</strong> ₹{promoApplied ? 
                      (orderData.cartTotal - Math.round(orderData.cartTotal * 0.1)).toLocaleString() : 
                      orderData.cartTotal?.toLocaleString() || 0}
                  </p>
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
                  onClick={() => {
                    const discount = promoApplied ? Math.round(orderData.cartTotal * 0.1) : 0;
                    const finalTotal = orderData.cartTotal - discount;
                    onNext({
                      billing: billingData,
                      cartTotal: orderData.cartTotal,
                      discount: discount,
                      finalTotal: finalTotal,
                      promoCode: promoApplied ? promoCode : ""
                    });
                  }}
                 style={{
                   padding: "15px 30px",
                   backgroundColor: "#4c1864",
                   color: "white",
                   border: "none",
                   borderRadius: "8px",
                   fontSize: "16px",
                   fontWeight: "600",
                   cursor: "pointer"
                 }}
               >
                 Next
               </button>
             </div>
    </div>
  );
};

export default BillingDetails;
