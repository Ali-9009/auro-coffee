import { useEffect, useMemo, useState } from "react";
import {
    AlertCircle,
    Edit3,
    Eye,
    EyeOff,
    Package,
    Plus,
    Search,
    Star,
    Trash2,
} from "lucide-react";
import ProductFormModal from "../components/ProductFormModal";
import DeleteProductModal from "../components/DeleteProductModal";
import {
    deleteProduct,
    getAdminProducts,
    updateProductStatus,
} from "../services/adminProductService";
import {
    deleteProductImage,
    getStoragePathFromUrl,
} from "../services/adminStorageService";

function ProductTableSkeleton() {
    return (
        <div className="overflow-hidden rounded-2xl border border-[#e5d8cf] bg-white">
            {[...Array(6)].map((_, index) => (
                <div
                    key={index}
                    className="flex animate-pulse items-center gap-4 border-b border-[#eee5df] p-5 last:border-b-0"
                >
                    <div className="h-16 w-16 rounded-xl bg-[#eee4dd]" />

                    <div className="flex-1">
                        <div className="h-4 w-40 rounded bg-[#eee4dd]" />
                        <div className="mt-3 h-3 w-24 rounded bg-[#eee4dd]" />
                    </div>

                    <div className="hidden h-4 w-20 rounded bg-[#eee4dd] md:block" />
                    <div className="hidden h-4 w-16 rounded bg-[#eee4dd] lg:block" />
                </div>
            ))}
        </div>
    );
}

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [formOpen, setFormOpen] = useState(false);
    const [editingProduct, setEditingProduct] =
        useState(null);

    const [deleteTarget, setDeleteTarget] =
        useState(null);
    const [deleting, setDeleting] = useState(false);

    const [statusUpdatingId, setStatusUpdatingId] =
        useState(null);

    useEffect(() => {
        loadProducts();
    }, []);

    async function loadProducts() {
        try {
            setLoading(true);
            setError("");

            const data = await getAdminProducts();

            setProducts(data);
        } catch (loadError) {
            console.error(
                "Could not load admin products:",
                loadError
            );

            setError(
                loadError.message ||
                "Could not load products."
            );
        } finally {
            setLoading(false);
        }
    }

    const categories = useMemo(() => {
        return [
            ...new Set(
                products
                    .map((product) => product.category)
                    .filter(Boolean)
            ),
        ].sort();
    }, [products]);

    const filteredProducts = useMemo(() => {
        const normalizedSearch = search
            .trim()
            .toLowerCase();

        return products.filter((product) => {
            const matchesSearch =
                !normalizedSearch ||
                product.name
                    .toLowerCase()
                    .includes(normalizedSearch) ||
                product.slug
                    .toLowerCase()
                    .includes(normalizedSearch) ||
                product.category
                    .toLowerCase()
                    .includes(normalizedSearch);

            const matchesCategory =
                category === "all" ||
                product.category === category;

            return matchesSearch && matchesCategory;
        });
    }, [products, search, category]);

    function openCreateModal() {
        setEditingProduct(null);
        setFormOpen(true);
    }

    function openEditModal(product) {
        setEditingProduct(product);
        setFormOpen(true);
    }

    function handleSaved(savedProduct, options) {
        if (options.editing) {
            setProducts((current) =>
                current.map((product) =>
                    product.id === savedProduct.id
                        ? savedProduct
                        : product
                )
            );
        } else {
            setProducts((current) => [
                savedProduct,
                ...current,
            ]);
        }
    }

    async function handleDelete() {
        if (!deleteTarget) return;

        try {
            setDeleting(true);
            setError("");

            await deleteProduct(deleteTarget.id);

            const imagePath =
                getStoragePathFromUrl(
                    deleteTarget.image
                );

            if (imagePath) {
                try {
                    await deleteProductImage(
                        imagePath
                    );
                } catch (imageError) {
                    console.error(
                        "Product deleted, but its image could not be removed:",
                        imageError
                    );
                }
            }

            setProducts((current) =>
                current.filter(
                    (product) =>
                        product.id !== deleteTarget.id
                )
            );

            setDeleteTarget(null);
        } catch (deleteError) {
            console.error(
                "Could not delete product:",
                deleteError
            );

            setError(
                deleteError.message ||
                "Could not delete product."
            );
        } finally {
            setDeleting(false);
        }
    }

    async function handleStatusChange(product) {
        try {
            setStatusUpdatingId(product.id);
            setError("");

            const updatedProduct =
                await updateProductStatus(
                    product.id,
                    !product.isActive
                );

            setProducts((current) =>
                current.map((item) =>
                    item.id === product.id
                        ? updatedProduct
                        : item
                )
            );
        } catch (statusError) {
            console.error(
                "Could not update product status:",
                statusError
            );

            setError(
                statusError.message ||
                "Could not update product status."
            );
        } finally {
            setStatusUpdatingId(null);
        }
    }

    return (
        <section>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a4d2b]">
                        Inventory
                    </p>

                    <h1 className="mt-2 font-serif text-3xl font-semibold text-[#27170f] sm:text-4xl">
                        Products
                    </h1>

                    <p className="mt-2 text-[#75665d]">
                        Add, edit and manage your store
                        products.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={openCreateModal}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#84280d] px-6 font-semibold text-white transition hover:bg-[#681f0b]"
                >
                    <Plus size={19} />
                    Add product
                </button>
            </div>

            <div className="mt-8 grid gap-4 rounded-2xl border border-[#e5d8cf] bg-white p-4 shadow-sm sm:grid-cols-[1fr_220px]">
                <div className="relative">
                    <Search
                        size={19}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9b8a80]"
                    />

                    <input
                        value={search}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                        placeholder="Search products..."
                        className="h-12 w-full rounded-xl border border-[#ded2ca] pl-12 pr-4 outline-none transition focus:border-[#84280d] focus:ring-4 focus:ring-[#84280d]/10"
                    />
                </div>

                <select
                    value={category}
                    onChange={(event) =>
                        setCategory(event.target.value)
                    }
                    className="h-12 rounded-xl border border-[#ded2ca] bg-white px-4 outline-none transition focus:border-[#84280d] focus:ring-4 focus:ring-[#84280d]/10"
                >
                    <option value="all">
                        All categories
                    </option>

                    {categories.map((item) => (
                        <option
                            key={item}
                            value={item}
                        >
                            {item}
                        </option>
                    ))}
                </select>
            </div>

            {error && (
                <div className="mt-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    <AlertCircle
                        size={19}
                        className="mt-0.5 shrink-0"
                    />

                    <span>{error}</span>
                </div>
            )}

            <div className="mt-6">
                {loading ? (
                    <ProductTableSkeleton />
                ) : filteredProducts.length === 0 ? (
                    <div className="grid min-h-96 place-items-center rounded-2xl border border-dashed border-[#d9cbc2] bg-white px-6">
                        <div className="max-w-sm text-center">
                            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#f6e8df] text-[#84280d]">
                                <Package size={36} />
                            </div>

                            <h2 className="mt-5 text-2xl font-semibold text-[#27170f]">
                                No products found
                            </h2>

                            <p className="mt-2 leading-7 text-[#75665d]">
                                Add your first product or
                                change the current search.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="overflow-hidden rounded-2xl border border-[#e5d8cf] bg-white shadow-sm">
                        <div className="hidden grid-cols-[2fr_1fr_110px_100px_150px] gap-4 border-b border-[#e8ddd5] bg-[#fffaf6] px-6 py-4 text-xs font-bold uppercase tracking-wide text-[#806f65] lg:grid">
                            <span>Product</span>
                            <span>Category</span>
                            <span>Price</span>
                            <span>Stock</span>
                            <span className="text-right">
                                Actions
                            </span>
                        </div>

                        {filteredProducts.map(
                            (product) => (
                                <article
                                    key={product.id}
                                    className="grid gap-5 border-b border-[#eee5df] p-5 last:border-b-0 lg:grid-cols-[2fr_1fr_110px_100px_150px] lg:items-center lg:px-6"
                                >
                                    <div className="flex min-w-0 items-center gap-4">
                                        <img
                                            src={
                                                product.image ||
                                                "/assets/product-placeholder.webp"
                                            }
                                            alt={product.name}
                                            className="h-16 w-16 shrink-0 rounded-xl bg-[#f5ece6] object-cover"
                                        />

                                        <div className="min-w-0">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h2 className="truncate font-semibold text-[#27170f]">
                                                    {product.name}
                                                </h2>

                                                {product.isFeatured && (
                                                    <Star
                                                        size={15}
                                                        className="fill-amber-400 text-amber-400"
                                                    />
                                                )}
                                            </div>

                                            <p className="mt-1 truncate text-sm text-[#95847a]">
                                                /{product.slug}
                                            </p>

                                            {product.sizes?.length > 0 && (
                                                <p className="mt-1 text-xs font-medium text-[#84280d]">
                                                    {product.sizes.length}{" "}
                                                    {product.sizes.length === 1
                                                        ? "size"
                                                        : "sizes"}
                                                </p>
                                            )}

                                            <div className="mt-2 flex gap-2 lg:hidden">
                                                <span
                                                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${product.isActive
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-gray-100 text-gray-600"
                                                        }`}
                                                >
                                                    {product.isActive
                                                        ? "Active"
                                                        : "Hidden"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <span className="text-xs font-semibold uppercase text-[#95847a] lg:hidden">
                                            Category
                                        </span>

                                        <p className="mt-1 text-sm font-medium text-[#49352b] lg:mt-0">
                                            {product.category}
                                        </p>
                                    </div>

                                    <div>
                                        <span className="text-xs font-semibold uppercase text-[#95847a] lg:hidden">
                                            Price
                                        </span>

                                        <div className="mt-1 lg:mt-0">
                                            <p className="font-semibold text-[#84280d]">
                                                $
                                                {product.price.toFixed(
                                                    2
                                                )}
                                            </p>

                                            {product.oldPrice !==
                                                "" && (
                                                    <p className="text-xs text-[#95847a] line-through">
                                                        $
                                                        {Number(
                                                            product.oldPrice
                                                        ).toFixed(2)}
                                                    </p>
                                                )}
                                        </div>
                                    </div>

                                    <div>
                                        <span className="text-xs font-semibold uppercase text-[#95847a] lg:hidden">
                                            Stock
                                        </span>

                                        <p
                                            className={`mt-1 text-sm font-semibold lg:mt-0 ${product.stock <= 0
                                                    ? "text-red-600"
                                                    : product.stock <=
                                                        5
                                                        ? "text-amber-600"
                                                        : "text-green-700"
                                                }`}
                                        >
                                            {product.stock}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2 lg:justify-end">
                                        <button
                                            type="button"
                                            disabled={
                                                statusUpdatingId ===
                                                product.id
                                            }
                                            onClick={() =>
                                                handleStatusChange(
                                                    product
                                                )
                                            }
                                            title={
                                                product.isActive
                                                    ? "Hide product"
                                                    : "Activate product"
                                            }
                                            className="rounded-xl border border-[#ded2ca] p-2.5 text-[#75665d] transition hover:border-[#84280d] hover:text-[#84280d] disabled:opacity-50"
                                        >
                                            {product.isActive ? (
                                                <Eye size={18} />
                                            ) : (
                                                <EyeOff size={18} />
                                            )}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                openEditModal(
                                                    product
                                                )
                                            }
                                            className="rounded-xl border border-[#ded2ca] p-2.5 text-[#75665d] transition hover:border-[#84280d] hover:text-[#84280d]"
                                            title="Edit product"
                                        >
                                            <Edit3 size={18} />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setDeleteTarget(
                                                    product
                                                )
                                            }
                                            className="rounded-xl border border-red-200 p-2.5 text-red-500 transition hover:bg-red-50 hover:text-red-700"
                                            title="Delete product"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </article>
                            )
                        )}
                    </div>
                )}
            </div>

            {!loading && products.length > 0 && (
                <p className="mt-4 text-sm text-[#8b7b72]">
                    Showing {filteredProducts.length} of{" "}
                    {products.length} products
                </p>
            )}

            <ProductFormModal
                open={formOpen}
                product={editingProduct}
                onClose={() => {
                    setFormOpen(false);
                    setEditingProduct(null);
                }}
                onSaved={handleSaved}
            />

            <DeleteProductModal
                product={deleteTarget}
                deleting={deleting}
                onCancel={() => {
                    if (!deleting) {
                        setDeleteTarget(null);
                    }
                }}
                onConfirm={handleDelete}
            />
        </section>
    );
}