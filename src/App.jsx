import { useState } from 'react';
import { Routes, Route, Link } from 'react-router';
import {
    HomePage,
    AuthPage,
    ProductDetailsPage,
    Cart,
    ProtectedRoute
} from './pages';
import Navbar from './components/Navbar';
import './App.css';
import useAuthStore from './store/useAuthStore';

function App() {
    return (
        <div className='app'>
            <Navbar />
            <Routes>
                <Route
                    path='/'
                    element={
                        <ProtectedRoute>
                            <HomePage />
                        </ProtectedRoute>
                    }
                />
                <Route path='/products/:id' element={<ProductDetailsPage />} />
                <Route path='/auth' element={<AuthPage />} />
                <Route
                    path='/cart'
                    element={
                        <ProtectedRoute>
                            <Cart />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
