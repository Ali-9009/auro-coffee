import {
    Droplets,
    Coffee,
    Timer,
    Thermometer,
    Scale,
    Lightbulb,
    ArrowDown,
    ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const brewGuides = [
    {
        id: "water",
        number: "01",
        title: "Water",
        label: "The Foundation",
        image: "/assets/brew-water.jpg",
        imageAlt: "Filtered water being poured for coffee brewing",
        intro:
            "Beyond the beans, the freshness of your grind and the quality of your water make a huge difference to how your coffee tastes.",
        paragraphs: [
            "Coffee is mostly water, so it makes sense that the water you use plays a leading role in the flavour of your cup.",
            "Always grind your coffee fresh just before brewing. Coffee is naturally aromatic, and much of its depth and character is lost once it is pre-ground. Buying whole beans and grinding only what you need allows you to capture the full flavour potential every time you brew.",
            "Water quality and hardness affect not only taste but also your equipment. This is why many cafés invest in high-quality filtration and softening systems before the water reaches their machines.",
            "For home brewers, filtered water is the best starting point. If you have access to softer water, ideally between 50 and 175 ppm, you will notice an even cleaner and more balanced flavour in your cup.",
        ],
        stats: [
            {
                icon: Droplets,
                label: "Water hardness",
                value: "50–175 ppm",
            },
            {
                icon: Thermometer,
                label: "Ideal temperature",
                value: "92–96°C",
            },
        ],
    },
    {
        id: "espresso",
        number: "02",
        title: "Espresso",
        label: "Precision & Balance",
        image: "/assets/brew-espresso.jpg",
        imageAlt:
            "A close-up of a coffee machine pouring espresso into a glass cup",
        intro:
            "A balanced espresso should have depth, clarity, sweetness, and a smooth, lingering finish.",
        paragraphs: [
            "At Auro, we aim for an espresso extraction ratio of 1:2, using 19g in and 38g out over about 25 to 30 seconds.",
            "Depending on your portafilter basket size, you can adjust the dose slightly while keeping the same ratio for the best results.",
            "When serving with milk, we recommend adding around 100 to 120g of textured milk per shot to create a smooth, balanced cup.",
            "The key to a great espresso is precision and patience. Small adjustments in grind, dose, or yield can completely transform the flavour profile.",
        ],
        stats: [
            {
                icon: Scale,
                label: "Coffee dose",
                value: "19g",
            },
            {
                icon: Droplets,
                label: "Yield",
                value: "38g",
            },
            {
                icon: Timer,
                label: "Brew time",
                value: "25–30 sec",
            },
            {
                icon: Coffee,
                label: "Ratio",
                value: "1:2",
            },
        ],
    },
    {
        id: "filter-v60",
        number: "03",
        title: "Filter / V60",
        label: "Clean & Delicate",
        image: "/assets/brew-v60.jpg",
        imageAlt:
            "Coffee filter with ground coffee in a white dripper",
        intro:
            "A V60 produces a clean, balanced cup with delicate aromatics and bright flavour clarity.",
        paragraphs: [
            "We recommend a ratio of 1:16, using 15g of coffee to 240ml of water.",
            "Aim for a medium-coarse grind, similar to coarse sand or granulated sugar, and use a hand grinder where possible for consistency and freshness.",
            "Begin by pouring about 50ml of hot water at roughly 92°C to allow the coffee to bloom.",
            "After 30 seconds, continue pouring in stages of 50ml at a time, finishing with a final pour of around 40ml. Each pour should be slow and even.",
        ],
        stats: [
            {
                icon: Scale,
                label: "Coffee dose",
                value: "15g",
            },
            {
                icon: Droplets,
                label: "Water",
                value: "240ml",
            },
            {
                icon: Coffee,
                label: "Ratio",
                value: "1:16",
            },
            {
                icon: Thermometer,
                label: "Temperature",
                value: "92°C",
            },
        ],
        suggestions: [
            "If your brew tastes too bitter, grind a little coarser or slightly lower the water temperature.",
            "If it tastes flat or lacks flavour, use a finer grind or slightly hotter water.",
        ],
    },
    {
        id: "moka-pot",
        number: "04",
        title: "Moka Pot",
        label: "Rich & Intense",
        image: "/assets/brew-moka.jpg",
        imageAlt: "Moka pot brewing rich coffee on a stove",
        intro:
            "The Moka Pot is ideal for creating a bold, espresso-style coffee at home without using an espresso machine.",
        paragraphs: [
            "Use freshly ground coffee and fill the water chamber just below the safety valve for the best extraction.",
            "Brew gently over medium heat, allowing the coffee to slowly rise and develop deep, bold flavours.",
            "Remove the pot from the heat before it begins to splutter heavily to avoid bitterness.",
            "Allow the coffee to rest for a moment and enjoy it once it has cooled to around 60°C, when its aromatics are at their peak.",
        ],
        stats: [
            {
                icon: Coffee,
                label: "Grind",
                value: "Medium-fine",
            },
            {
                icon: Timer,
                label: "Heat",
                value: "Medium",
            },
        ],
        tip:
            "Avoid pressing or compacting the coffee grounds. Fill the basket evenly and keep the heat controlled.",
    },
    {
        id: "french-press",
        number: "05",
        title: "French Press",
        label: "Full-Bodied",
        image: "/assets/brew-french-press.jpg",
        imageAlt:
            "Person pouring coffee from a French press into a white cup",
        intro:
            "French Press brewing creates a rich, rounded cup with a full body and deep flavour.",
        paragraphs: [
            "Start with a ratio of 30g of freshly ground coffee to 500ml of water.",
            "A medium-coarse grind works best, ideally achieved using a hand grinder for consistency.",
            "Pour about 100ml of hot water over the grounds and let the coffee bloom for one minute.",
            "Give the mixture a gentle stir, add the remaining water, and allow it to steep for four minutes.",
            "Press the plunger slowly and evenly, then pour the coffee into a separate carafe or directly into your cup.",
        ],
        stats: [
            {
                icon: Scale,
                label: "Coffee dose",
                value: "30g",
            },
            {
                icon: Droplets,
                label: "Water",
                value: "500ml",
            },
            {
                icon: Timer,
                label: "Steep time",
                value: "4 min",
            },
            {
                icon: Coffee,
                label: "Grind",
                value: "Medium-coarse",
            },
        ],
       
    },
    {
        id: "drip-bags",
        number: "06",
        title: "Drip Bags",
        label: "Easy & Portable",
        image: "/assets/brew-drip-bag.jpg",
        imageAlt:
            "A coffee drip bag brewing over a cup on a digital scale",
        intro:
            "Drip bags are an easy way to enjoy a fresh, high-quality coffee wherever you are.",
        paragraphs: [
            "Start by opening your drip bag and placing it securely over your cup.",
            "Slowly pour hot water, ideally around 92–96°C, and allow the coffee to bloom and release its natural aromas.",
            "Continue pouring gently in stages, giving the water time to filter through the coffee.",
            "Once the water has fully filtered through, stir the coffee gently and let it cool to around 60°C before enjoying.",
        ],
        stats: [
            {
                icon: Thermometer,
                label: "Temperature",
                value: "92–96°C",
            },
            {
                icon: Droplets,
                label: "Pour style",
                value: "Slow & steady",
            },
          
        ],
        suggestions: [
            "If your coffee tastes too bitter, use slightly cooler water or pour more slowly.",
            "If it seems muddy or over-extracted, pour smaller amounts at a time.",
            "Store drip bags in a cool, dry place and enjoy them soon after opening.",
        ],
    },
];

export default function Guides() {
    return (
        <main className="overflow-hidden bg-[#fbf7f2]">

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
                        Brew Better Coffee
                    </span>

                    <h1 className="font-serif text-4xl font-semibold text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
                        Brew Guides
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

                        <span className="text-(--secondary-color)">Brew Guides</span>
                    </div>
                </div>

                {/* Bottom fade */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-black/30 to-transparent" />
            </section>

            {/* Quick navigation */}
            <nav className="sticky top-0 z-8 border-b border-[#e7d9ce] bg-[#fbf7f2]/95 backdrop-blur-xl">
                <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 py-4 sm:px-6 lg:px-8">
                    {brewGuides.map((guide) => (
                        <a
                            key={guide.id}
                            href={`#${guide.id}`}
                            className="shrink-0 rounded-full border border-[#ddcec2] bg-white px-5 py-2.5 text-sm font-medium text-[#5c4639] transition hover:border-(--primary-color) hover:bg-(--primary-color) hover:text-white"
                        >
                            {guide.title}
                        </a>
                    ))}
                </div>
            </nav>

            {/* Guides */}
            <section className="py-16 lg:py-24">
                <div className="mx-auto max-w-7xl space-y-24 px-5 sm:px-6 lg:space-y-32 lg:px-8">
                    {brewGuides.map((guide, index) => (
                        <article
                            key={guide.id}
                            id={guide.id}
                            className="scroll-mt-28"
                        >
                            <div
                                className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${index % 2 !== 0
                                        ? "lg:[&>*:first-child]:order-2"
                                        : ""
                                    }`}
                            >
                                {/* Image */}
                                <div className="relative">
                                    <div className="absolute -inset-5 rounded-[36px] bg-[#9b5833]/8 blur-2xl" />

                                    <div className="relative overflow-hidden rounded-3xl">
                                        <img
                                            src={guide.image}
                                            alt={guide.imageAlt}
                                            className=""
                                        />

                                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

                                        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                                            <div>
                                                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#efc697]">
                                                    Brew Guide
                                                </span>

                                                <h3 className="mt-1 font-serif text-3xl text-white">
                                                    {guide.title}
                                                </h3>
                                            </div>

                                            <span className="font-serif text-5xl text-white/30">
                                                {guide.number}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div>
                                    <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9a5a36]">
                                        {guide.label}
                                    </span>

                                    <h2 className="mt-4 font-serif text-4xl font-semibold text-[#2c1a11] sm:text-5xl">
                                        {guide.title}
                                    </h2>

                                    <p className="mt-6 text-lg font-medium leading-8 text-[#4b3529]">
                                        {guide.intro}
                                    </p>

                                    <div className="mt-6 space-y-5 text-[15px] leading-7 text-[#756258]">
                                        {guide.paragraphs.map(
                                            (paragraph, paragraphIndex) => (
                                                <p key={paragraphIndex}>
                                                    {paragraph}
                                                </p>
                                            )
                                        )}
                                    </div>

                                    {/* Stats */}
                                    <div className="mt-9 grid grid-cols-2 gap-3">
                                        {guide.stats.map((stat) => {
                                            const Icon = stat.icon;

                                            return (
                                                <div
                                                    key={stat.label}
                                                    className="rounded-2xl border border-[#e2d5cb] bg-white p-4 shadow-sm"
                                                >
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f4e9e1] text-[#853f20]">
                                                        <Icon size={19} />
                                                    </div>

                                                    <p className="mt-4 text-xs uppercase tracking-[0.15em] text-[#958177]">
                                                        {stat.label}
                                                    </p>

                                                    <p className="mt-1 font-semibold text-[#342218]">
                                                        {stat.value}
                                                    </p>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Special recipe */}
                                    {guide.special && (
                                        <div className="mt-8 rounded-3xl bg-[#3b2115] p-6 text-white">
                                            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e7b77f]">
                                                Special Recipe
                                            </span>

                                            <h3 className="mt-2 text-xl font-semibold">
                                                {guide.special.title}
                                            </h3>

                                            <p className="mt-3 leading-7 text-white/70">
                                                {guide.special.text}
                                            </p>
                                        </div>
                                    )}

                                    {/* Tip */}
                                    {guide.tip && (
                                        <div className="mt-8 flex gap-4 rounded-2xl border border-[#e3d3c6] bg-[#f5ece5] p-5">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#8a4525]">
                                                <Lightbulb size={19} />
                                            </div>

                                            <div>
                                                <h3 className="font-semibold text-[#382319]">
                                                    Brew tip
                                                </h3>

                                                <p className="mt-2 text-sm leading-6 text-[#746057]">
                                                    {guide.tip}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Suggestions */}
                                    {guide.suggestions && (
                                        <div className="mt-8 rounded-3xl border border-[#dfd0c5] bg-white p-6">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f2e4da] text-[#853f20]">
                                                    <Lightbulb size={19} />
                                                </div>

                                                <h3 className="text-lg font-semibold text-[#372219]">
                                                    Suggestions
                                                </h3>
                                            </div>

                                            <div className="mt-5 space-y-4">
                                                {guide.suggestions.map(
                                                    (
                                                        suggestion,
                                                        suggestionIndex
                                                    ) => (
                                                        <div
                                                            key={
                                                                suggestionIndex
                                                            }
                                                            className="flex gap-3"
                                                        >
                                                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#8c4727]" />

                                                            <p className="text-sm leading-6 text-[#746158]">
                                                                {suggestion}
                                                            </p>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* Closing CTA */}
            <section className="px-5 pb-20 sm:px-6 lg:px-8 lg:pb-28">
                <div className="mx-auto max-w-7xl overflow-hidden rounded-[36px] bg-(--primary-color)">
                    <div className="relative px-6 py-16 text-center sm:px-12 lg:py-20">
                        <div className="absolute inset-0 bg-[url('/assets/coffee-pattern.png')] bg-cover bg-center opacity-10" />

                        <div className="relative z-8 mx-auto max-w-2xl">
                            <Coffee
                                size={42}
                                className="mx-auto text-[#e0aa6d]"
                            />

                            <h2 className="mt-5 font-serif text-4xl text-white sm:text-5xl">
                                Better brewing starts here
                            </h2>

                            <p className="mt-5 leading-7 text-white/65">
                                Experiment with grind size, water temperature,
                                and brew time until you discover the cup that
                                tastes perfect to you.
                            </p>

                            <a
                                href="/shop"
                                className="mt-8 inline-flex rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#342014] transition hover:bg-[#eadacb]"
                            >
                                Shop our coffee
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}