import { useMemo, useState } from "react";
import { products } from "../data/products";
import ProductCard from "./ProductCard";

export default function ProductSection() {
    const [activeCategory, setActiveCategory] = useState("All");

    const categories = [
        "All",
        ...new Set(products.map((product) => product.category)),
    ];

    const filteredProducts = useMemo(() => {
        if (activeCategory === "All") {
            return products;
        }

        return products.filter(
            (product) => product.category === activeCategory
        );
    }, [activeCategory]);

    return (
        <section className="bg-[#fffaf6] py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-3xl">
                        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-(--primary-color)">
                            Our Collection
                        </span>

                        <h2 className="font-serif text-4xl leading-tight text-(--primary-color) sm:text-5xl lg:text-6xl">
                            Coffee made for every mood
                        </h2>

                        <p className="mt-4 max-w-xl leading-7 text-[#75665d]">
                            Explore carefully prepared coffee made with premium
                            beans, rich flavors, and smooth finishing.
                        </p>
                    </div>

                    <div className="flex max-w-full gap-2 overflow-x-auto pb-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                type="button"
                                onClick={() => setActiveCategory(category)}
                                className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition ${activeCategory === category
                                        ? "bg-[#84280d] text-white"
                                        : "border border-[#ddcfc5] bg-white text-[#5d4639] hover:border-[#84280d] hover:text-[#84280d]"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}