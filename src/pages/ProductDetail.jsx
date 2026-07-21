import { useMemo, useState } from "react";
import { Check, ShoppingBag, Star } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import QuantityControl from "../components/QuantityControl";

export default function ProductDetail() {
    const navigate = useNavigate();
    const { slug } = useParams();
    const { addToCart } = useCart();

    const product = products.find((item) => item.slug === slug);

    const [selectedImage, setSelectedImage] = useState(
        product?.image || ""
    );

    const [selectedSize, setSelectedSize] = useState(
        product?.sizes?.[0]?.value || ""
    );

    const [quantity, setQuantity] = useState(1);

    const currentSize = useMemo(() => {
        return product?.sizes.find(
            (size) => size.value === selectedSize
        );
    }, [product, selectedSize]);

    if (!product) {
        return (
            <section className="flex min-h-[70vh] items-center justify-center px-6">
                <div className="text-center">
                    <h1 className="text-4xl font-bold">
                        Product not found
                    </h1>

                    <Link
                        to="/"
                        className="mt-6 inline-block text-[#84280d] underline"
                    >
                        Return home
                    </Link>
                </div>
            </section>
        );
    }

    const finalPrice =
        product.price + (currentSize?.extraPrice || 0);

    const showCartToast = () => {
        const selectedSizeData = product.sizes.find(
            (size) => size.value === selectedSize
        );

        const itemPrice =
            product.price + (selectedSizeData?.extraPrice || 0);

        toast.custom(
            (toastItem) => (
                <div
                    className={`pointer-events-auto w-85 max-w-[calc(100vw-24px)] rounded-2xl border border-[#eadfd5] bg-white p-3 shadow-[0_20px_60px_rgba(55,28,14,0.22)] transition-all duration-300 ${toastItem.visible
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
                                {selectedSizeData?.label} · Qty: {quantity}
                            </p>

                            <p className="mt-1 text-sm font-bold text-[#84280d]">
                                ${(itemPrice * quantity).toFixed(2)}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => toast.dismiss(toastItem.id)}
                            className="self-start px-2 text-lg text-[#9b8d85]"
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
                        className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#84280d] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#631d09]"
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
        addToCart(product, selectedSize, quantity);
        showCartToast();
    };

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
                                src={selectedImage}
                                alt={product.name}
                                className="aspect-square w-full object-cover"
                            />
                        </div>

                        <div className="mt-4 grid grid-cols-4 gap-3">
                            {product.gallery.map((image) => (
                                <button
                                    key={image}
                                    type="button"
                                    onClick={() => setSelectedImage(image)}
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

                        <div className="mt-7 flex items-center gap-3">
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
                        <div className="mt-8">
                            <p className="mb-3 font-semibold text-[#332118]">
                                Choose size
                            </p>

                            <div className="flex flex-wrap gap-3">
                                {product.sizes.map((size) => (
                                    <button
                                        key={size.value}
                                        type="button"
                                        onClick={() =>
                                            setSelectedSize(size.value)
                                        }
                                        className={`rounded-xl border px-5 py-3 text-sm font-medium transition ${selectedSize === size.value
                                            ? "border-[#84280d] bg-[#84280d] text-white"
                                            : "border-[#ddcfc5] bg-white text-[#5d4639] hover:border-[#84280d]"
                                            }`}
                                    >
                                        {size.label}

                                        {size.extraPrice > 0 && (
                                            <span className="ml-1">
                                                +${size.extraPrice.toFixed(2)}
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity and Cart */}
                        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                            <QuantityControl
                                quantity={quantity}
                                onDecrease={() =>
                                    setQuantity((current) =>
                                        Math.max(1, current - 1)
                                    )
                                }
                                onIncrease={() =>
                                    setQuantity((current) =>
                                        Math.min(
                                            product.stock,
                                            current + 1
                                        )
                                    )
                                }
                            />

                            <button
                                type="button"
                                onClick={handleAddToCart}
                                className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#84280d] px-6 font-semibold text-white transition hover:bg-[#631d09]"
                            >
                                <ShoppingBag size={19} />
                                Add to cart
                            </button>
                        </div>

                        <div className="mt-8 space-y-3 border-t border-[#e2d7cf] pt-6">
                            <div className="flex items-center gap-3 text-sm text-[#67564c]">
                                <Check size={17} className="text-green-600" />
                                In stock: {product.stock} available
                            </div>

                            <div className="flex items-center gap-3 text-sm text-[#67564c]">
                                <Check size={17} className="text-green-600" />
                                Freshly prepared after ordering
                            </div>

                            <div className="flex items-center gap-3 text-sm text-[#67564c]">
                                <Check size={17} className="text-green-600" />
                                Secure checkout
                            </div>
                        </div>

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
                    </div>
                </div>
            </div>
        </section>
    );
}