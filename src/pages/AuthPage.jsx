import { useState, useEffect } from 'react';
import useAuthStore from '../store/useAuthStore';
import { useNavigate } from 'react-router';

const AuthPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login, signUp, toggleMode, isAuthenticated, error, mode } =
        useAuthStore();

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) navigate('/');
    }, [isAuthenticated]);

    function handleSubmit(event) {
        event.preventDefault();
        if (mode === 'Sign Up') {
            signUp(email, password);
        } else {
            login(email, password);
        }
    }

    return (
        <div className='page'>
            <div className='container'>
                <div className='auth-container'>
                    <h1 className='page-title'>
                        {mode === 'Sign Up' ? 'Sign Up' : 'Log In'}
                    </h1>
                    <form className='auth-form' onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <label className='form-label' htmlFor='email'>
                                Email
                            </label>
                            <input
                                className='form-input'
                                id='email'
                                type='email'
                                name='email'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label className='form-label' htmlFor='password'>
                                Password
                            </label>
                            <input
                                className='form-input'
                                id='password'
                                type='password'
                                name='password'
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                        </div>
                        <button type='submit' className='btn btn-primary'>
                            {mode === 'Sign Up' ? 'Sign Up' : 'Log In'}
                        </button>
                    </form>
                    <div className='auth-switch'>
                        {mode === 'Sign Up' ? (
                            <p>
                                Already have an account?{' '}
                                <span
                                    className='auth-link'
                                    onClick={toggleMode}
                                >
                                    Log In
                                </span>
                            </p>
                        ) : (
                            <p>
                                Don't have an account?{' '}
                                <span
                                    className='auth-link'
                                    onClick={toggleMode}
                                >
                                    Sign Up
                                </span>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AuthPage;
