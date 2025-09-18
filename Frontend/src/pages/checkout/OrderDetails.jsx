import React from "react";
import { useAppContext } from "../../context/AppContext";

const OrderDetails = ({ orderData, onNext }) => {
  const { state, dispatch } = useAppContext();
  
  console.log("OrderDetails - Component mounted");
  console.log("OrderDetails - Cart state:", state.cart);

  // Calculate actual cart total
  const calculateCartTotal = () => {
    if (!state.cart || state.cart.length === 0) return 0;
    let total = 0;
    state.cart.forEach(item => {
      if (item.price && item.price !== "Free") {
        // Extract numbers from price string (e.g., "₹1,999" -> 1999)
        const priceStr = item.price.toString();
        const price = parseInt(priceStr.replace(/[^\d]/g, "")) || 0;
        total += price;
      }
    });
    return total;
  };

  const cartTotal = calculateCartTotal();

  // Function to remove item from cart
  const removeFromCart = (itemToRemove) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: itemToRemove.cartId || itemToRemove._id });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Order Details</h2>
      
      <div style={{ marginBottom: "20px" }}>
        <p><strong>Cart Items:</strong> {state.cart ? state.cart.length : 0}</p>
      </div>

      {state.cart && state.cart.length > 0 ? (
        <div>
          <h3>Items in Cart:</h3>
          {state.cart.map((item, index) => (
            <div key={index} style={{ 
              display: "flex",
              padding: "15px", 
              border: "1px solid #ddd", 
              marginBottom: "10px",
              borderRadius: "8px",
              backgroundColor: "#f8f9fa",
              position: "relative"
            }}>
              <img 
                src={item.imageUrl || item.img || "/assets/images/courses/course1.jpg"} 
                alt={item.title}
                style={{ 
                  width: "80px", 
                  height: "60px", 
                  objectFit: "cover", 
                  borderRadius: "6px",
                  marginRight: "15px"
                }}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              <div style={{ flex: 1 }}>
                <h5 style={{ margin: "0 0 5px 0", color: "#333", fontSize: "16px" }}>{item.title}</h5>
                <p style={{ margin: "0 0 5px 0", color: "#666", fontSize: "14px" }}>
                  {item.instructor || item.provider || "Insta Education"}
                </p>
                <p style={{ margin: 0, fontWeight: "bold", color: "#4c1864", fontSize: "14px" }}>Price: {item.price}</p>
              </div>
              {/* Remove Button */}
              <button
                onClick={() => removeFromCart(item)}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  background: "#e74c3c",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "24px",
                  height: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: "bold",
                  transition: "background-color 0.2s"
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
          
          {/* Cart Total Display */}
          <div style={{ marginBottom: "20px" }}>
            <div style={{
              padding: "15px",
              backgroundColor: "#f8f9fa",
              borderRadius: "8px",
              border: "1px solid #ddd"
            }}>
              <h4 style={{ color: "#333", marginBottom: "10px" }}>Cart Summary</h4>
              <p style={{ margin: "5px 0", color: "#333", fontSize: "14px" }}>
                <strong>Total Items:</strong> {state.cart.length}
              </p>
              <p style={{ margin: "5px 0", color: "#4c1864", fontSize: "16px", fontWeight: "bold" }}>
                <strong>Cart Total:</strong> ₹{cartTotal.toLocaleString()}
              </p>
            </div>
          </div>

          <button
            onClick={() => onNext({ 
              items: state.cart, 
              cartTotal: cartTotal
            })}
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
      ) : (
        <div>
          <p>No items in cart</p>
          <button
            onClick={() => onNext({ items: [], cartTotal: 0 })}
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
            Continue Anyway
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
