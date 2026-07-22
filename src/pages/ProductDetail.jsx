import {
    useEffect,
    useMemo,
    useState,
} from "react";
import { getProductBySlug } from "../services/productService";
import { Check, ShoppingBag, Star } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
// import { products } from "../data/products";
import { useCart } from "../Context/CartContext";
import toast from "react-hot-toast";
import QuantityControl from "../components/QuantityControl";

export default function ProductDetail() {
    const navigate = useNavigate();
    const { slug } = useParams();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [selectedImage, setSelectedImage] =
        useState("");

    const [selectedSizeId, setSelectedSizeId] =
        useState("");

    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        async function loadProduct() {
            try {
                setLoading(true);
                setError("");

                const data =
                    await getProductBySlug(slug);

                setProduct(data);

                setSelectedImage(
                    data.gallery?.[0] ||
                    data.image ||
                    ""
                );

                setSelectedSizeId(
                    data.sizes?.[0]?.id || ""
                );
            } catch (error) {
                console.error(error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        loadProduct();
    }, [slug]);

    const currentSize = useMemo(() => {
        return product?.sizes?.find(
            (size) => size.id === selectedSizeId
        );
    }, [product, selectedSizeId]);

    const finalPrice =
        (product?.price || 0) +
        (currentSize?.extraPrice || 0);

    const showCartToast = () => {
        toast.custom(
            (toastItem) => (
                <div
                    className={`pointer-events-auto w-85 max-w-[calc(100vw-24px)] rounded-2xl border border-[#eadfd5] bg-white p-3 shadow-xl transition-all ${toastItem.visible
                        ? "translate-y-0 opacity-100"
                        : "-translate-y-3 opacity-0"
                        }`}
                >
                    <div className="flex items-center gap-3">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="h-16 w-16 shrink-0 rounded-xl object-cover"
                        />

                        <div className="min-w-0 flex-1">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-green-600">
                                Added to cart
                            </p>

                            <h4 className="mt-1 truncate text-sm font-semibold text-[#2d1b12]">
                                {product.name}
                            </h4>

                            <p className="mt-1 text-xs text-[#85746a]">
                                {currentSize?.name ||
                                    "Standard"}
                                {" · "}
                                Qty: {quantity}
                            </p>

                            <p className="mt-1 text-sm font-bold text-[#84280d]">
                                $
                                {(
                                    finalPrice * quantity
                                ).toFixed(2)}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                toast.dismiss(
                                    toastItem.id
                                )
                            }
                        >
                            ×
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            toast.dismiss(toastItem.id);
                            navigate("/cart");
                        }}
                        className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#84280d] px-4 py-2.5 text-sm font-semibold text-white"
                    >
                        <ShoppingBag size={16} />
                        View cart
                    </button>
                </div>
            ),
            {
                duration: 4000,
                position: "bottom-right",
            }
        );
    };

    const handleAddToCart = () => {
        if (!product) return;

        if (product.stock <= 0) {
            toast.error("This product is out of stock.");
            return;
        }

        if (product.sizes?.length > 0 && !currentSize) {
            toast.error("Please choose a size.");
            return;
        }

        const cartItem = {
            id: product.id,
            productId: product.id,
            slug: product.slug,
            name: product.name,
            image: product.image,
            price: finalPrice,
            basePrice: product.price,
            stock: product.stock,

            selectedSize: currentSize
                ? {
                    id: currentSize.id,
                    name: currentSize.name,
                    extraPrice: currentSize.extraPrice,
                }
                : null,
        };

        addToCart(cartItem, quantity);
        showCartToast();
    };

    if (loading) {
        return (
            <section className="bg-[#fffaf6] py-10 lg:py-16">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    <div className="animate-pulse">
                        {/* Breadcrumb skeleton */}
                        <div className="mb-8 flex items-center gap-2">
                            <div className="h-4 w-12 rounded bg-[#eadfd8]" />
                            <div className="h-4 w-3 rounded bg-[#eadfd8]" />
                            <div className="h-4 w-28 rounded bg-[#eadfd8]" />
                        </div>

                        <div className="grid gap-12 lg:grid-cols-2">
                            {/* Gallery skeleton */}
                            <div>
                                <div className="aspect-square w-full rounded-[30px] bg-[#eee4dd]" />

                                <div className="mt-4 grid grid-cols-4 gap-3">
                                    {[...Array(4)].map((_, index) => (
                                        <div
                                            key={index}
                                            className="aspect-square rounded-2xl bg-[#eee4dd]"
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Details skeleton */}
                            <div className="flex flex-col justify-center">
                                <div className="h-4 w-28 rounded bg-[#eadfd8]" />

                                <div className="mt-4 h-12 w-4/5 rounded-xl bg-[#eadfd8]" />

                                <div className="mt-4 flex items-center gap-3">
                                    <div className="h-5 w-20 rounded bg-[#eadfd8]" />
                                    <div className="h-4 w-32 rounded bg-[#eadfd8]" />
                                </div>

                                <div className="mt-7 space-y-3">
                                    <div className="h-4 w-full rounded bg-[#eadfd8]" />
                                    <div className="h-4 w-full rounded bg-[#eadfd8]" />
                                    <div className="h-4 w-4/5 rounded bg-[#eadfd8]" />
                                </div>

                                <div className="my-7 flex items-center gap-3">
                                    <div className="h-10 w-28 rounded-lg bg-[#eadfd8]" />
                                    <div className="h-6 w-16 rounded bg-[#eadfd8]" />
                                </div>

                                {/* Size buttons */}
                                <div className="flex flex-wrap gap-3">
                                    {[...Array(3)].map((_, index) => (
                                        <div
                                            key={index}
                                            className="h-12 w-24 rounded-xl bg-[#eadfd8]"
                                        />
                                    ))}
                                </div>

                                {/* Quantity + cart */}
                                <div className="mt-8 flex gap-4">
                                    <div className="h-12 w-32 rounded-xl bg-[#eadfd8]" />
                                    <div className="h-12 flex-1 rounded-xl bg-[#eadfd8]" />
                                </div>

                                {/* Product notes */}
                                <div className="mt-8 space-y-4 border-t border-[#e2d7cf] pt-6">
                                    {[...Array(3)].map((_, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-3"
                                        >
                                            <div className="h-5 w-5 rounded-full bg-[#eadfd8]" />
                                            <div className="h-4 w-52 rounded bg-[#eadfd8]" />
                                        </div>
                                    ))}
                                </div>

                                {/* Ingredients */}
                                <div className="mt-8">
                                    <div className="mb-4 h-5 w-24 rounded bg-[#eadfd8]" />

                                    <div className="flex flex-wrap gap-2">
                                        {[...Array(4)].map((_, index) => (
                                            <div
                                                key={index}
                                                className="h-9 w-28 rounded-full bg-[#eadfd8]"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (error || !product) {
        return (
            <section className="flex min-h-[70vh] items-center justify-center bg-[#fffaf6] px-6">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-[#27170f]">
                        Product not found
                    </h1>

                    <p className="mt-3 text-[#75665d]">
                        {error ||
                            "This product is unavailable."}
                    </p>

                    <Link
                        to="/shop"
                        className="mt-6 inline-block rounded-xl bg-[#84280d] px-6 py-3 font-semibold text-white"
                    >
                        Return to shop
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-[#fffaf6] py-10 lg:py-16">
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                <div className="mb-8 text-sm text-[#88766c]">
                    <Link to="/" className="hover:text-[#84280d]">
                        Home
                    </Link>
                    <span className="mx-2">/</span>
                    <span>{product.name}</span>
                </div>

                <div className="grid gap-12 lg:grid-cols-2">
                    {/* Gallery */}
                    <div>
                        <div className="overflow-hidden rounded-[30px] bg-[#f3e9e1]">
                            <img
                                src={
                                    selectedImage ||
                                    product.image ||
                                    "/assets/product-placeholder.webp"
                                }
                                alt={product.name}
                                className="aspect-square w-full object-cover"
                                onError={(event) => {
                                    event.currentTarget.src =
                                        "/assets/product-placeholder.webp";
                                }}
                            />
                        </div>

                        {[
                            product.image,
                            ...(product.gallery || []),
                        ].filter(Boolean).length > 1 && (
                                <div className="mt-4 grid grid-cols-4 gap-3">
                                    {[
                                        ...new Set([
                                            product.image,
                                            ...(product.gallery || []),
                                        ].filter(Boolean)),
                                    ].map((image) => (
                                        <button
                                            key={image}
                                            type="button"
                                            onClick={() =>
                                                setSelectedImage(image)
                                            }
                                            className={`overflow-hidden rounded-2xl border-2 ${selectedImage === image
                                                ? "border-[#84280d]"
                                                : "border-transparent"
                                                }`}
                                        >
                                            <img
                                                src={image}
                                                alt={product.name}
                                                className="aspect-square w-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                    </div>

                    {/* Details */}
                    <div className="flex flex-col justify-center">
                        <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a4d2b]">
                            {product.category}
                        </span>

                        <h1 className="mt-3 text-4xl font-semibold text-[#27170f] sm:text-5xl">
                            {product.name}
                        </h1>

                        <div className="mt-4 flex items-center gap-2">
                            <div className="flex items-center gap-1 text-[#e8a52b]">
                                <Star size={18} fill="currentColor" />
                                <span className="font-semibold text-[#36251c]">
                                    {product.rating}
                                </span>
                            </div>

                            <span className="text-sm text-[#8c7c72]">
                                ({product.reviews} customer reviews)
                            </span>
                        </div>

                        <p className="mt-6 text-base leading-8 text-[#75665d]">
                            {product.description}
                        </p>

                        <div className="my-6 flex items-center gap-3">
                            <span className="text-3xl font-bold text-[#321b10]">
                                ${finalPrice.toFixed(2)}
                            </span>

                            {product.oldPrice && (
                                <span className="text-lg text-[#a99b92] line-through">
                                    ${product.oldPrice.toFixed(2)}
                                </span>
                            )}
                        </div>

                        {/* Sizes */}
                        <div className="flex flex-wrap gap-3">
                            {product.sizes.map((size) => (
                                <button
                                    key={size.id}
                                    type="button"
                                    onClick={() =>
                                        setSelectedSizeId(size.id)
                                    }
                                    className={`rounded-xl border px-5 py-3 text-sm font-medium transition ${selectedSizeId === size.id
                                        ? "border-[#84280d] bg-[#84280d] text-white"
                                        : "border-[#ddcfc5] bg-white text-[#5d4639] hover:border-[#84280d]"
                                        }`}
                                >
                                    {size.name}

                                    {size.extraPrice > 0 && (
                                        <span className="ml-1">
                                            +$
                                            {size.extraPrice.toFixed(2)}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Quantity and Cart */}
                        <div className="mt-8 flex gap-4 flex-row">
                            <QuantityControl
                                quantity={quantity}
                                max={product.stock}
                                onDecrease={() =>
                                    setQuantity((current) =>
                                        Math.max(1, current - 1)
                                    )
                                }
                                onIncrease={() =>
                                    setQuantity((current) =>
                                        Math.min(product.stock, current + 1)
                                    )
                                }
                            />

                            <button
                                type="button"
                                onClick={handleAddToCart}
                                disabled={product.stock <= 0}
                                className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#84280d] px-6 font-semibold text-white transition hover:bg-[#631d09] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <ShoppingBag size={19} />

                                {product.stock > 0
                                    ? "Add to cart"
                                    : "Out of stock"}
                            </button>
                        </div>

                        <div className="mt-8 space-y-3 border-t border-[#e2d7cf] pt-6">
                            <div className="flex items-center gap-3 text-sm text-[#67564c] font-semibold">
                                <Check size={17} className="text-green-600" />
                                In stock: {product.stock} available
                            </div>

                            <div className="flex items-center gap-3 text-sm text-[#67564c] font-semibold">
                                <Check size={17} className="text-green-600" />
                                Freshly prepared after ordering
                            </div>

                            <div className="flex items-center gap-3 text-sm text-[#67564c] font-semibold">
                                <Check size={17} className="text-green-600" />
                                Secure checkout
                            </div>
                        </div>

                        {product.ingredients?.length > 0 && (
                            <div className="mt-8">
                                <p className="mb-3 font-semibold text-[#332118]">
                                    Ingredients
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {product.ingredients.map((ingredient) => (
                                        <span
                                            key={ingredient}
                                            className="rounded-full bg-[#f0e5dc] px-4 py-2 text-sm text-[#644b3d]"
                                        >
                                            {ingredient}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}