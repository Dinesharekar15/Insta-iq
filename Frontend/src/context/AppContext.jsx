import React, { createContext, useContext, useReducer } from "react";

// Get initial state from localStorage or use default
const getInitialState = () => {
  try {
    const savedCart = localStorage.getItem('cart');
    return {
      user: null, // User info (null if not logged in)
      cart: savedCart ? JSON.parse(savedCart) : [],  // Cart items
    };
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    return {
      user: null,
      cart: [],
    };
  }
};

// Initial global state
const initialState = getInitialState();

// Reducer function to manage state updates
function appReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, action.payload] };
    case "REMOVE_FROM_CART":
      return { ...state, cart: state.cart.filter(item => item.cartId !== action.payload) };
    case "CLEAR_CART":
      return { ...state, cart: [] };
    default:
      return state;
  }
}

// Create context
const AppContext = createContext();

// Context provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Save cart to localStorage whenever it changes
  React.useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(state.cart));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [state.cart]);

  // Value provided to context consumers
  const value = { state, dispatch };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook for easy context usage
export const useAppContext = () => useContext(AppContext); 