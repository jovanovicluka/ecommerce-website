import useCartStore from '../store/useCartStore';

const CheckoutItem = ({ item }) => {
    const { addToCart, removeOne, removeFromCart } = useCartStore();
    return (
        <div className='checkout-item'>
            <img
                alt={item.name}
                className='checkout-item-image'
                src={item.image}
            />
            <div className='checkout-item-details'>
                <h3 className='checkout-item-name'>{item.name}</h3>
                <p className='checkout-item-price'>${item.price} each</p>
            </div>
            <div className='checkout-item-controls'>
                <div className='quantity-controls'>
                    <button
                        className='quantity-btn'
                        onClick={() => removeOne(item.id)}
                    >
                        -
                    </button>
                    <span className='quantity-value'>{item.quantity}</span>
                    <button
                        className='quantity-btn'
                        onClick={() => addToCart(item.id)}
                    >
                        +
                    </button>
                </div>
                <p className='checkout-item-total'>
                    ${item.price * item.quantity}
                </p>
                <button
                    className='btn btn-secondary btn-small'
                    onClick={() => removeFromCart(item.id)}
                >
                    Remove
                </button>
            </div>
        </div>
    );
};
export default CheckoutItem;
