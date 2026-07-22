import {
    FileText,
    LayoutDashboard,
    LogOut,
    Package,
    ReceiptText,
    Settings,
    X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const adminLinks = [
    {
        label: "Dashboard",
        path: "/admin",
        end: true,
        icon: LayoutDashboard,
    },
    {
        label: "Products",
        path: "/admin/products",
        icon: Package,
    },
    {
        label: "Blogs",
        path: "/admin/blogs",
        icon: FileText,
    },
    {
        label: "Orders",
        path: "/admin/orders",
        icon: ReceiptText,
    },
    {
        label: "Settings",
        path: "/admin/settings",
        icon: Settings,
    },
];

export default function AdminSidebar({
    open,
    onClose,
    onLogout,
}) {
    return (
        <>
            {open && (
                <button
                    type="button"
                    aria-label="Close sidebar overlay"
                    onClick={onClose}
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
                />
            )}

            <aside
                className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-[#27170f] text-white shadow-2xl transition-transform duration-300 lg:translate-x-0 ${open
                        ? "translate-x-0"
                        : "-translate-x-full"
                    }`}
            >
                <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
                    <NavLink
                        to="/admin"
                        onClick={onClose}
                        className="flex items-center gap-3"
                    >
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#84280d] font-serif text-xl font-bold">
                            C
                        </div>

                        <div>
                            <p className="font-serif text-xl font-semibold">
                                Coffee Admin
                            </p>

                            <p className="text-xs text-white/55">
                                Management panel
                            </p>
                        </div>
                    </NavLink>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-2 text-white/70 transition hover:bg-white/10 hover:text-white lg:hidden"
                        aria-label="Close admin sidebar"
                    >
                        <X size={21} />
                    </button>
                </div>

                <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-6">
                    {adminLinks.map(
                        ({
                            label,
                            path,
                            icon: Icon,
                            end,
                        }) => (
                            <NavLink
                                key={path}
                                to={path}
                                end={end}
                                onClick={onClose}
                                className={({
                                    isActive,
                                }) =>
                                    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${isActive
                                        ? "bg-[#84280d] text-white shadow-lg"
                                        : "text-white/65 hover:bg-white/10 hover:text-white"
                                    }`
                                }
                            >
                                <Icon size={19} />

                                <span>{label}</span>
                            </NavLink>
                        )
                    )}
                </nav>

                <div className="border-t border-white/10 p-4">
                    <button
                        type="button"
                        onClick={onLogout}
                        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-white/70 transition hover:bg-red-500/15 hover:text-red-300"
                    >
                        <LogOut size={19} />
                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
}