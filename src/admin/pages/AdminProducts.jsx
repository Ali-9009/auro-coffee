import { Package } from "lucide-react";

export default function AdminProducts() {
    return (
        <section>
            <h1 className="font-serif text-3xl font-semibold text-[#27170f]">
                Products
            </h1>

            <p className="mt-2 text-[#75665d]">
                Add, edit and remove store
                products.
            </p>

            <div className="mt-8 grid min-h-96 place-items-center rounded-2xl border border-dashed border-[#d9cbc2] bg-white">
                <div className="text-center">
                    <Package
                        size={42}
                        className="mx-auto text-[#84280d]"
                    />

                    <p className="mt-4 font-semibold text-[#49352b]">
                        Product manager comes next
                    </p>
                </div>
            </div>
        </section>
    );
}