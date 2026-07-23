import { supabase } from "../lib/supabase";

import {
    centsToPrice,
    nullableCentsToPrice,
} from "../utils/pricing";

function mapProduct(product) {
    const sizes = (
        product.product_sizes || []
    )
        .filter(
            (size) => size.active !== false
        )
        .map((size) => ({
            id: size.id,
            productId: size.product_id,
            name: size.name || "",
            extraPrice: centsToPrice(
                size.extra_price
            ),
            active: size.active ?? true,
            createdAt: size.created_at,
        }));

    return {
        ...product,

        price: centsToPrice(
            product.price
        ),

        oldPrice: nullableCentsToPrice(
            product.old_price
        ),

        costPrice: nullableCentsToPrice(
            product.cost_price
        ),

        shortDescription:
            product.short_description || "",

        metaTitle:
            product.meta_title || "",

        metaDescription:
            product.meta_description || "",

        lowStockThreshold:
            Number(
                product.low_stock_threshold
            ) || 0,

        trackInventory:
            product.track_inventory !== false,

        sizes,

        // Compatibility for components that use this name.
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