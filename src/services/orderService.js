// import { supabase } from "../lib/supabase";

// export async function createOrder({
//     customer,
//     cartItems,
//     paymentMethod,
// }) {
//     if (!cartItems?.length) {
//         throw new Error("Your cart is empty.");
//     }

//     /*
//      * Store money in cents.
//      * These frontend totals are suitable for COD display,
//      * but card-payment totals must later be verified on the server.
//      */
//     const subtotalCents = Math.round(
//         cartItems.reduce(
//             (sum, item) =>
//                 sum + item.price * item.quantity,
//             0
//         ) * 100
//     );

//     const deliveryFeeCents =
//         subtotalCents > 0 ? 250 : 0;

//     const taxCents = Math.round(
//         subtotalCents * 0.05
//     );

//     const totalCents =
//         subtotalCents +
//         deliveryFeeCents +
//         taxCents;

//     // Create main order
//     const { data: order, error: orderError } =
//         await supabase
//             .from("orders")
//             .insert({
//                 first_name: customer.firstName.trim(),
//                 last_name: customer.lastName.trim(),
//                 email: customer.email.trim(),
//                 phone: customer.phone.trim(),
//                 address: customer.address.trim(),
//                 city: customer.city.trim(),
//                 postal_code:
//                     customer.postalCode.trim(),

//                 payment_method: paymentMethod,
//                 payment_status:
//                     paymentMethod === "cash"
//                         ? "pending"
//                         : "unpaid",

//                 order_status: "pending",

//                 subtotal: subtotalCents,
//                 delivery_fee: deliveryFeeCents,
//                 tax: taxCents,
//                 total: totalCents,
//             })
//             .select()
//             .single();

//     if (orderError) {
//         throw new Error(orderError.message);
//     }

//     // Create order items
//     const orderItems = cartItems.map((item) => ({
//         order_id: order.id,
//         product_id: item.productId || item.id,
//         product_size_id:
//             item.selectedSize?.id || null,

//         product_name: item.name,
//         size_name:
//             item.selectedSize?.name || null,

//         quantity: item.quantity,

//         unit_price: Math.round(
//             item.price * 100
//         ),

//         line_total: Math.round(
//             item.price *
//             item.quantity *
//             100
//         ),
//     }));

//     const { error: itemsError } =
//         await supabase
//             .from("order_items")
//             .insert(orderItems);

//     if (itemsError) {
//         /*
//          * Clean up the order when order-item
//          * creation fails.
//          */
//         await supabase
//             .from("orders")
//             .delete()
//             .eq("id", order.id);

//         throw new Error(itemsError.message);
//     }

//     return {
//         ...order,
//         items: orderItems,

//         subtotal: subtotalCents / 100,
//         deliveryFee: deliveryFeeCents / 100,
//         tax: taxCents / 100,
//         total: totalCents / 100,
//     };
// }




import { supabase } from "../lib/supabase";

export async function createOrder({
    customer,
    cartItems,
    paymentMethod,
}) {
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
        throw new Error("Your cart is empty.");
    }

    const items = cartItems.map((item) => ({
        productId: item.productId || item.id,
        sizeId: item.selectedSize?.id || null,
        quantity: Number(item.quantity),
    }));

    const { data, error } = await supabase.functions.invoke(
        "swift-action",
        {
            body: {
                customer,
                items,
                paymentMethod,
            },
        }
    );

    console.log("Edge Function data:", data);
    console.log("Edge Function error:", error);

    if (error) {
        let message =
            error.message ||
            "Could not place your order.";

        try {
            if (error.context) {
                const responseBody = await error.context
                    .clone()
                    .json();

                message =
                    responseBody?.message ||
                    message;
            }
        } catch (responseError) {
            console.error(
                "Could not read Edge Function error:",
                responseError
            );
        }

        throw new Error(message);
    }

    if (!data?.success) {
        throw new Error(
            data?.message ||
            "Could not place your order."
        );
    }

    return data.order;
}