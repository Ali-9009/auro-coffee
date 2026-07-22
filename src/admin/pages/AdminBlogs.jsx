import { FileText } from "lucide-react";

export default function AdminBlogs() {
    return (
        <section>
            <h1 className="font-serif text-3xl font-semibold text-[#27170f]">
                Blogs
            </h1>

            <p className="mt-2 text-[#75665d]">
                Create, edit, publish and delete
                blog posts.
            </p>

            <div className="mt-8 grid min-h-96 place-items-center rounded-2xl border border-dashed border-[#d9cbc2] bg-white">
                <div className="text-center">
                    <FileText
                        size={42}
                        className="mx-auto text-[#84280d]"
                    />

                    <p className="mt-4 font-semibold text-[#49352b]">
                        Blog manager comes after
                        products
                    </p>
                </div>
            </div>
        </section>
    );
}