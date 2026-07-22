import {
    Menu,
    UserRound,
} from "lucide-react";

export default function AdminTopbar({
    onOpenSidebar,
    user,
}) {
    return (
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-[#e8ddd5] bg-white/90 px-5 backdrop-blur-xl sm:px-7 lg:px-10">
            <div className="flex items-center gap-4">
                <button
                    type="button"
                    onClick={onOpenSidebar}
                    className="rounded-xl border border-[#e5d8cf] p-2.5 text-[#49352b] transition hover:bg-[#f7f0eb] lg:hidden"
                    aria-label="Open admin sidebar"
                >
                    <Menu size={22} />
                </button>

                <div>
                    <h2 className="text-lg font-semibold text-[#27170f]">
                        Admin Dashboard
                    </h2>

                    <p className="hidden text-sm text-[#8b7b72] sm:block">
                        Manage your coffee store
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-[#e8ddd5] bg-[#fffaf6] px-3 py-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#84280d] text-white">
                    <UserRound size={18} />
                </div>

                <div className="hidden max-w-44 sm:block">
                    <p className="truncate text-sm font-semibold text-[#49352b]">
                        Administrator
                    </p>

                    <p className="truncate text-xs text-[#95847a]">
                        {user?.email}
                    </p>
                </div>
            </div>
        </header>
    );
}