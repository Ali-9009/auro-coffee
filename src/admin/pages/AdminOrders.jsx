import { useEffect, useMemo, useState } from "react";
import {
    ReceiptText,
    Search,
    Eye,
    RefreshCw,
    ShoppingBag,
    DollarSign,
    Clock3,
    CreditCard,
    AlertCircle,
} from "lucide-react";

import OrderDetailsModal from "../components/OrderDetailsModal";

import {
    getAdminOrders,
    updateOrderStatus,
    updatePaymentStatus,
} from "../services/adminOrderService";

function formatMoney(value, currency = "usd") {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency.toUpperCase(),
    }).format(Number(value || 0));
}

function formatDate(value) {
    if (!value) return "—";

    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(new Date(value));
}

function getStatusClasses(status) {
    const styles = {
        pending: "bg-amber-50 text-amber-700 border-amber-200",
        confirmed: "bg-blue-50 text-blue-700 border-blue-200",
        processing: "bg-violet-50 text-violet-700 border-violet-200",
        shipped: "bg-cyan-50 text-cyan-700 border-cyan-200",
        delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
        paid: "bg-emerald-50 text-emerald-700 border-emerald-200",
        failed: "bg-red-50 text-red-700 border-red-200",
        refunded: "bg-slate-100 text-slate-700 border-slate-200",
        cancelled: "bg-red-50 text-red-700 border-red-200",
    };

    return (
        styles[status] ||
        "bg-gray-50 text-gray-700 border-gray-200"
    );
}

function StatusBadge({ status }) {
    return (
        <span
            className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${getStatusClasses(
                status
            )}`}
        >
            {status || "unknown"}
        </span>
    );
}

export default function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const [search, setSearch] = useState("");
    const [orderFilter, setOrderFilter] = useState("all");
    const [paymentFilter, setPaymentFilter] = useState("all");

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState("");

    async function loadOrders(isRefresh = false) {
        try {
            setError("");

            if (isRefresh) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }

            const data = await getAdminOrders();
            setOrders(data);

            if (selectedOrder) {
                const updatedSelectedOrder = data.find(
                    (order) => order.id === selectedOrder.id
                );

                setSelectedOrder(updatedSelectedOrder || null);
            }
        } catch (err) {
            setError(err.message || "Could not load orders.");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }

    useEffect(() => {
        loadOrders();
    }, []);

    const statistics = useMemo(() => {
        const revenue = orders.reduce(
            (sum, order) => sum + order.total,
            0
        );

        const pending = orders.filter(
            (order) => order.orderStatus === "pending"
        ).length;

        const paid = orders.filter(
            (order) => order.paymentStatus === "paid"
        ).length;

        return {
            totalOrders: orders.length,
            revenue,
            pending,
            paid,
        };
    }, [orders]);

    const filteredOrders = useMemo(() => {
        const query = search.trim().toLowerCase();

        return orders.filter((order) => {
            const matchesSearch =
                !query ||
                order.id.toLowerCase().includes(query) ||
                order.customerName.toLowerCase().includes(query) ||
                order.customerEmail.toLowerCase().includes(query) ||
                order.customerPhone.toLowerCase().includes(query);

            const matchesOrderStatus =
                orderFilter === "all" ||
                order.orderStatus === orderFilter;

            const matchesPaymentStatus =
                paymentFilter === "all" ||
                order.paymentStatus === paymentFilter;

            return (
                matchesSearch &&
                matchesOrderStatus &&
                matchesPaymentStatus
            );
        });
    }, [orders, search, orderFilter, paymentFilter]);

    async function handleOrderStatusChange(orderId, status) {
        try {
            setUpdating(true);
            setError("");

            await updateOrderStatus(orderId, status);

            setOrders((currentOrders) =>
                currentOrders.map((order) =>
                    order.id === orderId
                        ? {
                            ...order,
                            orderStatus: status,
                        }
                        : order
                )
            );

            setSelectedOrder((currentOrder) =>
                currentOrder?.id === orderId
                    ? {
                        ...currentOrder,
                        orderStatus: status,
                    }
                    : currentOrder
            );
        } catch (err) {
            setError(
                err.message || "Could not update order status."
            );
        } finally {
            setUpdating(false);
        }
    }

    async function handlePaymentStatusChange(orderId, status) {
        try {
            setUpdating(true);
            setError("");

            await updatePaymentStatus(orderId, status);

            setOrders((currentOrders) =>
                currentOrders.map((order) =>
                    order.id === orderId
                        ? {
                            ...order,
                            paymentStatus: status,
                        }
                        : order
                )
            );

            setSelectedOrder((currentOrder) =>
                currentOrder?.id === orderId
                    ? {
                        ...currentOrder,
                        paymentStatus: status,
                    }
                    : currentOrder
            );
        } catch (err) {
            setError(
                err.message || "Could not update payment status."
            );
        } finally {
            setUpdating(false);
        }
    }

    const cards = [
        {
            title: "Total Orders",
            value: statistics.totalOrders,
            description: "All customer orders",
            icon: ShoppingBag,
        },
        {
            title: "Total Revenue",
            value: formatMoney(statistics.revenue),
            description: "Revenue from all orders",
            icon: DollarSign,
        },
        {
            title: "Pending Orders",
            value: statistics.pending,
            description: "Waiting for processing",
            icon: Clock3,
        },
        {
            title: "Paid Orders",
            value: statistics.paid,
            description: "Successfully paid",
            icon: CreditCard,
        },
    ];

    return (
        <section>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                    <h1 className="font-serif text-3xl font-semibold text-[#27170f]">
                        Orders
                    </h1>

                    <p className="mt-2 text-[#75665d]">
                        View and update customer orders.
                    </p>
                </div>

                <button
                    type="button"
                    disabled={refreshing}
                    onClick={() => loadOrders(true)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#d9cbc2] bg-white px-4 py-2.5 text-sm font-semibold text-[#49352b] transition hover:border-[#84280d] hover:text-[#84280d] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    <RefreshCw
                        size={17}
                        className={refreshing ? "animate-spin" : ""}
                    />

                    Refresh
                </button>
            </div>

            {error && (
                <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    <AlertCircle size={19} className="mt-0.5 shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {cards.map((card) => {
                    const Icon = card.icon;

                    return (
                        <div
                            key={card.title}
                            className="rounded-2xl border border-[#eadfd8] bg-white p-5 shadow-sm"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-sm font-medium text-[#75665d]">
                                        {card.title}
                                    </p>

                                    <p className="mt-3 font-serif text-3xl font-semibold text-[#27170f]">
                                        {card.value}
                                    </p>

                                    <p className="mt-2 text-xs text-[#94847b]">
                                        {card.description}
                                    </p>
                                </div>

                                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#f7ebe5] text-[#84280d]">
                                    <Icon size={21} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-8 rounded-2xl border border-[#eadfd8] bg-white shadow-sm">
                <div className="flex flex-col gap-4 border-b border-[#eadfd8] p-5 lg:flex-row lg:items-center">
                    <div className="relative flex-1">
                        <Search
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94847b]"
                        />

                        <input
                            type="search"
                            value={search}
                            onChange={(event) =>
                                setSearch(event.target.value)
                            }
                            placeholder="Search customer, email, phone or order ID..."
                            className="w-full rounded-xl border border-[#d9cbc2] bg-[#fffaf7] py-3 pl-11 pr-4 text-sm text-[#3b2b23] outline-none transition placeholder:text-[#a7968d] focus:border-[#84280d]"
                        />
                    </div>

                    <select
                        value={orderFilter}
                        onChange={(event) =>
                            setOrderFilter(event.target.value)
                        }
                        className="rounded-xl border border-[#d9cbc2] bg-white px-4 py-3 text-sm text-[#49352b] outline-none focus:border-[#84280d]"
                    >
                        <option value="all">
                            All order statuses
                        </option>
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

                    <select
                        value={paymentFilter}
                        onChange={(event) =>
                            setPaymentFilter(event.target.value)
                        }
                        className="rounded-xl border border-[#d9cbc2] bg-white px-4 py-3 text-sm text-[#49352b] outline-none focus:border-[#84280d]"
                    >
                        <option value="all">
                            All payment statuses
                        </option>
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
                </div>

                {loading ? (
                    <div className="grid min-h-80 place-items-center">
                        <div className="text-center">
                            <RefreshCw
                                size={32}
                                className="mx-auto animate-spin text-[#84280d]"
                            />

                            <p className="mt-3 text-sm text-[#75665d]">
                                Loading orders...
                            </p>
                        </div>
                    </div>
                ) : filteredOrders.length === 0 ? (
                    <div className="grid min-h-80 place-items-center p-6">
                        <div className="text-center">
                            <ReceiptText
                                size={42}
                                className="mx-auto text-[#84280d]"
                            />

                            <p className="mt-4 font-semibold text-[#49352b]">
                                No orders found
                            </p>

                            <p className="mt-1 text-sm text-[#8a7970]">
                                Try changing your search or filters.
                            </p>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="hidden overflow-x-auto lg:block">
                            <table className="w-full min-w-[1000px] text-left">
                                <thead className="bg-[#fff8f4] text-xs uppercase tracking-wide text-[#7b6b62]">
                                    <tr>
                                        <th className="px-5 py-4">
                                            Order
                                        </th>
                                        <th className="px-5 py-4">
                                            Customer
                                        </th>
                                        <th className="px-5 py-4">
                                            Items
                                        </th>
                                        <th className="px-5 py-4">
                                            Payment
                                        </th>
                                        <th className="px-5 py-4">
                                            Status
                                        </th>
                                        <th className="px-5 py-4">
                                            Total
                                        </th>
                                        <th className="px-5 py-4">
                                            Date
                                        </th>
                                        <th className="px-5 py-4 text-right">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-[#f0e7e1]">
                                    {filteredOrders.map((order) => (
                                        <tr
                                            key={order.id}
                                            className="transition hover:bg-[#fffaf7]"
                                        >
                                            <td className="px-5 py-4">
                                                <p className="font-semibold text-[#3b2b23]">
                                                    #
                                                    {order.id
                                                        .slice(0, 8)
                                                        .toUpperCase()}
                                                </p>

                                                <p className="mt-1 text-xs text-[#94847b]">
                                                    {order.paymentMethod}
                                                </p>
                                            </td>

                                            <td className="px-5 py-4">
                                                <p className="font-medium text-[#3b2b23]">
                                                    {order.customerName}
                                                </p>

                                                <p className="mt-1 max-w-52 truncate text-xs text-[#8a7970]">
                                                    {order.customerEmail}
                                                </p>
                                            </td>

                                            <td className="px-5 py-4 text-sm text-[#66564d]">
                                                {order.totalItems}
                                            </td>

                                            <td className="px-5 py-4">
                                                <StatusBadge
                                                    status={
                                                        order.paymentStatus
                                                    }
                                                />
                                            </td>

                                            <td className="px-5 py-4">
                                                <StatusBadge
                                                    status={
                                                        order.orderStatus
                                                    }
                                                />
                                            </td>

                                            <td className="px-5 py-4 font-semibold text-[#84280d]">
                                                {formatMoney(
                                                    order.total,
                                                    order.currency
                                                )}
                                            </td>

                                            <td className="px-5 py-4 text-sm text-[#66564d]">
                                                {formatDate(
                                                    order.createdAt
                                                )}
                                            </td>

                                            <td className="px-5 py-4 text-right">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setSelectedOrder(
                                                            order
                                                        )
                                                    }
                                                    className="inline-flex items-center gap-2 rounded-lg border border-[#dfd1c9] px-3 py-2 text-xs font-semibold text-[#49352b] transition hover:border-[#84280d] hover:text-[#84280d]"
                                                >
                                                    <Eye size={15} />
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="divide-y divide-[#f0e7e1] lg:hidden">
                            {filteredOrders.map((order) => (
                                <article
                                    key={order.id}
                                    className="p-5"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <p className="font-semibold text-[#3b2b23]">
                                                #
                                                {order.id
                                                    .slice(0, 8)
                                                    .toUpperCase()}
                                            </p>

                                            <p className="mt-1 text-sm text-[#75665d]">
                                                {order.customerName}
                                            </p>
                                        </div>

                                        <p className="font-semibold text-[#84280d]">
                                            {formatMoney(
                                                order.total,
                                                order.currency
                                            )}
                                        </p>
                                    </div>

                                    <div className="mt-4 flex flex-wrap gap-2">
                                        <StatusBadge
                                            status={order.orderStatus}
                                        />

                                        <StatusBadge
                                            status={order.paymentStatus}
                                        />
                                    </div>

                                    <div className="mt-4 flex items-center justify-between gap-4 border-t border-[#f0e7e1] pt-4">
                                        <div className="text-xs text-[#8a7970]">
                                            <p>
                                                {order.totalItems} item
                                                {order.totalItems === 1
                                                    ? ""
                                                    : "s"}
                                            </p>

                                            <p className="mt-1">
                                                {formatDate(
                                                    order.createdAt
                                                )}
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setSelectedOrder(order)
                                            }
                                            className="inline-flex items-center gap-2 rounded-lg border border-[#dfd1c9] px-3 py-2 text-xs font-semibold text-[#49352b]"
                                        >
                                            <Eye size={15} />
                                            View details
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </>
                )}
            </div>

            <OrderDetailsModal
                order={selectedOrder}
                onClose={() => setSelectedOrder(null)}
                onOrderStatusChange={handleOrderStatusChange}
                onPaymentStatusChange={handlePaymentStatusChange}
                updating={updating}
            />
        </section>
    );
}