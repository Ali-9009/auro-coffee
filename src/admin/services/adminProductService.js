import { supabase } from "../../lib/supabase";

function dollarsToCents(value) {
    const number = Number(value);

    if (!Number.isFinite(number)) {
        throw new Error("Invalid product price.");
    }

    return Math.round(number * 100);
}

function mapAdminProduct(product) {
    return {
        ...product,

        price:
            typeof product.price === "number"
                ? product.price / 100
                : 0,

        oldPrice:
            typeof product.old_price === "number"
                ? product.old_price / 100
                : null,

        image: product.image || "",
        isActive: product.is_active ?? true,
        isFeatured:
            product.is_featured ?? false,
    };
}

export async function getAdminProducts() {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", {
            ascending: false,
        });

    if (error) {
        throw new Error(error.message);
    }

    return (data || []).map(mapAdminProduct);
}

export async function createProduct(product) {
    const payload = {
        name: product.name.trim(),
        slug: product.slug.trim(),
        description:
            product.description?.trim() || null,

        category:
            product.category?.trim() || null,

        image: product.image || null,

        price: dollarsToCents(product.price),

        old_price:
            product.oldPrice !== "" &&
                product.oldPrice !== null &&
                product.oldPrice !== undefined
                ? dollarsToCents(product.oldPrice)
                : null,

        stock: Number(product.stock) || 0,

        is_active:
            product.isActive ?? true,

        is_featured:
            product.isFeatured ?? false,
    };

    const { data, error } = await supabase
        .from("products")
        .insert(payload)
        .select()
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return mapAdminProduct(data);
}

export async function updateProduct(
    productId,
    product
) {
    const payload = {
        name: product.name.trim(),
        slug: product.slug.trim(),
        description:
            product.description?.trim() || null,

        category:
            product.category?.trim() || null,

        image: product.image || null,

        price: dollarsToCents(product.price),

        old_price:
            product.oldPrice !== "" &&
                product.oldPrice !== null &&
                product.oldPrice !== undefined
                ? dollarsToCents(product.oldPrice)
                : null,

        stock: Number(product.stock) || 0,

        is_active:
            product.isActive ?? true,

        is_featured:
            product.isFeatured ?? false,
    };

    const { data, error } = await supabase
        .from("products")
        .update(payload)
        .eq("id", productId)
        .select()
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return mapAdminProduct(data);
}

export async function deleteProduct(productId) {
    const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", productId);

    if (error) {
        throw new Error(error.message);
    }
}