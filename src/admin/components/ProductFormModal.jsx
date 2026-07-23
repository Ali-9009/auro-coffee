import {
    useEffect,
    useRef,
    useState,
} from "react";
import {
    ImagePlus,
    LoaderCircle,
    PackagePlus,
    Plus,
    Ruler,
    Save,
    Trash2,
    Upload,
    X,
} from "lucide-react";

import {
    createProduct,
    updateProduct,
} from "../services/adminProductService";

import {
    deleteProductImage,
    getStoragePathFromUrl,
    uploadProductImage,
} from "../services/adminStorageService";

const emptyForm = {
    name: "",
    slug: "",
    sku: "",
    brand: "",
    category: "",

    shortDescription: "",
    description: "",

    image: "",
    gallery: [],

    price: "",
    oldPrice: "",
    costPrice: "",

    stock: 0,
    lowStockThreshold: 5,
    trackInventory: true,

    tags: "",
    weight: "",

    metaTitle: "",
    metaDescription: "",

    active: true,
    featured: false,

    rating: 0,
    reviews: 0,

    specifications: {},
    variants: [],
    dimensions: {},
    ingredients: [],

    sizes: [],
};

function createSlug(value) {
    return value
        .toLowerCase()
        .trim()
        .replace(/['"]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}



export default function ProductFormModal({
    open,
    product,
    onClose,
    onSaved,
}) {
    const fileInputRef = useRef(null);

    const [form, setForm] =
        useState(emptyForm);

    const [selectedFile, setSelectedFile] =
        useState(null);

    const [previewUrl, setPreviewUrl] =
        useState("");

    const [saving, setSaving] =
        useState(false);

    const [error, setError] = useState("");

    const editing = Boolean(product?.id);

    useEffect(() => {
        if (!open) return;

        if (!product) {
            setForm(emptyForm);
            setPreviewUrl("");
            setSelectedFile(null);
            setError("");
            return;
        }

        setForm({
            name: product.name || "",
            slug: product.slug || "",
            sku: product.sku || "",
            brand: product.brand || "",
            category: product.category || "",
            shortDescription: product.shortDescription || "",
            description: product.description || "",
            image: product.image || "",
            gallery: product.gallery || [],
            price: product.price ?? "",
            oldPrice: product.oldPrice ?? "",
            costPrice: product.costPrice ?? "",
            stock: product.stock ?? 0,
            lowStockThreshold: product.lowStockThreshold ?? 5,
            trackInventory: product.trackInventory ?? true,
            tags: Array.isArray(product.tags) ? product.tags.join(", ") : "",
            weight: product.weight ?? "",
            metaTitle: product.metaTitle || "",
            metaDescription: product.metaDescription || "",
            active: product.active ?? product.isActive ?? true,
            featured: product.featured ?? product.isFeatured ?? false,
            rating: product.rating ?? 0,
            reviews: product.reviews ?? 0,
            specifications: product.specifications || {},
            variants: product.variants || [],
            dimensions: product.dimensions || {},
            ingredients: product.ingredients || [],

            sizes: Array.isArray(product.sizes)
                ? product.sizes.map((size) => ({
                    id: size.id || null,
                    name: size.name || "",
                    extraPrice: size.extraPrice ?? 0,
                    active: size.active ?? true,
                }))
                : [],
        });

        setPreviewUrl(product.image || "");
        setSelectedFile(null);
        setError("");
    }, [open, product]);

    useEffect(() => {
        return () => {
            if (
                previewUrl &&
                previewUrl.startsWith("blob:")
            ) {
                URL.revokeObjectURL(
                    previewUrl
                );
            }
        };
    }, [previewUrl]);

    if (!open) return null;

    function handleChange(event) {
        const {
            name,
            value,
            type,
            checked,
        } = event.target;

        setForm((current) => ({
            ...current,
            [name]:
                type === "checkbox"
                    ? checked
                    : value,
        }));
    }

    function handleNameChange(event) {
        const value = event.target.value;

        setForm((current) => ({
            ...current,
            name: value,
            slug:
                editing && current.slug
                    ? current.slug
                    : createSlug(value),
        }));
    }

    function addSize() {
        setForm((prev) => ({
            ...prev,
            sizes: [
                ...prev.sizes,
                {
                    id: null,
                    name: "",
                    extraPrice: 0,
                    active: true,
                },
            ],
        }));
    }

    function updateSize(index, field, value) {
        setForm((prev) => ({
            ...prev,
            sizes: prev.sizes.map((size, i) =>
                i === index ? { ...size, [field]: value } : size
            ),
        }));
    }

    function removeSize(index) {
        setForm((prev) => ({
            ...prev,
            sizes: prev.sizes.filter((_, i) => i !== index),
        }));
    }

    function handleFileChange(event) {
        const file =
            event.target.files?.[0];

        if (!file) return;

        if (
            !file.type.startsWith("image/")
        ) {
            setError(
                "Please select a valid image."
            );
            return;
        }

        if (
            file.size >
            5 * 1024 * 1024
        ) {
            setError(
                "Image must be smaller than 5 MB."
            );
            return;
        }

        if (
            previewUrl.startsWith("blob:")
        ) {
            URL.revokeObjectURL(
                previewUrl
            );
        }

        setSelectedFile(file);

        setPreviewUrl(
            URL.createObjectURL(file)
        );

        setError("");
    }

    async function handleSubmit(event) {
        event.preventDefault();

        let uploadedImage = null;

        try {
            setSaving(true);
            setError("");

            let finalImageUrl =
                form.image;

            if (selectedFile) {
                uploadedImage =
                    await uploadProductImage(
                        selectedFile
                    );

                finalImageUrl =
                    uploadedImage.url;
            }

            const payload = {
                ...form,
                image: finalImageUrl,
            };

            const savedProduct = editing
                ? await updateProduct(
                    product.id,
                    payload
                )
                : await createProduct(
                    payload
                );

            if (
                editing &&
                selectedFile &&
                product.image
            ) {
                const oldImagePath =
                    getStoragePathFromUrl(
                        product.image
                    );

                if (oldImagePath) {
                    try {
                        await deleteProductImage(
                            oldImagePath
                        );
                    } catch (
                    imageDeleteError
                    ) {
                        console.error(
                            "Old image deletion failed:",
                            imageDeleteError
                        );
                    }
                }
            }

            onSaved(savedProduct, {
                editing,
            });

            onClose();
        } catch (submitError) {
            console.error(
                "Product save failed:",
                submitError
            );

            if (uploadedImage?.path) {
                try {
                    await deleteProductImage(
                        uploadedImage.path
                    );
                } catch (
                cleanupError
                ) {
                    console.error(
                        "Image cleanup failed:",
                        cleanupError
                    );
                }
            }

            setError(
                submitError.message ||
                "Could not save product."
            );
        } finally {
            setSaving(false);
        }
    }

    const inputClass =
        "h-12 w-full rounded-xl border border-[#ded2ca] bg-white px-4 outline-none transition focus:border-[#84280d] focus:ring-4 focus:ring-[#84280d]/10";

    const labelClass =
        "mb-2 block text-sm font-semibold text-[#49352b]";

    return (
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/60 px-4 py-8 backdrop-blur-sm">
            <button
                type="button"
                aria-label="Close modal"
                onClick={() => {
                    if (!saving) onClose();
                }}
                className="fixed inset-0"
            />

            <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl">
                <div className="flex items-center justify-between border-b border-[#eadfd8] px-6 py-5 sm:px-8">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f6e8df] text-[#84280d]">
                            <PackagePlus
                                size={22}
                            />
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-[#27170f]">
                                {editing
                                    ? "Edit product"
                                    : "Add product"}
                            </h2>

                            <p className="text-sm text-[#8b7b72]">
                                Manage product
                                information
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        disabled={saving}
                        onClick={onClose}
                        className="rounded-xl p-2 text-[#75665d] hover:bg-[#f7f0eb]"
                    >
                        <X size={22} />
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                >
                    <div className="max-h-[72vh] overflow-y-auto px-6 py-6 sm:px-8">
                        {error && (
                            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                                {error}
                            </div>
                        )}

                        <div className="grid gap-7 lg:grid-cols-[240px_1fr]">
                            <div>
                                <label
                                    className={
                                        labelClass
                                    }
                                >
                                    Product image
                                </label>

                                <button
                                    type="button"
                                    onClick={() =>
                                        fileInputRef.current?.click()
                                    }
                                    className="group relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-[#d9cbc2] bg-[#fffaf6] hover:border-[#84280d]"
                                >
                                    {previewUrl ? (
                                        <>
                                            <img
                                                src={
                                                    previewUrl
                                                }
                                                alt="Product preview"
                                                className="h-full w-full object-cover"
                                            />

                                            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/45">
                                                <Upload className="text-white opacity-0 transition group-hover:opacity-100" />
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-center">
                                            <ImagePlus
                                                size={
                                                    34
                                                }
                                                className="mx-auto text-[#a68d7f]"
                                            />

                                            <p className="mt-3 text-sm font-semibold text-[#49352b]">
                                                Upload
                                                image
                                            </p>

                                            <p className="mt-1 text-xs text-[#95847a]">
                                                Maximum
                                                5 MB
                                            </p>
                                        </div>
                                    )}
                                </button>

                                <input
                                    ref={
                                        fileInputRef
                                    }
                                    type="file"
                                    accept="image/*"
                                    onChange={
                                        handleFileChange
                                    }
                                    className="hidden"
                                />

                                {selectedFile && (
                                    <p className="mt-2 truncate text-xs text-[#75665d]">
                                        {
                                            selectedFile.name
                                        }
                                    </p>
                                )}
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <div className="sm:col-span-2">
                                    <label
                                        className={
                                            labelClass
                                        }
                                    >
                                        Product name
                                    </label>

                                    <input
                                        name="name"
                                        value={
                                            form.name
                                        }
                                        onChange={
                                            handleNameChange
                                        }
                                        placeholder="Product name"
                                        className={
                                            inputClass
                                        }
                                    />
                                </div>

                                <div>
                                    <label
                                        className={
                                            labelClass
                                        }
                                    >
                                        Slug
                                    </label>

                                    <input
                                        name="slug"
                                        value={
                                            form.slug
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="product-slug"
                                        className={
                                            inputClass
                                        }
                                    />
                                </div>

                                <div>
                                    <label
                                        className={
                                            labelClass
                                        }
                                    >
                                        SKU
                                    </label>

                                    <input
                                        name="sku"
                                        value={
                                            form.sku
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="SKU-001"
                                        className={
                                            inputClass
                                        }
                                    />
                                </div>

                                <div>
                                    <label
                                        className={
                                            labelClass
                                        }
                                    >
                                        Brand
                                    </label>

                                    <input
                                        name="brand"
                                        value={
                                            form.brand
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Brand name"
                                        className={
                                            inputClass
                                        }
                                    />
                                </div>

                                <div>
                                    <label
                                        className={
                                            labelClass
                                        }
                                    >
                                        Category
                                    </label>

                                    <input
                                        name="category"
                                        value={
                                            form.category
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Category"
                                        className={
                                            inputClass
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-7">
                            <label
                                className={
                                    labelClass
                                }
                            >
                                Short description
                            </label>

                            <textarea
                                name="shortDescription"
                                value={
                                    form.shortDescription
                                }
                                onChange={
                                    handleChange
                                }
                                rows={3}
                                className="w-full resize-none rounded-xl border border-[#ded2ca] px-4 py-3 outline-none focus:border-[#84280d] focus:ring-4 focus:ring-[#84280d]/10"
                            />
                        </div>

                        <div className="mt-5">
                            <label
                                className={
                                    labelClass
                                }
                            >
                                Full description
                            </label>

                            <textarea
                                name="description"
                                value={
                                    form.description
                                }
                                onChange={
                                    handleChange
                                }
                                rows={6}
                                className="w-full resize-none rounded-xl border border-[#ded2ca] px-4 py-3 outline-none focus:border-[#84280d] focus:ring-4 focus:ring-[#84280d]/10"
                            />
                        </div>

                        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            <div>
                                <label
                                    className={
                                        labelClass
                                    }
                                >
                                    Price
                                </label>

                                <input
                                    name="price"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={
                                        form.price
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className={
                                        inputClass
                                    }
                                />
                            </div>

                            <div>
                                <label
                                    className={
                                        labelClass
                                    }
                                >
                                    Old price
                                </label>

                                <input
                                    name="oldPrice"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={
                                        form.oldPrice
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className={
                                        inputClass
                                    }
                                />
                            </div>

                            <div>
                                <label
                                    className={
                                        labelClass
                                    }
                                >
                                    Cost price
                                </label>

                                <input
                                    name="costPrice"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={
                                        form.costPrice
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className={
                                        inputClass
                                    }
                                />
                            </div>

                            <div>
                                <label
                                    className={
                                        labelClass
                                    }
                                >
                                    Weight
                                </label>

                                <input
                                    name="weight"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={
                                        form.weight
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className={
                                        inputClass
                                    }
                                />
                            </div>
                        </div>

                        <div className="mt-5 grid gap-5 sm:grid-cols-3">
                            <div>
                                <label
                                    className={
                                        labelClass
                                    }
                                >
                                    Stock
                                </label>

                                <input
                                    name="stock"
                                    type="number"
                                    min="0"
                                    step="1"
                                    value={
                                        form.stock
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className={
                                        inputClass
                                    }
                                />
                            </div>

                            <div>
                                <label
                                    className={
                                        labelClass
                                    }
                                >
                                    Low-stock alert
                                </label>

                                <input
                                    name="lowStockThreshold"
                                    type="number"
                                    min="0"
                                    step="1"
                                    value={
                                        form.lowStockThreshold
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className={
                                        inputClass
                                    }
                                />
                            </div>

                            <div>
                                <label
                                    className={
                                        labelClass
                                    }
                                >
                                    Tags
                                </label>

                                <input
                                    name="tags"
                                    value={
                                        form.tags
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="coffee, hot, new"
                                    className={
                                        inputClass
                                    }
                                />
                            </div>
                        </div>

                        <div className="mt-7 grid gap-4 sm:grid-cols-3">
                            <label className="flex cursor-pointer items-center justify-between rounded-xl border border-[#ded2ca] p-4">
                                <div>
                                    <p className="font-semibold text-[#49352b]">
                                        Active
                                    </p>

                                    <p className="mt-1 text-xs text-[#95847a]">
                                        Visible to
                                        customers
                                    </p>
                                </div>

                                <input
                                    type="checkbox"
                                    name="active"
                                    checked={
                                        form.active
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className="h-5 w-5 accent-[#84280d]"
                                />
                            </label>

                            <label className="flex cursor-pointer items-center justify-between rounded-xl border border-[#ded2ca] p-4">
                                <div>
                                    <p className="font-semibold text-[#49352b]">
                                        Featured
                                    </p>

                                    <p className="mt-1 text-xs text-[#95847a]">
                                        Featured
                                        sections
                                    </p>
                                </div>

                                <input
                                    type="checkbox"
                                    name="featured"
                                    checked={
                                        form.featured
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className="h-5 w-5 accent-[#84280d]"
                                />
                            </label>

                            <label className="flex cursor-pointer items-center justify-between rounded-xl border border-[#ded2ca] p-4">
                                <div>
                                    <p className="font-semibold text-[#49352b]">
                                        Track
                                        inventory
                                    </p>

                                    <p className="mt-1 text-xs text-[#95847a]">
                                        Manage stock
                                    </p>
                                </div>

                                <input
                                    type="checkbox"
                                    name="trackInventory"
                                    checked={
                                        form.trackInventory
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className="h-5 w-5 accent-[#84280d]"
                                />
                            </label>
                        </div>

                        <div className="mt-8 rounded-2xl border border-[#e5d8cf] bg-[#fffaf6] p-5 sm:p-6">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f6e8df] text-[#84280d]">
                                        <Ruler size={21} />
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-[#27170f]">
                                            Product sizes
                                        </h3>

                                        <p className="mt-1 text-sm text-[#8b7b72]">
                                            Optional. Add sizes only when
                                            this product requires them.
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={addSize}
                                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#84280d] px-4 text-sm font-semibold text-[#84280d] transition hover:bg-[#84280d] hover:text-white"
                                >
                                    <Plus size={17} />
                                    Add size
                                </button>
                            </div>

                            {form.sizes.length === 0 ? (
                                <div className="mt-5 rounded-xl border border-dashed border-[#d9cbc2] bg-white px-5 py-7 text-center">
                                    <p className="text-sm font-semibold text-[#49352b]">
                                        This product has no sizes
                                    </p>

                                    <p className="mt-1 text-xs text-[#95847a]">
                                        Customers will purchase it at the
                                        normal product price.
                                    </p>
                                </div>
                            ) : (
                                <div className="mt-5 space-y-3">
                                    {form.sizes.map(
                                        (size, index) => (
                                            <div
                                                key={
                                                    size.id ||
                                                    `new-size-${index}`
                                                }
                                                className="grid gap-3 rounded-xl border border-[#ded2ca] bg-white p-4 sm:grid-cols-[1fr_180px_110px_44px] sm:items-end"
                                            >
                                                <div>
                                                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[#806f65]">
                                                        Size name
                                                    </label>

                                                    <input
                                                        value={size.name}
                                                        onChange={(event) =>
                                                            updateSize(
                                                                index,
                                                                "name",
                                                                event.target
                                                                    .value
                                                            )
                                                        }
                                                        placeholder="Small"
                                                        className={inputClass}
                                                    />
                                                </div>

                                                <div>
                                                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[#806f65]">
                                                        Extra price ($)
                                                    </label>

                                                    <input
                                                        type="number"
                                                        min="0"
                                                        step="0.01"
                                                        value={
                                                            size.extraPrice
                                                        }
                                                        onChange={(event) =>
                                                            updateSize(
                                                                index,
                                                                "extraPrice",
                                                                event.target
                                                                    .value
                                                            )
                                                        }
                                                        placeholder="0.00"
                                                        className={inputClass}
                                                    />
                                                </div>

                                                <label className="flex h-12 cursor-pointer items-center justify-between gap-3 rounded-xl border border-[#ded2ca] px-3">
                                                    <span className="text-sm font-semibold text-[#49352b]">
                                                        Active
                                                    </span>

                                                    <input
                                                        type="checkbox"
                                                        checked={
                                                            size.active
                                                        }
                                                        onChange={(event) =>
                                                            updateSize(
                                                                index,
                                                                "active",
                                                                event.target
                                                                    .checked
                                                            )
                                                        }
                                                        className="h-5 w-5 accent-[#84280d]"
                                                    />
                                                </label>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeSize(index)
                                                    }
                                                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-red-200 text-red-500 transition hover:bg-red-50 hover:text-red-700"
                                                    title="Remove size"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        )
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="mt-7 grid gap-5 sm:grid-cols-2">
                            <div>
                                <label
                                    className={
                                        labelClass
                                    }
                                >
                                    SEO title
                                </label>

                                <input
                                    name="metaTitle"
                                    value={
                                        form.metaTitle
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className={
                                        inputClass
                                    }
                                />
                            </div>

                            <div>
                                <label
                                    className={
                                        labelClass
                                    }
                                >
                                    SEO description
                                </label>

                                <input
                                    name="metaDescription"
                                    value={
                                        form.metaDescription
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className={
                                        inputClass
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col-reverse gap-3 border-t border-[#eadfd8] bg-[#fffaf6] px-6 py-5 sm:flex-row sm:justify-end sm:px-8">
                        <button
                            type="button"
                            disabled={saving}
                            onClick={onClose}
                            className="h-12 rounded-xl border border-[#d9cbc2] px-6 font-semibold text-[#49352b]"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={saving}
                            className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#84280d] px-7 font-semibold text-white hover:bg-[#681f0b] disabled:opacity-60"
                        >
                            {saving ? (
                                <>
                                    <LoaderCircle
                                        size={18}
                                        className="animate-spin"
                                    />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save
                                        size={18}
                                    />

                                    {editing
                                        ? "Update product"
                                        : "Create product"}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}