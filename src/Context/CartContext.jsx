import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    calculateCartTotals,
    normalizePrice,
} from "../utils/pricing";

const CartContext = createContext(null);

const CART_STORAGE_KEY = "coffee-cart-v2";

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const savedCart = localStorage.getItem(
                CART_STORAGE_KEY
            );

            return savedCart ? JSON.parse(savedCart) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(
            CART_STORAGE_KEY,
            JSON.stringify(cartItems)
        );
    }, [cartItems]);

    const addToCart = (product, quantity = 1) => {
        const selectedSizeId =
            product.selectedSize?.id || "standard";

        const cartKey = `${product.id}-${selectedSizeId}`;

        const normalizedProduct = {
            ...product,
            price: normalizePrice(product.price),
            stock: Math.max(0, Number(product.stock) || 0),
        };

        setCartItems((currentItems) => {
            const existingItem = currentItems.find(
                (item) => item.cartKey === cartKey
            );

            if (existingItem) {
                return currentItems.map((item) =>
                    item.cartKey === cartKey
                        ? {
                            ...item,
                            quantity: Math.min(
                                item.quantity + quantity,
                                normalizedProduct.stock
                            ),
                        }
                        : item
                );
            }

            return [
                ...currentItems,
                {
                    ...normalizedProduct,
                    cartKey,
                    quantity: Math.min(
                        Math.max(1, quantity),
                        normalizedProduct.stock
                    ),
                },
            ];
        });
    };

    const removeFromCart = (cartKey) => {
        setCartItems((currentItems) =>
            currentItems.filter(
                (item) => item.cartKey !== cartKey
            )
        );
    };

    const increaseQuantity = (cartKey) => {
        setCartItems((currentItems) =>
            currentItems.map((item) =>
                item.cartKey === cartKey
                    ? {
                        ...item,
                        quantity: Math.min(
                            item.quantity + 1,
                            item.stock
                        ),
                    }
                    : item
            )
        );
    };

    const decreaseQuantity = (cartKey) => {
        setCartItems((currentItems) =>
            currentItems.map((item) =>
                item.cartKey === cartKey
                    ? {
                        ...item,
                        quantity: Math.max(
                            item.quantity - 1,
                            1
                        ),
                    }
                    : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartCount = useMemo(
        () =>
            cartItems.reduce(
                (total, item) =>
                    total + Number(item.quantity || 0),
                0
            ),
        [cartItems]
    );

    const {
        subtotal,
        deliveryFee,
        tax,
        total,
    } = useMemo(
        () => calculateCartTotals(cartItems),
        [cartItems]
    );

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        cartCount,
        subtotal,
        deliveryFee,
        tax,
        total,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error(
            "useCart must be used inside CartProvider"
        );
    }

    return context;
}