import { ShoppingBag, Star, Check, ClosedCaption } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const defaultSize = product.sizes[0];

    const showCartToast = () => {
        toast.custom(
            (toastItem) => (
                <div
                    className={`pointer-events-auto w-85 max-w-[calc(100vw-24px)] rounded-2xl border border-[#eadfd5] bg-white p-3 shadow-[0_20px_60px_rgba(55,28,14,0.22)] transition-all duration-300 ${toastItem.visible
                            ? "translate-y-0 opacity-100"
                            : "-translate-y-3 opacity-0"
                        }`}
                >
                    <div className="flex items-center gap-3">
                        {/* Product Image */}
                        <div className="relative shrink-0">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="h-16 w-16 rounded-xl object-cover"
                            />

                            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-lime-600 text-white shadow">
                                <Check size={12} strokeWidth={3} />
                            </span>
                        </div>

                        {/* Product Information */}
                        <div className="min-w-0 flex-1">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-lime-600">
                                Added to cart
                            </p>

                            <h4 className="mt-1 truncate text-sm font-semibold text-[#2d1b12]">
                                {product.name}
                            </h4>

                            <div className="mt-1 flex items-center gap-2 text-xs text-[#85746a]">
                                <span>{defaultSize.label}</span>
                                <span className="h-1 w-1 rounded-full bg-[#b7aaa2]" />
                                <span>Qty: 1</span>
                            </div>

                            <p className="mt-1 text-sm font-bold text-[#84280d]">
                                $
                                {(
                                    product.price +
                                    defaultSize.extraPrice
                                ).toFixed(2)}
                            </p>
                        </div>

                        {/* Close */}
                        <button
                            type="button"
                            onClick={() => toast.dismiss(toastItem.id)}
                            className="self-start rounded-full px-2 py-1 text-lg leading-none text-[#9b8d85] transition hover:bg-[#f5eee9] hover:text-[#2d1b12]"
                            aria-label="Close notification"
                        >
                            ×
                        </button>
                    </div>

                    <div className="mt-3 flex gap-2 border-t border-[#eee4dd] pt-3">
                        <button
                            type="button"
                            onClick={() => toast.dismiss(toastItem.id)}
                            className="flex-1 rounded-xl border border-[#ded1c7] px-4 py-2.5 text-xs font-semibold text-[#5d4639] transition hover:bg-[#f8f2ed]"
                        >
                            Continue shopping
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                toast.dismiss(toastItem.id);
                                navigate("/cart");
                            }}
                            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#84280d] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#631d09]"
                        >
                            <ShoppingBag size={15} />
                            View cart
                        </button>
                    </div>
                </div>
            ),
            {
                duration: 4000,
                position: "bottom-right",
            }
        );
    };

    const handleQuickAdd = (event) => {
        event.preventDefault();
        event.stopPropagation();

        addToCart(product, defaultSize.value, 1);
        showCartToast();
    };

    return (
        <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#eadfd5] bg-white p-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(72,35,14,0.12)]">
            <Link
                to={`/product/${product.slug}`}
                className="relative block overflow-hidden rounded-[18px] bg-[#f7f1eb]"
            >
                <img
                    src={product.image}
                    alt={product.name}
                    className="aspect-4/3 w-full object-cover transition duration-500 group-hover:scale-105"
                />
            </Link>

            <div className="flex flex-1 flex-col px-1 pb-1 pt-4">
                <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="text-xs font-medium uppercase tracking-[0.12em] text-[#a16b4a]">
                        {product.category}
                    </span>

                    <div className="flex items-center gap-1 text-xs text-[#6c574b]">
                        <Star
                            size={14}
                            className="fill-[#e8a52b] text-[#e8a52b]"
                        />
                        <span>{product.rating}</span>
                        <span className="text-[#a99b92]">
                            ({product.reviews})
                        </span>
                    </div>
                </div>

                <Link to={`/product/${product.slug}`}>
                    <h3 className="line-clamp-1 text-lg font-semibold text-[#27170f] transition hover:text-[#84280d]">
                        {product.name}
                    </h3>
                </Link>

                <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#796b63]">
                    {product.shortDescription}
                </p>

                <div className="mt-auto flex items-center justify-between gap-4 pt-5">
                    <span className="text-xl font-bold text-[#321b10]">
                        ${product.price.toFixed(2)}
                    </span>

                    <button
                        type="button"
                        onClick={handleQuickAdd}
                        aria-label={`Add ${product.name} to cart`}
                        className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#84280d] text-white transition hover:bg-[#5f1b08] active:scale-95"
                    >
                        <ShoppingBag size={18} />
                    </button>
                </div>
            </div>
        </article>
    );
}