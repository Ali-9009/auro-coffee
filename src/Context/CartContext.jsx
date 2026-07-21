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

    const addToCart = (product, selectedSize, quantity = 1) => {
        const size =
            product.sizes.find((item) => item.value === selectedSize) ||
            product.sizes[0];

        const finalPrice = product.price + size.extraPrice;

        const cartItemId = `${product.id}-${size.value}`;

        setCartItems((currentItems) => {
            const existingItem = currentItems.find(
                (item) => item.cartItemId === cartItemId
            );

            if (existingItem) {
                return currentItems.map((item) =>
                    item.cartItemId === cartItemId
                        ? {
                            ...item,
                            quantity: item.quantity + quantity,
                        }
                        : item
                );
            }

            return [
                ...currentItems,
                {
                    cartItemId,
                    productId: product.id,
                    slug: product.slug,
                    name: product.name,
                    image: product.image,
                    size: size.label,
                    sizeValue: size.value,
                    price: finalPrice,
                    quantity,
                    stock: product.stock,
                },
            ];
        });
    };

    const removeFromCart = (cartItemId) => {
        setCartItems((currentItems) =>
            currentItems.filter((item) => item.cartItemId !== cartItemId)
        );
    };

    const increaseQuantity = (cartItemId) => {
        setCartItems((currentItems) =>
            currentItems.map((item) =>
                item.cartItemId === cartItemId
                    ? {
                        ...item,
                        quantity: Math.min(item.quantity + 1, item.stock),
                    }
                    : item
            )
        );
    };

    const decreaseQuantity = (cartItemId) => {
        setCartItems((currentItems) =>
            currentItems
                .map((item) =>
                    item.cartItemId === cartItemId
                        ? {
                            ...item,
                            quantity: item.quantity - 1,
                        }
                        : item
                )
                .filter((item) => item.quantity > 0)
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