import { supabase } from "../../lib/supabase";

import {
    centsToPrice,
    priceToCents,
} from "../../utils/pricing";

function mapProductSize(size) {
    return {
        id: size.id,
        productId: size.product_id,
        name: size.name || "",

        extraPrice: centsToPrice(
            size.extra_price
        ),

        active: size.active ?? true,
        createdAt: size.created_at,
    };
}

export async function getProductSizes(
    productId
) {
    if (!productId) {
        return [];
    }

    const { data, error } = await supabase
        .from("product_sizes")
        .select(`
            id,
            product_id,
            name,
            extra_price,
            active,
            created_at
        `)
        .eq("product_id", productId)
        .order("extra_price", {
            ascending: true,
        });

    if (error) {
        throw new Error(error.message);
    }

    return (data || []).map(
        mapProductSize
    );
}

export async function replaceProductSizes(
    productId,
    sizes
) {
    if (!productId) {
        throw new Error(
            "Product ID is required for sizes."
        );
    }

    const normalizedSizes = (
        Array.isArray(sizes) ? sizes : []
    )
        .map((size) => ({
            id: size.id || null,
            product_id: productId,
            name:
                size.name?.trim() || "",

            extra_price: priceToCents(
                size.extraPrice || 0,
                "Size extra price",
                true
            ),

            active:
                size.active ?? true,
        }))
        .filter((size) => size.name);

    const sizeNames =
        normalizedSizes.map((size) =>
            size.name.toLowerCase()
        );

    if (
        new Set(sizeNames).size !==
        sizeNames.length
    ) {
        throw new Error(
            "Each product size must have a unique name."
        );
    }

    const {
        data: existingSizes,
        error: readError,
    } = await supabase
        .from("product_sizes")
        .select("id")
        .eq("product_id", productId);

    if (readError) {
        throw new Error(
            readError.message
        );
    }

    const submittedExistingIds =
        normalizedSizes
            .filter((size) => size.id)
            .map((size) => size.id);

    const removedIds = (
        existingSizes || []
    )
        .map((size) => size.id)
        .filter(
            (id) =>
                !submittedExistingIds.includes(
                    id
                )
        );

    if (removedIds.length > 0) {
        const { error: deleteError } =
            await supabase
                .from("product_sizes")
                .delete()
                .in("id", removedIds);

        if (deleteError) {
            throw new Error(
                deleteError.message
            );
        }
    }

    if (
        normalizedSizes.length === 0
    ) {
        return [];
    }

    const existingPayload =
        normalizedSizes.filter(
            (size) => size.id
        );

    const newPayload =
        normalizedSizes
            .filter((size) => !size.id)
            .map(
                ({ id, ...size }) =>
                    size
            );

    if (existingPayload.length > 0) {
        const { error: updateError } =
            await supabase
                .from("product_sizes")
                .upsert(existingPayload);

        if (updateError) {
            throw new Error(
                updateError.message
            );
        }
    }

    if (newPayload.length > 0) {
        const { error: insertError } =
            await supabase
                .from("product_sizes")
                .insert(newPayload);

        if (insertError) {
            throw new Error(
                insertError.message
            );
        }
    }

    return getProductSizes(productId);
}