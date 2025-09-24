import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [currentStep, setCurrentStep] = useState('cart');
  const [billingDetails, setBillingDetails] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [paymentDetails, setPaymentDetails] = useState({
    paymentMethod: 'credit-card',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    cardName: '',
    upiId: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    acceptTerms: false
  });
  const [orderSummary, setOrderSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load cart from localStorage on initialization
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever cartItems change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart
  const addToCart = (course) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item._id === course._id);
      if (existingItem) {
        return prevItems; // Don't add duplicate
      }
      return [...prevItems, { ...course, quantity: 1 }];
    });
  };

  // Remove item from cart
  const removeFromCart = (courseId) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== courseId));
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  // Update quantity (for future use)
  const updateQuantity = (courseId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(courseId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item._id === courseId ? { ...item, quantity } : item
      )
    );
  };

  // Get total price
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      return total + price;
    }, 0);
  };

  // Get total items count
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
  };

  // Check if item is in cart
  const isInCart = (courseId) => {
    return cartItems.some(item => item._id === courseId);
  };

  // Select course for individual purchase
  const selectCourse = useCallback((course) => {
    setSelectedCourse(course);
  }, []);

  // Clear selected course
  const clearSelectedCourse = useCallback(() => {
    setSelectedCourse(null);
  }, []);

  // Step management
  const goToStep = useCallback((step) => {
    setCurrentStep(step);
  }, []);

  const goToNextStep = useCallback(() => {
    const steps = ['cart', 'billing', 'payment', 'confirmation'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  }, [currentStep]);

  const goToPreviousStep = useCallback(() => {
    const steps = ['cart', 'billing', 'payment', 'confirmation'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  }, [currentStep]);

  // Update billing details
  const updateBillingDetails = useCallback((details) => {
    setBillingDetails(prev => ({ ...prev, ...details }));
  }, []);

  // Update payment details
  const updatePaymentDetails = useCallback((details) => {
    setPaymentDetails(prev => ({ ...prev, ...details }));
  }, []);

  // Validate billing details
  const validateBillingDetails = () => {
    const required = ['name', 'email', 'phone'];
    return required.every(field => billingDetails[field] && billingDetails[field].trim() !== '');
  };

  // Validate payment details
  const validatePaymentDetails = () => {
    if (!paymentDetails.acceptTerms) {
      return false;
    }

    switch (paymentDetails.paymentMethod) {
      case 'credit-card':
      case 'debit-card':
        return ['cardNumber', 'cardExpiry', 'cardCvv', 'cardName'].every(
          field => paymentDetails[field] && paymentDetails[field].trim() !== ''
        );
      case 'upi':
        return paymentDetails.upiId && paymentDetails.upiId.trim() !== '';
      case 'net-banking':
        return ['bankName', 'accountNumber', 'ifscCode'].every(
          field => paymentDetails[field] && paymentDetails[field].trim() !== ''
        );
      case 'free':
        return true;
      default:
        return false;
    }
  };

  // Reset checkout process
  const resetCheckout = () => {
    setCurrentStep('cart');
    setSelectedCourse(null);
    setBillingDetails({
      name: '',
      email: '',
      phone: ''
    });
    setPaymentDetails({
      paymentMethod: 'credit-card',
      cardNumber: '',
      cardExpiry: '',
      cardCvv: '',
      cardName: '',
      upiId: '',
      bankName: '',
      accountNumber: '',
      ifscCode: '',
      acceptTerms: false
    });
    setOrderSummary(null);
    setError(null);
  };

  const value = {
    // Cart state
    cartItems,
    selectedCourse,
    currentStep,
    billingDetails,
    paymentDetails,
    orderSummary,
    isLoading,
    error,

    // Cart actions
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity,
    isInCart,

    // Course selection
    selectCourse,
    clearSelectedCourse,

    // Calculations
    getTotalPrice,
    getTotalItems,

    // Step management
    goToStep,
    goToNextStep,
    goToPreviousStep,

    // Form management
    updateBillingDetails,
    updatePaymentDetails,
    validateBillingDetails,
    validatePaymentDetails,

    // Order management
    setOrderSummary,
    setIsLoading,
    setError,
    resetCheckout
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;