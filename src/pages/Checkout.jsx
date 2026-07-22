import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import toast from "react-hot-toast";
import { createOrder } from "../services/orderService";

export default function Checkout() {
    const navigate = useNavigate();

    const {
        cartItems,
        subtotal,
        deliveryFee,
        tax,
        total,
        clearCart,
    } = useCart();

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        postalCode: "",
        paymentMethod: "cash",
    });

    const [submitting, setSubmitting] = useState(false);
    const [orderCompleted, setOrderCompleted] =
        useState(false);

    if (
        cartItems.length === 0 &&
        !orderCompleted
    ) {
        return <Navigate to="/cart" replace />;
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((currentForm) => ({
            ...currentForm,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (submitting) return;

        setSubmitting(true);

        try {
            const order = await createOrder({
                customer: form,
                cartItems,
                paymentMethod: form.paymentMethod,
            });

            setOrderCompleted(true);

            navigate("/order-success", {
                replace: true,
                state: {
                    order,
                },
            });

            clearCart();
        } catch (error) {
            console.error(
                "Order creation failed:",
                error
            );

            toast.error(
                error.message ||
                "Could not place your order."
            );
        } finally {
            setSubmitting(false);
        }
    };

    const inputClass =
        "mt-2 w-full rounded-xl border border-[#ddcfc5] bg-white px-4 py-3 outline-none transition focus:border-[#84280d] focus:ring-2 focus:ring-[#84280d]/10";

    return (
        <section className="bg-[#fffaf6] py-12 lg:py-20">
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-semibold text-[#27170f]">
                    Checkout
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]"
                >
                    <div className="rounded-3xl border border-[#e5d8cf] bg-white p-6 sm:p-8">
                        <h2 className="text-2xl font-semibold text-[#2d1b12]">
                            Delivery information
                        </h2>

                        <div className="mt-7 grid gap-5 sm:grid-cols-2">
                            <label className="text-sm font-medium text-[#4e392e]">
                                First name
                                <input
                                    required
                                    name="firstName"
                                    value={form.firstName}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </label>

                            <label className="text-sm font-medium text-[#4e392e]">
                                Last name
                                <input
                                    required
                                    name="lastName"
                                    value={form.lastName}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </label>

                            <label className="text-sm font-medium text-[#4e392e]">
                                Email
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </label>

                            <label className="text-sm font-medium text-[#4e392e]">
                                Phone
                                <input
                                    required
                                    type="tel"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </label>

                            <label className="text-sm font-medium text-[#4e392e] sm:col-span-2">
                                Address
                                <input
                                    required
                                    name="address"
                                    value={form.address}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </label>

                            <label className="text-sm font-medium text-[#4e392e]">
                                City
                                <input
                                    required
                                    name="city"
                                    value={form.city}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </label>

                            <label className="text-sm font-medium text-[#4e392e]">
                                Postal code
                                <input
                                    required
                                    name="postalCode"
                                    value={form.postalCode}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </label>
                        </div>

                        <div className="mt-10">
                            <h2 className="text-2xl font-semibold text-[#2d1b12]">
                                Payment method
                            </h2>

                            <div className="mt-5 grid gap-3 sm:grid-cols-2">
                                <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-[#ddcfc5] p-4">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="cash"
                                        checked={
                                            form.paymentMethod === "cash"
                                        }
                                        onChange={handleChange}
                                    />
                                    <span className="font-medium">
                                        Cash on delivery
                                    </span>
                                </label>

                                <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-[#ddcfc5] p-4">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="card"
                                        checked={
                                            form.paymentMethod === "card"
                                        }
                                        onChange={handleChange}
                                    />
                                    <span className="font-medium">
                                        Credit or debit card
                                    </span>
                                </label>
                            </div>

                            {form.paymentMethod === "card" && (
                                <div className="mt-5 rounded-2xl bg-[#f7f0ea] p-5 text-sm leading-6 text-[#725d50]">
                                    Connect Stripe or another payment provider
                                    here. Never collect raw card details directly
                                    in your own form.
                                </div>
                            )}
                        </div>
                    </div>

                    <aside className="h-fit rounded-3xl border border-[#e5d8cf] bg-white p-6 lg:sticky lg:top-24">
                        <h2 className="text-2xl font-semibold text-[#2d1b12]">
                            Your order
                        </h2>

                        <div className="mt-6 max-h-72 space-y-4 overflow-y-auto">
                            {cartItems.map((item) => (
                                <div
                                    key={item.cartKey}
                                    className="flex gap-3"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="h-16 w-16 rounded-xl object-cover"
                                    />

                                    <div className="flex-1">
                                        <p className="font-semibold text-[#382319]">
                                            {item.name}
                                        </p>

                                        <p className="text-xs text-[#8a786e]">
                                            {item.selectedSize?.name
                                                ? `${item.selectedSize.name} · `
                                                : ""}
                                            Qty: {item.quantity}
                                        </p>
                                    </div>

                                    <span className="font-semibold">
                                        $
                                        {(
                                            item.price * item.quantity
                                        ).toFixed(2)}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="my-6 h-px bg-[#e8ddd5]" />

                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Delivery</span>
                                <span>${deliveryFee.toFixed(2)}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Tax</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>

                            <div className="flex justify-between border-t border-[#e8ddd5] pt-4 text-lg font-bold">
                                <span>Total</span>
                                <span className="text-[#84280d]">
                                    ${total.toFixed(2)}
                                </span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="mt-6 w-full rounded-xl bg-[#84280d] px-6 py-4 font-semibold text-white transition hover:bg-[#631d09] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {submitting
                                ? "Placing order..."
                                : "Place order"}
                        </button>
                    </aside>
                </form>
            </div>
        </section>
    );
}