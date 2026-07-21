import { Star } from "lucide-react";
import Button from "./PrimaryBtn";

const reviews = [
    {
        name: "John Smith",
        role: "CEO, Tech Innovations Inc",
        date: "March 1, 2024",
        text: "Exceptional service! The team exceeded our expectations and delivered a top-notch product on time.",
        initials: "J",
    },
    {
        name: "Sarah Johnson",
        role: "Marketing Manager, Bright Solutions",
        date: "February 15, 2024",
        text: "Working with this company was a game-changer. Their attention to detail are unmatched!",
        initials: "S",
    },
    {
        name: "Michael Brown",
        role: "Founder, Brown & Co.",
        date: "January 10, 2024",
        text: "A fantastic experience from start to finish. Highly recommended for anyone looking for quality work!",
        initials: "M",
    },
    {
        name: "Emily Davis",
        role: "HR Director, Global Enterprises",
        date: "December 20, 2023",
        text: "Great customer support and seamless service. The team truly cares about their clients.",
        initials: "E",
    },
];

export default function Testimonials() {
    return (
        <section className="py-16 px-6">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="font-serif mb-6 text-4xl leading-tight text-center text-(--primary-color) sm:text-5xl lg:text-6xl">
                    What our customers say
                </h2>

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {reviews.map((review, index) => (
                        <div
                            key={index}
                            className="p-6 rounded-2xl bg-[#fffaf6] hover:shadow-md transition flex flex-col items-center justify-between text-center"
                        >
                            {/* Stars */}
                            <div className="flex text-yellow-400 mb-3">
                                {Array(5)
                                    .fill(0)
                                    .map((_, i) => (
                                        <Star key={i} />
                                    ))}
                            </div>

                            {/* Review Text */}
                            <p className="text-gray-700 text-sm mb-4">{review.text}</p>

                            {/* Reviewer Avatar */}
                            <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold mb-2">
                                {review.initials}
                            </div>

                            {/* Reviewer Name and Role */}
                            <h4 className="font-semibold text-gray-900">{review.name}</h4>
                            <p className="text-gray-500 text-xs mb-1">{review.role}</p>
                            <p className="text-gray-400 text-xs">Posted on {review.date}</p>

                            {/* Google logo */}
                            <img
                                src="/assets/g-logo.png"
                                alt="Google"
                                className="mt-2 h-8"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}