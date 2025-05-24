import React from "react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";

const BlogCard = ({ post }: { post: BlogTypeCard }) => {
  const {
    _createdAt,
    views,
    author: { _id: authorId, name },
    title,
    category,
    _id,
    image,
  } = post;

  return (
    <li className="blog-card group font-sansation">
      <div className="flex justify-between items-center">
        <p className="blog-card-date">{formatDate(_createdAt)}</p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-black" />
          <span className="text-[16px] font-semibold">{views}</span>
        </div>
      </div>
      <div className="flex justify-between items-center mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${authorId}`}>
            <p className="text-[16px] font-medium line-clamp-1">{name}</p>
          </Link>
          <Link href={`/blog/${_id}`}>
            <h3 className="text-[26px] font-semibold line-clamp-1">{title}</h3>
          </Link>
        </div>
      </div>
    </li>
  );
};

export default BlogCard;
