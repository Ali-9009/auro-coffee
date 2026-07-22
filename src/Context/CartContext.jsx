import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const savedCart = localStorage.getItem("coffee-cart");
            return savedCart ? JSON.parse(savedCart) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("coffee-cart", JSON.stringify(cartItems));
    }, [cartItems]);

    
    const addToCart = (product, quantity = 1) => {
        const cartKey = `${product.id}-${product.selectedSize?.id || "standard"}`;

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
                                product.stock
                            ),
                        }
                        : item
                );
            }

            return [
                ...currentItems,
                {
                    ...product,
                    cartKey,
                    quantity,
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
                (total, item) => total + item.quantity,
                0
            ),
        [cartItems]
    );

    const subtotal = useMemo(
        () =>
            cartItems.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            ),
        [cartItems]
    );

    const deliveryFee = subtotal > 0 ? 2.5 : 0;
    const tax = subtotal * 0.05;
    const total = subtotal + deliveryFee + tax;

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
        throw new Error("useCart must be used inside CartProvider");
    }

    return context;
}