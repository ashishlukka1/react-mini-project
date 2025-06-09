import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  // Load cart from localStorage or start with empty object
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : {};
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart(prev => ({
      ...prev,
      [item.id]: prev[item.id]
        ? { ...prev[item.id], quantity: prev[item.id].quantity + 1 }
        : { ...item, quantity: 1 }
    }));
  };

  const removeFromCart = (itemId) => {
    setCart(prev => {
      if (!prev[itemId]) return prev;
      if (prev[itemId].quantity <= 1) {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [itemId]: { ...prev[itemId], quantity: prev[itemId].quantity - 1 }
      };
    });
  };

  const clearCart = () => setCart({});

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);