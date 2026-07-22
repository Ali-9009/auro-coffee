import {
    DollarSign,
    FileText,
    Package,
    ReceiptText,
    TrendingUp,
} from "lucide-react";

const stats = [
    {
        label: "Total Products",
        value: "0",
        description: "Products in your store",
        icon: Package,
    },
    {
        label: "Published Blogs",
        value: "0",
        description: "Live blog articles",
        icon: FileText,
    },
    {
        label: "Total Orders",
        value: "0",
        description: "All customer orders",
        icon: ReceiptText,
    },
    {
        label: "Total Revenue",
        value: "$0.00",
        description: "Completed order revenue",
        icon: DollarSign,
    },
];

export default function AdminDashboard() {
    return (
        <div>
            <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a4d2b]">
                    Overview
                </p>

                <h1 className="mt-2 font-serif text-3xl font-semibold text-[#27170f] sm:text-4xl">
                    Welcome back
                </h1>

                <p className="mt-2 text-[#75665d]">
                    Here is what is happening in
                    your coffee store.
                </p>
            </div>

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
                                    <Icon size={23} />
                                </div>
                            </div>

                            <p className="mt-5 text-xs text-[#95847a]">
                                {description}
                            </p>
                        </article>
                    )
                )}
            </div>

            <div className="mt-7 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
                <section className="rounded-2xl border border-[#e5d8cf] bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-[#27170f]">
                                Recent orders
                            </h2>

                            <p className="mt-1 text-sm text-[#8b7b72]">
                                Latest customer orders
                            </p>
                        </div>

                        <ReceiptText
                            size={22}
                            className="text-[#84280d]"
                        />
                    </div>

                    <div className="mt-8 flex min-h-56 items-center justify-center rounded-xl border border-dashed border-[#d9cbc2] bg-[#fffaf6]">
                        <div className="text-center">
                            <ReceiptText
                                size={34}
                                className="mx-auto text-[#b69d8f]"
                            />

                            <p className="mt-3 font-semibold text-[#49352b]">
                                No recent orders
                            </p>

                            <p className="mt-1 text-sm text-[#95847a]">
                                New orders will appear
                                here.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="rounded-2xl border border-[#e5d8cf] bg-[#27170f] p-6 text-white shadow-sm">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#84280d]">
                        <TrendingUp size={23} />
                    </div>

                    <h2 className="mt-6 font-serif text-2xl font-semibold">
                        Store management
                    </h2>

                    <p className="mt-3 leading-7 text-white/65">
                        Products, blogs and orders
                        will all be managed from
                        this dashboard.
                    </p>

                    <div className="mt-7 space-y-3 text-sm">
                        <div className="rounded-xl bg-white/8 px-4 py-3">
                            Product management
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