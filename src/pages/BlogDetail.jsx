import { useEffect, useState } from "react";
import {
    Link,
    useParams,
} from "react-router-dom";
import {
    CalendarDays,
    ChevronRight,
    UserRound,
} from "lucide-react";
import { getBlogBySlug } from "../services/blogService";

function BlogDetailSkeleton() {
    return (
        <section className="bg-[#fffaf6] py-10 lg:py-16">
            <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
                <div className="animate-pulse">
                    <div className="mb-8 flex gap-2">
                        <div className="h-4 w-12 rounded bg-[#eadfd8]" />
                        <div className="h-4 w-3 rounded bg-[#eadfd8]" />
                        <div className="h-4 w-28 rounded bg-[#eadfd8]" />
                    </div>

                    <div className="aspect-video w-full rounded-3xl bg-[#eadfd8]" />

                    <div className="mt-8 h-7 w-28 rounded-full bg-[#eadfd8]" />

                    <div className="mt-5 h-12 w-full rounded-xl bg-[#eadfd8]" />
                    <div className="mt-3 h-12 w-4/5 rounded-xl bg-[#eadfd8]" />

                    <div className="mt-6 flex items-center gap-4">
                        <div className="h-11 w-11 rounded-full bg-[#eadfd8]" />

                        <div className="space-y-2">
                            <div className="h-4 w-28 rounded bg-[#eadfd8]" />
                            <div className="h-3 w-20 rounded bg-[#eadfd8]" />
                        </div>
                    </div>

                    <div className="mt-10 space-y-4">
                        {[100, 95, 88, 100, 92, 75].map(
                            (width, index) => (
                                <div
                                    key={index}
                                    style={{
                                        width: `${width}%`,
                                    }}
                                    className="h-4 rounded bg-[#eadfd8]"
                                />
                            )
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function BlogDetail() {
    const { slug } = useParams();

    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let ignore = false;

        async function loadBlog() {
            try {
                setLoading(true);
                setError("");

                const data = await getBlogBySlug(slug);

                if (!ignore) {
                    setBlog(data);
                }
            } catch (error) {
                console.error(
                    "Could not load blog:",
                    error
                );

                if (!ignore) {
                    setError(
                        error.message ||
                        "Could not load this blog."
                    );
                }
            } finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        }

        loadBlog();

        return () => {
            ignore = true;
        };
    }, [slug]);

    if (loading) {
        return <BlogDetailSkeleton />;
    }

    if (error || !blog) {
        return (
            <section className="flex min-h-[70vh] items-center justify-center bg-[#fffaf6] px-6">
                <div className="max-w-lg text-center">
                    <h1 className="text-4xl font-semibold text-[#27170f]">
                        Blog not found
                    </h1>

                    <p className="mt-4 leading-7 text-[#75665d]">
                        {error ||
                            "This blog is unavailable or has not been published."}
                    </p>

                    <Link
                        to="/blog"
                        className="mt-7 inline-flex rounded-xl bg-[#84280d] px-7 py-3 font-semibold text-white transition hover:bg-[#651d08]"
                    >
                        Return to blogs
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <article className="bg-[#fffaf6] py-10 lg:py-16">
            <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <div className="mb-8 flex flex-wrap items-center gap-1.5 text-sm text-[#88766c]">
                    <Link
                        to="/"
                        className="transition hover:text-[#84280d]"
                    >
                        Home
                    </Link>

                    <ChevronRight size={15} />

                    <Link
                        to="/blog"
                        className="transition hover:text-[#84280d]"
                    >
                        Blogs
                    </Link>

                    <ChevronRight size={15} />

                    <span className="max-w-60 truncate text-[#84280d]">
                        {blog.title}
                    </span>
                </div>

                {/* Featured image */}
                <div className="overflow-hidden rounded-3xl bg-[#eee4dd]">
                    <img
                        src={blog.img}
                        alt={blog.title}
                        className="aspect-video w-full object-cover"
                        onError={(event) => {
                            event.currentTarget.src =
                                "/assets/blog-placeholder.webp";
                        }}
                    />
                </div>

                {/* Header */}
                <header className="mt-8">
                    <span className="inline-flex rounded-full bg-[#84280d] px-4 py-1.5 text-xs font-semibold text-white">
                        {blog.category}
                    </span>

                    <h1 className="mt-5 font-serif text-4xl font-semibold leading-tight text-[#27170f] sm:text-5xl">
                        {blog.title}
                    </h1>

                    {blog.excerpt && (
                        <p className="mt-5 text-lg leading-8 text-[#75665d]">
                            {blog.excerpt}
                        </p>
                    )}

                    <div className="mt-7 flex flex-wrap items-center gap-5 border-y border-[#e5d8cf] py-5">
                        <div className="flex items-center gap-3">
                            <img
                                src={blog.author}
                                alt={blog.authorName}
                                className="h-11 w-11 rounded-full object-cover"
                                onError={(event) => {
                                    event.currentTarget.src =
                                        "/assets/author-placeholder.webp";
                                }}
                            />

                            <div>
                                <div className="flex items-center gap-1.5 text-sm font-semibold text-[#49352b]">
                                    <UserRound size={15} />
                                    {blog.authorName}
                                </div>

                                <div className="mt-1 flex items-center gap-1.5 text-xs text-[#95847a]">
                                    <CalendarDays size={14} />
                                    {blog.date}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className="mt-10">
                    <div className="whitespace-pre-line text-base leading-8 text-[#5f5048] sm:text-lg sm:leading-9">
                        {blog.content}
                    </div>
                </div>

                <div className="mt-12 border-t border-[#e5d8cf] pt-8">
                    <Link
                        to="/blog"
                        className="inline-flex rounded-xl bg-[#84280d] px-6 py-3 font-semibold text-white transition hover:bg-[#651d08]"
                    >
                        View all blogs
                    </Link>
                </div>
            </div>
        </article>
    );
}