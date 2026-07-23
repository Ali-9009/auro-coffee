import { useEffect, useMemo, useState } from "react";
import {
    BookOpen,
    Search,
    Plus,
    Pencil,
    Trash2,
    RefreshCw,
    Eye,
    FileText,
    Globe2,
    Clock3,
    AlertCircle,
} from "lucide-react";

import BlogFormModal from "../components/BlogFormModal";

import {
    deleteBlog,
    getAdminBlogs,
    updateBlogStatus,
} from "../services/adminBlogService";

function formatDate(value) {
    if (!value) return "—";

    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(new Date(value));
}

function StatusBadge({ status }) {
    const published = status === "published";

    return (
        <span
            className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${published
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-amber-200 bg-amber-50 text-amber-700"
                }`}
        >
            {status}
        </span>
    );
}

export default function AdminBlogs() {
    const [blogs, setBlogs] = useState([]);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [updatingId, setUpdatingId] = useState("");
    const [deletingId, setDeletingId] = useState("");
    const [error, setError] = useState("");

    async function loadBlogs(refresh = false) {
        try {
            setError("");

            if (refresh) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }

            const data = await getAdminBlogs();
            setBlogs(data);
        } catch (err) {
            setError(err.message || "Could not load blogs.");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }

    useEffect(() => {
        loadBlogs();
    }, []);

    const statistics = useMemo(() => {
        const published = blogs.filter(
            (blog) => blog.status === "published"
        ).length;

        const drafts = blogs.filter(
            (blog) => blog.status === "draft"
        ).length;

        return {
            total: blogs.length,
            published,
            drafts,
        };
    }, [blogs]);

    const filteredBlogs = useMemo(() => {
        const query = search.trim().toLowerCase();

        return blogs.filter((blog) => {
            const matchesSearch =
                !query ||
                blog.title.toLowerCase().includes(query) ||
                blog.slug.toLowerCase().includes(query) ||
                blog.category.toLowerCase().includes(query) ||
                blog.authorName.toLowerCase().includes(query);

            const matchesStatus =
                statusFilter === "all" ||
                blog.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [blogs, search, statusFilter]);

    function openCreateModal() {
        setSelectedBlog(null);
        setModalOpen(true);
    }

    function openEditModal(blog) {
        setSelectedBlog(blog);
        setModalOpen(true);
    }

    function handleSaved(savedBlog) {
        setBlogs((current) => {
            const exists = current.some(
                (blog) => blog.id === savedBlog.id
            );

            if (exists) {
                return current.map((blog) =>
                    blog.id === savedBlog.id
                        ? savedBlog
                        : blog
                );
            }

            return [savedBlog, ...current];
        });
    }

    async function handleStatusChange(blog) {
        const nextStatus =
            blog.status === "published"
                ? "draft"
                : "published";

        try {
            setUpdatingId(blog.id);
            setError("");

            const updatedBlog = await updateBlogStatus(
                blog.id,
                nextStatus
            );

            setBlogs((current) =>
                current.map((item) =>
                    item.id === blog.id
                        ? updatedBlog
                        : item
                )
            );
        } catch (err) {
            setError(
                err.message || "Could not update blog status."
            );
        } finally {
            setUpdatingId("");
        }
    }

    async function handleDelete(blog) {
        const confirmed = window.confirm(
            `Delete "${blog.title}"? This action cannot be undone.`
        );

        if (!confirmed) return;

        try {
            setDeletingId(blog.id);
            setError("");

            await deleteBlog(blog.id);

            setBlogs((current) =>
                current.filter(
                    (item) => item.id !== blog.id
                )
            );
        } catch (err) {
            setError(err.message || "Could not delete blog.");
        } finally {
            setDeletingId("");
        }
    }

    const cards = [
        {
            title: "Total Blogs",
            value: statistics.total,
            text: "All blog articles",
            icon: BookOpen,
        },
        {
            title: "Published",
            value: statistics.published,
            text: "Visible to customers",
            icon: Globe2,
        },
        {
            title: "Drafts",
            value: statistics.drafts,
            text: "Not currently public",
            icon: Clock3,
        },
    ];

    return (
        <section>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                    <h1 className="font-serif text-3xl font-semibold text-[#27170f]">
                        Blogs
                    </h1>

                    <p className="mt-2 text-[#75665d]">
                        Create, edit and publish blog articles.
                    </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                        type="button"
                        disabled={refreshing}
                        onClick={() => loadBlogs(true)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#d9cbc2] bg-white px-4 py-2.5 text-sm font-semibold text-[#49352b] transition hover:border-[#84280d] hover:text-[#84280d]"
                    >
                        <RefreshCw
                            size={17}
                            className={
                                refreshing
                                    ? "animate-spin"
                                    : ""
                            }
                        />

                        Refresh
                    </button>

                    <button
                        type="button"
                        onClick={openCreateModal}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#84280d] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#6f210b]"
                    >
                        <Plus size={18} />
                        Add Blog
                    </button>
                </div>
            </div>

            {error && (
                <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    <AlertCircle
                        size={19}
                        className="mt-0.5 shrink-0"
                    />

                    <span>{error}</span>
                </div>
            )}

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {cards.map((card) => {
                    const Icon = card.icon;

                    return (
                        <div
                            key={card.title}
                            className="rounded-2xl border border-[#eadfd8] bg-white p-5 shadow-sm"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-sm font-medium text-[#75665d]">
                                        {card.title}
                                    </p>

                                    <p className="mt-3 font-serif text-3xl font-semibold text-[#27170f]">
                                        {card.value}
                                    </p>

                                    <p className="mt-2 text-xs text-[#94847b]">
                                        {card.text}
                                    </p>
                                </div>

                                <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#f7ebe5] text-[#84280d]">
                                    <Icon size={21} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-8 overflow-hidden rounded-2xl border border-[#eadfd8] bg-white shadow-sm">
                <div className="flex flex-col gap-4 border-b border-[#eadfd8] p-5 md:flex-row">
                    <div className="relative flex-1">
                        <Search
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94847b]"
                        />

                        <input
                            type="search"
                            value={search}
                            onChange={(event) =>
                                setSearch(event.target.value)
                            }
                            placeholder="Search title, slug, category or author..."
                            className="w-full rounded-xl border border-[#d9cbc2] bg-[#fffaf7] py-3 pl-11 pr-4 text-sm outline-none focus:border-[#84280d]"
                        />
                    </div>

                    <select
                        value={statusFilter}
                        onChange={(event) =>
                            setStatusFilter(
                                event.target.value
                            )
                        }
                        className="rounded-xl border border-[#d9cbc2] bg-white px-4 py-3 text-sm outline-none focus:border-[#84280d]"
                    >
                        <option value="all">
                            All statuses
                        </option>

                        <option value="published">
                            Published
                        </option>

                        <option value="draft">
                            Draft
                        </option>
                    </select>
                </div>

                {loading ? (
                    <div className="grid min-h-80 place-items-center">
                        <div className="text-center">
                            <RefreshCw
                                size={32}
                                className="mx-auto animate-spin text-[#84280d]"
                            />

                            <p className="mt-3 text-sm text-[#75665d]">
                                Loading blogs...
                            </p>
                        </div>
                    </div>
                ) : filteredBlogs.length === 0 ? (
                    <div className="grid min-h-80 place-items-center p-6 text-center">
                        <div>
                            <FileText
                                size={42}
                                className="mx-auto text-[#84280d]"
                            />

                            <p className="mt-4 font-semibold text-[#49352b]">
                                No blogs found
                            </p>

                            <p className="mt-1 text-sm text-[#8a7970]">
                                Create your first blog or change the filters.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="divide-y divide-[#f0e7e1]">
                        {filteredBlogs.map((blog) => (
                            <article
                                key={blog.id}
                                className="grid gap-5 p-5 transition hover:bg-[#fffaf7] lg:grid-cols-[180px_1fr_auto] lg:items-center"
                            >
                                <div className="overflow-hidden rounded-xl bg-[#f7ebe5]">
                                    {blog.featuredImage ? (
                                        <img
                                            src={
                                                blog.featuredImage
                                            }
                                            alt={blog.title}
                                            className="h-36 w-full object-cover lg:h-28"
                                        />
                                    ) : (
                                        <div className="grid h-36 place-items-center text-[#a58f83] lg:h-28">
                                            <BookOpen size={32} />
                                        </div>
                                    )}
                                </div>

                                <div className="min-w-0">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <StatusBadge
                                            status={blog.status}
                                        />

                                        <span className="rounded-full bg-[#f7ebe5] px-2.5 py-1 text-xs font-medium text-[#84280d]">
                                            {blog.category}
                                        </span>
                                    </div>

                                    <h2 className="mt-3 font-serif text-xl font-semibold text-[#27170f]">
                                        {blog.title}
                                    </h2>

                                    <p className="mt-1 text-xs text-[#94847b]">
                                        /{blog.slug}
                                    </p>

                                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#75665d]">
                                        {blog.excerpt ||
                                            blog.content}
                                    </p>

                                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-[#94847b]">
                                        <span>
                                            By {blog.authorName}
                                        </span>

                                        <span>
                                            Created{" "}
                                            {formatDate(
                                                blog.createdAt
                                            )}
                                        </span>

                                        {blog.publishedAt && (
                                            <span>
                                                Published{" "}
                                                {formatDate(
                                                    blog.publishedAt
                                                )}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 lg:flex-col">
                                    <button
                                        type="button"
                                        disabled={
                                            updatingId === blog.id
                                        }
                                        onClick={() =>
                                            handleStatusChange(
                                                blog
                                            )
                                        }
                                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#d9cbc2] px-3 py-2 text-xs font-semibold text-[#49352b] transition hover:border-[#84280d] hover:text-[#84280d] disabled:opacity-50"
                                    >
                                        <Eye size={15} />

                                        {updatingId === blog.id
                                            ? "Updating..."
                                            : blog.status ===
                                                "published"
                                                ? "Move to Draft"
                                                : "Publish"}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            openEditModal(blog)
                                        }
                                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#d9cbc2] px-3 py-2 text-xs font-semibold text-[#49352b] transition hover:border-[#84280d] hover:text-[#84280d]"
                                    >
                                        <Pencil size={15} />
                                        Edit
                                    </button>

                                    <button
                                        type="button"
                                        disabled={
                                            deletingId === blog.id
                                        }
                                        onClick={() =>
                                            handleDelete(blog)
                                        }
                                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                                    >
                                        <Trash2 size={15} />

                                        {deletingId === blog.id
                                            ? "Deleting..."
                                            : "Delete"}
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>

            <BlogFormModal
                open={modalOpen}
                blog={selectedBlog}
                onClose={() => {
                    setModalOpen(false);
                    setSelectedBlog(null);
                }}
                onSaved={handleSaved}
            />
        </section>
    );
}