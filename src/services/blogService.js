import { supabase } from "../lib/supabase";

function mapBlog(blog) {
    return {
        id: blog.id,
        title: blog.title,
        slug: blog.slug,
        excerpt: blog.excerpt || "",
        content: blog.content || "",
        category: blog.category || "Coffee",

        img:
            blog.featured_image ||
            "/assets/blog-placeholder.webp",

        author:
            blog.author_image ||
            "/assets/author-placeholder.webp",

        authorName:
            blog.author_name || "Admin",

        date: blog.published_at
            ? new Date(blog.published_at).toLocaleDateString(
                "en-US",
                {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                }
            )
            : "",

        publishedAt: blog.published_at,
        createdAt: blog.created_at,
        updatedAt: blog.updated_at,
    };
}

export async function getPublishedBlogs() {
    const { data, error } = await supabase
        .from("blogs")
        .select(`
            id,
            title,
            slug,
            excerpt,
            content,
            category,
            featured_image,
            author_name,
            author_image,
            published_at,
            created_at,
            updated_at
        `)
        .eq("status", "published")
        .order("published_at", {
            ascending: false,
        });

    if (error) {
        throw new Error(error.message);
    }

    return (data || []).map(mapBlog);
}

export async function getBlogBySlug(slug) {
    if (!slug) {
        throw new Error("Blog slug is required.");
    }

    const { data, error } = await supabase
        .from("blogs")
        .select(`
            id,
            title,
            slug,
            excerpt,
            content,
            category,
            featured_image,
            author_name,
            author_image,
            published_at,
            created_at,
            updated_at
        `)
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();

    if (error) {
        throw new Error(error.message);
    }

    return data ? mapBlog(data) : null;
}