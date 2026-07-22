import { CheckCircle2 } from "lucide-react";
import { Link, Navigate, useLocation } from "react-router-dom";

export default function OrderSuccess() {
    const location = useLocation();
    const order = location.state?.order;

    if (!order) {
        return <Navigate to="/" replace />;
    }

    return (
        <section className="flex min-h-screen items-center justify-center bg-[#fffaf6] px-6">
            <div className="max-w-xl rounded-3xl border border-[#e5d8cf] bg-white p-8 text-center shadow-sm sm:p-12">
                <CheckCircle2
                    size={72}
                    className="mx-auto text-green-600"
                />

                <h1 className="mt-6 text-4xl font-semibold text-[#27170f]">
                    Order confirmed
                </h1>

                <p className="mt-4 leading-7 text-[#75665d]">
                    Thank you, {order.customer.name}. Your order has been
                    placed successfully.
                </p>

                <p className="mt-3 font-semibold text-[#84280d]">
                    Total: ${order.total.toFixed(2)}
                </p>

                <Link
                    to="/"
                    className="mt-8 inline-flex rounded-xl bg-[#84280d] px-7 py-3 font-semibold text-white"
                >
                    Back to home
                </Link>
            </div>
        </section>
    );
}