import React from 'react';
import { useCart } from '../context/CartContext';
import Footer from '../Footer/Footer';
import '../../styles/Cart.css';

function Cart() {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  const cartItems = Object.values(cart);

  const orderTotal = cartItems.reduce((sum, item) => sum + item.cost * item.quantity, 0);

  const handlePlaceOrder = () => {
    alert('Order placed successfully!');
    clearCart();
  };

  // SVG for empty cart
  const EmptyCartSVG = () => (
    <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: 300 }}>
      <svg width="120" height="120" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" fill="#f8f9fa"/>
        <path d="M7 18c-1.1 0-2-.9-2-2V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v9c0 1.1-.9 2-2 2H7zm0-2h10V7H7v9zm2-7h6v2H9V9zm0 4h4v2H9v-2z" fill="#f7931e"/>
      </svg>
      <div className="mt-3 text-muted">Your cart is empty.</div>
    </div>
  );

  return (
    <>
      <div className="container mt-5">
        {cartItems.length === 0 ? (
          <EmptyCartSVG />
        ) : (
          <>
            <div className="table-responsive container">
              <table className="table align-middle" style={{ border: 'none' }}>
                <thead>
                  <tr style={{ border: 'none' }}>
                    <th style={{ border: 'none', verticalAlign: 'middle', minWidth: 200 }}>Item</th>
                    <th style={{ border: 'none', verticalAlign: 'middle', width: 180, textAlign: 'center' }}>Quantity</th>
                    <th style={{ border: 'none', verticalAlign: 'middle', width: 120, textAlign: 'right' }}>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map(item => (
                    <tr key={item.id} style={{ border: 'none' }}>
                      <td style={{ border: 'none', verticalAlign: 'middle' }}>
                        <div className="d-flex align-items-center">
                          <img
                            src={item.image_url}
                            alt={item.name}
                            className="rounded me-2"
                            style={{ width: 100, height: 80, objectFit: 'cover' }}
                          />
                          <span>{item.name}</span>
                        </div>
                      </td>
                      <td style={{ border: 'none', verticalAlign: 'middle', textAlign: 'center' }}>
                        <div className="d-flex align-items-center justify-content-center">
                          <button className="btn btn-outline-secondary btn-sm px-2" onClick={() => removeFromCart(item.id)}>-</button>
                          <span className="mx-2">{item.quantity}</span>
                          <button className="btn btn-outline-secondary btn-sm px-2" onClick={() => addToCart(item)}>+</button>
                        </div>
                      </td>
                      <td style={{ border: 'none', verticalAlign: 'middle', textAlign: 'right' }}>
                        ₹{item.cost * item.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="d-flex justify-content-end align-items-center mt-4 gap-3">
              <h5 className="mb-0 me-5">Order Total: ₹{orderTotal}</h5>
              <button className="btn place-order" onClick={handlePlaceOrder}>Place Order</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Cart;