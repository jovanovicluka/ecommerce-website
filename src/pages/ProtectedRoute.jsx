import { Navigate } from 'react-router';
import useAuthStore from '../store/useAuthStore';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to='/auth' replace />;
    }

    return children;
};

export default ProtectedRoute;
