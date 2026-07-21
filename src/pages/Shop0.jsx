import { useMemo, useState } from "react";

import {
    Search,
    SlidersHorizontal,
    X,
    ChevronDown,
    PackageSearch,
    ChevronRight,
} from "lucide-react";

import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

export default function Shop() {
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [sortBy, setSortBy] = useState("featured");
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    const highestPrice = useMemo(() => {
        const prices = products.map((product) => {
            const extras =
                product.sizes?.map((size) => size.extraPrice || 0) || [0];

            return product.price + Math.max(...extras);
        });

        return Math.ceil(Math.max(...prices, 20));
    }, []);

    const [maxPrice, setMaxPrice] = useState(highestPrice);

    const categories = useMemo(
        () => [
            "All",
            ...new Set(products.map((product) => product.category)),
        ],
        []
    );

    const filteredProducts = useMemo(() => {
        let result = [...products];

        const normalizedSearch = search.trim().toLowerCase();

        if (normalizedSearch) {
            result = result.filter((product) => {
                return (
                    product.name.toLowerCase().includes(normalizedSearch) ||
                    product.category.toLowerCase().includes(normalizedSearch) ||
                    product.shortDescription
                        .toLowerCase()
                        .includes(normalizedSearch)
                );
            });
        }

        if (activeCategory !== "All") {
            result = result.filter(
                (product) => product.category === activeCategory
            );
        }

        result = result.filter((product) => product.price <= maxPrice);

        switch (sortBy) {
            case "price-low":
                result.sort((a, b) => a.price - b.price);
                break;

            case "price-high":
                result.sort((a, b) => b.price - a.price);
                break;

            case "rating":
                result.sort((a, b) => b.rating - a.rating);
                break;

            case "name":
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;

            case "featured":
            default:
                result.sort((a, b) => {
                    if (a.featured === b.featured) {
                        return b.rating - a.rating;
                    }

                    return Number(b.featured) - Number(a.featured);
                });
                break;
        }

        return result;
    }, [search, activeCategory, sortBy, maxPrice]);

    const resetFilters = () => {
        setSearch("");
        setActiveCategory("All");
        setSortBy("featured");
        setMaxPrice(highestPrice);
    };

    const hasActiveFilters =
        search.trim() !== "" ||
        activeCategory !== "All" ||
        sortBy !== "featured" ||
        maxPrice !== highestPrice;

    const FilterContent = () => (
        <div>
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-[#2d1b12]">
                    Filters
                </h2>

                {hasActiveFilters && (
                    <button
                        type="button"
                        onClick={resetFilters}
                        className="text-sm font-semibold text-[#84280d] transition hover:text-[#5f1b08]"
                    >
                        Reset
                    </button>
                )}
            </div>

            {/* Categories */}
            <div className="mt-8">
                <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#6d5548]">
                    Categories
                </h3>

                <div className="mt-4 space-y-2">
                    {categories.map((category) => {
                        const categoryCount =
                            category === "All"
                                ? products.length
                                : products.filter(
                                    (product) =>
                                        product.category === category
                                ).length;

                        return (
                            <button
                                key={category}
                                type="button"
                                onClick={() => {
                                    setActiveCategory(category);
                                    setMobileFiltersOpen(false);
                                }}
                                className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium transition ${activeCategory === category
                                    ? "bg-(--primary-color) text-white"
                                    : "text-[#5f4a3e] hover:bg-[#f7eee8]"
                                    }`}
                            >
                                <span>{category}</span>

                                <span
                                    className={`flex h-6 min-w-6 items-center justify-center rounded-full px-1.5 text-[11px] ${activeCategory === category
                                        ? "bg-white/15 text-white"
                                        : "bg-[#eee2da] text-[#755d50]"
                                        }`}
                                >
                                    {categoryCount}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Price */}
            <div className="mt-9 border-t border-[#eadfd7] pt-7">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#6d5548]">
                        Maximum price
                    </h3>

                    <span className="font-semibold text-[#84280d]">
                        ${maxPrice}
                    </span>
                </div>

                <input
                    type="range"
                    min="0"
                    max={highestPrice}
                    step="1"
                    value={maxPrice}
                    onChange={(event) =>
                        setMaxPrice(Number(event.target.value))
                    }
                    className="mt-5 w-full accent-(--primary-color)"
                />

                <div className="mt-2 flex justify-between text-xs text-[#9a887e]">
                    <span>$0</span>
                    <span>${highestPrice}</span>
                </div>
            </div>

            {/* Shop note */}
            <div className="mt-9 overflow-hidden rounded-2xl bg-(--primary-color) p-5 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--secondary-color)">
                    Freshly prepared
                </p>

                <h3 className="mt-2 text-xl font-semibold">
                    Made after you order
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/70">
                    Every coffee is carefully prepared using fresh ingredients
                    and premium beans.
                </p>
            </div>
        </div>
    );

    return (
        <main className="bg-[#fffaf6]">

            <section className="relative h-80 overflow-hidden sm:h-95 lg:h-105">
                {/* Background image */}
                <div className="absolute inset-0 bg-[url('/assets/bg-2.webp')] bg-cover bg-center bg-no-repeat" />

                {/* Warm coffee overlay */}
                <div className="absolute inset-0 bg-[#4b210f]/25" />

                {/* Decorative glow */}
                <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d69a52]/15 blur-3xl" />

                {/* Content */}
                <div className="relative mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center">
                    <span className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-(--secondary-color) sm:text-sm">
                        Discover our collection
                    </span>

                    <h1 className="font-serif text-4xl font-semibold text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
                        Shop Coffee
                    </h1>

                    <div className="mt-5 h-px w-20 bg-linear-to-r from-transparent via-[#e4b365] to-transparent" />

                    {/* Breadcrumb */}
                    <div className="mt-5 flex items-center gap-1.5 text-sm text-white/80">
                        <Link
                            to="/"
                            className="transition hover:text-(--secondary-color)"
                        >
                            Home
                        </Link>

                        <ChevronRight size={15} />

                        <span className="text-(--secondary-color)">Shop</span>
                    </div>
                </div>

                {/* Bottom fade */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-black/30 to-transparent" />
            </section>

            {/* Shop content */}
            <section className="py-14 lg:py-20">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    {/* Top Controls */}
                    <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <p className="text-sm text-[#88766c]">
                                Showing{" "}
                                <strong className="text-[#2e1c13]">
                                    {filteredProducts.length}
                                </strong>{" "}
                                of{" "}
                                <strong className="text-[#2e1c13]">
                                    {products.length}
                                </strong>{" "}
                                products
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            {/* Search */}
                            <label className="relative block sm:w-72">
                                <Search
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#927e72]"
                                />

                                <input
                                    type="search"
                                    value={search}
                                    onChange={(event) =>
                                        setSearch(event.target.value)
                                    }
                                    placeholder="Search coffee..."
                                    className="h-12 w-full rounded-xl border border-[#dfd2c9] bg-white pl-11 pr-10 text-sm text-[#352219] outline-none transition placeholder:text-[#aa9a90] focus:border-[#84280d] focus:ring-2 focus:ring-[#84280d]/10"
                                />

                                {search && (
                                    <button
                                        type="button"
                                        onClick={() => setSearch("")}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#9b8c83] hover:bg-[#f3ebe6]"
                                        aria-label="Clear search"
                                    >
                                        <X size={16} />
                                    </button>
                                )}
                            </label>

                            {/* Sort */}
                            <label className="relative block sm:w-52">
                                <select
                                    value={sortBy}
                                    onChange={(event) =>
                                        setSortBy(event.target.value)
                                    }
                                    className="h-12 w-full appearance-none rounded-xl border border-[#dfd2c9] bg-white px-4 pr-10 text-sm font-medium text-[#4d382d] outline-none transition focus:border-[#84280d] focus:ring-2 focus:ring-[#84280d]/10"
                                >
                                    <option value="featured">Featured</option>
                                    <option value="price-low">
                                        Price: Low to high
                                    </option>
                                    <option value="price-high">
                                        Price: High to low
                                    </option>
                                    <option value="rating">
                                        Highest rated
                                    </option>
                                    <option value="name">
                                        Name: A to Z
                                    </option>
                                </select>

                                <ChevronDown
                                    size={17}
                                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#826f64]"
                                />
                            </label>

                            {/* Mobile filter */}
                            <button
                                type="button"
                                onClick={() => setMobileFiltersOpen(true)}
                                className="flex h-12 items-center justify-center gap-2 rounded-xl bg-(--primary-color) px-5 text-sm font-semibold text-white lg:hidden"
                            >
                                <SlidersHorizontal size={17} />
                                Filters
                            </button>
                        </div>
                    </div>

                    <div className="grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)]">
                        {/* Desktop Filters */}
                        <aside className="hidden h-fit rounded-3xl border border-[#e6dad2] bg-white p-6 lg:sticky lg:top-24 lg:block">
                            <FilterContent />
                        </aside>

                        {/* Products */}
                        <div>
                            {filteredProducts.length > 0 ? (
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                                    {filteredProducts.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="flex min-h-112 items-center justify-center rounded-3xl border border-dashed border-[#d8c8bd] bg-white px-6">
                                    <div className="max-w-md text-center">
                                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#f5ebe4] text-(--primary-color)">
                                            <PackageSearch size={34} />
                                        </div>

                                        <h2 className="mt-6 text-2xl font-semibold text-(--primary-color)">
                                            No products found
                                        </h2>

                                        <p className="mt-3 leading-7 text-[#79685f]">
                                            We couldn’t find any products
                                            matching your current search and
                                            filters.
                                        </p>

                                        <button
                                            type="button"
                                            onClick={resetFilters}
                                            className="mt-6 rounded-xl bg-(--primary-color) px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#641e09]"
                                        >
                                            Clear all filters
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Mobile Overlay */}
            <div
                className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity lg:hidden ${mobileFiltersOpen
                    ? "visible opacity-100"
                    : "invisible opacity-0"
                    }`}
                onClick={() => setMobileFiltersOpen(false)}
            />

            {/* Mobile Filter Drawer */}
            <aside
                className={`fixed bottom-0 right-0 top-0 z-60 w-[88%] max-w-sm overflow-y-auto bg-white p-6 shadow-2xl transition-transform duration-300 lg:hidden ${mobileFiltersOpen
                    ? "translate-x-0"
                    : "translate-x-full"
                    }`}
            >
                <div className="mb-7 flex items-center justify-between border-b border-[#eee3dc] pb-5">
                    <div className="flex items-center gap-2">
                        <SlidersHorizontal
                            size={19}
                            className="text-[#84280d]"
                        />

                        <span className="font-semibold text-[#2d1b12]">
                            Shop filters
                        </span>
                    </div>

                    <button
                        type="button"
                        onClick={() => setMobileFiltersOpen(false)}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5eee9] text-[#584338]"
                        aria-label="Close filters"
                    >
                        <X size={19} />
                    </button>
                </div>

                <FilterContent />
            </aside>
        </main>
    );
}