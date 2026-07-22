import { useEffect, useState } from "react";
import {
    Eye,
    EyeOff,
    LockKeyhole,
    Mail,
} from "lucide-react";
import {
    Navigate,
    useLocation,
    useNavigate,
} from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { adminLogin } from "../services/adminAuthService";

export default function AdminLogin() {
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] =
        useState(false);

    const [loading, setLoading] = useState(false);
    const [checkingSession, setCheckingSession] =
        useState(true);

    const [error, setError] = useState("");
    const [session, setSession] = useState(null);

    const redirectPath =
        location.state?.from || "/admin";

    useEffect(() => {
        async function checkSession() {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            setSession(session);
            setCheckingSession(false);
        }

        checkSession();
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();

        if (!email.trim() || !password.trim()) {
            setError(
                "Please enter your email and password."
            );
            return;
        }

        try {
            setLoading(true);
            setError("");

            await adminLogin(
                email.trim(),
                password
            );

            navigate(redirectPath, {
                replace: true,
            });
        } catch (error) {
            console.error(
                "Admin login failed:",
                error
            );

            setError(
                error.message ||
                "Could not sign in."
            );
        } finally {
            setLoading(false);
        }
    }

    if (checkingSession) {
        return (
            <div className="grid min-h-screen place-items-center bg-[#f7f4f1]">
                <div className="h-11 w-11 animate-spin rounded-full border-4 border-[#e5d8cf] border-t-[#84280d]" />
            </div>
        );
    }

    if (session) {
        return (
            <Navigate
                to="/admin"
                replace
            />
        );
    }

    return (
        <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[#27170f] px-5 py-10">
            <div className="absolute left-[-100px] top-[-100px] h-80 w-80 rounded-full bg-[#84280d]/30 blur-3xl" />

            <div className="absolute bottom-[-100px] right-[-100px] h-80 w-80 rounded-full bg-[#d69a52]/20 blur-3xl" />

            <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white p-7 shadow-2xl sm:p-10">
                <div className="text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#84280d] text-white shadow-lg">
                        <LockKeyhole size={29} />
                    </div>

                    <h1 className="mt-5 font-serif text-3xl font-semibold text-[#27170f]">
                        Admin login
                    </h1>

                    <p className="mt-2 text-sm leading-6 text-[#75665d]">
                        Sign in to manage products,
                        blogs, orders and store
                        content.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-5"
                >
                    <div>
                        <label
                            htmlFor="admin-email"
                            className="mb-2 block text-sm font-semibold text-[#49352b]"
                        >
                            Email address
                        </label>

                        <div className="relative">
                            <Mail
                                size={18}
                                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9a8b82]"
                            />

                            <input
                                id="admin-email"
                                type="email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(
                                        event.target.value
                                    )
                                }
                                autoComplete="email"
                                placeholder="admin@example.com"
                                className="h-13 w-full rounded-xl border border-[#ded2ca] bg-white pl-12 pr-4 text-[#27170f] outline-none transition placeholder:text-[#a89990] focus:border-[#84280d] focus:ring-4 focus:ring-[#84280d]/10"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="admin-password"
                            className="mb-2 block text-sm font-semibold text-[#49352b]"
                        >
                            Password
                        </label>

                        <div className="relative">
                            <LockKeyhole
                                size={18}
                                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9a8b82]"
                            />

                            <input
                                id="admin-password"
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                value={password}
                                onChange={(event) =>
                                    setPassword(
                                        event.target.value
                                    )
                                }
                                autoComplete="current-password"
                                placeholder="Enter password"
                                className="h-13 w-full rounded-xl border border-[#ded2ca] bg-white pl-12 pr-12 text-[#27170f] outline-none transition placeholder:text-[#a89990] focus:border-[#84280d] focus:ring-4 focus:ring-[#84280d]/10"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(
                                        (previous) =>
                                            !previous
                                    )
                                }
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#75665d] transition hover:text-[#84280d]"
                                aria-label={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                            >
                                {showPassword ? (
                                    <EyeOff size={19} />
                                ) : (
                                    <Eye size={19} />
                                )}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex h-13 w-full items-center justify-center rounded-xl bg-[#84280d] px-5 font-semibold text-white transition hover:bg-[#681f0b] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading
                            ? "Signing in..."
                            : "Sign in"}
                    </button>
                </form>

                <p className="mt-6 text-center text-xs leading-5 text-[#95847a]">
                    This area is restricted to
                    authorized store administrators.
                </p>
            </div>
        </main>
    );
}