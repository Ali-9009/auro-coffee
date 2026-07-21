import { useMemo, useState } from "react";
import {
    Search,
    ChevronDown,
    Coffee,
    Package,
    CreditCard,
    Truck,
    HelpCircle,
    Mail,
    MessageCircle,
    Sparkles,
    ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const categories = [
    {
        name: "All",
        icon: HelpCircle,
    },
    {
        name: "Coffee",
        icon: Coffee,
    },
    {
        name: "Orders",
        icon: Package,
    },
    {
        name: "Payments",
        icon: CreditCard,
    },
    {
        name: "Delivery",
        icon: Truck,
    },
];

const faqs = [
    {
        id: 1,
        category: "Coffee",
        question: "How fresh is your coffee?",
        answer:
            "Our coffee is roasted in small batches and packed as soon as possible after roasting. This helps preserve its aroma, sweetness, and natural flavour. For the best experience, we recommend enjoying whole beans within four to six weeks of the roast date.",
    },
    {
        id: 2,
        category: "Coffee",
        question: "Should I buy whole beans or ground coffee?",
        answer:
            "Whole beans offer the freshest and most expressive flavour because coffee begins losing aroma once it is ground. If you have a grinder at home, we recommend whole beans. Ground coffee is still a convenient option, and you can choose the grind size that matches your preferred brewing method.",
    },
    {
        id: 3,
        category: "Coffee",
        question: "Which grind size should I choose?",
        answer:
            "Choose fine for espresso, medium-fine for Moka Pot, medium for drip coffee, medium-coarse for V60 and filter brewing, and coarse for French Press. The ideal grind can vary slightly depending on your equipment and extraction time.",
    },
    {
        id: 4,
        category: "Coffee",
        question: "How should I store my coffee?",
        answer:
            "Keep your coffee in an airtight container away from heat, light, moisture, and strong odours. Avoid storing it in the refrigerator because repeated temperature changes can create condensation and affect freshness.",
    },
    {
        id: 5,
        category: "Orders",
        question: "Can I change or cancel my order?",
        answer:
            "We begin preparing orders quickly, so changes are only possible before the order enters processing. Contact us as soon as possible with your order number and the change you would like to make.",
    },
    {
        id: 6,
        category: "Orders",
        question: "How do I know my order was successful?",
        answer:
            "Once your order is confirmed, you will receive an order confirmation by email. It will include your order number, selected products, delivery information, and total payment.",
    },
    {
        id: 7,
        category: "Orders",
        question: "Can I order coffee as a gift?",
        answer:
            "Yes. You can send an order directly to someone else by entering their delivery address during checkout. You may also add a gift message in the order notes when that option is available.",
    },
    {
        id: 8,
        category: "Payments",
        question: "Which payment methods do you accept?",
        answer:
            "We accept major debit and credit cards. The exact payment options available to you will appear during checkout and may vary depending on your region.",
    },
    {
        id: 9,
        category: "Payments",
        question: "Is my payment information secure?",
        answer:
            "Yes. Payments are processed through secure and encrypted payment providers. We do not store your full card information on our website.",
    },
    {
        id: 10,
        category: "Payments",
        question: "Why was my payment declined?",
        answer:
            "A payment may be declined because of incorrect card details, insufficient funds, bank security checks, or billing information that does not match your bank records. Check your details or contact your bank before trying again.",
    },
    {
        id: 11,
        category: "Delivery",
        question: "How long does delivery take?",
        answer:
            "Delivery times depend on your location and the selected shipping method. Most orders are processed within one to two business days, after which you will receive tracking information when available.",
    },
    {
        id: 12,
        category: "Delivery",
        question: "How can I track my order?",
        answer:
            "When your order has been dispatched, we will send you an email containing your tracking details. Use the tracking link in that email to follow your delivery.",
    },
    {
        id: 13,
        category: "Delivery",
        question: "What should I do if my order arrives damaged?",
        answer:
            "Please contact us within 48 hours of receiving the order. Include your order number and clear photos of the packaging and damaged item so our team can review the issue quickly.",
    },
    {
        id: 14,
        category: "Delivery",
        question: "Do you offer international delivery?",
        answer:
            "International delivery availability depends on the destination and current shipping partners. Enter your address during checkout to see whether delivery is available in your area.",
    },
];

const categoryIcons = {
    Coffee,
    Orders: Package,
    Payments: CreditCard,
    Delivery: Truck,
};

const accordionVariants = {
    hidden: {
        height: 0,
        opacity: 0,
    },
    visible: {
        height: "auto",
        opacity: 1,
        transition: {
            height: {
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
            },
            opacity: {
                duration: 0.25,
                delay: 0.08,
            },
        },
    },
    exit: {
        height: 0,
        opacity: 0,
        transition: {
            height: {
                duration: 0.28,
                ease: "easeInOut",
            },
            opacity: {
                duration: 0.15,
            },
        },
    },
};

export default function Faqs() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [search, setSearch] = useState("");
    const [openFaq, setOpenFaq] = useState(1);

    const filteredFaqs = useMemo(() => {
        const normalizedSearch = search.trim().toLowerCase();

        return faqs.filter((faq) => {
            const matchesCategory =
                activeCategory === "All" ||
                faq.category === activeCategory;

            const matchesSearch =
                !normalizedSearch ||
                faq.question.toLowerCase().includes(normalizedSearch) ||
                faq.answer.toLowerCase().includes(normalizedSearch);

            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, search]);

    const resetFilters = () => {
        setSearch("");
        setActiveCategory("All");
    };

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
                        Help Centre
                    </span>

                    <h1 className="font-serif text-4xl font-semibold text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
                        Frequently Asked Questions
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

                        <span className="text-(--secondary-color)">FAQs</span>
                    </div>
                </div>

                {/* Bottom fade */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-black/30 to-transparent" />
            </section>

            <section className="relative py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                    {/* Category tabs */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 30,
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                        }}
                        viewport={{
                            once: true,
                            amount: 0.3,
                        }}
                        transition={{
                            duration: 0.7,
                        }}
                        className="flex gap-3 overflow-x-auto pb-3 py-4"
                    >
                        {categories.map((category) => {
                            const Icon = category.icon;
                            const active =
                                activeCategory === category.name;

                            return (
                                <button
                                    key={category.name}
                                    type="button"
                                    onClick={() => {
                                        setActiveCategory(category.name);
                                        setOpenFaq(null);
                                    }}
                                    className={`flex shrink-0 items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition-all   cursor-pointer duration-300 ${active
                                            ? "border-(--primary-color) bg-(--primary-color) text-white shadow-md"
                                            : "border-[#dfd2c7] bg-white text-[#5f493c] hover:-translate-y-0.5 hover:border-[#9a5836] hover:text-(--primary-color)"
                                        }`}
                                >
                                    <Icon size={17} />
                                    {category.name}
                                </button>
                            );
                        })}
                    </motion.div>

                    <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16">
                        {/* FAQ list */}
                        <div>
                            <div className="mb-7 flex items-end justify-between gap-4">
                                <div>
                                    <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9b5c3b]">
                                        Helpful answers
                                    </span>

                                    <h2 className="mt-2 font-serif text-3xl font-semibold text-[#2d1b12] sm:text-4xl">
                                        What can we help with?
                                    </h2>
                                </div>

                                <span className="hidden text-sm text-[#8c7a70] sm:block">
                                    {filteredFaqs.length} questions
                                </span>
                            </div>

                            {filteredFaqs.length > 0 ? (
                                <div className="space-y-4">
                                    {filteredFaqs.map((faq, index) => {
                                        const isOpen = openFaq === faq.id;
                                        const Icon =
                                            categoryIcons[faq.category] ||
                                            HelpCircle;

                                        return (
                                            <motion.article
                                                key={faq.id}
                                                initial={{
                                                    opacity: 0,
                                                    y: 24,
                                                }}
                                                whileInView={{
                                                    opacity: 1,
                                                    y: 0,
                                                }}
                                                viewport={{
                                                    once: true,
                                                    amount: 0.2,
                                                }}
                                                transition={{
                                                    duration: 0.5,
                                                    delay:
                                                        Math.min(
                                                            index * 0.05,
                                                            0.25
                                                        ),
                                                }}
                                                className={`overflow-hidden rounded-3xl border bg-white transition-all duration-300 ${isOpen
                                                        ? "border-[#bd8a68] shadow-[0_18px_50px_rgba(73,38,20,0.10)]"
                                                        : "border-[#e5d9d0] hover:border-[#c4a38e]"
                                                    }`}
                                            >
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setOpenFaq(
                                                            isOpen
                                                                ? null
                                                                : faq.id
                                                        )
                                                    }
                                                    className="flex w-full items-center gap-4 p-5 text-left sm:p-6"
                                                    aria-expanded={isOpen}
                                                >
                                                    <div
                                                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-colors ${isOpen
                                                                ? "bg-(--primary-color) text-white"
                                                                : "bg-[#f4e9e1] text-[#8c4828]"
                                                            }`}
                                                    >
                                                        <Icon size={20} />
                                                    </div>

                                                    <div className="min-w-0 flex-1">
                                                        <span className="text-[11px] font-semibold uppercase tracking-[0.17em] text-[#a27860]">
                                                            {faq.category}
                                                        </span>

                                                        <h3 className="mt-1 pr-2 text-base font-semibold leading-6 text-[#352219] sm:text-lg">
                                                            {faq.question}
                                                        </h3>
                                                    </div>

                                                    <motion.span
                                                        animate={{
                                                            rotate: isOpen
                                                                ? 180
                                                                : 0,
                                                        }}
                                                        transition={{
                                                            duration: 0.3,
                                                        }}
                                                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors ${isOpen
                                                                ? "bg-[#f1e4db] text-(--primary-color)"
                                                                : "bg-[#f8f4f1] text-[#7c6b61]"
                                                            }`}
                                                    >
                                                        <ChevronDown
                                                            size={19}
                                                        />
                                                    </motion.span>
                                                </button>

                                                <AnimatePresence initial={false}>
                                                    {isOpen && (
                                                        <motion.div
                                                            key="answer"
                                                            variants={
                                                                accordionVariants
                                                            }
                                                            initial="hidden"
                                                            animate="visible"
                                                            exit="exit"
                                                            className="overflow-hidden"
                                                        >
                                                            <div className="border-t border-[#eee4dd] px-5 pb-6 pt-5 sm:ml-16 sm:px-6 sm:pb-7">
                                                                <p className="text-[15px] leading-7 text-[#75645b]">
                                                                    {faq.answer}
                                                                </p>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </motion.article>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="rounded-3xl border border-dashed border-[#d9c8bc] bg-white px-6 py-16 text-center">
                                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#f4e9e1] text-[#813e20]">
                                        <Search size={32} />
                                    </div>

                                    <h3 className="mt-6 text-2xl font-semibold text-[#2f1d14]">
                                        No answers found
                                    </h3>

                                    <p className="mx-auto mt-3 max-w-md leading-7 text-[#79675d]">
                                        Try another search term or clear your
                                        selected category.
                                    </p>

                                    <button
                                        type="button"
                                        onClick={resetFilters}
                                        className="mt-6 rounded-full bg-(--primary-color) px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#55230f]"
                                    >
                                        Clear filters
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <aside className="space-y-6 lg:sticky lg:top-28 lg:h-fit">
                            <div className="relative overflow-hidden rounded-[30px] bg-[#32190f] p-7 text-white">
                                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#b8703e]/20 blur-3xl" />

                                <div className="relative z-10">
                                    <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-white/10">
                                        <MessageCircle
                                            size={24}
                                            className="text-[#e7b77f]"
                                        />
                                    </div>

                                    <span className="mt-6 block text-xs font-semibold uppercase tracking-[0.22em] text-[#dfad75]">
                                        Need more help?
                                    </span>

                                    <h3 className="mt-3 font-serif text-3xl">
                                        Talk to our team
                                    </h3>

                                    <p className="mt-4 text-sm leading-7 text-white/65">
                                        Couldn’t find the answer you needed?
                                        Send us a message and our team will be
                                        happy to help.
                                    </p>

                                    <Link
                                        to="/contact"
                                        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-[#32190f] transition hover:bg-[#ecdccd]"
                                    >
                                        <Mail size={17} />
                                        Contact us
                                    </Link>
                                </div>
                            </div>

                            <div className="rounded-[30px] border border-[#e2d5cb] bg-white p-7">
                                <Sparkles
                                    size={24}
                                    className="text-[#914827]"
                                />

                                <h3 className="mt-4 text-xl font-semibold text-[#332017]">
                                    Brewing questions?
                                </h3>

                                <p className="mt-3 text-sm leading-7 text-[#78665c]">
                                    Explore our detailed brew guides for
                                    espresso, V60, French Press, Moka Pot, and
                                    drip bags.
                                </p>

                                <Link
                                    to="/brew-guides"
                                    className="mt-5 inline-flex text-sm font-semibold text-[#803b1e] transition hover:text-[#54210d]"
                                >
                                    View brew guides
                                </Link>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

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
                                Still have a question?
                            </h2>

                            <p className="mt-5 leading-7 text-white/65">
                                Our team is here to help with products, brewing, orders, or anything else you need.
                            </p>

                            <a
                                href="/contact"
                                className="mt-8 inline-flex rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#342014] transition hover:bg-[#eadacb]"
                            >
                                Get in touch
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}