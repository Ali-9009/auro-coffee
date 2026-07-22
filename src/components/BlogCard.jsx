import { Link } from "react-router-dom";

export default function BlogCard({ blog }) {
    return (
        <Link
            to={`/blog/${blog.slug}`}
            className="block h-full"
        >
            <article className="group h-full overflow-hidden rounded-2xl border border-[#e5d8cf] bg-white p-3 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                {/* Blog image */}
                <div className="overflow-hidden rounded-xl bg-[#f0e6df]">
                    <img
                        src={blog.img}
                        alt={blog.title}
                        loading="lazy"
                        className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
                        onError={(event) => {
                            event.currentTarget.src =
                                "/assets/blog-placeholder.webp";
                        }}
                    />
                </div>

                <div className="p-4">
                    {/* Category */}
                    <span className="inline-flex rounded-full bg-(--primary-color) px-3 py-1 text-xs font-semibold text-white">
                        {blog.category}
                    </span>

                    {/* Title */}
                    <h2 className="mt-4 line-clamp-2 text-xl font-semibold leading-snug text-[#2d1b12] transition group-hover:text-[#84280d]">
                        {blog.title}
                    </h2>

                    {blog.excerpt && (
                        <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#75665d]">
                            {blog.excerpt}
                        </p>
                    )}

                    {/* Author and date */}
                    <div className="mt-5 flex items-center gap-3 border-t border-[#eee3dc] pt-4">
                        <img
                            src={blog.author}
                            alt={blog.authorName}
                            loading="lazy"
                            className="h-9 w-9 rounded-full object-cover"
                            onError={(event) => {
                                event.currentTarget.src =
                                    "/assets/author-placeholder.webp";
                            }}
                        />

                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-[#49352b]">
                                {blog.authorName}
                            </p>

                            <p className="text-xs text-[#95847a]">
                                {blog.date}
                            </p>
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
}