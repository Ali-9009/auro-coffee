import { supabase } from "../../lib/supabase";

import {
    centsToPrice,
} from "../../utils/pricing";

async function getProductCount() {
    const { count, error } = await supabase
        .from("products")
        .select("id", { count: "exact", head: true });

    if (error) throw new Error(`Products: ${error.message}`);

    return count || 0;
}

async function getPublishedBlogCount() {
    const { count, error } = await supabase
        .from("blogs")
        .select("id", {
            count: "exact",
            head: true,
        })
        .eq("status", "published");

    if (error) {
        console.error(
            "Published blog count error:",
            error
        );

        throw new Error(
            `Blogs: ${error.message}`
        );
    }

    return count || 0;
}

async function getOrders() {
    const { data, error } = await supabase
        .from("admin_orders_view")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) throw new Error(`Orders: ${error.message}`);

    return data || [];
}

function mapOrder(order) {
    return {
        id: order.id,
        customerName: order.customer_name || "Customer",
        customerEmail: order.customer_email || "",
        customerPhone: order.customer_phone || "",
        total: centsToPrice(order.total),
        subtotal: centsToPrice(order.subtotal),
        shippingAmount: centsToPrice(order.shipping_amount),
        taxAmount: centsToPrice(order.tax_amount),
        currency: order.currency || "usd",
        paymentMethod: order.payment_method || "cash",
        paymentStatus: order.payment_status || "pending",
        orderStatus: order.order_status || "pending",
        totalItems: Number(order.total_items || 0),
        itemsSummary: order.items_summary || "",
        items: Array.isArray(order.items) ? order.items : [],
        shippingAddress: order.shipping_address || {},
        createdAt: order.created_at,
        updatedAt: order.updated_at,
    };
}

export async function getDashboardData() {
    const [totalProducts, publishedBlogs, orders] = await Promise.all([
        getProductCount(),
        getPublishedBlogCount(),
        getOrders(),
    ]);

    const totalOrders = orders.length;

    const totalRevenue = orders.reduce((sum, order) => {
        return sum + centsToPrice(order.total);
    }, 0);

    const recentOrders = orders.slice(0, 5).map(mapOrder);

    return {
        totalProducts,
        publishedBlogs,
        totalOrders,
        totalRevenue,
        recentOrders,
    };
}