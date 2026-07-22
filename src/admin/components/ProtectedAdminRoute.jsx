import { useEffect, useState } from "react";
import {
    Navigate,
    useLocation,
} from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { getAdminProfile } from "../services/adminProfileService";

export default function ProtectedAdminRoute({
    children,
}) {
    const location = useLocation();

    const [session, setSession] = useState(null);
    const [adminProfile, setAdminProfile] =
        useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        async function checkAdminAccess() {
            try {
                const {
                    data: { session },
                } = await supabase.auth.getSession();

                if (!mounted) return;

                setSession(session);

                if (!session) {
                    setAdminProfile(null);
                    return;
                }

                const profile =
                    await getAdminProfile();

                if (mounted) {
                    setAdminProfile(profile);
                }
            } catch (error) {
                console.error(
                    "Admin access check failed:",
                    error
                );

                if (mounted) {
                    setAdminProfile(null);
                }
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        }

        checkAdminAccess();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(
            async (_event, newSession) => {
                if (!mounted) return;

                setLoading(true);
                setSession(newSession);

                try {
                    if (!newSession) {
                        setAdminProfile(null);
                        return;
                    }

                    const profile =
                        await getAdminProfile();

                    if (mounted) {
                        setAdminProfile(profile);
                    }
                } catch (error) {
                    console.error(
                        "Admin profile check failed:",
                        error
                    );

                    if (mounted) {
                        setAdminProfile(null);
                    }
                } finally {
                    if (mounted) {
                        setLoading(false);
                    }
                }
            }
        );

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, []);

    if (loading) {
        return (
            <div className="grid min-h-screen place-items-center bg-[#f7f4f1]">
                <div className="text-center">
                    <div className="mx-auto h-11 w-11 animate-spin rounded-full border-4 border-[#e5d8cf] border-t-[#84280d]" />

                    <p className="mt-4 text-sm font-medium text-[#75665d]">
                        Checking admin access...
                    </p>
                </div>
            </div>
        );
    }

    if (!session) {
        return (
            <Navigate
                to="/admin/login"
                replace
                state={{
                    from: location.pathname,
                }}
            />
        );
    }

    if (!adminProfile) {
        return (
            <section className="grid min-h-screen place-items-center bg-[#fffaf6] px-6">
                <div className="max-w-md rounded-3xl border border-red-200 bg-white p-8 text-center shadow-sm">
                    <h1 className="text-3xl font-semibold text-[#27170f]">
                        Access denied
                    </h1>

                    <p className="mt-4 leading-7 text-[#75665d]">
                        Your account is authenticated,
                        but it does not have admin
                        permission.
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            supabase.auth.signOut()
                        }
                        className="mt-7 rounded-xl bg-[#84280d] px-6 py-3 font-semibold text-white"
                    >
                        Sign out
                    </button>
                </div>
            </section>
        );
    }

    return children;
}