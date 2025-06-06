import React from "react";
import Link from "next/link";
import { cn, formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Author, Blog } from "@/sanity/types";

export type BlogTypeCard = Omit<Blog, "author"> & { author?: Author };

const BlogCard = ({ post }: { post: BlogTypeCard }) => {
  const {
    _createdAt,
    views,
    author,
    title,
    category,
    _id,
    image,
    description,
  } = post;

  const DEFAULT_AVATAR_URL = "https://placehold.co/48x48";

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
          <Link href={`/user/${author?._id}`}>
            <p className="text-[16px] font-medium line-clamp-1">
              {author?.name}
            </p>
          </Link>
          <Link href={`/blog/${_id}`}>
            <h3 className="text-[26px] font-semibold line-clamp-1">{title}</h3>
          </Link>
        </div>
        <Link href={`/user/${author?._id}`}>
          <Image
            width={48}
            height={48}
            src={author?.image || DEFAULT_AVATAR_URL}
            className="rounded-full"
            alt="placeholder"
          />
        </Link>
      </div>

      <Link href={`/blog/${_id}`}>
        <p className="blog-card-desc">{description}</p>

        <img src={image} alt="placeholder" className="blog-card-img" />
      </Link>

      <div className="flex justify-between items-center gap-3 mt-5">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="text-[16px] font-medium">{category}</p>
        </Link>

        <Button className="blog-card-btn" asChild>
          <Link href={`/blog/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};

export default BlogCard;
