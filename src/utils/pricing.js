export function centsToPrice(value) {
    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {
        return 0;
    }

    const cents = Number(value);

    if (!Number.isFinite(cents)) {
        return 0;
    }

    return cents / 100;
}

export function nullableCentsToPrice(value) {
    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {
        return null;
    }

    return centsToPrice(value);
}

export function priceToCents(
    value,
    fieldName = "Price",
    required = false
) {
    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {
        if (required) {
            throw new Error(
                `${fieldName} is required.`
            );
        }

        return null;
    }

    const price = Number(value);

    if (
        !Number.isFinite(price) ||
        price < 0
    ) {
        throw new Error(
            `${fieldName} must be a valid number of zero or more.`
        );
    }

    return Math.round(price * 100);
}

export function normalizePrice(value) {
    const price = Number(value);

    if (
        !Number.isFinite(price) ||
        price < 0
    ) {
        return 0;
    }

    return price;
}

export function calculateCartTotals(
    cartItems = []
) {
    const subtotal = cartItems.reduce(
        (total, item) => {
            const price =
                normalizePrice(item.price);

            const quantity = Math.max(
                0,
                Number(item.quantity) || 0
            );

            return (
                total +
                price * quantity
            );
        },
        0
    );

    const deliveryFee =
        subtotal > 0 ? 2.5 : 0;

    const tax = subtotal * 0.05;

    const total =
        subtotal +
        deliveryFee +
        tax;

    return {
        subtotal,
        deliveryFee,
        tax,
        total,
    };
}

export function formatMoney(
    value,
    currency = "usd"
) {
    return new Intl.NumberFormat(
        "en-US",
        {
            style: "currency",
            currency:
                currency.toUpperCase(),
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }
    ).format(
        normalizePrice(value)
    );
}