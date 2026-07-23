import { supabase } from "../../lib/supabase";

const BLOG_BUCKET = "blog-images";

function mapBlog(blog) {
    return {
        id: blog.id,
        title: blog.title || "",
        slug: blog.slug || "",
        excerpt: blog.excerpt || "",
        content: blog.content || "",
        category: blog.category || "Coffee",
        featuredImage: blog.featured_image || "",
        authorName: blog.author_name || "Admin",
        authorImage: blog.author_image || "",
        status: blog.status || "draft",
        publishedAt: blog.published_at,
        createdAt: blog.created_at,
        updatedAt: blog.updated_at,
    };
}

function prepareBlogPayload(blog) {
    const isPublished = blog.status === "published";

    return {
        title: blog.title.trim(),
        slug: blog.slug.trim(),
        excerpt: blog.excerpt?.trim() || null,
        content: blog.content.trim(),
        category: blog.category?.trim() || "Coffee",
        featured_image: blog.featuredImage?.trim() || null,
        author_name: blog.authorName?.trim() || "Admin",
        author_image: blog.authorImage?.trim() || null,
        status: blog.status,
        published_at: isPublished
            ? blog.publishedAt || new Date().toISOString()
            : null,
        updated_at: new Date().toISOString(),
    };
}

export function createSlug(value = "") {
    return value
        .toLowerCase()
        .trim()
        .replace(/['’]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

export async function getAdminBlogs() {
    const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Get blogs error:", error);
        throw new Error(error.message);
    }

    return (data || []).map(mapBlog);
}

export async function createBlog(blog) {
    const payload = prepareBlogPayload(blog);

    const { data, error } = await supabase
        .from("blogs")
        .insert(payload)
        .select()
        .single();

    if (error) {
        console.error("Create blog error:", error);

        if (error.code === "23505") {
            throw new Error("A blog with this slug already exists.");
        }

        throw new Error(error.message);
    }

    return mapBlog(data);
}

export async function updateBlog(blogId, blog) {
    const payload = prepareBlogPayload(blog);

    const { data, error } = await supabase
        .from("blogs")
        .update(payload)
        .eq("id", blogId)
        .select()
        .single();

    if (error) {
        console.error("Update blog error:", error);

        if (error.code === "23505") {
            throw new Error("A blog with this slug already exists.");
        }

        throw new Error(error.message);
    }

    return mapBlog(data);
}

export async function deleteBlog(blogId) {
    const { error } = await supabase
        .from("blogs")
        .delete()
        .eq("id", blogId);

    if (error) {
        console.error("Delete blog error:", error);
        throw new Error(error.message);
    }

    return true;
}

export async function updateBlogStatus(blogId, status) {
    const payload = {
        status,
        published_at:
            status === "published"
                ? new Date().toISOString()
                : null,
        updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
        .from("blogs")
        .update(payload)
        .eq("id", blogId)
        .select()
        .single();

    if (error) {
        console.error("Update blog status error:", error);
        throw new Error(error.message);
    }

    return mapBlog(data);
}

export async function uploadBlogImage(file, folder = "covers") {
    if (!file) return "";

    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";

    const safeName = file.name
        .replace(/\.[^/.]+$/, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    const filePath = `${folder}/${Date.now()}-${safeName}.${extension}`;

    const { error } = await supabase.storage
        .from(BLOG_BUCKET)
        .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
        });

    if (error) {
        console.error("Blog image upload error:", error);
        throw new Error(error.message);
    }

    const { data } = supabase.storage
        .from(BLOG_BUCKET)
        .getPublicUrl(filePath);

    return data.publicUrl;
}