import { useState } from 'react';
import useCartStore from '../store/useCartStore';
import CheckoutItem from '../components/CheckoutItem';

const TAX_RATE = 0.08;

const CheckoutPage = () => {
    const cartItems = useCartStore(state => state.cartItems);
    const addToCart = useCartStore(state => state.addToCart);
    const removeOne = useCartStore(state => state.removeOne);
    const clearCart = useCartStore(state => state.clearCart);

    const [orderPlaced, setOrderPlaced] = useState(false);

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;

    function handlePlaceOrder() {
        if (cartItems.length === 0) return;
        clearCart();
        setOrderPlaced(true);
    }

    if (orderPlaced) {
        return (
            <div className='page'>
                <div className='container'>
                    <div className='auth-container'>
                        <h1 className='page-title'>Order Placed! 🎉</h1>
                        <p>
                            Thank you for your purchase. Your order is on its
                            way!
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='page'>
            <div className='container'>
                <h1 className='page-title'>Checkout</h1>
                <div className='checkout-container'>
                    <div className='checkout-items'>
                        <h2 className='checkout-section-title'>
                            Order Summary
                        </h2>
                        {cartItems.length === 0 ? (
                            <p>Your cart is empty.</p>
                        ) : (
                            cartItems.map(item => (
                                <CheckoutItem
                                    item={item}
                                    key={item.id}
                                    addToCart={addToCart}
                                    removeFromCart={removeOne}
                                />
                            ))
                        )}
                        {cartItems.length >= 1 && (
                            <button
                                onClick={() => clearCart()}
                                style={{ marginTop: '10px' }}
                                className='btn btn-secondary'
                            >
                                Clear Cart
                            </button>
                        )}
                    </div>

                    <div className='checkout-summary'>
                        <h2 className='checkout-section-title'>Total</h2>
                        <div className='summary-row'>
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className='summary-row'>
                            <span>Tax (8%)</span>
                            <span>${tax.toFixed(2)}</span>
                        </div>
                        <div className='summary-row summary-total'>
                            <strong>Total</strong>
                            <strong>${total.toFixed(2)}</strong>
                        </div>
                        <button
                            className='btn btn-primary btn-large btn-block'
                            onClick={handlePlaceOrder}
                            disabled={cartItems.length === 0}
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CheckoutPage;
