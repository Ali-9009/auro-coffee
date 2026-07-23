import { supabase } from "../../lib/supabase";

import {
    centsToPrice,
} from "../../utils/pricing";

function mapOrder(order) {
    return {
        id: order.id,

        customerName:
            order.customer_name ||
            "Unknown customer",

        customerEmail:
            order.customer_email || "",

        customerPhone:
            order.customer_phone || "",

        shippingAddress:
            order.shipping_address || {},

        subtotal: centsToPrice(
            order.subtotal
        ),

        shippingAmount: centsToPrice(
            order.shipping_amount
        ),

        taxAmount: centsToPrice(
            order.tax_amount
        ),

        total: centsToPrice(
            order.total
        ),

        currency:
            order.currency || "usd",

        paymentMethod:
            order.payment_method || "cash",

        paymentStatus:
            order.payment_status ||
            "pending",

        orderStatus:
            order.order_status ||
            "pending",

        totalItems:
            Number(
                order.total_items || 0
            ),

        itemsSummary:
            order.items_summary || "",

        items:
            Array.isArray(order.items)
                ? order.items
                : [],

        createdAt:
            order.created_at,

        updatedAt:
            order.updated_at,
    };
}

export async function getAdminOrders() {
    const { data, error } = await supabase
        .from("admin_orders_view")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Get orders error:", error);
        throw new Error(error.message);
    }

    return (data || []).map(mapOrder);
}

export async function updateOrderStatus(orderId, orderStatus) {
    const { data, error } = await supabase
        .from("orders")
        .update({
            order_status: orderStatus,
            updated_at: new Date().toISOString(),
        })
        .eq("id", orderId)
        .select()
        .single();

    if (error) {
        console.error("Update order status error:", error);
        throw new Error(error.message);
    }

    return data;
}

export async function updatePaymentStatus(orderId, paymentStatus) {
    const { data, error } = await supabase
        .from("orders")
        .update({
            payment_status: paymentStatus,
            updated_at: new Date().toISOString(),
        })
        .eq("id", orderId)
        .select()
        .single();

    if (error) {
        console.error("Update payment status error:", error);
        throw new Error(error.message);
    }

    return data;
}