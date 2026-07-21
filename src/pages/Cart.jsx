import { ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import QuantityControl from "../components/QuantityControl";
import { useCart } from "../Context/CartContext";

export default function Cart() {
    const {
        cartItems,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        subtotal,
        deliveryFee,
        tax,
        total,
    } = useCart();

    if (cartItems.length === 0) {
        return (
            <section className="flex min-h-[75vh] items-center justify-center bg-[#fffaf6] px-6">
                <div className="max-w-md text-center">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#f2e5dc] text-[#84280d]">
                        <ShoppingBag size={34} />
                    </div>

                    <h1 className="mt-6 text-3xl font-semibold text-[#27170f]">
                        Your cart is empty
                    </h1>

                    <p className="mt-3 leading-7 text-[#75665d]">
                        Add your favorite coffee products and return here to
                        complete your order.
                    </p>

                    <Link
                        to="/shop"
                        className="mt-7 inline-flex rounded-xl bg-[#84280d] px-7 py-3 font-semibold text-white"
                    >
                        Explore products
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-[#fffaf6] py-12 lg:py-20">
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-semibold text-[#27170f]">
                    Shopping cart
                </h1>

                <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
                    <div className="space-y-4">
                        {cartItems.map((item) => (
                            <article
                                key={item.cartKey}
                                className="flex flex-col gap-5 rounded-3xl border border-[#e5d8cf] bg-white p-4 sm:flex-row sm:items-center"
                            >
                                <Link
                                    to={`/product/${item.slug}`}
                                    className="shrink-0"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="h-28 w-full rounded-2xl object-cover sm:w-28"
                                    />
                                </Link>

                                <div className="flex-1">
                                    <Link
                                        to={`/product/${item.slug}`}
                                        className="text-lg font-semibold text-[#2e1b12] hover:text-[#84280d]"
                                    >
                                        {item.name}
                                    </Link>

                                    {item.selectedSize && (
                                        <p className="mt-1 text-sm text-[#85746a]">
                                            Size: {item.selectedSize.name}
                                        </p>
                                    )}

                                    <div className="mt-2">
                                        <p className="font-bold text-[#44291b]">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </p>

                                        {item.quantity > 1 && (
                                            <p className="mt-1 text-xs text-[#85746a]">
                                                ${item.price.toFixed(2)} each
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                                    <QuantityControl
                                        quantity={item.quantity}
                                        max={item.stock}
                                        onDecrease={() =>
                                            decreaseQuantity(item.cartKey)
                                        }
                                        onIncrease={() =>
                                            increaseQuantity(item.cartKey)
                                        }
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeFromCart(item.cartKey)
                                        }
                                        className="flex items-center gap-2 text-sm font-medium text-red-600"
                                    >
                                        <Trash2 size={16} />
                                        Remove
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>

                    <aside className="h-fit rounded-3xl border border-[#e5d8cf] bg-white p-6 lg:sticky lg:top-24">
                        <h2 className="text-2xl font-semibold text-[#2d1b12]">
                            Order summary
                        </h2>

                        <div className="mt-6 space-y-4 text-sm">
                            <div className="flex justify-between">
                                <span className="text-[#75665d]">
                                    Subtotal
                                </span>
                                <span className="font-semibold">
                                    ${subtotal.toFixed(2)}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-[#75665d]">
                                    Delivery
                                </span>
                                <span className="font-semibold">
                                    ${deliveryFee.toFixed(2)}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-[#75665d]">
                                    Tax
                                </span>
                                <span className="font-semibold">
                                    ${tax.toFixed(2)}
                                </span>
                            </div>
                        </div>

                        <div className="my-6 h-px bg-[#e8ddd5]" />

                        <div className="flex items-center justify-between">
                            <span className="text-lg font-semibold">
                                Total
                            </span>

                            <span className="text-2xl font-bold text-[#84280d]">
                                ${total.toFixed(2)}
                            </span>
                        </div>

                        <Link
                            to="/checkout"
                            className="mt-6 flex w-full items-center justify-center rounded-xl bg-[#84280d] px-6 py-4 font-semibold text-white transition hover:bg-[#631d09]"
                        >
                            Proceed to checkout
                        </Link>

                        <Link
                            to="/shop"
                            className="mt-3 flex w-full items-center justify-center rounded-xl border border-[#ddcfc5] px-6 py-3.5 font-semibold text-[#5d4639]"
                        >
                            Continue shopping
                        </Link>
                    </aside>
                </div>
            </div>
        </section>
    );
}