import { Link } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import { blogs } from "../data/blogs";
import { ChevronRight } from "lucide-react";


function Blog() {
    return (
        <>
            <section className="relative h-80 overflow-hidden sm:h-95 lg:h-105">
                {/* Background image */}
                <div className="absolute inset-0 bg-[url('/assets/bg-2.webp')] bg-cover bg-center bg-no-repeat" />

                {/* Warm coffee overlay */}
                <div className="absolute inset-0 bg-[#4b210f]/25" />

                {/* Decorative glow */}
                <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d69a52]/15 blur-3xl" />

                {/* Content */}
                <div className="relative mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center">
                    {/* <span className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-(--secondary-color) sm:text-sm">
                        Discover our collection
                    </span> */}

                    <h1 className="font-serif text-4xl font-semibold text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
                  Blogs
                    </h1>

                    <div className="mt-5 h-px w-20 bg-linear-to-r from-transparent via-[#e4b365] to-transparent" />

                    {/* Breadcrumb */}
                    <div className="mt-5 flex items-center gap-1.5 text-sm text-white/80">
                        <Link
                            to="/"
                            className="transition hover:text-(--secondary-color)"
                        >
                            Home
                        </Link>

                        <ChevronRight size={15} />

                        <span className="text-(--secondary-color)">Blogs</span>
                    </div>
                </div>

                {/* Bottom fade */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-black/30 to-transparent" />
            </section>

            <div className="max-w-6xl mx-auto px-4 py-10">
                <div className="grid md:grid-cols-3 gap-6">
                    {blogs.map((blog) => (
                        <BlogCard key={blog.id} blog={blog} />
                    ))}
                </div>

            </div>

        </>
    );
}

export default Blog;