import { supabase } from "../../lib/supabase";

import {
    centsToPrice,
    priceToCents,
} from "../../utils/pricing";

import {
    getProductSizes,
    replaceProductSizes,
} from "./adminProductSizeService";

// function parsePrice(value, fieldName, required = false) {
//     if (
//         value === "" ||
//         value === null ||
//         value === undefined
//     ) {
//         if (required) {
//             throw new Error(`${fieldName} is required.`);
//         }

//         return null;
//     }

//     const number = Number(value);

//     if (!Number.isFinite(number) || number < 0) {
//         throw new Error(
//             `${fieldName} must be a valid number of zero or more.`
//         );
//     }

//     return Number(number.toFixed(2));
// }

function parseDecimal(
    value,
    fieldName,
    required = false
) {
    if (
        value === "" ||
        value === null ||
        value === undefined
    ) {
        if (required) {
            throw new Error(
                `${fieldName} is required.`
            );
        }

        return null;
    }

    const number = Number(value);

    if (
        !Number.isFinite(number) ||
        number < 0
    ) {
        throw new Error(
            `${fieldName} must be a valid number of zero or more.`
        );
    }

    return Number(number.toFixed(2));
}

function parseInteger(
    value,
    fieldName,
    defaultValue = 0
) {
    if (
        value === "" ||
        value === null ||
        value === undefined
    ) {
        return defaultValue;
    }

    const number = Number(value);

    if (!Number.isInteger(number) || number < 0) {
        throw new Error(
            `${fieldName} must be a whole number of zero or more.`
        );
    }

    return number;
}

function normalizeStringArray(value) {
    if (Array.isArray(value)) {
        return value
            .map((item) => String(item).trim())
            .filter(Boolean);
    }

    if (typeof value === "string") {
        return value
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean);
    }

    return [];
}

function normalizeJsonArray(value) {
    return Array.isArray(value) ? value : [];
}

function normalizeJsonObject(value) {
    return (
        value &&
        typeof value === "object" &&
        !Array.isArray(value)
    )
        ? value
        : {};
}

function mapAdminProduct(product) {
    return {
        id: product.id,

        name: product.name || "",
        slug: product.slug || "",
        sku: product.sku || "",
        brand: product.brand || "",
        category: product.category || "",

        shortDescription:
            product.short_description || "",

        description: product.description || "",

        image: product.image || "",

        gallery: Array.isArray(product.gallery)
            ? product.gallery
            : [],

        price:
            product.price === null ||
                product.price === undefined
                ? ""
                : centsToPrice(product.price),

        oldPrice:
            product.old_price === null ||
                product.old_price === undefined
                ? ""
                : centsToPrice(
                    product.old_price
                ),

        costPrice:
            product.cost_price === null ||
                product.cost_price === undefined
                ? ""
                : centsToPrice(
                    product.cost_price
                ),

        rating:
            product.rating === null ||
                product.rating === undefined
                ? 0
                : Number(product.rating),

        reviews: Number(product.reviews) || 0,
        stock: Number(product.stock) || 0,

        lowStockThreshold:
            Number(product.low_stock_threshold) || 0,

        trackInventory:
            product.track_inventory ?? true,

        tags: Array.isArray(product.tags)
            ? product.tags
            : [],

        specifications:
            normalizeJsonObject(
                product.specifications
            ),

        variants: normalizeJsonArray(
            product.variants
        ),

        weight:
            product.weight === null ||
                product.weight === undefined
                ? ""
                : Number(product.weight),

        dimensions: normalizeJsonObject(
            product.dimensions
        ),

        metaTitle: product.meta_title || "",

        metaDescription:
            product.meta_description || "",

        featured: product.featured ?? false,
        active: product.active ?? true,

        ingredients: normalizeJsonArray(
            product.ingredients
        ),

        createdAt: product.created_at,
        updatedAt: product.updated_at,

        // Compatibility with the existing admin UI
        isActive: product.active ?? true,
        isFeatured: product.featured ?? false,

        sizes: Array.isArray(product.sizes)
            ? product.sizes
            : [],
    };
}

function buildProductPayload(product) {
    const name = product.name?.trim();
    const slug = product.slug?.trim();
    const category = product.category?.trim();

    if (!name) {
        throw new Error("Product name is required.");
    }

    if (!slug) {
        throw new Error("Product slug is required.");
    }

    if (!category) {
        throw new Error(
            "Product category is required."
        );
    }

    const active =
        product.active ??
        product.isActive ??
        true;

    const featured =
        product.featured ??
        product.isFeatured ??
        false;

    return {
        name,
        slug,

        sku: product.sku?.trim() || null,
        brand: product.brand?.trim() || null,
        category,

        short_description:
            product.shortDescription?.trim() ||
            null,

        description:
            product.description?.trim() || null,

        image: product.image || null,

        gallery: normalizeJsonArray(
            product.gallery
        ),

        price: priceToCents(
            product.price,
            "Price",
            true
        ),

        old_price: priceToCents(
            product.oldPrice,
            "Old price"
        ),

        cost_price: priceToCents(
            product.costPrice,
            "Cost price"
        ),

        rating: parseDecimal(
            product.rating,
            "Rating"
        ) ?? 0,

        reviews: parseInteger(
            product.reviews,
            "Reviews",
            0
        ),

        stock: parseInteger(
            product.stock,
            "Stock",
            0
        ),

        low_stock_threshold: parseInteger(
            product.lowStockThreshold,
            "Low-stock threshold",
            5
        ),

        track_inventory:
            product.trackInventory ?? true,

        tags: normalizeStringArray(
            product.tags
        ),

        specifications: normalizeJsonObject(
            product.specifications
        ),

        variants: normalizeJsonArray(
            product.variants
        ),

        weight: parseDecimal(
            product.weight,
            "Weight"
        ),

        dimensions: normalizeJsonObject(
            product.dimensions
        ),

        meta_title:
            product.metaTitle?.trim() || null,

        meta_description:
            product.metaDescription?.trim() ||
            null,

        featured: Boolean(featured),
        active: Boolean(active),

        ingredients: normalizeJsonArray(
            product.ingredients
        ),
    };
}

function handleProductError(error) {
    if (error?.code === "23505") {
        if (
            error.message
                ?.toLowerCase()
                .includes("slug")
        ) {
            throw new Error(
                "A product with this slug already exists."
            );
        }

        if (
            error.message
                ?.toLowerCase()
                .includes("sku")
        ) {
            throw new Error(
                "A product with this SKU already exists."
            );
        }

        throw new Error(
            "A product with the same unique information already exists."
        );
    }

    if (error?.code === "42501") {
        throw new Error(
            "You do not have permission to perform this product action."
        );
    }

    throw new Error(
        error?.message ||
        "The product operation failed."
    );
}

export async function getAdminProducts() {
    const { data, error } = await supabase
        .from("products")
        .select(`
            id,
            name,
            slug,
            sku,
            brand,
            category,
            short_description,
            description,
            image,
            gallery,
            price,
            old_price,
            cost_price,
            rating,
            reviews,
            stock,
            low_stock_threshold,
            track_inventory,
            tags,
            specifications,
            variants,
            weight,
            dimensions,
            meta_title,
            meta_description,
            featured,
            active,
            ingredients,
            created_at,
            updated_at,
            sizes:product_sizes (
                id,
                product_id,
                name,
                extra_price,
                active,
                created_at
            )
        `)
        .order("created_at", {
            ascending: false,
        });

    if (error) {
        handleProductError(error);
    }

    return (data || []).map((product) => {
        const mappedProduct =
            mapAdminProduct(product);

        return {
            ...mappedProduct,

            sizes: (
                product.sizes || []
            ).map((size) => ({
                id: size.id,
                productId:
                    size.product_id,
                name: size.name || "",

                extraPrice: centsToPrice(
                    size.extra_price
                ),

                active:
                    size.active ?? true,

                createdAt:
                    size.created_at,
            })),
        };
    });
}

export async function getAdminProductById(
    productId
) {
    if (!productId) {
        throw new Error(
            "Product ID is required."
        );
    }

    const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();

    if (error) {
        handleProductError(error);
    }

    const sizes =
        await getProductSizes(productId);

    return {
        ...mapAdminProduct(data),
        sizes,
    };
}

export async function createProduct(product) {
    const payload =
        buildProductPayload(product);

    const { data, error } = await supabase
        .from("products")
        .insert(payload)
        .select()
        .single();

    if (error) {
        handleProductError(error);
    }

    try {
        const sizes =
            await replaceProductSizes(
                data.id,
                product.sizes || []
            );

        return {
            ...mapAdminProduct(data),
            sizes,
        };
    } catch (sizeError) {
        // Remove the product if its sizes
        // could not be saved.
        await supabase
            .from("products")
            .delete()
            .eq("id", data.id);

        throw sizeError;
    }
}

export async function updateProduct(
    productId,
    product
) {
    if (!productId) {
        throw new Error(
            "Product ID is required."
        );
    }

    const payload =
        buildProductPayload(product);

    const { data, error } = await supabase
        .from("products")
        .update(payload)
        .eq("id", productId)
        .select()
        .single();

    if (error) {
        handleProductError(error);
    }

    const sizes =
        await replaceProductSizes(
            productId,
            product.sizes || []
        );

    return {
        ...mapAdminProduct(data),
        sizes,
    };
}

export async function deleteProduct(productId) {
    if (!productId) {
        throw new Error(
            "Product ID is required."
        );
    }

    const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", productId);

    if (error) {
        handleProductError(error);
    }

    return true;
}

export async function updateProductStatus(
    productId,
    active
) {
    if (!productId) {
        throw new Error(
            "Product ID is required."
        );
    }

    const { data, error } = await supabase
        .from("products")
        .update({
            active: Boolean(active),
        })
        .eq("id", productId)
        .select()
        .single();

    if (error) {
        handleProductError(error);
    }

    return mapAdminProduct(data);
}

export async function updateFeaturedStatus(
    productId,
    featured
) {
    if (!productId) {
        throw new Error(
            "Product ID is required."
        );
    }

    const { data, error } = await supabase
        .from("products")
        .update({
            featured: Boolean(featured),
        })
        .eq("id", productId)
        .select()
        .single();

    if (error) {
        handleProductError(error);
    }

    return mapAdminProduct(data);
}

export async function updateProductStock(
    productId,
    stock
) {
    if (!productId) {
        throw new Error(
            "Product ID is required."
        );
    }

    const validStock = parseInteger(
        stock,
        "Stock",
        0
    );

    const { data, error } = await supabase
        .from("products")
        .update({
            stock: validStock,
        })
        .eq("id", productId)
        .select()
        .single();

    if (error) {
        handleProductError(error);
    }

    return mapAdminProduct(data);
}