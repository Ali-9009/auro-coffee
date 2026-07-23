import {
    X,
    User,
    Mail,
    Phone,
    MapPin,
    Package,
    CreditCard,
    CalendarDays,
} from "lucide-react";

// import {
//     centsToPrice,
//     formatMoney,
// } from "../../utils/pricing";

function formatMoney(value, currency = "usd") {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency.toUpperCase(),
    }).format(Number(value || 0));
}

function formatDate(value) {
    if (!value) return "—";

    return new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(new Date(value));
}

function formatAddress(address = {}) {
    const parts = [
        address.address,
        address.city,
        address.state,
        address.postalCode,
        address.country,
    ].filter(Boolean);

    return parts.length ? parts.join(", ") : "No shipping address";
}

export default function OrderDetailsModal({
    order,
    onClose,
    onOrderStatusChange,
    onPaymentStatusChange,
    updating,
}) {
    if (!order) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            onMouseDown={onClose}
        >
            <div
                className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-[#fffaf6] shadow-2xl"
                onMouseDown={(event) => event.stopPropagation()}
            >
                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#eadfd8] bg-[#fffaf6]/95 px-6 py-5 backdrop-blur">
                    <div>
                        <p className="text-sm font-medium text-[#84280d]">
                            Order details
                        </p>

                        <h2 className="mt-1 font-serif text-2xl font-semibold text-[#27170f]">
                            #{order.id.slice(0, 8).toUpperCase()}
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="grid h-10 w-10 place-items-center rounded-full border border-[#dfd1c9] bg-white text-[#49352b] transition hover:bg-[#f7eee8]"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="space-y-6 p-6">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-2xl border border-[#eadfd8] bg-white p-5">
                            <h3 className="font-semibold text-[#27170f]">
                                Customer information
                            </h3>

                            <div className="mt-4 space-y-3 text-sm text-[#66564d]">
                                <div className="flex items-start gap-3">
                                    <User
                                        size={18}
                                        className="mt-0.5 text-[#84280d]"
                                    />
                                    <span>
                                        {order.customerName}
                                    </span>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Mail
                                        size={18}
                                        className="mt-0.5 text-[#84280d]"
                                    />
                                    <span className="break-all">
                                        {order.customerEmail || "—"}
                                    </span>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Phone
                                        size={18}
                                        className="mt-0.5 text-[#84280d]"
                                    />
                                    <span>
                                        {order.customerPhone || "—"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-[#eadfd8] bg-white p-5">
                            <h3 className="font-semibold text-[#27170f]">
                                Shipping address
                            </h3>

                            <div className="mt-4 flex items-start gap-3 text-sm leading-6 text-[#66564d]">
                                <MapPin
                                    size={18}
                                    className="mt-1 shrink-0 text-[#84280d]"
                                />

                                <span>
                                    {formatAddress(order.shippingAddress)}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-2xl border border-[#eadfd8] bg-white p-4">
                            <CalendarDays
                                size={20}
                                className="text-[#84280d]"
                            />

                            <p className="mt-3 text-xs uppercase tracking-wide text-[#8a7970]">
                                Created
                            </p>

                            <p className="mt-1 text-sm font-semibold text-[#3b2b23]">
                                {formatDate(order.createdAt)}
                            </p>
                        </div>

                        <div className="rounded-2xl border border-[#eadfd8] bg-white p-4">
                            <Package
                                size={20}
                                className="text-[#84280d]"
                            />

                            <p className="mt-3 text-xs uppercase tracking-wide text-[#8a7970]">
                                Items
                            </p>

                            <p className="mt-1 text-sm font-semibold text-[#3b2b23]">
                                {order.totalItems}
                            </p>
                        </div>

                        <div className="rounded-2xl border border-[#eadfd8] bg-white p-4">
                            <CreditCard
                                size={20}
                                className="text-[#84280d]"
                            />

                            <p className="mt-3 text-xs uppercase tracking-wide text-[#8a7970]">
                                Payment method
                            </p>

                            <p className="mt-1 capitalize text-sm font-semibold text-[#3b2b23]">
                                {order.paymentMethod}
                            </p>
                        </div>

                        <div className="rounded-2xl border border-[#eadfd8] bg-white p-4">
                            <p className="text-xs uppercase tracking-wide text-[#8a7970]">
                                Total
                            </p>

                            <p className="mt-3 font-serif text-2xl font-semibold text-[#84280d]">
                                {formatMoney(
                                    order.total,
                                    order.currency
                                )}
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <label className="block">
                            <span className="mb-2 block text-sm font-semibold text-[#49352b]">
                                Order status
                            </span>

                            <select
                                value={order.orderStatus}
                                disabled={updating}
                                onChange={(event) =>
                                    onOrderStatusChange(
                                        order.id,
                                        event.target.value
                                    )
                                }
                                className="w-full rounded-xl border border-[#d9cbc2] bg-white px-4 py-3 text-sm text-[#3b2b23] outline-none transition focus:border-[#84280d]"
                            >
                                <option value="pending">
                                    Pending
                                </option>
                                <option value="confirmed">
                                    Confirmed
                                </option>
                                <option value="processing">
                                    Processing
                                </option>
                                <option value="shipped">
                                    Shipped
                                </option>
                                <option value="delivered">
                                    Delivered
                                </option>
                                <option value="cancelled">
                                    Cancelled
                                </option>
                            </select>
                        </label>

                        <label className="block">
                            <span className="mb-2 block text-sm font-semibold text-[#49352b]">
                                Payment status
                            </span>

                            <select
                                value={order.paymentStatus}
                                disabled={updating}
                                onChange={(event) =>
                                    onPaymentStatusChange(
                                        order.id,
                                        event.target.value
                                    )
                                }
                                className="w-full rounded-xl border border-[#d9cbc2] bg-white px-4 py-3 text-sm text-[#3b2b23] outline-none transition focus:border-[#84280d]"
                            >
                                <option value="pending">
                                    Pending
                                </option>
                                <option value="paid">
                                    Paid
                                </option>
                                <option value="failed">
                                    Failed
                                </option>
                                <option value="refunded">
                                    Refunded
                                </option>
                            </select>
                        </label>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-[#eadfd8] bg-white">
                        <div className="border-b border-[#eadfd8] px-5 py-4">
                            <h3 className="font-semibold text-[#27170f]">
                                Ordered items
                            </h3>

                            {order.itemsSummary && (
                                <p className="mt-1 text-sm text-[#75665d]">
                                    {order.itemsSummary}
                                </p>
                            )}
                        </div>

                        <div className="divide-y divide-[#f0e7e1]">
                            {order.items.length ? (
                                order.items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex flex-col justify-between gap-3 p-5 sm:flex-row sm:items-center"
                                    >
                                        <div>
                                            <p className="font-semibold text-[#3b2b23]">
                                                {item.product_name}
                                            </p>

                                            <p className="mt-1 text-sm text-[#7a6a61]">
                                                {item.size_name
                                                    ? `Size: ${item.size_name} · `
                                                    : ""}
                                                Quantity: {item.quantity}
                                            </p>
                                        </div>

                                        <div className="text-left sm:text-right">
                                            <p className="font-semibold text-[#84280d]">
                                                {formatMoney(
                                                    Number(
                                                        item.line_total || 0
                                                    ) / 100,
                                                    order.currency
                                                )}
                                            </p>

                                            <p className="mt-1 text-xs text-[#8a7970]">
                                                {formatMoney(
                                                    Number(
                                                        item.unit_price || 0
                                                    ) / 100,
                                                    order.currency
                                                )}{" "}
                                                each
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="p-5 text-sm text-[#75665d]">
                                    No item information found.
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="ml-auto max-w-sm rounded-2xl border border-[#eadfd8] bg-white p-5">
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between text-[#66564d]">
                                <span>Subtotal</span>
                                <span>
                                    {formatMoney(
                                        order.subtotal,
                                        order.currency
                                    )}
                                </span>
                            </div>

                            <div className="flex justify-between text-[#66564d]">
                                <span>Shipping</span>
                                <span>
                                    {formatMoney(
                                        order.shippingAmount,
                                        order.currency
                                    )}
                                </span>
                            </div>

                            <div className="flex justify-between text-[#66564d]">
                                <span>Tax</span>
                                <span>
                                    {formatMoney(
                                        order.taxAmount,
                                        order.currency
                                    )}
                                </span>
                            </div>

                            <div className="flex justify-between border-t border-[#eadfd8] pt-3 text-base font-bold text-[#27170f]">
                                <span>Total</span>
                                <span>
                                    {formatMoney(
                                        order.total,
                                        order.currency
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}