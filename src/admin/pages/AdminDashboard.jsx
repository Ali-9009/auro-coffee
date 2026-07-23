import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    AlertCircle,
    DollarSign,
    FileText,
    LoaderCircle,
    Package,
    ReceiptText,
    RefreshCw,
    TrendingUp,
} from "lucide-react";

import { getDashboardData } from "../services/adminDashboardService";

function formatCurrency(value) {
    return new Intl.NumberFormat(
        "en-US",
        {
            style: "currency",
            currency: "USD",
        }
    ).format(Number(value) || 0);
}

function formatDate(value) {
    if (!value) return "";

    return new Intl.DateTimeFormat(
        "en-US",
        {
            month: "short",
            day: "numeric",
            year: "numeric",
        }
    ).format(new Date(value));
}

function getStatusClasses(status) {
    switch (
    String(status).toLowerCase()
    ) {
        case "completed":
            return "bg-green-100 text-green-700";

        case "cancelled":
            return "bg-red-100 text-red-700";

        case "processing":
        case "preparing":
            return "bg-blue-100 text-blue-700";

        default:
            return "bg-amber-100 text-amber-700";
    }
}

function DashboardSkeleton() {
    return (
        <div className="mt-9 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {[...Array(4)].map(
                (_, index) => (
                    <div
                        key={index}
                        className="h-40 animate-pulse rounded-2xl border border-[#e5d8cf] bg-white p-6"
                    >
                        <div className="h-4 w-28 rounded bg-[#eee4dd]" />
                        <div className="mt-5 h-9 w-20 rounded bg-[#eee4dd]" />
                        <div className="mt-5 h-3 w-36 rounded bg-[#eee4dd]" />
                    </div>
                )
            )}
        </div>
    );
}

export default function AdminDashboard() {
    const [dashboard, setDashboard] =
        useState({
            totalProducts: 0,
            publishedBlogs: 0,
            totalOrders: 0,
            totalRevenue: 0,
            recentOrders: [],
        });

    const [loading, setLoading] =
        useState(true);

    const [refreshing, setRefreshing] =
        useState(false);

    const [error, setError] =
        useState("");

    useEffect(() => {
        loadDashboard();
    }, []);

    async function loadDashboard(
        manualRefresh = false
    ) {
        try {
            if (manualRefresh) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }

            setError("");

            const data =
                await getDashboardData();

            setDashboard(data);
        } catch (loadError) {
            console.error(
                "Dashboard loading failed:",
                loadError
            );

            setError(
                loadError.message ||
                "Could not load dashboard data."
            );
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }

    const stats = useMemo(
        () => [
            {
                label: "Total Products",
                value:
                    dashboard.totalProducts.toLocaleString(),
                description:
                    "Products in your store",
                icon: Package,
            },
            {
                label: "Published Blogs",
                value:
                    dashboard.publishedBlogs.toLocaleString(),
                description:
                    "Live blog articles",
                icon: FileText,
            },
            {
                label: "Total Orders",
                value:
                    dashboard.totalOrders.toLocaleString(),
                description:
                    "All customer orders",
                icon: ReceiptText,
            },
            {
                label: "Total Revenue",
                value: formatCurrency(
                    dashboard.totalRevenue
                ),
                description:
                    "Completed order revenue",
                icon: DollarSign,
            },
        ],
        [dashboard]
    );

    return (
        <div>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a4d2b]">
                        Overview
                    </p>

                    <h1 className="mt-2 font-serif text-3xl font-semibold text-[#27170f] sm:text-4xl">
                        Welcome back
                    </h1>

                    <p className="mt-2 text-[#75665d]">
                        Here is what is happening
                        in your coffee store.
                    </p>
                </div>

                <button
                    type="button"
                    disabled={refreshing}
                    onClick={() =>
                        loadDashboard(true)
                    }
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#d9cbc2] bg-white px-4 text-sm font-semibold text-[#49352b] transition hover:border-[#84280d] hover:text-[#84280d] disabled:opacity-60"
                >
                    {refreshing ? (
                        <LoaderCircle
                            size={17}
                            className="animate-spin"
                        />
                    ) : (
                        <RefreshCw size={17} />
                    )}

                    Refresh
                </button>
            </div>

            {error && (
                <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    <AlertCircle
                        size={19}
                        className="mt-0.5 shrink-0"
                    />

                    <span>{error}</span>
                </div>
            )}

            {loading ? (
                <DashboardSkeleton />
            ) : (
                <div className="mt-9 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                    {stats.map(
                        ({
                            label,
                            value,
                            description,
                            icon: Icon,
                        }) => (
                            <article
                                key={label}
                                className="rounded-2xl border border-[#e5d8cf] bg-white p-6 shadow-sm"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-[#806f65]">
                                            {label}
                                        </p>

                                        <p className="mt-3 text-3xl font-bold text-[#27170f]">
                                            {value}
                                        </p>
                                    </div>

                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f6e8df] text-[#84280d]">
                                        <Icon
                                            size={
                                                23
                                            }
                                        />
                                    </div>
                                </div>

                                <p className="mt-5 text-xs text-[#95847a]">
                                    {
                                        description
                                    }
                                </p>
                            </article>
                        )
                    )}
                </div>
            )}

            <div className="mt-7 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
                <section className="overflow-hidden rounded-2xl border border-[#e5d8cf] bg-white shadow-sm">
                    <div className="flex items-center justify-between border-b border-[#eee5df] p-6">
                        <div>
                            <h2 className="text-lg font-semibold text-[#27170f]">
                                Recent orders
                            </h2>

                            <p className="mt-1 text-sm text-[#8b7b72]">
                                Latest customer
                                orders
                            </p>
                        </div>

                        <ReceiptText
                            size={22}
                            className="text-[#84280d]"
                        />
                    </div>

                    {loading ? (
                        <div className="grid min-h-64 place-items-center">
                            <LoaderCircle className="animate-spin text-[#84280d]" />
                        </div>
                    ) : dashboard
                        .recentOrders
                        .length === 0 ? (
                        <div className="m-6 flex min-h-56 items-center justify-center rounded-xl border border-dashed border-[#d9cbc2] bg-[#fffaf6]">
                            <div className="text-center">
                                <ReceiptText
                                    size={34}
                                    className="mx-auto text-[#b69d8f]"
                                />

                                <p className="mt-3 font-semibold text-[#49352b]">
                                    No recent
                                    orders
                                </p>

                                <p className="mt-1 text-sm text-[#95847a]">
                                    New orders will
                                    appear here.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div>
                            {dashboard.recentOrders.map(
                                (order) => (
                                    <article
                                        key={order.id}
                                        className="flex flex-col gap-4 border-b border-[#eee5df] p-5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:px-6"
                                    >
                                        <div>
                                            <p className="font-semibold text-[#27170f]">
                                                #
                                                {
                                                    order.orderNumber
                                                }
                                            </p>

                                            <p className="mt-1 text-sm text-[#75665d]">
                                                {
                                                    order.customerName
                                                }
                                            </p>

                                            <p className="mt-1 text-xs text-[#95847a]">
                                                {formatDate(
                                                    order.createdAt
                                                )}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-3 sm:text-right">
                                            <div>
                                                <p className="font-semibold text-[#84280d]">
                                                    {formatCurrency(
                                                        order.total
                                                    )}
                                                </p>

                                                <span
                                                    className={`mt-1 inline-block rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${getStatusClasses(
                                                        order.status
                                                    )}`}
                                                >
                                                    {
                                                        order.status
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    </article>
                                )
                            )}
                        </div>
                    )}
                </section>

                <section className="rounded-2xl border border-[#e5d8cf] bg-[#27170f] p-6 text-white shadow-sm">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#84280d]">
                        <TrendingUp size={23} />
                    </div>

                    <h2 className="mt-6 font-serif text-2xl font-semibold">
                        Store management
                    </h2>

                    <p className="mt-3 leading-7 text-white/65">
                        Products, blogs, sizes
                        and orders are managed
                        from this dashboard.
                    </p>

                    <div className="mt-7 space-y-3 text-sm">
                        <div className="rounded-xl bg-white/8 px-4 py-3">
                            Product and size
                            management
                        </div>

                        <div className="rounded-xl bg-white/8 px-4 py-3">
                            Blog management
                        </div>

                        <div className="rounded-xl bg-white/8 px-4 py-3">
                            Order management
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}