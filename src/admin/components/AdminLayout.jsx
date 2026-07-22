import { useEffect, useState } from "react";
import {
    Outlet,
    useNavigate,
} from "react-router-dom";
import { supabase } from "../../lib/supabase";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

export default function AdminLayout() {
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] =
        useState(false);

    const [user, setUser] = useState(null);

    useEffect(() => {
        let mounted = true;

        async function loadUser() {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (mounted) {
                setUser(user);
            }
        }

        loadUser();

        return () => {
            mounted = false;
        };
    }, []);

    async function handleLogout() {
        const { error } =
            await supabase.auth.signOut();

        if (error) {
            console.error(
                "Logout error:",
                error
            );
            return;
        }

        navigate("/admin/login", {
            replace: true,
        });
    }

    return (
        <div className="min-h-screen bg-[#f7f4f1]">
            <AdminSidebar
                open={sidebarOpen}
                onClose={() =>
                    setSidebarOpen(false)
                }
                onLogout={handleLogout}
            />

            <div className="min-h-screen lg:pl-72">
                <AdminTopbar
                    user={user}
                    onOpenSidebar={() =>
                        setSidebarOpen(true)
                    }
                />

                <main className="p-5 sm:p-7 lg:p-10">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}