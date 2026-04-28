import useCartStore from '../store/useCartStore';
import { Link } from 'react-router';

const ProductCard = ({ product }) => {
    const { cartItems, addToCart } = useCartStore();

    const productInCart = cartItems.find(item => item.id === product.id);

    const productQuantityLabel = productInCart
        ? `(${productInCart.quantity})`
        : '';

    return (
        <div className='product-card' key={product.id}>
            <img
                src={product.image}
                alt={product.name}
                className='product-card-image'
            />
            <div className='product-card-content'>
                <h3 className='product-card-name'>{product.name}</h3>
                <p className='product-card-price'>{product.price}</p>
                <div className='product-card-actions'>
                    <Link
                        className='btn btn-secondary'
                        to={`/products/${product.id}`}
                        data-discover='true'
                    >
                        View Details
                    </Link>
                    <button
                        className='btn btn-primary'
                        onClick={() => addToCart(product.id)}
                    >
                        Add to Cart {productQuantityLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};
export default ProductCard;
