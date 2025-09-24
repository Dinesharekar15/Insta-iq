import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Create context with default value to prevent null context issues
const CartContext = createContext({
  // Provide default values to prevent crashes
  cartItems: [],
  selectedCourse: null,
  currentStep: 'cart',
  billingDetails: { name: '', email: '', phone: '' },
  paymentDetails: { paymentMethod: 'credit-card' },
  purchasedCourses: [],
  addToCart: () => console.warn('addToCart called outside provider'),
  removeFromCart: () => console.warn('removeFromCart called outside provider'),
  clearCart: () => console.warn('clearCart called outside provider'),
  goToStep: () => console.warn('goToStep called outside provider'),
  isInCart: () => false,
  isPurchased: () => false,
  addPurchasedCourse: () => console.warn('addPurchasedCourse called outside provider'),
  loadPurchasedCourses: () => console.warn('loadPurchasedCourses called outside provider'),
  updateBillingDetails: () => console.warn('updateBillingDetails called outside provider'),
  updatePaymentDetails: () => console.warn('updatePaymentDetails called outside provider'),
});

export const CartProvider = ({ children }) => {
  console.log('CartProvider rendering...');
  const [cartItems, setCartItems] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [currentStep, setCurrentStep] = useState('cart');
  const [purchasedCourses, setPurchasedCourses] = useState(() => {
    // Try to load from localStorage first
    try {
      const saved = localStorage.getItem('purchasedCourses');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading purchased courses from localStorage:', error);
      return [];
    }
  });
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

  // Save purchased courses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('purchasedCourses', JSON.stringify(purchasedCourses));
  }, [purchasedCourses]);

  // Add item to cart
  const addToCart = (course) => {
    // Check if course is already purchased
    if (isPurchased(course._id)) {
      alert('You have already purchased this course!');
      return false;
    }

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item._id === course._id);
      if (existingItem) {
        alert('This course is already in your cart!');
        return prevItems; // Don't add duplicate
      }
      return [...prevItems, { ...course, quantity: 1 }];
    });
    return true;
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

  // Check if course is already purchased
  const isPurchased = useCallback((courseId) => {
    return purchasedCourses.some(course => course._id === courseId || course.courseId === courseId);
  }, [purchasedCourses]);

  // Add purchased course
  const addPurchasedCourse = useCallback((course) => {
    setPurchasedCourses(prev => {
      const exists = prev.some(c => c._id === course._id || c.courseId === course._id);
      if (exists) return prev;
      const newCourse = { 
        _id: course._id,
        courseId: course._id, 
        title: course.title,
        imageUrl: course.imageUrl || course.img,
        img: course.imageUrl || course.img,
        price: course.price,
        purchaseDate: new Date().toISOString(),
        orderStatus: 'pending'
      };
      const newList = [...prev, newCourse];
      return newList;
    });
  }, []);

  // Load purchased courses from user orders
  const loadPurchasedCourses = useCallback(async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
      const token = userInfo.token;
      if (!token) {
        return;
      }

      const response = await fetch('http://localhost:5000/api/orders/my-orders', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const purchased = data.orders
          .filter(order => order.orderStatus === 'completed' || order.orderStatus === 'processing' || order.orderStatus === 'pending' || order.orderStatus === 'delivered')
          .map(order => ({
            _id: order.course._id || order.courseId,
            courseId: order.course._id || order.courseId,
            title: order.course.title,
            imageUrl: order.course.image || order.course.imageUrl,
            img: order.course.image || order.course.imageUrl, // Fallback for different naming conventions
            price: order.course.price,
            purchaseDate: order.createdAt,
            orderStatus: order.orderStatus
          }));
        
        setPurchasedCourses(purchased);
      } else {
        console.error('Failed to load purchased courses:', response.status);
      }
    } catch (error) {
      console.error('Error loading purchased courses:', error);
    }
  }, []);

  // Load purchased courses when provider mounts or user logs in
  useEffect(() => {
    loadPurchasedCourses();
  }, [loadPurchasedCourses]);

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
    purchasedCourses,

    // Cart actions
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity,
    isInCart,
    isPurchased,

    // Course selection
    selectCourse,
    clearSelectedCourse,

    // Purchase management
    addPurchasedCourse,
    loadPurchasedCourses,

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

  console.log('CartProvider providing value:', Object.keys(value));

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  
  // Even with default context, check if we're in a provider
  if (!context || context.addToCart.toString().includes('called outside provider')) {
    console.error('useCart must be used within a CartProvider');
    console.error('Current context:', context);
    console.error('Component using hook should be wrapped with CartProvider');
    
    // During development, provide fallback instead of crashing
    if (process.env.NODE_ENV === 'development') {
      console.warn('Using fallback context for development');
      return context; // Return the default context with warning functions
    }
    
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;