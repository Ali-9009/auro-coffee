import { useParams } from "react-router-dom";
import { blogs } from "../data/blogs";

export default function BlogDetail() {
    const { id } = useParams();

    const blog = blogs.find((b) => b.id === Number(id));

    if (!blog) return <h1>Blog Not Found</h1>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">

            {/* Blog image */}
            <img
                src={blog.img} // fixed: blog.img instead of blog.image
                alt={blog.title}
                className="w-full h-100 object-cover rounded-xl"
            />

            {/* Category */}
            <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded mt-6 inline-block">
                {blog.category}
            </span>

            {/* Title */}
            <h1 className="text-3xl font-bold mt-4">
                {blog.title}
            </h1>

            {/* Author and date */}
            <div className="flex items-center gap-2 mt-4 text-gray-500">
                <img
                    src={blog.author} // use author image path
                    alt={blog.authorName || "Author"}
                    className="w-8 h-8 rounded-full"
                />

                <span>{blog.authorName || "Author Name"}</span>
                <span>•</span>
                <span>{blog.date}</span>
            </div>

            {/* Content */}
            <p className="mt-6 text-gray-600 leading-relaxed">
                {blog.content}
                <br /><br />
                Lorem ipsum dolor sit amet consectetur adipisicing elit...
            </p>

        </div>
    );
}