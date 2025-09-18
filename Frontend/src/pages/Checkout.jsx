import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import OrderDetails from "./checkout/OrderDetails";
import BillingDetails from "./checkout/BillingDetails";
import PaymentDetails from "./checkout/PaymentDetails";

const Checkout = () => {
  const { state } = useAppContext();
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState(null);
  
  // Debug logging
  console.log("Checkout - Cart state:", state.cart);
  console.log("Checkout - Cart length:", state.cart?.length);

  useEffect(() => {
    console.log("Checkout - Component mounted");
  }, []);

  const [orderData, setOrderData] = useState({
    items: state.cart || [],
    billing: {
      name: "",
      contactNumber: "",
      email: ""
    },
    payment: {
      method: "card"
    }
  });

  const steps = [
    { id: 1, title: "Order Details" },
    { id: 2, title: "Billing Details" },
    { id: 3, title: "Make Payment" }
  ];

  const handleNext = (data) => {
    setOrderData(prev => ({ ...prev, ...data }));
    setCurrentStep(prev => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  // Step content with components
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <OrderDetails orderData={orderData} onNext={handleNext} />;
      case 2:
        return <BillingDetails orderData={orderData} onNext={handleNext} onPrevious={handlePrevious} />;
      case 3:
        return <PaymentDetails orderData={orderData} onPrevious={handlePrevious} />;
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <div className="page-content bg-white">
      <div className="container" style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px" }}>
        {/* Progress Bar */}
        <div style={{ marginBottom: "40px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {steps.map((step, index) => (
              <div key={step.id} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: currentStep >= step.id ? "#4c1864" : "#f0f0f0",
                  color: currentStep >= step.id ? "white" : "#666",
                  fontWeight: "bold",
                  fontSize: "14px"
                }}>
                  {step.id}
                </div>
                <div style={{ flex: 1, marginLeft: "10px" }}>
                  <div style={{
                    fontWeight: "bold",
                    color: currentStep >= step.id ? "#4c1864" : "#666",
                    fontSize: "14px"
                  }}>
                    {step.title}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div style={{
                    flex: 1,
                    height: "2px",
                    backgroundColor: currentStep > step.id ? "#4c1864" : "#f0f0f0",
                    margin: "0 10px"
                  }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        {renderStepContent()}
      </div>
    </div>
  );
};

export default Checkout; 