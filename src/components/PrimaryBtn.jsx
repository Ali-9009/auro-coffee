import { Link } from "react-router-dom";

export default function Button({
    text,
    icon,
    iconPosition = "right", // "left" | "right"
    to,
    onClick,
    type = "button",
    className = "",
}) {
    const baseClass = `px-6 py-2 rounded-full cursor-pointer
    bg-(--primary-color) text-white font-medium
    hover:bg-black
    transition-all duration-300 
    flex items-center justify-center gap-2 ${className}`;

    const content = (
        <>
            {icon && iconPosition === "left" && icon}
            {text}
            {icon && iconPosition === "right" && icon}
        </>
    );

    if (to) {
        return (
            <Link to={to} className={`${baseClass}`}>
                {content}
            </Link>
        );
    }

    return (
        <button
            type={type}
            onClick={onClick}
            className={baseClass}
        >
            {content}
        </button>
    );
}