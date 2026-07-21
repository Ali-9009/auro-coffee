import { supabase } from "../lib/supabase";

export async function getProducts() {
    const { data, error } = await supabase
        .from("products")
        .select(`
            *,
            product_sizes (
                id,
                name,
                extra_price
            )
        `)
        .eq("active", true)
        .order("created_at", {
            ascending: false,
        });

    if (error) {
        throw new Error(error.message);
    }

    return data;
}


export async function getProductBySlug(slug) {
    const { data, error } = await supabase
        .from("products")
        .select(`
            *,
            product_sizes (
                id,
                name,
                extra_price
            )
        `)
        .eq("slug", slug)
        .eq("active", true)
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return {
        ...data,

        price: data.price / 100,

        oldPrice: data.old_price
            ? data.old_price / 100
            : null,

        shortDescription:
            data.short_description || "",

        gallery: Array.isArray(data.gallery)
            ? data.gallery
            : [],

        ingredients: Array.isArray(data.ingredients)
            ? data.ingredients
            : [],

        sizes:
            data.product_sizes?.map((size) => ({
                id: size.id,
                name: size.name,
                extraPrice: size.extra_price / 100,
            })) || [],
    };
}



