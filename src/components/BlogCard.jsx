import { Link } from "react-router-dom";

export default function BlogCard({ blog }) {
    return (
        <Link to={`/blog/${blog.id}`}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-300 p-3 hover:shadow-lg transition overflow-hidden">

                {/* Blog image */}
                <img
                    src={blog.img}
                    alt={blog.title}
                    className="w-full rounded-lg h-48 object-cover"
                />

                <div className="p-4">

                    {/* Category */}
                    <span className="bg-(--primary-color) text-white text-xs px-2 py-1 rounded">
                        {blog.category}
                    </span>

                    {/* Title */}
                    <h3 className="font-semibold text-lg mt-3 leading-snug">
                        {blog.title}
                    </h3>

                    {/* Author and date */}
                    <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">

                        {/* Author image */}
                        <img
                            src={blog.author}
                            className="w-6 h-6 rounded-full"
                        />

                        {/* Author name and date */}
                        <span>{blog.authorName || "Author Name"}</span>
                        <span>•</span>
                        <span>{blog.date}</span>

                    </div>

                </div>

            </div>
        </Link>
    );
}