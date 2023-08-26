import React from 'react';
import { useCart } from './CartContext';
import './CartSidebar.css';

const CartSidebar = ({ onClose }) => {
    const { cartItems, addItem, decreaseItemQuantity, removeItem, clearCart } = useCart();

    const getTotalPrice = () => {
        return cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
    };

    const handleIncrementQuantity = (item) => {
        const updatedItem = { ...item, quantity: (item.quantity || 1) + 1 };
        addItem(updatedItem);
    };

    return (
        <div className="cart-sidebar">
            <h3>Your Cart</h3>
            
            <div className="cart-items">
                {cartItems.length ? (
                    cartItems.map(item => (
                        <div key={item.id} className="cart-item">
                            <img src={item.image} alt={item.name} className="cart-item-image" />
                            <div className="cart-item-details">
                                <h4>{item.name}</h4>
                                <p>₱{item.price.toLocaleString()} x {item.quantity || 1}</p> 
                                <div className="adjust-quantity">
                                    <button onClick={() => decreaseItemQuantity(item.id)}>-</button>
                                    <button onClick={() => handleIncrementQuantity(item)}>+</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Your cart is empty!</p>
                )}
            </div>

            <div className="cart-summary">
                <div className="cart-total">
                    <p>Total: ₱{getTotalPrice().toLocaleString()}</p>
                </div>
                <div className="close-clear-buttons">
                    <button className="clear-cart-btn" onClick={clearCart}>Clear Cart</button>
                    <button className="clear-cart-btn" onClick={onClose}>Close Cart</button> 
                </div>
                <button className="checkout-btn">Checkout</button>
            </div>
        </div>
    );
};

export default CartSidebar;
