import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext({
    cartItems: [],
    addItem: (item) => {},
    decreaseItemQuantity: (itemId) => {},
    removeItem: (itemId) => {},
    clearCart: () => {},
    getCartQuantityTotal: () => {}
});

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addItem = (itemToAdd) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === itemToAdd.id);

            if (existingItem) {
                // If item exists, increase its quantity
                return prevItems.map(item => 
                    item.id === itemToAdd.id 
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                );
            } else {
                // If item does not exist, add it with quantity = 1
                return [...prevItems, { ...itemToAdd, quantity: 1 }];
            }
        });
    };

    const decreaseItemQuantity = (itemId) => {
        console.log("Attempting to decrease item:", itemId);
    
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === itemId);
    
            if (existingItem && existingItem.quantity > 1) {
                console.log("Decreasing quantity for:", itemId);
                return prevItems.map(item => 
                    item.id === itemId 
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
                );
            } else if (existingItem && existingItem.quantity === 1) {
                console.log("Removing item from cart:", itemId);
                return prevItems.filter(item => item.id !== itemId);
            }
    
            console.log("Item not found:", itemId);
            return prevItems;
        });
    };

    const removeItem = (itemId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const getCartQuantityTotal = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{ 
            cartItems, 
            addItem, 
            decreaseItemQuantity, 
            removeItem, 
            clearCart, 
            getCartQuantityTotal 
        }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
