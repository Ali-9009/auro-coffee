import { Link } from "react-router-dom";
import {
    ChevronRight,
    Heart,
    Coffee,
    Leaf,
    Handshake,
    CheckCircle2,
} from "lucide-react";

const awards = [
    {
        medal: "/assets/medal-1.webp",
        level: "Gold Medal",
        year: "2026",
        title: "Golden Bean Australasia",
        products: ["Peach Cobbler"],
        accent: "from-[#f8d56b] to-[#b87518]",
    },
    {
        medal: "/assets/medal-2.webp",
        level: "Silver Medal",
        year: "2026",
        title: "Golden Bean Australasia",
        products: [
            "Blush",
            "Golden Rhapsody",
            "Strawberry Sundae",
            "Lychee Bliss",
            "Tropic Gold",
        ],
        accent: "from-[#f5f5f5] to-[#9e9e9e]",
    },
    {
        medal: "/assets/medal-3.webp",
        level: "Bronze Medal",
        year: "2026",
        title: "Golden Bean Australasia",
        products: [
            "Mufasa",
            "Caramel Goddess",
            "Jungle Queen",
            "Sweet Nectar",
            "Candyland",
            "Mystique",
            "Passion Burst",
            "Pink Lemonade",
        ],
        accent: "from-[#d68c45] to-[#7d3f18]",
    },
    {
        medal: "/assets/medal-4.webp",
        level: "Bronze Medal",
        year: "2026",
        title: "Golden Bean Australasia",
        products: [
            "Elite",
            "2 in Decaf",
            "Penas Blancas",
            "Thypica",
        ],
        accent: "from-[#d68c45] to-[#7d3f18]",
    },
];

export default function Story() {
    return (

        <>
            <section className="relative h-80 overflow-hidden sm:h-95 lg:h-105">
                {/* Background image */}
                <div className="absolute inset-0 bg-[url('/assets/bg-2.webp')] bg-cover bg-center bg-no-repeat" />

                {/* Warm coffee overlay */}
                <div className="absolute inset-0 bg-[#4b210f]/25" />

                {/* Decorative glow */}
                <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d69a52]/15 blur-3xl" />

                {/* Content */}
                <div className="relative mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center">
                    <span className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-(--secondary-color) sm:text-sm">
                        Discover Who We Are
                    </span>

                    <h1 className="font-serif text-4xl font-semibold text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
                        Our Story
                    </h1>

                    <div className="mt-5 h-px w-20 bg-linear-to-r from-transparent via-[#e4b365] to-transparent" />

                    {/* Breadcrumb */}
                    <div className="mt-5 flex items-center gap-1.5 text-sm text-white/80">
                        <Link
                            to="/"
                            className="transition hover:text-(--secondary-color)"
                        >
                            Home
                        </Link>

                        <ChevronRight size={15} />

                        <span className="text-(--secondary-color)">Our Story</span>
                    </div>
                </div>

                {/* Bottom fade */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-black/30 to-transparent" />
            </section>

            <section className="max-w-4xl mx-auto px-6 md:py-12 py-8">
                <h2 className="font-serif text-4xl leading-tight text-center text-(--primary-color) sm:text-5xl lg:text-6xl">
                    About Us
                </h2>
                <p className="text-md font-medium text-center">
                    Auro Speciality Coffee is a family run, award winning micro roastery based in Adelaide, Australia. We are driven by a passion for craftsmanship, creativity and connection. Every roast celebrates the natural beauty of coffee, carefully sourced and roasted to order to bring warmth and a sense of adventure to every cup. With recognition at the Royal Adelaide Coffee Show and The Golden Bean Australasia, our dedication to quality and innovation is at the heart of what we do. From morning brews to afternoon cuppas, our muses Simba and Goldie remind us to slow down, stay present and savour the moment, so we can bring that same joy to every cup we share with you..
                </p>
            </section>

            <section className="bg-[#fffaf6] md:py-12 py-8">
                <div className="mx-auto max-w-7xl px-6">

                    {/* OUR ETHOS */}
                    <div className="grid items-center gap-14 lg:grid-cols-2">

                        {/* Left */}
                        <div>
                            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-(--primary-color)">
                                Our Philosophy
                            </span>

                            <h2 className="font-serif text-4xl leading-tight text-(--primary-color) sm:text-5xl lg:text-6xl">
                                Our Ethos
                            </h2>

                            <p className="text-md font-medium mt-2">
                                Every cup we serve reflects our dedication to
                                exceptional coffee, honest sourcing, and meaningful
                                human connections. We believe coffee should create
                                moments worth remembering.
                            </p>

                            <div className="mt-8 space-y-5">
                                {[
                                    "Premium ethically sourced beans",
                                    "Expert roasting and brewing",
                                    "Memorable customer experience",
                                    "Freshness in every cup",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3"
                                    >
                                        <CheckCircle2
                                            className="text-[#8a4b26]"
                                            size={20}
                                        />

                                        <p className="text-md font-medium">
                                            {item}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right */}
                        <div className="relative">
                            <div className="absolute inset-8 rounded-full bg-[#d69a52]/10 blur-3xl" />

                            <div className="relative rounded-[40px] bg-[#4c2818] p-12 text-center shadow-2xl">
                                <Coffee
                                    size={70}
                                    className="mx-auto text-[#e5b66f]"
                                />

                                <h3 className="mt-6 font-serif text-3xl text-white">
                                    Crafted With Care
                                </h3>

                                <p className="mt-4 leading-7 text-[#d8c7bc]">
                                    Every bean is selected, roasted, and brewed
                                    with passion to create unforgettable coffee
                                    experiences.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* OUR VALUES */}
                    <div className="lg:mt-28 mt-12 text-center">

                        <span className="text-sm font-semibold uppercase tracking-[0.25em] text-(--primary-color)">
                            What We Believe
                        </span>

                        <h2 className="font-serif text-4xl leading-tight text-(--primary-color) sm:text-5xl lg:text-6xl">
                            Our Values
                        </h2>

                        <p className="mx-auto mt-2 max-w-3xl text-lg leading-8 text-[#6b5b52]">
                            Our values guide every decision from sourcing the
                            finest beans to creating warm spaces where people
                            connect over coffee.
                        </p>

                        <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">

                            {[
                                {
                                    icon: Heart,
                                    title: "Passion",
                                    text: "We love creating exceptional coffee experiences every single day.",
                                },
                                {
                                    icon: Coffee,
                                    title: "Quality",
                                    text: "Only premium ingredients and expert craftsmanship reach your cup.",
                                },
                                {
                                    icon: Leaf,
                                    title: "Sustainability",
                                    text: "Supporting ethical sourcing and environmentally responsible practices.",
                                },
                                {
                                    icon: Handshake,
                                    title: "Community",
                                    text: "Building genuine relationships through warmth, hospitality and coffee.",
                                },
                            ].map((item) => (
                                <div
                                    key={item.title}
                                    className="group rounded-3xl border border-[#eadfd5] bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                                >
                                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f8efe8] text-(--primary-color) transition group-hover:bg-(--primary-color) group-hover:text-white">
                                        <item.icon size={28} />
                                    </div>

                                    <h3 className="mt-6 text-2xl font-semibold text-[#2d1b12]">
                                        {item.title}
                                    </h3>

                                    <p className="mt-4 leading-7 text-[#6b5b52]">
                                        {item.text}
                                    </p>
                                </div>
                            ))}
                        </div>

                    </div>

                </div>
            </section>

            <section className="max-w-4xl mx-auto px-6 md:py-12 py-8">
                <h2 className="font-serif text-4xl leading-tight text-center text-(--primary-color) sm:text-5xl lg:text-6xl">
                    Who We Are
                </h2>
                <p className="text-md font-medium text-center">
                    We are a small team of coffee lovers and creators who believe that great coffee begins with care. At Auro, we see coffee as both an art and a science, something that connects people, sparks conversation, and inspires curiosity. From sourcing beans grown with integrity to roasting with precision, every step of our process is guided by intention and respect for the craft. We are proud to be part of South Australia’s vibrant coffee community and to share our passion for flavour, quality, and authenticity with every cup.
                </p>
            </section>

            <section className="relative overflow-hidden bg-(--primary-color) py-20 lg:py-28">
                <div className="relative mx-auto max-w-7xl px-6">
                    {/* Heading */}
                    <div className="mx-auto mb-14 max-w-3xl text-center">
                        <span className="mb-4 inline-flex rounded-full border border-[#d9aa67]/30 bg-[#d9aa67]/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#efc985]">
                            Award-Winning Coffee
                        </span>

                        <h2 className="font-serif text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
                            Celebrating Excellence
                            <span className="block text-(--secondary-color)">
                                In Every Cup
                            </span>
                        </h2>

                        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#d8c6b6] sm:text-base">
                            Recognized at Golden Bean Australasia 2026 for exceptional
                            flavor, craftsmanship, and unforgettable coffee experiences.
                        </p>
                    </div>

                    {/* Award Cards */}
                    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                        {awards.map((award, index) => (
                            <article
                                key={index}
                                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/6 p-6 text-center backdrop-blur-xl transition duration-500 hover:-translate-y-3 hover:border-[#d9aa67]/40 hover:bg-white/9"
                            >

                                {/* Glow */}
                                <div
                                    className={`absolute left-1/2 top-10 h-36 w-36 -translate-x-1/2 rounded-full bg-linear-to-br ${award.accent} opacity-20 blur-3xl transition duration-500 group-hover:opacity-40`}
                                />

                                {/* Medal */}
                                <div className="relative mx-auto mt-5 flex h-48 w-48 items-center justify-center">
                                    <div className="absolute inset-3 rounded-full border border-white/10 transition duration-500 group-hover:scale-110 group-hover:border-[#e5b763]/30" />

                                    <img
                                        src={award.medal}
                                        alt={`${award.level} ${award.year}`}
                                        className="relative z-10 h-40 w-40 object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.35)] transition duration-500 group-hover:scale-105 group-hover:rotate-3"
                                    />
                                </div>

                                {/* Medal Label */}
                                <div className="mt-3">
                                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d9aa67]">
                                        {award.level}
                                    </span>

                                    <h3 className="mt-3 font-serif text-2xl leading-tight text-white">
                                        {award.title}
                                    </h3>

                                    <p className="mt-1 text-sm font-medium text-[#d9aa67]">
                                        {award.year}
                                    </p>
                                </div>

                                {/* Divider */}
                                <div className="mx-auto my-5 h-px w-20 bg-linear-to-r from-transparent via-[#d9aa67]/70 to-transparent" />

                                {/* Products */}
                                <div className="flex flex-wrap justify-center gap-2">
                                    {award.products.map((product, productIndex) => (
                                        <span
                                            key={productIndex}
                                            className="rounded-full border border-white/10 bg-black/10 px-3 py-1.5 text-xs leading-5 text-[#eadfd6] transition duration-300 hover:border-[#d9aa67]/40 hover:text-white"
                                        >
                                            {product}
                                        </span>
                                    ))}
                                </div>

                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}