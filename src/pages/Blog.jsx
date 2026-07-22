import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Newspaper } from "lucide-react";
import BlogCard from "../components/BlogCard";
import { getPublishedBlogs } from "../services/blogService";

function BlogSkeleton() {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, index) => (
                <div
                    key={index}
                    className="overflow-hidden rounded-2xl border border-[#e5d8cf] bg-white p-3"
                >
                    <div className="animate-pulse">
                        <div className="h-52 rounded-xl bg-[#eee4dd]" />

                        <div className="p-4">
                            <div className="h-6 w-24 rounded-full bg-[#eee4dd]" />

                            <div className="mt-4 h-6 w-full rounded bg-[#eee4dd]" />
                            <div className="mt-2 h-6 w-3/4 rounded bg-[#eee4dd]" />

                            <div className="mt-4 space-y-2">
                                <div className="h-3 w-full rounded bg-[#eee4dd]" />
                                <div className="h-3 w-5/6 rounded bg-[#eee4dd]" />
                            </div>

                            <div className="mt-5 flex items-center gap-3 border-t border-[#eee3dc] pt-4">
                                <div className="h-9 w-9 rounded-full bg-[#eee4dd]" />

                                <div className="space-y-2">
                                    <div className="h-3 w-24 rounded bg-[#eee4dd]" />
                                    <div className="h-3 w-16 rounded bg-[#eee4dd]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function Blog() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let ignore = false;

        async function loadBlogs() {
            try {
                setLoading(true);
                setError("");

                const data = await getPublishedBlogs();

                if (!ignore) {
                    setBlogs(data);
                }
            } catch (error) {
                console.error(
                    "Could not load blogs:",
                    error
                );

                if (!ignore) {
                    setError(
                        error.message ||
                        "Could not load blogs."
                    );
                }
            } finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        }

        loadBlogs();

        return () => {
            ignore = true;
        };
    }, []);

    return (
        <main className="bg-[#fffaf6]">
            {/* Banner always remains visible */}
            <section className="relative h-80 overflow-hidden sm:h-95 lg:h-105">
                <div className="absolute inset-0 bg-[url('/assets/bg-2.webp')] bg-cover bg-center bg-no-repeat" />

                <div className="absolute inset-0 bg-[#4b210f]/25" />

                <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d69a52]/15 blur-3xl" />

                <div className="relative mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center">
                    <span className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-(--secondary-color) sm:text-sm">
                        Stories and coffee guides
                    </span>

                    <h1 className="font-serif text-4xl font-semibold text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
                        Blogs
                    </h1>

                    <div className="mt-5 h-px w-20 bg-linear-to-r from-transparent via-[#e4b365] to-transparent" />

                    <div className="mt-5 flex items-center gap-1.5 text-sm text-white/80">
                        <Link
                            to="/"
                            className="transition hover:text-(--secondary-color)"
                        >
                            Home
                        </Link>

                        <ChevronRight size={15} />

                        <span className="text-(--secondary-color)">
                            Blogs
                        </span>
                    </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-black/30 to-transparent" />
            </section>

            {/* Blog content */}
            <section className="py-14 lg:py-20">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="mb-10">
                        <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a4d2b]">
                            Latest articles
                        </span>

                        <h2 className="mt-2 font-serif text-3xl font-semibold text-[#2d1b12] sm:text-4xl">
                            Coffee stories and helpful guides
                        </h2>
                    </div>

                    {loading ? (
                        <BlogSkeleton />
                    ) : error ? (
                        <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-10 text-center">
                            <p className="font-semibold text-red-700">
                                Could not load blogs
                            </p>

                            <p className="mt-2 text-sm text-red-600">
                                {error}
                            </p>
                        </div>
                    ) : blogs.length === 0 ? (
                        <div className="flex min-h-80 items-center justify-center rounded-3xl border border-dashed border-[#d8c8bd] bg-white px-6">
                            <div className="max-w-md text-center">
                                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#f5ebe4] text-[#84280d]">
                                    <Newspaper size={34} />
                                </div>

                                <h2 className="mt-5 text-2xl font-semibold text-[#2d1b12]">
                                    No blogs published yet
                                </h2>

                                <p className="mt-3 leading-7 text-[#75665d]">
                                    New coffee stories and guides will appear
                                    here soon.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {blogs.map((blog) => (
                                <BlogCard
                                    key={blog.id}
                                    blog={blog}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}