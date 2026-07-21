import { Phone, Mail, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Contact() {
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
                        Booking Reservation
                    </span>

                    <h1 className="font-serif text-4xl font-semibold text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
                        Contact Us
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

                        <span className="text-(--secondary-color)">Contact Us</span>
                    </div>
                </div>

                {/* Bottom fade */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-black/30 to-transparent" />
            </section>
           
            <section className="py-12 flex flex-col items-center justify-center px-4 bg-[#fffaf6]">

                {/* Form */}
                <div className="w-full max-w-3xl">
                    <form className="space-y-4">

                        <input
                            type="text"
                            placeholder="Name*"
                            className="w-full border border-gray-300 bg-white rounded-md px-4 py-3 focus:outline-none"
                        />

                        <input
                            type="email"
                            placeholder="Email*"
                            className="w-full border border-gray-300 bg-white rounded-md px-4 py-3 focus:outline-none"
                        />

                        <input
                            type="text"
                            placeholder="Website*"
                            className="w-full border border-gray-300 bg-white rounded-md px-4 py-3 focus:outline-none"
                        />

                        <textarea
                            placeholder="Message"
                            rows="5"
                            className="w-full border border-gray-300 bg-white rounded-md px-4 py-3 focus:outline-none"
                        />

                        <button
                            type="submit"
                            className="w-full border border-gray-300 rounded-full py-3 hover:bg-gray-100 transition"
                        >
                            Submit
                        </button>

                    </form>
                </div>

                <div className="flex flex-row gap-6 items-center justify-center">
                    <div className="mt-8 flex items-center gap-2 text-gray-600 text-sm">
                        <Phone size={18} />
                        <span>+92 300 1234567</span>
                    </div>
                    <div className="mt-8 flex items-center gap-2 text-gray-600 text-sm">
                        <Mail size={18} />
                        <span>exm@icloud.com</span>
                    </div>
                </div>

            </section>
        </>
    );
}