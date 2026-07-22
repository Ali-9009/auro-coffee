import { supabase } from "../lib/supabase";

function mapProduct(product) {
    const sizes = (product.product_sizes || [])
        .filter((size) => size.active !== false)
        .map((size) => ({
            id: size.id,
            name: size.name,

            // Supabase: 100
            // Frontend: 1.00
            extraPrice:
                Number(size.extra_price || 0) / 100,
        }));

    return {
        ...product,

        // Supabase: 550
        // Frontend: 5.50
        price: Number(product.price || 0) / 100,

        oldPrice:
            product.old_price !== null &&
                product.old_price !== undefined
                ? Number(product.old_price) / 100
                : null,

        costPrice:
            product.cost_price !== null &&
                product.cost_price !== undefined
                ? Number(product.cost_price) / 100
                : null,

        shortDescription:
            product.short_description || "",

        metaTitle:
            product.meta_title || "",

        metaDescription:
            product.meta_description || "",

        lowStockThreshold:
            Number(product.low_stock_threshold || 0),

        trackInventory:
            product.track_inventory !== false,

        sizes,

        // Keep this too in case another page uses product_sizes
        product_sizes: sizes,
    };
}

export async function getProducts() {
    const { data, error } = await supabase
        .from("products")
        .select(`
            *,
            product_sizes (
                id,
                product_id,
                name,
                extra_price,
                active,
                created_at
            )
        `)
        .eq("active", true)
        .order("created_at", {
            ascending: false,
        });

    if (error) {
        throw new Error(
            error.message ||
            "Could not load products."
        );
    }

    return (data || []).map(mapProduct);
}

export async function getProductBySlug(slug) {
    const { data, error } = await supabase
        .from("products")
        .select(`
            *,
            product_sizes (
                id,
                product_id,
                name,
                extra_price,
                active,
                created_at
            )
        `)
        .eq("slug", slug)
        .eq("active", true)
        .single();

    if (error) {
        throw new Error(
            error.message ||
            "Could not load product."
        );
    }

    return mapProduct(data);
}