import { Minus, Plus } from "lucide-react";

export default function QuantityControl({
    quantity,
    onDecrease,
    onIncrease,
}) {
    return (
        <div className="inline-flex items-center rounded-xl border border-[#ded1c7] bg-white p-1">
            <button
                type="button"
                onClick={onDecrease}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-[#42271a] transition hover:bg-[#f6eee8]"
            >
                <Minus size={16} />
            </button>

            <span className="min-w-10 text-center text-sm font-semibold text-[#29170f]">
                {quantity}
            </span>

            <button
                type="button"
                onClick={onIncrease}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#84280d] text-white transition hover:bg-[#631d09]"
            >
                <Plus size={16} />
            </button>
        </div>
    );
}