import { useParams } from 'react-router';
import { getProducts } from '../data/products';
import useCartStore from '../store/useCartStore';

function findProduct(id, products) {
    const product = products.find(product => product.id === id);

    if (product) return product;

    return null;
}

const ProductDetailsPage = () => {
    const { id } = useParams();
    const products = getProducts();
    const addToCart = useCartStore(state => state.addToCart);
    const cartItems = useCartStore(state => state.cartItems);

    const product = findProduct(Number(id), products);
    const productInCart = cartItems.find(item => item.id === product?.id);

    return (
        <div className='page'>
            <div className='container'>
                <div className='product-detail'>
                    <div className='product-detail-image'>
                        <img alt={product.name} src={product.image} />
                    </div>
                    <div className='product-detail-content'>
                        <h1 className='product-detail-name'>{product.name}</h1>
                        <p className='product-detail-price'>{product.price}</p>
                        <p className='product-detail-description'>
                            {product.description}
                        </p>
                        <button
                            className='btn btn-primary'
                            onClick={() => addToCart(product.id)}
                        >
                            Add to Cart{' '}
                            {productInCart && `(${productInCart.quantity})`}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProductDetailsPage;
