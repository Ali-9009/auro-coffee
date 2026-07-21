import { useState, useEffect, useRef } from "react";
import { Menu, X, Phone, Mail, ChevronDown, Logs, Search } from "lucide-react";
import { Link } from "react-router-dom";

import Button from "./PrimaryBtn";

export default function Header() {
    const [open, setOpen] = useState(false);
    const [sticky, setSticky] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [mobileDropdown, setMobileDropdown] = useState(null);

    const langRef = useRef(null);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Our Story", path: "/our-story" },
        { name: "Shop", path: "/shop" },
        { name: "Brew Guides", path: "/brew-guides" },
        { name: "Blog", path: "/blog" },
        { name: "Contact Us", path: "/contact" },
        { name: "FAQs", path: "/faqs" },
    ];

    // Sticky scroll
    useEffect(() => {
        const handleScroll = () => {
            setSticky(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className="w-full">

            {/* Top Bar */}
            <div className="bg-(--primary-color) text-white text-sm">
                <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-2">
                    <div className="flex items-center gap-6">
                        <a href="tel:3052656226" className="flex items-center gap-2">
                            <Phone size={16} />
                            <span>305.265.6226</span>
                        </a>
                        <a href="mailto:obregoninsurance@gmail.com" className="flex items-center gap-2">
                            <Mail size={16} />
                            <span>@gmail.com</span>
                        </a>
                    </div>

                    <div className="hidden md:flex items-center gap-4 text-lg">
                        <a
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="ri-google-fill cursor-pointer"></i>
                        </a>
                        <a
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="ri-facebook-fill cursor-pointer"></i>
                        </a>

                        <a
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="ri-linkedin-fill cursor-pointer"></i>
                        </a>
                    </div>
                </div>
            </div>

            {/* NAVBAR */}
            <div
                className={`bg-white border-b border-gray-300 transition-all duration-300 z-9 ${sticky
                    ? "fixed top-0 left-0 w-full shadow-md"
                    : "relative"
                    }`}
            >
                <div
                    className={`max-w-7xl mx-auto flex items-center justify-between px-4 transition-all duration-300 ${sticky ? "py-2" : "py-4"
                        }`}
                >

                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <img
                            src="/assets/logo.png"
                            alt="logo"
                            className={`object-contain transition-all duration-300 origin-left ${sticky ? "h-10" : "h-16"
                                }`}
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-8 font-medium text-(--primary-color)">
                        {navLinks.map((link) => (
                            <div key={link.name} className="relative group">

                                {/* Main Link */}
                                {link.dropdown ? (
                                    <Link
                                        to={link.path}
                                        className="flex items-center gap-1"
                                    >
                                        {link.name}
                                        <ChevronDown size={16} />
                                    </Link>
                                ) : (
                                    <Link to={link.path}>{link.name}</Link>
                                )}

                                {/* Dropdown (hover only) */}
                                {link.dropdown && (
                                    <div className="absolute left-0 top-full mt-1 hidden group-hover:block bg-white shadow-lg rounded-md py-2 w-48 z-50">
                                        {link.dropdown.map((item) => (
                                            <Link
                                                key={item.name}
                                                to={item.path}
                                                className="block px-4 text-sm py-2 hover:bg-gray-100"
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Right */}
                    <div className="hidden lg:flex items-center gap-4">
                        <CartButton />
                        {/* <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-[#f3e9e1] text-[#84280d] cursor-pointer">
                            <Search className="absolute" />
                        </div> */}
                    </div>

                    {/* Mobile */}
                    <div className="lg:hidden flex items-center gap-4">
                        <CartButton />

                        <button onClick={() => setOpen(true)}>
                            <Logs size={26} />
                        </button>
                    </div>

                </div>
            </div>

            {/* Sidebar */}
            <div
                className={`fixed top-0 right-0 h-full w-72 bg-white shadow-lg transition-transform duration-300 z-50 ${open ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex justify-between items-center p-4 border-gray-300 border-b">
                    <img src="/assets/logo.png" className="w-20" alt="" />
                    <button onClick={() => setOpen(false)}>
                        <X />
                    </button>
                </div>

                <div className="flex flex-col gap-4 p-4">
                    {navLinks.map((link) => (
                        <div key={link.name} className="flex flex-col">

                            {/* MAIN LINK */}
                            <div className="flex items-center justify-between">
                                <Link
                                    to={link.path}
                                    onClick={() => setOpen(false)}
                                    className="py-2"
                                >
                                    {link.name}
                                </Link>
                            </div>

                            {/* ALWAYS SHOW DROPDOWN (no click) */}
                            {link.dropdown && (
                                <div className="pl-4 flex flex-col border-l border-gray-200 ml-2">
                                    {link.dropdown.map((item) => (
                                        <Link
                                            key={item.name}
                                            to={item.path}
                                            onClick={() => setOpen(false)}
                                            className="py-2 text-sm text-gray-600"
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                    <div onClick={() => setOpen(false)}>
                        <Button to="/" text="Check Availability" className="text-center" />
                    </div>
                </div>
            </div>

            {/* Overlay */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/40 z-40"
                    onClick={() => setOpen(false)}
                />
            )}
        </header>
    );
}


import { ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

export function CartButton() {
    const { cartCount } = useCart();

    return (
        <Link
            to="/cart"
            className="relative flex h-11 w-11 items-center justify-center rounded-full bg-[#f3e9e1] text-[#84280d]"
        >
            <ShoppingBag size={20} />

            {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#84280d] px-1 text-[10px] font-bold text-white">
                    {cartCount}
                </span>
            )}
        </Link>
    );
}