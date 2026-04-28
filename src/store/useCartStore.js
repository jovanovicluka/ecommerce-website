import { create, useStore } from 'zustand';
import { persist } from 'zustand/middleware';
import { getProductById } from '../data/products';

const useCartStore = create(
    persist((set, get) => ({
        cartItems: [], // {id: 1, quantity: 5}
        addToCart: id => {
            const items = get().cartItems;
            const existing = items.find(item => item.id === id);
            const product = getProductById(id);

            if (existing) {
                set({
                    cartItems: items.map(item =>
                        item.id === id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    )
                });
            } else {
                set({
                    cartItems: [...items, { ...product, quantity: 1 }]
                });
            }
        },
        removeOne: id => {
            const items = get().cartItems;
            const currentItem = items.find(item => item.id === id);

            if (!currentItem) return;

            if (currentItem.quantity > 1) {
                set({
                    cartItems: items.map(item =>
                        item.id === id
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                    )
                });
            } else {
                set({
                    cartItems: items.filter(item => item.id !== id)
                });
            }
        },
        removeFromCart: itemId => {
            const cart = get().cartItems;
            set({
                cartItems: cart.filter(item => item.id !== itemId)
            });
        },
        clearCart: () => set({ cartItems: [] })
    }))
);

export default useCartStore;
