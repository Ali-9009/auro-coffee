import { supabase } from "../../lib/supabase";

const PRODUCT_BUCKET = "product-images";

function sanitizeFileName(fileName) {
    return fileName
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9.-]/g, "");
}

export async function uploadProductImage(file) {
    if (!file) {
        throw new Error("Please select an image.");
    }

    if (!file.type.startsWith("image/")) {
        throw new Error("Only image files are allowed.");
    }

    const maxFileSize = 5 * 1024 * 1024;

    if (file.size > maxFileSize) {
        throw new Error(
            "Image must be smaller than 5 MB."
        );
    }

    const safeName = sanitizeFileName(file.name);

    const uniqueName = `${Date.now()}-${crypto.randomUUID()}-${safeName}`;

    const filePath = `products/${uniqueName}`;

    const { error: uploadError } = await supabase.storage
        .from(PRODUCT_BUCKET)
        .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
        });

    if (uploadError) {
        throw new Error(uploadError.message);
    }

    const { data } = supabase.storage
        .from(PRODUCT_BUCKET)
        .getPublicUrl(filePath);

    return {
        url: data.publicUrl,
        path: filePath,
    };
}

export async function deleteProductImage(filePath) {
    if (!filePath) return;

    const { error } = await supabase.storage
        .from(PRODUCT_BUCKET)
        .remove([filePath]);

    if (error) {
        throw new Error(error.message);
    }
}

export function getStoragePathFromUrl(url) {
    if (!url) return null;

    const marker =
        "/storage/v1/object/public/product-images/";

    const index = url.indexOf(marker);

    if (index === -1) {
        return null;
    }

    return decodeURIComponent(
        url.slice(index + marker.length)
    );
}