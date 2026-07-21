export const products = [
    {
        id: 1,
        slug: "chocolate-latte",
        name: "Chocolate Latte",
        category: "Latte",
        price: 2.9,
        oldPrice: 3.5,
        rating: 4.9,
        reviews: 360,
        image: "/assets/products/chocolate-latte.png",
        gallery: [
            "/assets/products/choco-latte.png",
            "/assets/products/chocolate-latte-2.jpg",
            "/assets/products/chocolate-latte-3.jpg",
        ],
        shortDescription:
            "A rich chocolate latte made with smooth espresso and creamy steamed milk.",
        description:
            "Our Chocolate Latte combines freshly brewed espresso, silky steamed milk, and premium chocolate. It is carefully prepared to deliver a smooth, balanced, and comforting coffee experience.",
        ingredients: [
            "Fresh espresso",
            "Steamed milk",
            "Premium chocolate",
            "Chocolate topping",
        ],
        sizes: [
            { label: "Small", value: "small", extraPrice: 0 },
            { label: "Medium", value: "medium", extraPrice: 0.8 },
            { label: "Large", value: "large", extraPrice: 1.5 },
        ],
        stock: 18,
        featured: true,
    },
    {
        id: 2,
        slug: "mocha-latte",
        name: "Mocha Latte",
        category: "Latte",
        price: 2.7,
        oldPrice: 3.2,
        rating: 5,
        reviews: 180,
        image: "/assets/products/mocha-latte.png",
        gallery: [
            "/assets/products/mocha-latte.jpg",
            "/assets/products/mocha-latte-2.jpg",
        ],
        shortDescription:
            "Bold espresso blended with chocolate and creamy steamed milk.",
        description:
            "The Mocha Latte is the perfect balance of coffee and chocolate. A rich espresso base is blended with chocolate and finished with smooth steamed milk.",
        ingredients: [
            "Espresso",
            "Chocolate sauce",
            "Steamed milk",
            "Cocoa powder",
        ],
        sizes: [
            { label: "Small", value: "small", extraPrice: 0 },
            { label: "Medium", value: "medium", extraPrice: 0.8 },
            { label: "Large", value: "large", extraPrice: 1.5 },
        ],
        stock: 14,
        featured: true,
    },
    {
        id: 3,
        slug: "classic-coffee-latte",
        name: "Coffee Latte",
        category: "Coffee",
        price: 2.9,
        oldPrice: null,
        rating: 4.8,
        reviews: 1450,
        image: "/assets/products/coffee-latte.png",
        gallery: [
            "/assets/products/coffee-latte.jpg",
            "/assets/products/coffee-latte-2.jpg",
        ],
        shortDescription:
            "A classic espresso latte with a smooth and creamy finish.",
        description:
            "Our classic Coffee Latte is made with a full-bodied espresso shot and perfectly textured milk, giving it a clean and satisfying flavor.",
        ingredients: ["Espresso", "Fresh milk", "Milk foam"],
        sizes: [
            { label: "Small", value: "small", extraPrice: 0 },
            { label: "Medium", value: "medium", extraPrice: 0.8 },
            { label: "Large", value: "large", extraPrice: 1.5 },
        ],
        stock: 22,
        featured: true,
    },
    {
        id: 4,
        slug: "hazelnut-latte",
        name: "Hazelnut Latte",
        category: "Latte",
        price: 2.8,
        oldPrice: 3.4,
        rating: 4.9,
        reviews: 390,
        image: "/assets/products/hazelnut-latte.png",
        gallery: [
            "/assets/products/hazelnut-latte.jpg",
            "/assets/products/hazelnut-latte-2.jpg",
        ],
        shortDescription:
            "Creamy espresso latte infused with a sweet hazelnut flavor.",
        description:
            "A smooth and nutty latte prepared with premium hazelnut syrup, espresso, and creamy steamed milk.",
        ingredients: [
            "Espresso",
            "Steamed milk",
            "Hazelnut syrup",
            "Milk foam",
        ],
        sizes: [
            { label: "Small", value: "small", extraPrice: 0 },
            { label: "Medium", value: "medium", extraPrice: 0.8 },
            { label: "Large", value: "large", extraPrice: 1.5 },
        ],
        stock: 10,
        featured: true,
    },
    {
        id: 5,
        slug: "caramel-cappuccino",
        name: "Caramel Cappuccino",
        category: "Cappuccino",
        price: 3.2,
        oldPrice: 3.8,
        rating: 4.7,
        reviews: 240,
        image: "/assets/products/caramel-cappuccino.png",
        gallery: [
            "/assets/products/caramel-cappuccino.png",
            "/assets/products/caramel-cappuccino.png",
        ],
        shortDescription:
            "A creamy cappuccino finished with rich caramel drizzle.",
        description:
            "A bold espresso cappuccino balanced with steamed milk, thick foam, and smooth caramel.",
        ingredients: [
            "Espresso",
            "Steamed milk",
            "Milk foam",
            "Caramel sauce",
        ],
        sizes: [
            { label: "Small", value: "small", extraPrice: 0 },
            { label: "Medium", value: "medium", extraPrice: 0.8 },
            { label: "Large", value: "large", extraPrice: 1.5 },
        ],
        stock: 12,
        featured: false,
    },
];