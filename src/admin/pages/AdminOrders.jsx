import { ReceiptText } from "lucide-react";

export default function AdminOrders() {
    return (
        <section>
            <h1 className="font-serif text-3xl font-semibold text-[#27170f]">
                Orders
            </h1>

            <p className="mt-2 text-[#75665d]">
                View and update customer orders.
            </p>

            <div className="mt-8 grid min-h-96 place-items-center rounded-2xl border border-dashed border-[#d9cbc2] bg-white">
                <div className="text-center">
                    <ReceiptText
                        size={42}
                        className="mx-auto text-[#84280d]"
                    />

                    <p className="mt-4 font-semibold text-[#49352b]">
                        Order manager will be added
                        after products and blogs
                    </p>
                </div>
            </div>
        </section>
    );
}