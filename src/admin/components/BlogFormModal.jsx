import { useEffect, useState } from "react";
import {
    X,
    Upload,
    Image as ImageIcon,
    LoaderCircle,
    User,
} from "lucide-react";

import {
    createBlog,
    createSlug,
    updateBlog,
    uploadBlogImage,
} from "../services/adminBlogService";

const emptyForm = {
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "Coffee",
    featuredImage: "",
    authorName: "Admin",
    authorImage: "",
    status: "draft",
    publishedAt: null,
};

export default function BlogFormModal({
    open,
    blog,
    onClose,
    onSaved,
}) {
    const [form, setForm] = useState(emptyForm);
    const [slugEdited, setSlugEdited] = useState(false);

    const [coverUploading, setCoverUploading] = useState(false);
    const [authorUploading, setAuthorUploading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const isEditing = Boolean(blog?.id);

    useEffect(() => {
        if (!open) return;

        setError("");
        setSlugEdited(Boolean(blog?.slug));

        if (blog) {
            setForm({
                title: blog.title || "",
                slug: blog.slug || "",
                excerpt: blog.excerpt || "",
                content: blog.content || "",
                category: blog.category || "Coffee",
                featuredImage: blog.featuredImage || "",
                authorName: blog.authorName || "Admin",
                authorImage: blog.authorImage || "",
                status: blog.status || "draft",
                publishedAt: blog.publishedAt || null,
            });
        } else {
            setForm(emptyForm);
            setSlugEdited(false);
        }
    }, [open, blog]);

    if (!open) return null;

    function updateField(name, value) {
        setForm((current) => ({
            ...current,
            [name]: value,
        }));
    }

    function handleTitleChange(event) {
        const title = event.target.value;

        setForm((current) => ({
            ...current,
            title,
            slug: slugEdited
                ? current.slug
                : createSlug(title),
        }));
    }

    async function handleImageUpload(event, type) {
        const file = event.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setError("Please select a valid image file.");
            return;
        }

        try {
            setError("");

            if (type === "cover") {
                setCoverUploading(true);

                const url = await uploadBlogImage(file, "covers");

                updateField("featuredImage", url);
            } else {
                setAuthorUploading(true);

                const url = await uploadBlogImage(file, "authors");

                updateField("authorImage", url);
            }
        } catch (err) {
            setError(err.message || "Could not upload image.");
        } finally {
            setCoverUploading(false);
            setAuthorUploading(false);
            event.target.value = "";
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (!form.title.trim()) {
            setError("Blog title is required.");
            return;
        }

        if (!form.slug.trim()) {
            setError("Blog slug is required.");
            return;
        }

        if (!form.content.trim()) {
            setError("Blog content is required.");
            return;
        }

        try {
            setSaving(true);
            setError("");

            const savedBlog = isEditing
                ? await updateBlog(blog.id, form)
                : await createBlog(form);

            onSaved(savedBlog);
            onClose();
        } catch (err) {
            setError(err.message || "Could not save blog.");
        } finally {
            setSaving(false);
        }
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm"
            onMouseDown={onClose}
        >
            <div
                className="max-h-[94vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-[#fffaf6] shadow-2xl"
                onMouseDown={(event) => event.stopPropagation()}
            >
                <div className="sticky top-0 z-20 flex items-center justify-between border-b border-[#eadfd8] bg-[#fffaf6]/95 px-6 py-5 backdrop-blur">
                    <div>
                        <p className="text-sm font-medium text-[#84280d]">
                            Blog manager
                        </p>

                        <h2 className="mt-1 font-serif text-2xl font-semibold text-[#27170f]">
                            {isEditing
                                ? "Edit Blog"
                                : "Create Blog"}
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="grid h-10 w-10 place-items-center rounded-full border border-[#dfd1c9] bg-white text-[#49352b] transition hover:bg-[#f7eee8]"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    {error && (
                        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
                        <div className="space-y-5">
                            <label className="block">
                                <span className="mb-2 block text-sm font-semibold text-[#49352b]">
                                    Blog title *
                                </span>

                                <input
                                    value={form.title}
                                    onChange={handleTitleChange}
                                    placeholder="Enter blog title"
                                    className="w-full rounded-xl border border-[#d9cbc2] bg-white px-4 py-3 text-[#3b2b23] outline-none transition focus:border-[#84280d]"
                                />
                            </label>

                            <label className="block">
                                <span className="mb-2 block text-sm font-semibold text-[#49352b]">
                                    Slug *
                                </span>

                                <input
                                    value={form.slug}
                                    onChange={(event) => {
                                        setSlugEdited(true);
                                        updateField(
                                            "slug",
                                            createSlug(
                                                event.target.value
                                            )
                                        );
                                    }}
                                    placeholder="blog-url-slug"
                                    className="w-full rounded-xl border border-[#d9cbc2] bg-white px-4 py-3 text-[#3b2b23] outline-none transition focus:border-[#84280d]"
                                />
                            </label>

                            <label className="block">
                                <span className="mb-2 block text-sm font-semibold text-[#49352b]">
                                    Excerpt
                                </span>

                                <textarea
                                    value={form.excerpt}
                                    onChange={(event) =>
                                        updateField(
                                            "excerpt",
                                            event.target.value
                                        )
                                    }
                                    rows={3}
                                    placeholder="Short blog summary"
                                    className="w-full resize-none rounded-xl border border-[#d9cbc2] bg-white px-4 py-3 text-[#3b2b23] outline-none transition focus:border-[#84280d]"
                                />

                                <p className="mt-1 text-right text-xs text-[#94847b]">
                                    {form.excerpt.length} characters
                                </p>
                            </label>

                            <label className="block">
                                <span className="mb-2 block text-sm font-semibold text-[#49352b]">
                                    Content *
                                </span>

                                <textarea
                                    value={form.content}
                                    onChange={(event) =>
                                        updateField(
                                            "content",
                                            event.target.value
                                        )
                                    }
                                    rows={14}
                                    placeholder="Write the complete blog content..."
                                    className="w-full rounded-xl border border-[#d9cbc2] bg-white px-4 py-3 leading-7 text-[#3b2b23] outline-none transition focus:border-[#84280d]"
                                />

                                <p className="mt-1 text-right text-xs text-[#94847b]">
                                    {
                                        form.content
                                            .trim()
                                            .split(/\s+/)
                                            .filter(Boolean).length
                                    }{" "}
                                    words
                                </p>
                            </label>
                        </div>

                        <div className="space-y-5">
                            <div className="rounded-2xl border border-[#eadfd8] bg-white p-5">
                                <h3 className="font-semibold text-[#27170f]">
                                    Publishing
                                </h3>

                                <div className="mt-4 space-y-4">
                                    <label className="block">
                                        <span className="mb-2 block text-sm font-medium text-[#66564d]">
                                            Status
                                        </span>

                                        <select
                                            value={form.status}
                                            onChange={(event) =>
                                                updateField(
                                                    "status",
                                                    event.target.value
                                                )
                                            }
                                            className="w-full rounded-xl border border-[#d9cbc2] bg-white px-4 py-3 text-sm outline-none focus:border-[#84280d]"
                                        >
                                            <option value="draft">
                                                Draft
                                            </option>

                                            <option value="published">
                                                Published
                                            </option>
                                        </select>
                                    </label>

                                    <label className="block">
                                        <span className="mb-2 block text-sm font-medium text-[#66564d]">
                                            Category
                                        </span>

                                        <input
                                            value={form.category}
                                            onChange={(event) =>
                                                updateField(
                                                    "category",
                                                    event.target.value
                                                )
                                            }
                                            placeholder="Coffee Guide"
                                            className="w-full rounded-xl border border-[#d9cbc2] bg-white px-4 py-3 text-sm outline-none focus:border-[#84280d]"
                                        />
                                    </label>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-[#eadfd8] bg-white p-5">
                                <h3 className="font-semibold text-[#27170f]">
                                    Featured image
                                </h3>

                                <div className="mt-4 overflow-hidden rounded-xl border border-[#eadfd8] bg-[#faf5f1]">
                                    {form.featuredImage ? (
                                        <img
                                            src={form.featuredImage}
                                            alt="Featured preview"
                                            className="h-44 w-full object-cover"
                                        />
                                    ) : (
                                        <div className="grid h-44 place-items-center">
                                            <ImageIcon
                                                size={38}
                                                className="text-[#b4a39a]"
                                            />
                                        </div>
                                    )}
                                </div>

                                <label className="mt-4 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#d9cbc2] px-4 py-3 text-sm font-semibold text-[#49352b] transition hover:border-[#84280d] hover:text-[#84280d]">
                                    {coverUploading ? (
                                        <LoaderCircle
                                            size={17}
                                            className="animate-spin"
                                        />
                                    ) : (
                                        <Upload size={17} />
                                    )}

                                    {coverUploading
                                        ? "Uploading..."
                                        : "Upload cover"}

                                    <input
                                        type="file"
                                        accept="image/*"
                                        disabled={coverUploading}
                                        onChange={(event) =>
                                            handleImageUpload(
                                                event,
                                                "cover"
                                            )
                                        }
                                        className="hidden"
                                    />
                                </label>

                                <input
                                    value={form.featuredImage}
                                    onChange={(event) =>
                                        updateField(
                                            "featuredImage",
                                            event.target.value
                                        )
                                    }
                                    placeholder="Or paste image URL"
                                    className="mt-3 w-full rounded-xl border border-[#d9cbc2] px-3 py-2.5 text-xs outline-none focus:border-[#84280d]"
                                />
                            </div>

                            <div className="rounded-2xl border border-[#eadfd8] bg-white p-5">
                                <h3 className="font-semibold text-[#27170f]">
                                    Author
                                </h3>

                                <div className="mt-4 flex items-center gap-3">
                                    {form.authorImage ? (
                                        <img
                                            src={form.authorImage}
                                            alt="Author"
                                            className="h-14 w-14 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="grid h-14 w-14 place-items-center rounded-full bg-[#f7ebe5] text-[#84280d]">
                                            <User size={23} />
                                        </div>
                                    )}

                                    <label className="cursor-pointer text-sm font-semibold text-[#84280d]">
                                        {authorUploading
                                            ? "Uploading..."
                                            : "Upload photo"}

                                        <input
                                            type="file"
                                            accept="image/*"
                                            disabled={authorUploading}
                                            onChange={(event) =>
                                                handleImageUpload(
                                                    event,
                                                    "author"
                                                )
                                            }
                                            className="hidden"
                                        />
                                    </label>
                                </div>

                                <input
                                    value={form.authorName}
                                    onChange={(event) =>
                                        updateField(
                                            "authorName",
                                            event.target.value
                                        )
                                    }
                                    placeholder="Author name"
                                    className="mt-4 w-full rounded-xl border border-[#d9cbc2] px-4 py-3 text-sm outline-none focus:border-[#84280d]"
                                />

                                <input
                                    value={form.authorImage}
                                    onChange={(event) =>
                                        updateField(
                                            "authorImage",
                                            event.target.value
                                        )
                                    }
                                    placeholder="Author image URL"
                                    className="mt-3 w-full rounded-xl border border-[#d9cbc2] px-4 py-3 text-xs outline-none focus:border-[#84280d]"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-7 flex flex-col-reverse gap-3 border-t border-[#eadfd8] pt-6 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={saving}
                            className="rounded-xl border border-[#d9cbc2] bg-white px-5 py-3 text-sm font-semibold text-[#49352b]"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={
                                saving ||
                                coverUploading ||
                                authorUploading
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#84280d] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#6f210b] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {saving && (
                                <LoaderCircle
                                    size={17}
                                    className="animate-spin"
                                />
                            )}

                            {saving
                                ? "Saving..."
                                : isEditing
                                    ? "Update Blog"
                                    : "Create Blog"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}