import { Minus, Plus } from "lucide-react";

export default function QuantityControl({
    quantity,
    onDecrease,
    onIncrease,
    max = Infinity,
}) {
    const decreaseDisabled = quantity <= 1;
    const increaseDisabled = quantity >= max;

    return (
        <div className="inline-flex items-center rounded-xl border border-[#ded1c7] bg-white p-1">
            <button
                type="button"
                onClick={onDecrease}
                disabled={decreaseDisabled}
                aria-label="Decrease quantity"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-[#42271a] transition hover:bg-[#f6eee8] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
            >
                <Minus size={16} />
            </button>

            <span className="min-w-10 text-center text-sm font-semibold text-[#29170f]">
                {quantity}
            </span>

            <button
                type="button"
                onClick={onIncrease}
                disabled={increaseDisabled}
                aria-label="Increase quantity"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#84280d] text-white transition hover:bg-[#631d09] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[#84280d]"
            >
                <Plus size={16} />
            </button>
        </div>
    );
}