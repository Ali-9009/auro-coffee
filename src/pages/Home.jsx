import Button from "../components/PrimaryBtn";
import ProductSection from "../components/ProductSection";
import Testimonials from "../components/Testimonials";

const hero = [
    "/assets/hero-1.png",
    "/assets/hero-2.png",
    "/assets/hero-3.png",
    "/assets/hero-4.png",
    "/assets/hero-5.png",
];

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

export default function Home() {

    return (
        <>

            <section className="py-12 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 space-y-12">

                    <div className="max-w-3xl mx-auto text-center">
                        <p className="md:text-6xl text-4xl font-serif text-(--primary-color) uppercase md:leading-18 mb-5">
                            Award Winning<br />
                            Specialty Coffee
                        </p>

                        <p className="mb-8 text-xl font-medium text-gray-600 leading-7">
                            19 Medals at Golden Bean Australasia 2026
                        </p>

                        <Button
                            className="mx-auto w-fit"
                            to="/shop"
                            text="Order Now"
                        />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center">
                        {hero.map((Logo, index) => (
                            <img
                                key={index}
                                src={Logo}
                                alt={`Brand ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
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

            <ProductSection />

            <section className="max-w-7xl mx-auto px-6 md:pt-12 pb-12">
                <h2 className="font-serif text-4xl leading-tight text-center text-(--primary-color) sm:text-5xl lg:text-6xl">
                    About Auro
                </h2>
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="text-(--text-color)">

                        <p className="text-md font-medium">
                            Auro Speciality Coffee was founded on a simple belief that coffee should be as joyful and expressive as the people who drink it. Based in Adelaide, our family run micro roastery focuses on quality, freshness and creativity in every roast. We source exceptional beans from producers who share our values, then roast them with care to bring out their natural character and balance.
                        </p>
                        <p className="mt-4 text-md font-medium">
                            At Auro, coffee is more than a product. It is a craft built on curiosity and connection. Each cup tells a story of origin, process and passion, brought to life through our dedication to consistency and flavour. Whether you are brewing at home or visiting us in person, we want every sip to remind you to slow down, enjoy the moment and celebrate the simple pleasure of great coffee.
                        </p>
                    </div>

                    <div className="flex justify-center lg:justify-end">
                        <img
                            src="/assets/about-1.png"
                            alt="home"
                        />
                    </div>

                </div>
            </section>

            <Testimonials />

        </>
    );
}