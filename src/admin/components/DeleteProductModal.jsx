import {
    LoaderCircle,
    Trash2,
    X,
} from "lucide-react";

export default function DeleteProductModal({
    product,
    deleting,
    onCancel,
    onConfirm,
}) {
    if (!product) return null;

    return (
        <div className="fixed inset-0 z-[110] grid place-items-center bg-black/60 px-5 backdrop-blur-sm">
            <button
                type="button"
                aria-label="Close delete modal"
                onClick={() => {
                    if (!deleting) onCancel();
                }}
                className="absolute inset-0"
            />

            <div className="relative w-full max-w-md rounded-3xl bg-white p-7 text-center shadow-2xl sm:p-9">
                <button
                    type="button"
                    disabled={deleting}
                    onClick={onCancel}
                    className="absolute right-5 top-5 rounded-lg p-2 text-[#75665d] hover:bg-[#f7f0eb]"
                >
                    <X size={20} />
                </button>

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
                    <Trash2 size={28} />
                </div>

                <h2 className="mt-5 text-2xl font-semibold text-[#27170f]">
                    Delete product?
                </h2>

                <p className="mt-3 leading-7 text-[#75665d]">
                    Are you sure you want to delete{" "}
                    <strong className="text-[#49352b]">
                        {product.name}
                    </strong>
                    ? This action cannot be undone.
                </p>

                <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row">
                    <button
                        type="button"
                        disabled={deleting}
                        onClick={onCancel}
                        className="h-12 flex-1 rounded-xl border border-[#d9cbc2] font-semibold text-[#49352b]"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        disabled={deleting}
                        onClick={onConfirm}
                        className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
                    >
                        {deleting ? (
                            <>
                                <LoaderCircle
                                    size={18}
                                    className="animate-spin"
                                />
                                Deleting...
                            </>
                        ) : (
                            <>
                                <Trash2 size={18} />
                                Delete
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}