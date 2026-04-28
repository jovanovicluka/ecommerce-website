import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null, // {email: cedo@peta.com, password: cedopeta}
            isAuthenticated: false,
            error: null,
            mode: 'Sign Up',

            signUp: (email, password) => {
                const existingUser = get().user;

                if (existingUser && existingUser.email === email) {
                    set({ error: 'User already signed up' });
                    return;
                }

                if (!email || !password) {
                    set({ error: 'Email and password are required' });
                    return;
                }

                const newUser = { email, password };

                set({
                    user: newUser,
                    isAuthenticated: true,
                    error: null,
                    mode: 'Log In'
                });
            },

            login: (email, password) => {
                const existingUser = get().user;

                if (
                    existingUser &&
                    existingUser.email === email &&
                    existingUser.password === password
                ) {
                    set({
                        isAuthenticated: true,
                        error: null
                    });
                } else {
                    set({
                        isAuthenticated: false,
                        error: 'User does not exist, please sign up first'
                    });
                }
            },

            logout: () => {
                set({ isAuthenticated: false });
            },

            toggleMode: () => {
                const current = get().mode;
                set({ mode: current === 'Sign Up' ? 'Log In' : 'Sign Up' });
            },

            changeMode: mode => {
                set({ mode });
            }
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage)
        }
    )
);

export default useAuthStore;
