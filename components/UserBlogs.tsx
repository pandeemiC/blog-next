import { client } from "@/sanity/lib/client";
import { BLOGS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import React from "react";
import BlogCard, { BlogTypeCard } from "./BlogCard";

const UserBlogs = async ({ id }: { id: string }) => {
  const blogs = await client.fetch(BLOGS_BY_AUTHOR_QUERY, { id });

  return (
    <>
      {blogs.length > 0 ? (
        blogs.map((blog: BlogTypeCard) => (
          <BlogCard key={blog._id} post={blog} />
        ))
      ) : (
        <p className="no-result">It is a little quiet here...</p>
      )}
    </>
  );
};

export default UserBlogs;
