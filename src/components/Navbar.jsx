import { Link } from 'react-router';
import useAuthStore from '../store/useAuthStore';
import { useNavigate } from 'react-router';

const Navbar = () => {
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);
    const logout = useAuthStore(state => state.logout);
    const changeMode = useAuthStore(state => state.changeMode);

    const navigate = useNavigate();


    function handleLogOut() {
        logout();
        navigate('/');
    }

    return (
        <nav className='navbar'>
            <div className='navbar-container'>
                <div>
                    <Link to='/'>
                        <h2 className='logo'>ShopHub</h2>
                    </Link>
                </div>
                <div className='navbar-links'>
                    <Link to='/' className='navbar-link'>
                        Home
                    </Link>
                    <Link to='/cart' className='navbar-link'>
                        Cart
                    </Link>
                </div>
                <div className='navbar-user'>
                    {!isAuthenticated && (
                        <div className='product-card-actions'>
                            <Link to='/auth'>
                                <button
                                    className='btn btn-secondary'
                                    onClick={() => changeMode('Log In')}
                                >
                                    Login
                                </button>
                            </Link>
                            <Link to='/auth'>
                                <button
                                    className='btn btn-primary'
                                    onClick={() => changeMode('Sign Up')}
                                >
                                    Sign Up
                                </button>
                            </Link>
                        </div>
                    )}
                    {isAuthenticated && (
                        <button
                            className='btn btn-secondary'
                            onClick={handleLogOut}
                        >
                            Log Out
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};
export default Navbar;
